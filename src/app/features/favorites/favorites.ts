import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { ProductCard } from '../../shared/ui/product-card/product-card';

@Component({
  selector: 'app-favorites',
  imports: [RouterLink, ProductCard],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {
  private readonly productsService = inject(ProductsService);
  private readonly favorites = inject(FavoritesService);

  protected readonly favoriteProducts = computed(() => {
    const ids = this.favorites.favoriteIds();
    return this.productsService.products().filter((product) => ids.has(product.id));
  });
}
