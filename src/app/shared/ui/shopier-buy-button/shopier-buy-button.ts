import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { SITE_CONFIG } from '../../../core/config/site-config';
import { LanguageService } from '../../../core/i18n/language.service';

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
  private readonly language = inject(LanguageService);

  readonly product = input<Product | undefined>(undefined);
  /** Belirtilmezse aktif dildeki varsayılan metin kullanılır. */
  readonly label = input<string | undefined>(undefined);

  protected readonly labelText = computed(() => this.label() ?? this.language.t().shopier.buy);

  protected readonly href = computed(() => this.product()?.shopierUrl || SITE_CONFIG.shopier.shopUrl);
}
