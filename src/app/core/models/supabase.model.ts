// Veritabanı satırlarının birebir karşılıkları. PostgREST JSON anahtarlarını sütun adlarıyla
// aynı döndürdüğü için alan adları snake_case bırakıldı.

export interface Profile {
  id: string;
  display_name: string | null;
  phone: string | null;
  is_admin: boolean;
  created_at: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'cancelled';

export interface OrderRecord {
  id: string;
  user_id: string;
  product_id: string;
  product_name: string;
  status: OrderStatus;
  created_at: string;
  confirmed_at: string | null;
}

/** Admin listesi siparişe müşteri profilini gömerek çeker (PostgREST ilişki gömme). */
export interface AdminOrderRow extends OrderRecord {
  profiles: Pick<Profile, 'display_name' | 'phone'> | null;
}

export interface ReviewRecord {
  id: string;
  order_id: string;
  user_id: string;
  product_id: string;
  author_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

/** Ürün detay sayfasındaki yorum formunun hangi durumda gösterileceğini belirler. */
export type ReviewEligibility =
  | { status: 'eligible'; orderId: string }
  | { status: 'no-confirmed-order' }
  | { status: 'already-reviewed' };
