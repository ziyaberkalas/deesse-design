import { Component, computed, input } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { SITE_CONFIG } from '../../../core/config/site-config';

/**
 * Satın alma butonu. Satış Shopier üzerinden yürüdüğü için ürün detayında birincil eylem budur;
 * WhatsApp artık yalnızca iletişim kanalı (footer, iletişim sayfası, sabit baloncuk).
 *
 * Ürünün kendi Shopier linki yoksa mağaza köküne düşer -- ürün linkleri henüz girilmediği için
 * bu bir geçici durum değil, kalıcı bir emniyet: yanlış/boş bir link yerine hep çalışan bir hedef.
 */
@Component({
  selector: 'app-shopier-buy-button',
  templateUrl: './shopier-buy-button.html',
  styleUrl: './shopier-buy-button.css',
})
export class ShopierBuyButton {
  readonly product = input<Product | undefined>(undefined);
  readonly label = input<string>('Shopier’den Satın Al');

  protected readonly href = computed(() => this.product()?.shopierUrl || SITE_CONFIG.shopier.shopUrl);
}
