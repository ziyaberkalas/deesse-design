import { Component, inject, input } from '@angular/core';
import { StockStatus } from '../../../core/models/supabase.model';
import { LanguageService } from '../../../core/i18n/language.service';

/**
 * Stok rozeti. 'unknown' (takip edilmiyor) ve 'in-stock' (yeterli stok) durumlarında hiçbir şey
 * göstermez -- rozet yalnızca aciliyet bildiren iki durumda anlamlı.
 */
@Component({
  selector: 'app-stock-badge',
  template: `
    @if (status() === 'last-one') {
      <span class="stock-badge last-one">{{ t().stock.lastOne }}</span>
    } @else if (status() === 'out-of-stock') {
      <span class="stock-badge out">{{ t().stock.outOfStock }}</span>
    }
  `,
  styles: `
    .stock-badge {
      display: inline-block;
      font-size: 0.6875rem;
      font-weight: 700;
      letter-spacing: 0.02em;
      padding: 0.15rem var(--space-2);
      border-radius: var(--radius-sm);
      white-space: nowrap;
    }
    /* Kontrast token'ları bilerek kullanılıyor: sabit #fff iki rozette de bir temada
       AA'nın altına düşerdi (altında 2.42:1, koyu temadaki danger'da 2.28:1). */
    .last-one {
      background: var(--color-accent);
      color: var(--color-accent-contrast);
    }
    .out {
      background: var(--color-danger);
      color: var(--color-danger-contrast);
    }
  `,
})
export class StockBadge {
  protected readonly t = inject(LanguageService).t;

  readonly status = input.required<StockStatus>();
}
