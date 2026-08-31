-- Déesse Design — 3/3: onaylı satın alma yorumları
-- Bu dosyadaki reviews_insert_own_confirmed_order politikası TÜM özelliğin güvenlik sınırıdır.
-- Angular tarafındaki guard'lar ve gizlenen formlar yalnızca kullanıcı deneyimi içindir.

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  -- UNIQUE = "bir sipariş yalnızca bir yorum üretebilir" kuralının tamamı.
  order_id uuid not null unique references public.orders (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  product_id text not null,
  -- profiles yalnızca sahibi veya admin tarafından okunabildiği için (bkz. 1. migration),
  -- yorumları herkese açık listelerken canlı join yapılamaz — isim gönderim anında kopyalanır.
  -- Bu, orders.product_name'deki "referans verme, kopyala" yaklaşımıyla aynı mantık.
  author_name text not null,
  rating smallint not null check (rating between 1 and 5),
  comment text not null check (char_length(comment) between 1 and 2000),
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;

create index reviews_product_id_idx on public.reviews (product_id);

create policy "reviews_select_all" on public.reviews
  for select using (true);

-- ASIL kural: bir yorum ancak (a) yorumu yazan kullanıcıya ait, (b) status='confirmed' olan,
-- (c) tam olarak yorumlanan ürün için verilmiş bir siparişe referans veriyorsa eklenebilir.
create policy "reviews_insert_own_confirmed_order" on public.reviews
  for insert with check (
    user_id = (select auth.uid())
    and exists (
      select 1 from public.orders o
      where o.id = order_id
        and o.user_id = (select auth.uid())
        and o.status = 'confirmed'
        and o.product_id = product_id
    )
  );

-- Normal kullanıcılar için update/delete politikası bu aşamada yok: yorumlar gönderildikten
-- sonra değiştirilemez (mevcut basit yorum arayüzüyle tutarlı). Admin moderasyonu da
-- istenmediği için eklenmedi; gerekirse `for delete using (public.is_admin())` yeterlidir.
