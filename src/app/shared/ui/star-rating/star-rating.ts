import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  template: `
    <span class="star-rating" role="img" [attr.aria-label]="ratingLabel()">
      <span aria-hidden="true" class="stars">
        @for (star of stars(); track $index) {
          <span class="star" [class.filled]="star">★</span>
        }
      </span>
      @if (reviewCount() > 0) {
        <span class="count" aria-hidden="true">({{ reviewCount() }})</span>
      }
    </span>
  `,
  styles: `
    .star-rating {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
    }
    .stars {
      display: inline-flex;
      color: var(--color-border, #e6dcdf);
      font-size: 1rem;
      letter-spacing: 1px;
    }
    .star.filled {
      color: var(--color-accent, #caa14a);
    }
    .count {
      font-size: 0.8125rem;
      color: var(--color-text-muted, #6b5c66);
    }
  `,
})
export class StarRating {
  readonly rating = input.required<number>();
  readonly reviewCount = input<number>(0);

  protected readonly stars = computed(() => {
    const rounded = Math.round(this.rating());
    return Array.from({ length: 5 }, (_, index) => index < rounded);
  });

  protected readonly ratingLabel = computed(() => {
    const rating = this.rating();
    const count = this.reviewCount();
    const ratingText = `${rating.toFixed(1)} / 5 yıldız`;
    return count > 0 ? `${ratingText} (${count} değerlendirme)` : ratingText;
  });
}
