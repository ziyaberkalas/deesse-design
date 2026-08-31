import { Service } from '@angular/core';
import { SITE_CONFIG } from '../config/site-config';

/**
 * WhatsApp artık yalnızca bir iletişim kanalı -- satın alma Shopier üzerinden yürüyor
 * (bkz. ShopierBuyButton). Bu yüzden ürüne özel sipariş linki üreten metot kaldırıldı.
 */
@Service()
export class WhatsappService {
  buildGeneralInquiryLink(customMessage?: string): string {
    const message = customMessage?.trim() || 'Merhaba, koleksiyonunuz hakkında bilgi almak istiyorum.';
    return `https://wa.me/${SITE_CONFIG.whatsapp.phoneE164}?text=${encodeURIComponent(message)}`;
  }
}
