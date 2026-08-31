import { Service, inject } from '@angular/core';
import { SITE_CONFIG } from '../config/site-config';
import { LanguageService } from '../i18n/language.service';

/**
 * WhatsApp artık yalnızca bir iletişim kanalı -- satın alma Shopier üzerinden yürüyor
 * (bkz. ShopierBuyButton). Bu yüzden ürüne özel sipariş linki üreten metot kaldırıldı.
 */
@Service()
export class WhatsappService {
  private readonly language = inject(LanguageService);

  /**
   * Hazır mesaj aktif dilde yazılır: İngilizce gezinen bir ziyaretçinin sohbeti İngilizce
   * açılır, böylece atölye de karşısındakinin hangi dilde yazdığını baştan görür.
   */
  buildGeneralInquiryLink(customMessage?: string): string {
    const message = customMessage?.trim() || this.language.t().whatsapp.defaultInquiry;
    return `https://wa.me/${SITE_CONFIG.whatsapp.phoneE164}?text=${encodeURIComponent(message)}`;
  }
}
