import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../core/services/products.service';
import { ProductCard } from '../../../shared/ui/product-card/product-card';
import { ScrollReveal } from '../../../shared/ui/scroll-reveal/scroll-reveal';
import { LanguageService } from '../../../core/i18n/language.service';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard, ScrollReveal],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  private readonly productsService = inject(ProductsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly language = inject(LanguageService);

  protected readonly t = this.language.t;

  private readonly queryParamMap = toSignal(this.route.queryParamMap, { requireSync: true });

  protected readonly categories = this.productsService.categories;
  protected readonly selectedCategory = computed(() => this.queryParamMap().get('kategori'));

  // Kategori URL'de tutulur (paylaşılabilir/yer imlenebilir), arama ise yereldir: her tuş vuruşunda
  // Router'dan geçmek withViewTransitions() yüzünden her harfte bir geçiş animasyonu tetiklerdi.
  protected readonly searchQuery = signal('');

  protected readonly filteredProducts = computed(() => {
    const category = this.selectedCategory();
    // Küçük harfe çevirme aktif dilin kuralıyla yapılır: Türkçe kuralı "I" harfini "ı" yapar,
    // bu da İngilizce metinde arama yaparken eşleşmeyi bozardı.
    const locale = this.language.lang();
    const query = this.searchQuery().trim().toLocaleLowerCase(locale);

    return this.productsService.products().filter((product) => {
      if (category && product.categoryId !== category) {
        return false;
      }
      if (!query) {
        return true;
      }
      return (
        product.name.toLocaleLowerCase(locale).includes(query) ||
        product.shortDescription.toLocaleLowerCase(locale).includes(query)
      );
    });
  });

  protected selectCategory(categoryId: string | null): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { kategori: categoryId },
      queryParamsHandling: 'merge',
    });
  }

  protected onSearchInput(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }
}
