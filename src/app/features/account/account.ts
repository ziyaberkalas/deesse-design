import { Component, inject, resource } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { OrdersService } from '../../core/services/orders.service';
import { OrderStatus } from '../../core/models/supabase.model';

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Onay Bekliyor',
  confirmed: 'Onaylandı',
  cancelled: 'İptal Edildi',
};

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

  protected readonly displayName = this.auth.displayName;
  protected readonly isAdmin = this.auth.isAdmin;

  protected readonly ordersResource = resource({
    loader: () => this.orders.getMyOrders(),
  });

  protected statusLabel(status: OrderStatus): string {
    return STATUS_LABELS[status];
  }

  protected async signOut(): Promise<void> {
    await this.auth.signOut();
    await this.router.navigateByUrl('/');
  }
}
