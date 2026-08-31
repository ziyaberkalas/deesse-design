import { Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Review } from '../../../core/models/product.model';
import { StarRating } from '../star-rating/star-rating';
import { LanguageService } from '../../../core/i18n/language.service';

@Component({
  selector: 'app-review-list',
  imports: [DatePipe, StarRating],
  templateUrl: './review-list.html',
  styleUrl: './review-list.css',
})
export class ReviewList {
  private readonly language = inject(LanguageService);

  protected readonly t = this.language.t;
  protected readonly locale = this.language.locale;

  readonly reviews = input.required<Review[]>();
}
