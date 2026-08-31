import { Injectable, effect, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { LanguageService } from './language.service';
import { Translations } from './translations';
import { SITE_CONFIG } from '../config/site-config';

type TitleKey = keyof Translations['pageTitles'];

/**
 * Sayfa başlığını aktif dilde kurar.
 *
 * Rotalarda sabit `title` yerine `data.titleKey` tutulur; çeviri burada yapılır. Anahtar bir
 * sinyalde saklandığı için başlık iki durumda da güncellenir: gezinme olduğunda (updateTitle)
 * ve dil değiştiğinde (effect) -- ikincisi olmasaydı dili değiştiren kullanıcının sekmesinde
 * eski dildeki başlık asılı kalırdı.
 */
@Injectable()
export class TranslatedTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly language = inject(LanguageService);

  private readonly titleKey = signal<TitleKey | null>(null);

  /**
   * Sözlükte karşılığı olmayan, çalışma zamanında belirlenen başlıklar için (ürün detayı:
   * başlık ürünün adı). Ayrı bir sinyal olması şart: strateji ile bileşen aynı document.title'ı
   * iki ayrı effect'ten yazsaydı hangisinin son yazdığı gezinme sırasına göre değişirdi.
   */
  private readonly customTitle = signal<string | null>(null);

  constructor() {
    super();
    effect(() => {
      const custom = this.customTitle();
      const key = this.titleKey();
      const titles = this.language.t().pageTitles;

      const heading = custom ?? (key ? titles[key] : null);
      this.title.setTitle(heading ? `${heading} | ${SITE_CONFIG.siteName}` : SITE_CONFIG.siteName);
    });
  }

  /** Bileşenden çağrılır; sayfadan ayrılırken null verilerek temizlenmelidir. */
  setCustomTitle(heading: string | null): void {
    this.customTitle.set(heading);
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    // Her gezinmede sıfırlanır: önceki sayfanın özel başlığı yenisine sızmasın.
    this.customTitle.set(null);
    this.titleKey.set(this.findTitleKey(snapshot.root));
  }

  /** En derindeki eşleşen rotanın anahtarı kazanır (çocuk rota ebeveyni ezer). */
  private findTitleKey(route: ActivatedRouteSnapshot): TitleKey | null {
    let key = (route.data['titleKey'] as TitleKey | undefined) ?? null;
    for (const child of route.children) {
      key = this.findTitleKey(child) ?? key;
    }
    return key;
  }
}
