import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SITE_CONFIG } from '../../../core/config/site-config';
import { MobileMenuStateService } from '../mobile-menu-state.service';
import { ThemeService } from '../../../core/services/theme.service';
import { FavoritesService } from '../../../core/services/favorites.service';
import { AuthService } from '../../../core/services/auth.service';
import { LanguageService } from '../../../core/i18n/language.service';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.html',
  styleUrl: './site-header.css',
})
export class SiteHeader {
  private readonly menuState = inject(MobileMenuStateService);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly theme = inject(ThemeService);
  protected readonly favorites = inject(FavoritesService);
  protected readonly auth = inject(AuthService);
  protected readonly language = inject(LanguageService);
  protected readonly t = this.language.t;

  protected readonly siteConfig = SITE_CONFIG;
  protected readonly menuOpen = this.menuState.open;
  protected readonly scrolled = signal(false);

  constructor() {
    afterNextRender(() => {
      let ticking = false;

      const onScroll = () => {
        if (ticking) {
          return;
        }
        ticking = true;
        requestAnimationFrame(() => {
          this.scrolled.set(window.scrollY > 32);
          ticking = false;
        });
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      this.destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }

  protected toggleMenu(): void {
    this.menuState.toggle();
  }

  protected closeMenu(): void {
    this.menuState.setOpen(false);
  }
}
