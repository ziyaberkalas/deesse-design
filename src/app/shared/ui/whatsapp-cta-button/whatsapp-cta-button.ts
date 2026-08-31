import { Component, computed, inject, input } from '@angular/core';
import { WhatsappService } from '../../../core/services/whatsapp.service';
import { LanguageService } from '../../../core/i18n/language.service';

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
  private readonly language = inject(LanguageService);

  /** Belirtilmezse aktif dildeki varsayılan metin kullanılır. */
  readonly label = input<string | undefined>(undefined);
  /** Belirtilirse WhatsApp mesajı bununla önden doldurulur. */
  readonly message = input<string | undefined>(undefined);

  protected readonly labelText = computed(() => this.label() ?? this.language.t().whatsapp.writeUs);

  protected readonly href = computed(() => this.whatsapp.buildGeneralInquiryLink(this.message()));
}
