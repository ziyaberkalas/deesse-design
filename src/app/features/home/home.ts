import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { SITE_CONFIG } from '../../core/config/site-config';
import { INSTAGRAM_TEASER_POSTS } from '../../core/data/instagram-posts.data';
import { TRUST_STATS } from '../../core/data/stats.data';
import { ProductCard } from '../../shared/ui/product-card/product-card';
import { InstagramEmbed } from '../../shared/ui/instagram-embed/instagram-embed';
import { TestimonialMarquee } from '../../shared/ui/testimonial-marquee/testimonial-marquee';
import { ScrollReveal } from '../../shared/ui/scroll-reveal/scroll-reveal';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductCard, InstagramEmbed, TestimonialMarquee, ScrollReveal],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly productsService = inject(ProductsService);

  protected readonly siteConfig = SITE_CONFIG;
  protected readonly featuredProducts = this.productsService.featuredProducts;
  protected readonly instagramPosts = INSTAGRAM_TEASER_POSTS;
  protected readonly stats = TRUST_STATS;
}
