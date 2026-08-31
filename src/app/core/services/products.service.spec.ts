import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { LanguageService } from '../i18n/language.service';
import { PRODUCTS } from '../data/products.data';

describe('ProductsService', () => {
  let service: ProductsService;
  let language: LanguageService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsService);
    language = TestBed.inject(LanguageService);
  });

  it('derives the category list from the product data', () => {
    const categories = service.categories();
    expect(categories.length).toBeGreaterThan(0);
    expect(categories.every((category) => !!category.label)).toBeTruthy();
  });

  it('only returns products marked as featured', () => {
    const featured = service.featuredProducts();
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.every((product) => product.featured)).toBeTruthy();
  });

  it('flattens every product review with its product id and name attached', () => {
    const reviews = service.allReviews();
    const totalReviews = service.products().reduce((sum, product) => sum + product.reviews.length, 0);

    expect(reviews.length).toBe(totalReviews);
    expect(reviews.every((review) => !!review.productId && !!review.productName)).toBeTruthy();
  });

  describe('dil çözümlemesi', () => {
    const find = <T extends { id: string }>(list: readonly T[], id: string): T =>
      list.find((item) => item.id === id)!;

    it('İngilizcede nameEn/descriptionEn kullanılır', () => {
      language.setLanguage('en');
      const kartlik = find(service.products(), 'kartlik');

      expect(kartlik.name).toBe('Card Holder');
      expect(kartlik.shortDescription).toBe(find(PRODUCTS, 'kartlik').shortDescriptionEn);
    });

    it('İngilizce karşılığı olmayan alan Türkçesine düşer -- eksik çeviri siteyi boş bırakmaz', () => {
      const source = find(PRODUCTS, 'elegance');
      expect(source.nameEn, 'test bu ürünün nameEn taşımamasına dayanıyor').toBeUndefined();

      language.setLanguage('en');
      expect(find(service.products(), 'elegance').name).toBe(source.name);
    });

    it('görsel alt metinleri de dile çözülür', () => {
      language.setLanguage('en');
      expect(find(service.products(), 'elegance').images[0].alt).toBe('Elegance bag');
    });

    it('kategori adları dile göre değişir', () => {
      expect(service.categoryLabel('canta')).toBe('Çanta');
      language.setLanguage('en');
      expect(service.categoryLabel('canta')).toBe('Bag');
    });

    it('tanımsız kategori id\'si olduğu gibi döner', () => {
      expect(service.categoryLabel('boyle-bir-kategori-yok')).toBe('boyle-bir-kategori-yok');
    });
  });
});
