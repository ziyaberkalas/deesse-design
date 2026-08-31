import { Component, computed, inject, input } from '@angular/core';
import { WhatsappService } from '../../../core/services/whatsapp.service';

/**
 * İletişim butonu. Satın alma Shopier'e taşındığı için ürüne özel sipariş bağlantısı üretmez;
 * her zaman genel iletişim mesajını açar.
 */
@Component({
  selector: 'app-whatsapp-cta-button',
  templateUrl: './whatsapp-cta-button.html',
  styleUrl: './whatsapp-cta-button.css',
})
export class WhatsappCtaButton {
  private readonly whatsapp = inject(WhatsappService);

  readonly label = input<string>('WhatsApp’tan Yazın');
  /** Belirtilirse WhatsApp mesajı bununla önden doldurulur. */
  readonly message = input<string | undefined>(undefined);

  protected readonly href = computed(() => this.whatsapp.buildGeneralInquiryLink(this.message()));
}
