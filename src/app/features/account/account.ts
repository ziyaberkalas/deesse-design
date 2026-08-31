import { Component, inject, resource } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { OrdersService } from '../../core/services/orders.service';
import { OrderStatus } from '../../core/models/supabase.model';
import { LanguageService } from '../../core/i18n/language.service';

@Component({
  selector: 'app-account',
  imports: [DatePipe, RouterLink],
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class Account {
  private readonly auth = inject(AuthService);
  private readonly orders = inject(OrdersService);
  private readonly router = inject(Router);
  private readonly language = inject(LanguageService);

  protected readonly t = this.language.t;
  protected readonly locale = this.language.locale;

  protected readonly displayName = this.auth.displayName;
  protected readonly isAdmin = this.auth.isAdmin;

  protected readonly ordersResource = resource({
    loader: () => this.orders.getMyOrders(),
  });

  protected statusLabel(status: OrderStatus): string {
    return this.t().orderStatus[status];
  }

  protected async signOut(): Promise<void> {
    await this.auth.signOut();
    await this.router.navigateByUrl('/');
  }
}
