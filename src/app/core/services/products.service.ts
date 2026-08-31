import { Service, computed, signal } from '@angular/core';
import { CATEGORY_LABELS, PRODUCTS } from '../data/products.data';
import { Review } from '../models/product.model';

export interface ProductCategory {
  id: string;
  label: string;
}

export interface ProductReview extends Review {
  productId: string;
  productName: string;
}

@Service()
export class ProductsService {
  private readonly _products = signal(PRODUCTS);

  readonly products = this._products.asReadonly();

  readonly categories = computed<ProductCategory[]>(() => {
    const ids = [...new Set(this._products().map((product) => product.categoryId))];
    return ids.map((id) => ({ id, label: CATEGORY_LABELS[id] ?? id }));
  });

  readonly featuredProducts = computed(() => this._products().filter((product) => product.featured));

  readonly allReviews = computed<ProductReview[]>(() =>
    this._products().flatMap((product) =>
      product.reviews.map((review) => ({ ...review, productId: product.id, productName: product.name })),
    ),
  );
}
