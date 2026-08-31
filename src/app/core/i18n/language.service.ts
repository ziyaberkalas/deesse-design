import { Service, computed, effect, signal } from '@angular/core';
import { EN, TR, Translations } from './translations';

export type Lang = 'tr' | 'en';

const STORAGE_KEY = 'deesse-lang';

/** Paylaşılabilir link için: /urunler?lang=en doğrudan İngilizce açılır. */
const QUERY_PARAM = 'lang';

export function isLang(value: string | null): value is Lang {
  return value === 'tr' || value === 'en';
}

/**
 * Dil durumu. ThemeService ile aynı kalıpta: sinyal + localStorage + <html> özniteliği.
 *
 * Derleme zamanlı `@angular/localize` yerine çalışma zamanı sözlüğü seçildi; site statik bir
 * SPA olduğu için dil başına ayrı build + sunucu yönlendirmesi kurmak yerine tek bundle'da
 * anında geçiş yapılıyor, ürün verisi de aynı mekanizmadan geçebiliyor.
 */
@Service()
export class LanguageService {
  private readonly _lang = signal<Lang>(this.detectInitialLanguage());

  readonly lang = this._lang.asReadonly();

  /** Şablonlarda `t().bolum.anahtar` şeklinde kullanılır. */
  readonly t = computed<Translations>(() => (this._lang() === 'en' ? EN : TR));

  /**
   * date/currency pipe'larına son argüman olarak geçilir. LOCALE_ID sağlayıcısı bootstrap'ta
   * sabitlenir ve sonradan değiştirilemez; pipe'ın locale parametresi ise her değişimde
   * yeniden değerlendiği için sayfa yenilemeden doğru biçimi verir.
   */
  readonly locale = computed(() => (this._lang() === 'en' ? 'en-US' : 'tr'));

  /**
   * currency pipe'ına `display` olarak geçilir. Fiyatlar her iki dilde de TL'dir (satış
   * Shopier üzerinden lira ile yapılıyor); değişen yalnızca gösterim:
   *  - Türkçe: "₺4.200" -- sembol yerli okura zaten tanıdık.
   *  - İngilizce: "TRY 4.200" -- yurt dışındaki bir müşteri ₺ sembolünü tanımayabilir ve
   *    tutarı dolar/euro sanabilir; ISO kodu bu belirsizliği kaldırır.
   * Angular'ın en-US kalıbı sembolü boşluksuz eklediği için boşluk kodun içinde veriliyor.
   */
  readonly currencyDisplay = computed(() => (this._lang() === 'en' ? 'TRY ' : '₺'));

  constructor() {
    // ?lang= ile gelen tercih kalıcılaştırılır. Aksi hâlde İngilizce bir link üzerinden gelen
    // ziyaretçi siteyi gezerken parametreyi kaybeder (routerLink query param taşımaz) ve
    // sayfayı yenilediğinde Türkçeye düşerdi.
    const fromUrl = new URLSearchParams(window.location.search).get(QUERY_PARAM);
    if (isLang(fromUrl)) {
      localStorage.setItem(STORAGE_KEY, fromUrl);
    }

    effect(() => {
      // Ekran okuyucular telaffuzu bu öznitelikten seçer; dil değişince güncellenmesi şart.
      document.documentElement.lang = this._lang();
    });
  }

  setLanguage(lang: Lang): void {
    this._lang.set(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }

  toggle(): void {
    this.setLanguage(this._lang() === 'tr' ? 'en' : 'tr');
  }

  /**
   * Öncelik: ?lang= (paylaşılan link kazanır) → kaydedilmiş tercih → Türkçe.
   *
   * Tarayıcı dili (navigator.language) bilerek KULLANILMIYOR: Türkiye'de telefonunu İngilizce
   * kullanan çok sayıda kişi var; onlara Türkçe siteyi İngilizce açmak, asıl hedef kitleyi
   * yanlış dile düşürürdü. İngilizce bir tercih, tesadüfi bir ayar değil.
   */
  private detectInitialLanguage(): Lang {
    const fromUrl = new URLSearchParams(window.location.search).get(QUERY_PARAM);
    if (isLang(fromUrl)) {
      return fromUrl;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    return isLang(stored) ? stored : 'tr';
  }
}
