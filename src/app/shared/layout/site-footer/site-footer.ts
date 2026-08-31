import { Component } from '@angular/core';
import { SITE_CONFIG } from '../../../core/config/site-config';
import { WhatsappCtaButton } from '../../ui/whatsapp-cta-button/whatsapp-cta-button';

@Component({
  selector: 'app-site-footer',
  imports: [WhatsappCtaButton],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.css',
})
export class SiteFooter {
  protected readonly siteConfig = SITE_CONFIG;
  protected readonly year = new Date().getFullYear();
}
