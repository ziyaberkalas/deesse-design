import { Service, inject } from '@angular/core';
import { SupabaseClientService } from './supabase-client.service';
import { AdminOrderRow, OrderRecord, Profile } from '../models/supabase.model';

@Service()
export class OrdersService {
  private readonly supabase = inject(SupabaseClientService);

  /**
   * Giriş yapmış kullanıcının kendi siparişleri.
   * Dikkat: burada .eq('user_id', ...) filtresi YOK — orders_select_own RLS politikası
   * sorguyu zaten çağıranın kendi satırlarıyla sınırlar. Güvenlik istemcide değil, veritabanında.
   */
  async getMyOrders(): Promise<OrderRecord[]> {
    const client = await this.supabase.getClient();
    const { data, error } = await client
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .returns<OrderRecord[]>();
    if (error) {
      throw new Error(error.message);
    }
    return data ?? [];
  }

  /**
   * Tüm siparişler + müşteri profili (PostgREST ilişki gömme).
   * Tüm satırların dönmesinin tek sebebi çağıranın is_admin olması ve
   * orders_select_admin_all politikasının devreye girmesidir.
   */
  async listAllOrders(): Promise<AdminOrderRow[]> {
    const client = await this.supabase.getClient();
    const { data, error } = await client
      .from('orders')
      .select('*, profiles(display_name, phone)')
      .order('created_at', { ascending: false })
      .returns<AdminOrderRow[]>();
    if (error) {
      throw new Error(error.message);
    }
    return data ?? [];
  }

  /**
   * Müşteri arama (admin). auth.users istemciden hiç sorgulanamadığı için müşteri yalnızca
   * profiles üzerinden bulunur — yani müşterinin ÖNCE siteye kayıt olmuş olması gerekir.
   * WhatsApp siparişi doğal olarak telefonla tanımlı olduğu için arama telefon/isim üzerinden.
   */
  async searchCustomers(query: string): Promise<Profile[]> {
    const client = await this.supabase.getClient();
    const term = `%${query.trim()}%`;
    const { data, error } = await client
      .from('profiles')
      .select('*')
      .or(`phone.ilike.${term},display_name.ilike.${term}`)
      .limit(20)
      .returns<Profile[]>();
    if (error) {
      throw new Error(error.message);
    }
    return data ?? [];
  }

  /** Sipariş oluşturur (status varsayılan olarak 'pending'). Yalnızca admin — RLS gereği. */
  async createOrderForCustomer(
    customerProfileId: string,
    productId: string,
    productName: string,
  ): Promise<void> {
    const client = await this.supabase.getClient();
    const { error } = await client.from('orders').insert({
      user_id: customerProfileId,
      product_id: productId,
      product_name: productName,
    });
    if (error) {
      throw new Error(error.message);
    }
  }

  /** Siparişi onaylar — müşterinin o ürüne yorum yazma hakkını açan tek işlem. */
  async confirmOrder(orderId: string): Promise<void> {
    const client = await this.supabase.getClient();
    const { error } = await client
      .from('orders')
      .update({ status: 'confirmed', confirmed_at: new Date().toISOString() })
      .eq('id', orderId);
    if (error) {
      throw new Error(error.message);
    }
  }
}
