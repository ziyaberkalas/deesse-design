-- Déesse Design — 2/3: siparişler
-- Siparişler Shopier üzerinden gerçekleşir; buraya yalnızca mağaza sahibi (admin) elle kaydeder.

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  -- auth.users yerine profiles'a referans veriyoruz: profiles.id ZATEN auth.users.id
  -- (trigger sayesinde 1:1 garanti). Buraya bağlamak PostgREST'in ilişki gömme özelliğini
  -- açar (orders?select=*,profiles(display_name,phone)) — admin sipariş tablosu için gerekli.
  -- Doğrudan auth.users FK'si bunu desteklemezdi (PostgREST auth şemasına gömme yapamaz).
  user_id uuid not null references public.profiles (id) on delete cascade,
  product_id text not null,   -- statik katalogdaki Product.id'nin anlık kopyası
  product_name text not null, -- sipariş anındaki Product.name kopyası (katalog değişse de bozulmaz)
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now(),
  confirmed_at timestamptz
);

alter table public.orders enable row level security;

create index orders_user_id_idx on public.orders (user_id);
create index orders_product_id_idx on public.orders (product_id);

create policy "orders_select_own" on public.orders
  for select using (user_id = (select auth.uid()));

create policy "orders_select_admin_all" on public.orders
  for select using (public.is_admin());

create policy "orders_insert_admin_only" on public.orders
  for insert with check (public.is_admin());

create policy "orders_update_admin_only" on public.orders
  for update using (public.is_admin()) with check (public.is_admin());

-- Delete politikası bilerek yok: siparişler istemci API'si üzerinden hiç silinemez,
-- denetim izi korunur. Hatalı bir kaydı silmek gerekirse dashboard'dan yapın.

-- status için native enum yerine text + check kullanıldı: enum'u sonradan genişletmek
-- ALTER TYPE ... ADD VALUE gerektirir; check constraint tek satırlık DROP/ADD ile değişir.
