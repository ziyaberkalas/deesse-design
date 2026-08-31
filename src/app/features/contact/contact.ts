import { Component, inject } from '@angular/core';
import { SITE_CONFIG } from '../../core/config/site-config';
import { WhatsappCtaButton } from '../../shared/ui/whatsapp-cta-button/whatsapp-cta-button';
import { LanguageService } from '../../core/i18n/language.service';

@Component({
  selector: 'app-contact',
  imports: [WhatsappCtaButton],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  protected readonly t = inject(LanguageService).t;
  protected readonly siteConfig = SITE_CONFIG;
}
