import { Component, computed, inject, input } from '@angular/core';
import { NgOptimizedImage, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { CATEGORY_LABELS } from '../../../core/data/products.data';
import { StarRating } from '../star-rating/star-rating';
import { StockBadge } from '../stock-badge/stock-badge';
import { FavoritesService } from '../../../core/services/favorites.service';
import { StockService } from '../../../core/services/stock.service';

@Component({
  selector: 'app-product-card',
  imports: [NgOptimizedImage, CurrencyPipe, RouterLink, StarRating, StockBadge],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  private readonly favorites = inject(FavoritesService);
  private readonly stock = inject(StockService);

  readonly product = input.required<Product>();
  readonly priority = input(false);

  protected readonly categoryLabel = computed(() => CATEGORY_LABELS[this.product().categoryId] ?? this.product().categoryId);

  protected readonly averageRating = computed(() => {
    const reviews = this.product().reviews;
    if (reviews.length === 0) {
      return 0;
    }
    return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  });

  protected readonly isFavorite = computed(() => this.favorites.isFavorite(this.product().id));

  protected readonly stockStatus = computed(() => this.stock.statusFor(this.product().id));

  protected toggleFavorite(): void {
    this.favorites.toggle(this.product().id);
  }
}
