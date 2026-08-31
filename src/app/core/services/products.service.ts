import { Service, computed, inject, signal } from '@angular/core';
import { CATEGORY_LABELS, PRODUCTS } from '../data/products.data';
import { Product, Review } from '../models/product.model';
import { Lang, LanguageService } from '../i18n/language.service';

export interface ProductCategory {
  id: string;
  label: string;
}

export interface ProductReview extends Review {
  productId: string;
  productName: string;
}

/**
 * Ürünü aktif dile çözer. İngilizce alan yoksa Türkçesine düşer -- bu yüzden yeni ürün
 * eklerken İngilizce yazmak zorunlu değil, eksik alan sadece Türkçe görünür.
 */
function localizeProduct(product: Product, lang: Lang): Product {
  if (lang === 'tr') {
    return product;
  }
  return {
    ...product,
    name: product.nameEn ?? product.name,
    shortDescription: product.shortDescriptionEn ?? product.shortDescription,
    description: product.descriptionEn ?? product.description,
    images: product.images.map((image) => ({ ...image, alt: image.altEn ?? image.alt })),
  };
}

@Service()
export class ProductsService {
  private readonly language = inject(LanguageService);

  private readonly _products = signal(PRODUCTS);

  /**
   * Dile çözülmüş ürünler. Çeviri tek noktada burada yapılır: liste, detay, kart, favoriler,
   * kayan yorumlar ve yönetim paneli bu sinyali kullandığı için hiçbiri dil bilmek zorunda değil.
   */
  readonly products = computed<Product[]>(() => {
    const lang = this.language.lang();
    return this._products().map((product) => localizeProduct(product, lang));
  });

  readonly categories = computed<ProductCategory[]>(() => {
    const lang = this.language.lang();
    const ids = [...new Set(this._products().map((product) => product.categoryId))];
    return ids.map((id) => ({ id, label: CATEGORY_LABELS[id]?.[lang] ?? id }));
  });

  /** Tek bir kategori id'sinin görünen adı; listede yoksa id'nin kendisi döner. */
  categoryLabel(categoryId: string): string {
    return CATEGORY_LABELS[categoryId]?.[this.language.lang()] ?? categoryId;
  }

  readonly featuredProducts = computed(() => this.products().filter((product) => product.featured));

  readonly allReviews = computed<ProductReview[]>(() =>
    this.products().flatMap((product) =>
      product.reviews.map((review) => ({ ...review, productId: product.id, productName: product.name })),
    ),
  );
}
