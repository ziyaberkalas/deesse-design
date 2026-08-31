import { Component } from '@angular/core';
import { SITE_CONFIG } from '../../core/config/site-config';
import { WhatsappCtaButton } from '../../shared/ui/whatsapp-cta-button/whatsapp-cta-button';

@Component({
  selector: 'app-contact',
  imports: [WhatsappCtaButton],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  protected readonly siteConfig = SITE_CONFIG;
}
