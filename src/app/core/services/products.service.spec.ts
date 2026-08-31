import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsService);
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
});
