import { Service, computed, inject, resource, signal } from '@angular/core';
import { SupabaseClientService } from './supabase-client.service';
import { ProductStockRecord, StockStatus } from '../models/supabase.model';

/**
 * Adet → durum eşikleri. Servisten ayrı saf fonksiyon: hem tek doğruluk kaynağı olur
 * hem de Supabase'i taklit etmeden doğrudan test edilebilir.
 */
export function stockStatusOf(stock: number | undefined): StockStatus {
  if (stock === undefined) {
    return 'unknown';
  }
  if (stock <= 0) {
    return 'out-of-stock';
  }
  return stock === 1 ? 'last-one' : 'in-stock';
}

@Service()
export class StockService {
  private readonly supabase = inject(SupabaseClientService);

  /** Değeri artırmak stok listesini yeniden çeker (yazma işlemlerinden sonra kullanılır). */
  private readonly reloadCounter = signal(0);

  /**
   * Tüm stok satırları tek sorguda çekilir. Katalog küçük (~17 ürün) olduğu için ürün başına
   * ayrı istek atmak yerine tek seferde alıp haritaya çevirmek hem daha hızlı hem daha basit.
   */
  private readonly stockResource = resource({
    params: () => this.reloadCounter(),
    loader: () => this.fetchAll(),
  });

  readonly isLoading = this.stockResource.isLoading;

  private readonly stockMap = computed<ReadonlyMap<string, number>>(() => {
    const rows = this.stockResource.value() ?? [];
    return new Map(rows.map((row) => [row.product_id, row.stock]));
  });

  /** Takip edilmeyen ürün için undefined döner. */
  stockFor(productId: string): number | undefined {
    return this.stockMap().get(productId);
  }

  statusFor(productId: string): StockStatus {
    return stockStatusOf(this.stockFor(productId));
  }

  /** Yönetim panelinin listesi: ham satırlar. */
  readonly allStock = computed(() => this.stockResource.value() ?? []);

  reload(): void {
    this.reloadCounter.update((n) => n + 1);
  }

  /**
   * Stoğu mutlak değere ayarlar. Satır yoksa oluşturur (upsert).
   * Yalnızca yönetici -- asıl kısıt product_stock RLS politikalarında.
   */
  async setStock(productId: string, stock: number): Promise<void> {
    const client = await this.supabase.getClient();
    const { error } = await client
      .from('product_stock')
      .upsert({ product_id: productId, stock, updated_at: new Date().toISOString() });
    if (error) {
      throw new Error(error.message);
    }
    this.reload();
  }

  /**
   * Mevcut stoğu delta kadar değiştirir (+1 / -1 butonları için). 0'ın altına inmez.
   * Not: okuma ve yazma ayrı adımlar olduğu için iki yönetici aynı anda değiştirirse biri
   * diğerinin üzerine yazabilir. Tek kişilik bir atölye için kabul edilebilir; sorun olursa
   * bunu bir Postgres fonksiyonuna (atomik update) taşımak gerekir.
   */
  async adjustStock(productId: string, delta: number): Promise<void> {
    const current = this.stockFor(productId) ?? 0;
    await this.setStock(productId, Math.max(0, current + delta));
  }

  /** Ürünü stok takibinden tamamen çıkarır (rozetler kaybolur, satın alma normale döner). */
  async stopTracking(productId: string): Promise<void> {
    const client = await this.supabase.getClient();
    const { error } = await client.from('product_stock').delete().eq('product_id', productId);
    if (error) {
      throw new Error(error.message);
    }
    this.reload();
  }

  private async fetchAll(): Promise<ProductStockRecord[]> {
    try {
      const client = await this.supabase.getClient();
      const { data, error } = await client
        .from('product_stock')
        .select('*')
        .returns<ProductStockRecord[]>();
      if (error) {
        throw new Error(error.message);
      }
      return data ?? [];
    } catch {
      // Supabase erişilemiyorsa stok "bilinmiyor" kalır: rozet çıkmaz, satın alma engellenmez.
      // Vitrinin çalışmaya devam etmesi, stok bilgisini göstermekten daha önemli.
      return [];
    }
  }
}
