// Supabase bağlantı bilgileri.
//
// Buradaki "publishable" anahtarın istemci paketine gömülmesi GÜVENLİDİR: güvenlik sınırı
// anahtarın gizliliği değil, veritabanındaki Row Level Security politikalarıdır
// (bkz. supabase/migrations/*.sql). "secret" anahtarı ASLA buraya koymayın.
export const SUPABASE_CONFIG = {
  // TODO: Supabase dashboard → Settings → API'den kendi Project URL'niz ile değiştirin
  url: 'https://dcmtzocswfhotezfkqqg.supabase.co',
  // TODO: Supabase dashboard → Settings → API Keys'ten publishable (sb_publishable_...) anahtar
  publishableKey: 'sb_publishable_Vo60gJt0AD0e4wyTknLzWQ_ft5gi7uE',
} as const;

/** Config hâlâ yer tutucu değerlerde mi? UI'da uyarı göstermek için kullanılır. */
export function isSupabaseConfigured(): boolean {
  return (
    !SUPABASE_CONFIG.url.includes('PROJE-REFERANSINIZ') &&
    !SUPABASE_CONFIG.publishableKey.includes('ANAHTARINIZ')
  );
}
