-- Déesse Design — 1/3: profiles tablosu, admin yardımcı fonksiyonu, yeni kullanıcı trigger'ı
-- Bu dosyaları Supabase dashboard'daki SQL Editor'de SIRAYLA çalıştırın.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  phone text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Admin panelindeki "siparişi hangi müşteriye bağlayacağım" arayışı telefon numarasıyla yapılır.
create index profiles_phone_idx on public.profiles (phone);

-- security definer: "profiles politikası profiles'ı sorguluyor" özyinelemesini kırar; fonksiyon
-- sahibinin yetkileriyle çalışır ve bu tek sorgu için profiles'ın kendi RLS'ini atlar.
-- set search_path = '' ise security definer fonksiyonlardaki standart search_path ele geçirme
-- açığını kapatır.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    (select p.is_admin from public.profiles p where p.id = (select auth.uid())),
    false
  );
$$;

create policy "profiles_select_own" on public.profiles
  for select using (id = (select auth.uid()));

-- Admin panelinin müşteri arama kutusunun tüm profilleri görebilmesi için.
create policy "profiles_select_admin_all" on public.profiles
  for select using (public.is_admin());

-- Bu aşamada normal kullanıcılar için insert/update politikası YOK:
-- profiller yalnızca aşağıdaki trigger ile oluşur (istemci kodu asla doğrudan yazmaz) ve
-- henüz "profilimi düzenle" sayfası istenmedi. is_admin böylece istemciden ASLA
-- değiştirilemez — sömürülebilecek bir update politikası hiç var olmadığı için.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, phone)
  values (
    new.id,
    new.raw_user_meta_data ->> 'display_name',
    new.raw_user_meta_data ->> 'phone'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
