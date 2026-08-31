import { Component, computed, effect, inject, input, resource, signal } from '@angular/core';
import { NgOptimizedImage, CurrencyPipe } from '@angular/common';
import { RouterLink, TitleStrategy } from '@angular/router';
import { TranslatedTitleStrategy } from '../../../core/i18n/translated-title.strategy';
import { FormField, form, minLength, required } from '@angular/forms/signals';
import { ProductsService } from '../../../core/services/products.service';
import { LanguageService } from '../../../core/i18n/language.service';
import { ShopierBuyButton } from '../../../shared/ui/shopier-buy-button/shopier-buy-button';
import { WhatsappCtaButton } from '../../../shared/ui/whatsapp-cta-button/whatsapp-cta-button';
import { StockBadge } from '../../../shared/ui/stock-badge/stock-badge';
import { StockService } from '../../../core/services/stock.service';
import { ReviewList } from '../../../shared/ui/review-list/review-list';
import { StarRating } from '../../../shared/ui/star-rating/star-rating';
import { StarRatingInput } from '../../../shared/ui/star-rating-input/star-rating-input';
import { FavoritesService } from '../../../core/services/favorites.service';
import { AuthService } from '../../../core/services/auth.service';
import { ReviewsService } from '../../../core/services/reviews.service';

@Component({
  selector: 'app-product-detail',
  imports: [
    NgOptimizedImage,
    CurrencyPipe,
    RouterLink,
    FormField,
    ShopierBuyButton,
    WhatsappCtaButton,
    StockBadge,
    ReviewList,
    StarRating,
    StarRatingInput,
  ],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  private readonly productsService = inject(ProductsService);
  private readonly favorites = inject(FavoritesService);
  private readonly stock = inject(StockService);
  private readonly reviewsService = inject(ReviewsService);
  private readonly language = inject(LanguageService);
  protected readonly auth = inject(AuthService);

  protected readonly t = this.language.t;
  protected readonly locale = this.language.locale;
  protected readonly currencyDisplay = this.language.currencyDisplay;

  readonly id = input.required<string>();

  protected readonly product = computed(() => this.productsService.products().find((p) => p.id === this.id()));

  constructor() {
    // Sekme başlığı ürünün adı olur ("Elegance | Déesse Design"). Ad dile göre değişebildiği
    // için effect: dil değiştirildiğinde başlık da güncellenir.
    const titleStrategy = inject(TitleStrategy);
    if (titleStrategy instanceof TranslatedTitleStrategy) {
      effect(() => titleStrategy.setCustomTitle(this.product()?.name ?? null));
    }
  }

  protected readonly categoryLabel = computed(() => {
    const product = this.product();
    return product ? this.productsService.categoryLabel(product.categoryId) : '';
  });

  protected readonly selectedImageIndex = signal(0);

  protected readonly stockStatus = computed(() => {
    const product = this.product();
    return product ? this.stock.statusFor(product.id) : 'unknown';
  });

  protected readonly isOutOfStock = computed(() => this.stockStatus() === 'out-of-stock');

  /** Stok tükendiğinde WhatsApp mesajını ürün adıyla önden doldurur. */
  protected readonly restockMessage = computed(() =>
    this.t().productDetail.restockMessage(this.product()?.name ?? ''),
  );

  protected readonly isFavorite = computed(() => {
    const product = this.product();
    return !!product && this.favorites.isFavorite(product.id);
  });

  // --- Yorumlar: statik başlangıç verisi + veritabanındaki onaylı yorumlar ---

  protected readonly reviewsResource = resource({
    params: () => this.product()?.id,
    loader: ({ params: productId }) => this.reviewsService.getReviewsForProduct(productId),
  });

  protected readonly mergedReviews = computed(() => {
    const staticReviews = this.product()?.reviews ?? [];
    const liveReviews = this.reviewsResource.value() ?? [];
    // Hem seed tarihleri ('2026-05-12') hem created_at (ISO) sözlüksel olarak sıralanabilir.
    return [...staticReviews, ...liveReviews].sort((a, b) => b.date.localeCompare(a.date));
  });

  protected readonly averageRating = computed(() => {
    const reviews = this.mergedReviews();
    if (reviews.length === 0) {
      return 0;
    }
    return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  });

  // --- Yorum yazma uygunluğu ---

  protected readonly eligibilityResource = resource({
    // params undefined dönerse loader hiç çalışmaz -- çıkış yapmış kullanıcı için sorgu yapılmaz.
    params: () => {
      const product = this.product();
      return this.auth.isLoggedIn() && product ? { productId: product.id } : undefined;
    },
    loader: ({ params }) => this.reviewsService.getEligibleOrderForReview(params.productId),
  });

  protected readonly eligibility = computed(() => this.eligibilityResource.value());

  // --- Yorum formu ---

  protected readonly reviewModel = signal({ rating: 5, comment: '' });
  // Mesajlar string değil fonksiyon: schema yalnızca bir kez kurulur, dolayısıyla sabit bir
  // metin kullanılsaydı dil değiştirildiğinde eski dilde kalırdı. Fonksiyon her doğrulamada
  // t() sinyalini okuduğu için mesaj aktif dile göre yeniden hesaplanır.
  protected readonly reviewForm = form(this.reviewModel, (schema) => {
    required(schema.comment, { message: () => this.t().review.commentRequired });
    minLength(schema.comment, 10, { message: () => this.t().review.commentMinLength });
  });

  protected readonly submitting = signal(false);
  protected readonly submitError = signal<string | null>(null);

  protected readonly canSubmitReview = computed(
    () => !this.submitting() && this.reviewForm().valid() && this.reviewModel().rating >= 1,
  );

  protected selectImage(index: number): void {
    this.selectedImageIndex.set(index);
  }

  protected toggleFavorite(): void {
    const product = this.product();
    if (product) {
      this.favorites.toggle(product.id);
    }
  }

  protected setRating(rating: number): void {
    this.reviewModel.update((model) => ({ ...model, rating }));
  }

  protected async submitReview(orderId: string): Promise<void> {
    const product = this.product();
    if (!product || !this.canSubmitReview()) {
      return;
    }

    this.submitting.set(true);
    this.submitError.set(null);

    const { rating, comment } = this.reviewModel();
    const { error } = await this.reviewsService.submitReview(orderId, product.id, rating, comment);

    this.submitting.set(false);
    if (error) {
      this.submitError.set(error);
      return;
    }

    this.reviewModel.set({ rating: 5, comment: '' });
    this.reviewsResource.reload();
    this.eligibilityResource.reload();
  }
}
