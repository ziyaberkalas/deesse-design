import { Component, computed, inject, signal } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { StockService } from '../../../core/services/stock.service';
import { Product } from '../../../core/models/product.model';

interface StockRow {
  product: Product;
  stock: number | undefined;
}

@Component({
  selector: 'app-admin-stock',
  templateUrl: './admin-stock.html',
  styleUrl: './admin-stock.css',
})
export class AdminStock {
  private readonly productsService = inject(ProductsService);
  private readonly stockService = inject(StockService);

  protected readonly isLoading = this.stockService.isLoading;
  protected readonly errorMessage = signal<string | null>(null);
  /** Kaydetme sırasında yalnızca ilgili satırın butonlarını kilitlemek için. */
  protected readonly busyProductId = signal<string | null>(null);

  protected readonly rows = computed<StockRow[]>(() =>
    this.productsService.products().map((product) => ({
      product,
      stock: this.stockService.stockFor(product.id),
    })),
  );

  protected readonly trackedCount = computed(() => this.rows().filter((r) => r.stock !== undefined).length);

  protected async adjust(productId: string, delta: number): Promise<void> {
    await this.run(productId, () => this.stockService.adjustStock(productId, delta));
  }

  /** Takip edilmeyen ürünü 0 stokla listeye alır. */
  protected async startTracking(productId: string): Promise<void> {
    await this.run(productId, () => this.stockService.setStock(productId, 0));
  }

  protected async stopTracking(productId: string): Promise<void> {
    await this.run(productId, () => this.stockService.stopTracking(productId));
  }

  protected async onStockInput(productId: string, event: Event): Promise<void> {
    const raw = (event.target as HTMLInputElement).value;
    const value = Number(raw);
    if (raw === '' || !Number.isFinite(value) || value < 0) {
      return;
    }
    await this.run(productId, () => this.stockService.setStock(productId, Math.floor(value)));
  }

  private async run(productId: string, action: () => Promise<void>): Promise<void> {
    this.busyProductId.set(productId);
    this.errorMessage.set(null);
    try {
      await action();
    } catch (error) {
      this.errorMessage.set(error instanceof Error ? error.message : 'İşlem başarısız oldu.');
    } finally {
      this.busyProductId.set(null);
    }
  }
}
