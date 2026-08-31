import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { TitleStrategy, provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { TranslatedTitleStrategy } from './core/i18n/translated-title.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions({
        skipInitialTransition: true,
        onViewTransitionCreated: ({ transition }) => {
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            transition.skipTransition();
          }
        },
      }),
    ),
    { provide: TitleStrategy, useClass: TranslatedTitleStrategy },
    // Varsayılan biçimlendirme dili. Dil değiştirilebildiği için date/currency pipe'larına
    // aktif locale ayrıca son argüman olarak geçilir (LanguageService.locale) -- LOCALE_ID
    // bootstrap'ta sabitlenir ve çalışma zamanında değiştirilemez.
    { provide: LOCALE_ID, useValue: 'tr' },
  ]
};
