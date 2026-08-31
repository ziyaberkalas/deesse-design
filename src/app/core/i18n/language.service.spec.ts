import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';
import { EN, TR } from './translations';

/** Her testin temiz bir servisle başlaması için: sinyal durumu kurucuda okunuyor. */
function createService(): LanguageService {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({});
  return TestBed.inject(LanguageService);
}

describe('LanguageService', () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.replaceState({}, '', '/');
  });

  it('varsayılan dil Türkçedir', () => {
    expect(createService().lang()).toBe('tr');
  });

  it('kaydedilmiş tercihi geri yükler', () => {
    localStorage.setItem('deesse-lang', 'en');
    expect(createService().lang()).toBe('en');
  });

  it('bozuk kaydedilmiş değeri yok sayar', () => {
    localStorage.setItem('deesse-lang', 'de');
    expect(createService().lang()).toBe('tr');
  });

  it('?lang= parametresi kaydedilmiş tercihi ezer -- paylaşılan link kazanmalı', () => {
    localStorage.setItem('deesse-lang', 'tr');
    window.history.replaceState({}, '', '/urunler?lang=en');
    expect(createService().lang()).toBe('en');
  });

  it('?lang= ile gelen tercih saklanır -- gezinince parametre düşse de dil korunmalı', () => {
    window.history.replaceState({}, '', '/urunler?lang=en');
    createService();
    expect(localStorage.getItem('deesse-lang')).toBe('en');

    // Parametresiz yeni bir ziyaret: dil hâlâ İngilizce olmalı.
    window.history.replaceState({}, '', '/urunler');
    expect(createService().lang()).toBe('en');
  });

  it('toggle dili değiştirir ve tercihi saklar', () => {
    const service = createService();

    service.toggle();
    expect(service.lang()).toBe('en');
    expect(localStorage.getItem('deesse-lang')).toBe('en');

    service.toggle();
    expect(service.lang()).toBe('tr');
  });

  it('t() aktif dilin sözlüğünü döndürür', () => {
    const service = createService();
    expect(service.t().nav.home).toBe(TR.nav.home);

    service.setLanguage('en');
    expect(service.t().nav.home).toBe(EN.nav.home);
  });

  it('locale() tarih/para biçimlendirmesi için doğru kodu verir', () => {
    const service = createService();
    expect(service.locale()).toBe('tr');

    service.setLanguage('en');
    expect(service.locale()).toBe('en-US');
  });
});

describe('çeviri sözlükleri', () => {
  /**
   * Eksik anahtar zaten derleme hatası verir (EN, TR'den tip türetir). Bu test onun yakalayamadığı
   * iki durumu kovalar: fazladan/adı değişmiş bölüm ve yanlışlıkla boş bırakılmış metin.
   */
  it('TR ve EN aynı anahtar yapısına sahiptir', () => {
    const shape = (dict: object): string[] =>
      Object.entries(dict)
        .flatMap(([section, keys]) => Object.keys(keys as object).map((key) => `${section}.${key}`))
        .sort();

    expect(shape(EN)).toEqual(shape(TR));
  });

  it('hiçbir çeviri boş değildir', () => {
    for (const [section, keys] of Object.entries(EN)) {
      for (const [key, value] of Object.entries(keys as Record<string, unknown>)) {
        if (typeof value === 'string') {
          expect(value.trim(), `EN.${section}.${key} boş`).not.toBe('');
        }
      }
    }
  });

  it('İngilizce sözlükte Türkçeye özgü harf kalmamıştır (çevrilmeyi unutulan metin)', () => {
    const turkishOnly = /[ğĞışŞİ]/;
    // nav.switchLanguage bilinçli olarak Türkçe: butonun İngilizce hâli Türkçeye dönüşü anlatır.
    const intentionallyTurkish = new Set(['nav.switchLanguage']);

    for (const [section, keys] of Object.entries(EN)) {
      for (const [key, value] of Object.entries(keys as Record<string, unknown>)) {
        if (typeof value === 'string' && !intentionallyTurkish.has(`${section}.${key}`)) {
          expect(turkishOnly.test(value), `EN.${section}.${key} çevrilmemiş görünüyor: "${value}"`).toBe(
            false,
          );
        }
      }
    }
  });
});
