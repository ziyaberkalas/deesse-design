-- TEK SEFERLİK: kostüm dönemine ait test siparişlerini ve yorumlarını siler.
--
-- Supabase dashboard → SQL Editor → New query → bu dosyayı yapıştırın → Run.
--
-- Ürün kataloğu tamamen değiştiği için eski kayıtlardaki product_id'ler artık hiçbir ürüne
-- karşılık gelmiyor; "Hesabım" sayfasında var olmayan bir ürün görünmesin diye temizleniyor.
--
-- Hesabınız, profiliniz ve is_admin yetkiniz KORUNUR -- yalnızca sipariş/yorum satırları silinir.
-- reviews önce siliniyor: orders'a foreign key ile bağlı.

delete from public.reviews;
delete from public.orders;
