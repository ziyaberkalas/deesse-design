import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../../core/services/products.service';
import { StarRating } from '../star-rating/star-rating';

@Component({
  selector: 'app-testimonial-marquee',
  imports: [RouterLink, StarRating],
  templateUrl: './testimonial-marquee.html',
  styleUrl: './testimonial-marquee.css',
})
export class TestimonialMarquee {
  private readonly productsService = inject(ProductsService);

  protected readonly reviews = this.productsService.allReviews;
}
