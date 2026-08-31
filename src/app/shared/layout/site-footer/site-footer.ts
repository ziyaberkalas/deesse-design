import { Component, computed, inject } from '@angular/core';
import { SITE_CONFIG } from '../../../core/config/site-config';
import { WhatsappCtaButton } from '../../ui/whatsapp-cta-button/whatsapp-cta-button';
import { LanguageService } from '../../../core/i18n/language.service';

@Component({
  selector: 'app-site-footer',
  imports: [WhatsappCtaButton],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.css',
})
export class SiteFooter {
  private readonly language = inject(LanguageService);

  protected readonly t = this.language.t;
  protected readonly siteConfig = SITE_CONFIG;
  protected readonly year = new Date().getFullYear();

  protected readonly tagline = computed(() =>
    this.language.lang() === 'en' ? SITE_CONFIG.taglineEn : SITE_CONFIG.tagline,
  );
}
