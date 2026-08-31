import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Review } from '../../../core/models/product.model';
import { StarRating } from '../star-rating/star-rating';

@Component({
  selector: 'app-review-list',
  imports: [DatePipe, StarRating],
  templateUrl: './review-list.html',
  styleUrl: './review-list.css',
})
export class ReviewList {
  readonly reviews = input.required<Review[]>();
}
