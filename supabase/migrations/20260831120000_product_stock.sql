-- Déesse Design — 4/4: ürün stok takibi
-- Bu dosyayı Supabase dashboard → SQL Editor'de bir kez çalıştırın.
--
-- Neden veritabanında: stok admin panelinden değiştirilebilmeli. Ürün kataloğu
-- (products.data.ts) koda gömülü statik veri olduğu için orada tutulsaydı her stok
-- değişikliğinde kodu düzenleyip siteyi yeniden yayınlamak gerekirdi.

create table public.product_stock (
  -- products.data.ts içindeki Product.id'nin kopyası. Katalog veritabanında olmadığı için
  -- foreign key kurulamıyor; eşleşme uygulama tarafında yapılır.
  product_id text primary key,
  stock integer not null default 0 check (stock >= 0),
  updated_at timestamptz not null default now()
);

alter table public.product_stock enable row level security;

-- Stok bilgisi vitrinin parçası; herkes okuyabilmeli (giriş yapmamış ziyaretçi dahil).
create policy "product_stock_select_all" on public.product_stock
  for select using (true);

-- Yazma yalnızca yöneticide. is_admin() 1. migration'da tanımlandı.
create policy "product_stock_insert_admin" on public.product_stock
  for insert with check (public.is_admin());

create policy "product_stock_update_admin" on public.product_stock
  for update using (public.is_admin()) with check (public.is_admin());

create policy "product_stock_delete_admin" on public.product_stock
  for delete using (public.is_admin());

-- NOT: Buraya satırı olmayan ürünün stoğu "bilinmiyor" sayılır -- sitede hiçbir rozet
-- gösterilmez ve satın alma butonu normal çalışır. Böylece özellik ürün başına isteğe
-- bağlı olur; tablo boşken site bugünkü davranışını aynen sürdürür.
-- Stok takibi başlatmak için ürünü yönetim panelinden ekleyin.
