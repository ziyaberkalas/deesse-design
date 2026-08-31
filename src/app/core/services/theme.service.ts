import { Service, computed, effect, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'deesse-theme';

@Service()
export class ThemeService {
  private readonly _preference = signal<Theme | null>(this.readStoredPreference());
  private readonly _systemPrefersDark = signal(this.queryDarkMediaList()?.matches ?? false);

  readonly effectiveTheme = computed<Theme>(() => this._preference() ?? (this._systemPrefersDark() ? 'dark' : 'light'));

  constructor() {
    // matchMedia doesn't exist in jsdom's test environment (or truly ancient browsers) -- feature-detect
    // rather than throw, same guard style as ScrollReveal's IntersectionObserver check.
    this.queryDarkMediaList()?.addEventListener('change', (event) => {
      this._systemPrefersDark.set(event.matches);
    });

    effect(() => {
      const preference = this._preference();
      if (preference) {
        document.documentElement.setAttribute('data-theme', preference);
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    });
  }

  toggle(): void {
    const next: Theme = this.effectiveTheme() === 'dark' ? 'light' : 'dark';
    this._preference.set(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  private readStoredPreference(): Theme | null {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  }

  private queryDarkMediaList(): MediaQueryList | null {
    return typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  }
}
