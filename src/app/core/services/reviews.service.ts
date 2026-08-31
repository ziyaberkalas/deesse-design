import { Service, inject } from '@angular/core';
import { SupabaseClientService } from './supabase-client.service';
import { AuthService } from './auth.service';
import { OrderRecord, ReviewEligibility, ReviewRecord } from '../models/supabase.model';
import { Review } from '../models/product.model';
import { LanguageService } from '../i18n/language.service';

@Service()
export class ReviewsService {
  private readonly supabase = inject(SupabaseClientService);
  private readonly auth = inject(AuthService);
  private readonly language = inject(LanguageService);

  /** Bir ürünün veritabanındaki (onaylı satın almaya dayalı) yorumları. Okuma herkese açık. */
  async getReviewsForProduct(productId: string): Promise<Review[]> {
    const client = await this.supabase.getClient();
    const { data, error } = await client
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false })
      .returns<ReviewRecord[]>();
    if (error) {
      throw new Error(error.message);
    }
    return (data ?? []).map((record) => this.toReview(record));
  }

  /**
   * Kullanıcı bu ürüne yorum yazabilir mi?
   * İki küçük sorgu çekip istemcide karşılaştırıyoruz (tek bir anti-join SQL'i yerine):
   * müşteri başına birkaç satır söz konusu olduğu için basit hâli hem okunaklı hem yeterince hızlı.
   */
  async getEligibleOrderForReview(productId: string): Promise<ReviewEligibility> {
    const client = await this.supabase.getClient();
    const userId = this.auth.currentUser()?.id ?? '';

    const [ordersResult, reviewsResult] = await Promise.all([
      client
        .from('orders')
        .select('*')
        .eq('product_id', productId)
        .eq('status', 'confirmed')
        .returns<OrderRecord[]>(),
      client
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .eq('user_id', userId)
        .returns<ReviewRecord[]>(),
    ]);

    if (ordersResult.error) {
      throw new Error(ordersResult.error.message);
    }
    if (reviewsResult.error) {
      throw new Error(reviewsResult.error.message);
    }

    const confirmedOrders = ordersResult.data ?? [];
    if (confirmedOrders.length === 0) {
      return { status: 'no-confirmed-order' };
    }

    const reviewedOrderIds = new Set((reviewsResult.data ?? []).map((review) => review.order_id));
    const unreviewedOrder = confirmedOrders.find((order) => !reviewedOrderIds.has(order.id));

    return unreviewedOrder ? { status: 'eligible', orderId: unreviewedOrder.id } : { status: 'already-reviewed' };
  }

  /** Yorum gönderir. Asıl doğrulama reviews_insert_own_confirmed_order RLS politikasındadır. */
  async submitReview(
    orderId: string,
    productId: string,
    rating: number,
    comment: string,
  ): Promise<{ error: string | null }> {
    const user = this.auth.currentUser();
    if (!user) {
      return { error: this.language.t().review.mustLogIn };
    }

    const client = await this.supabase.getClient();
    const { error } = await client.from('reviews').insert({
      order_id: orderId,
      user_id: user.id,
      product_id: productId,
      // Yazarın adı veritabanına kaydedilir; bu yüzden yorumu yazdığı andaki dilin karşılığı
      // kalıcı olur -- sonradan dil değiştirilse de eski yorumun adı değişmez, doğrusu da bu.
      author_name: this.auth.displayName() || this.language.t().review.anonymousAuthor,
      rating,
      comment: comment.trim(),
    });

    return { error: error?.message ?? null };
  }

  private toReview(record: ReviewRecord): Review {
    return {
      id: record.id,
      author: record.author_name,
      // DB'de rating smallint + check(1..5); modeldeki dar birleşim tipine daraltıyoruz.
      rating: Math.min(5, Math.max(1, Math.round(record.rating))) as Review['rating'],
      comment: record.comment,
      date: record.created_at,
      verified: true,
    };
  }
}
