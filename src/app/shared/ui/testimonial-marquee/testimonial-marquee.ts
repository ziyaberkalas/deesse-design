import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../../core/services/products.service';
import { StarRating } from '../star-rating/star-rating';
import { LanguageService } from '../../../core/i18n/language.service';

@Component({
  selector: 'app-testimonial-marquee',
  imports: [RouterLink, StarRating],
  templateUrl: './testimonial-marquee.html',
  styleUrl: './testimonial-marquee.css',
})
export class TestimonialMarquee {
  private readonly productsService = inject(ProductsService);

  protected readonly t = inject(LanguageService).t;
  protected readonly reviews = this.productsService.allReviews;
}
