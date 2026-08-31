import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { LanguageService } from '../../core/i18n/language.service';
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
  private readonly language = inject(LanguageService);

  protected readonly t = this.language.t;
  protected readonly siteConfig = SITE_CONFIG;
  protected readonly featuredProducts = this.productsService.featuredProducts;
  protected readonly instagramPosts = INSTAGRAM_TEASER_POSTS;

  protected readonly tagline = computed(() =>
    this.language.lang() === 'en' ? SITE_CONFIG.taglineEn : SITE_CONFIG.tagline,
  );

  /** İngilizce karşılığı girilmemiş rakamlar Türkçesiyle görünür. */
  protected readonly stats = computed(() => {
    const english = this.language.lang() === 'en';
    return TRUST_STATS.map((stat) => ({
      value: english ? stat.valueEn ?? stat.value : stat.value,
      label: english ? stat.labelEn ?? stat.label : stat.label,
    }));
  });
}
