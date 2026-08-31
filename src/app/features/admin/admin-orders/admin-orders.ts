import { Component, computed, inject, resource, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { OrdersService } from '../../../core/services/orders.service';
import { ProductsService } from '../../../core/services/products.service';
import { OrderStatus, Profile } from '../../../core/models/supabase.model';
import { LanguageService } from '../../../core/i18n/language.service';

@Component({
  selector: 'app-admin-orders',
  imports: [DatePipe],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.css',
})
export class AdminOrders {
  private readonly ordersService = inject(OrdersService);
  private readonly productsService = inject(ProductsService);
  private readonly language = inject(LanguageService);

  protected readonly t = this.language.t;
  protected readonly locale = this.language.locale;

  protected readonly products = this.productsService.products;

  protected readonly ordersResource = resource({
    loader: () => this.ordersService.listAllOrders(),
  });

  // --- Müşteri arama ---
  protected readonly customerQuery = signal('');
  protected readonly customerResults = signal<Profile[]>([]);
  protected readonly searching = signal(false);
  protected readonly selectedCustomer = signal<Profile | null>(null);

  // --- Yeni sipariş formu ---
  protected readonly selectedProductId = signal('');
  protected readonly saving = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly successMessage = signal<string | null>(null);

  protected readonly canCreate = computed(
    () => !this.saving() && this.selectedCustomer() !== null && this.selectedProductId() !== '',
  );

  protected statusLabel(status: OrderStatus): string {
    return this.t().orderStatus[status];
  }

  protected onQueryInput(event: Event): void {
    this.customerQuery.set((event.target as HTMLInputElement).value);
  }

  protected onProductChange(event: Event): void {
    this.selectedProductId.set((event.target as HTMLSelectElement).value);
  }

  protected async searchCustomers(): Promise<void> {
    const query = this.customerQuery().trim();
    if (query.length < 2) {
      this.errorMessage.set(this.t().adminOrders.minTwoChars);
      return;
    }
    this.searching.set(true);
    this.errorMessage.set(null);
    try {
      this.customerResults.set(await this.ordersService.searchCustomers(query));
    } catch (error) {
      this.errorMessage.set(error instanceof Error ? error.message : this.t().adminOrders.searchFailed);
    } finally {
      this.searching.set(false);
    }
  }

  protected selectCustomer(customer: Profile): void {
    this.selectedCustomer.set(customer);
    this.customerResults.set([]);
  }

  protected async createOrder(): Promise<void> {
    const customer = this.selectedCustomer();
    const product = this.products().find((p) => p.id === this.selectedProductId());
    if (!customer || !product) {
      return;
    }

    this.saving.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);
    try {
      await this.ordersService.createOrderForCustomer(customer.id, product.id, product.name);
      this.successMessage.set(
        this.t().adminOrders.createdMessage(
          product.name,
          customer.display_name ?? this.t().adminOrders.toCustomerFallback,
        ),
      );
      this.selectedProductId.set('');
      this.ordersResource.reload();
    } catch (error) {
      this.errorMessage.set(error instanceof Error ? error.message : this.t().adminOrders.createFailed);
    } finally {
      this.saving.set(false);
    }
  }

  protected async confirmOrder(orderId: string): Promise<void> {
    this.errorMessage.set(null);
    try {
      await this.ordersService.confirmOrder(orderId);
      this.ordersResource.reload();
    } catch (error) {
      this.errorMessage.set(error instanceof Error ? error.message : this.t().adminOrders.confirmFailed);
    }
  }
}
