export interface Stat {
  value: string;
  label: string;
  /** İngilizce karşılıklar isteğe bağlı; yazılmazsa Türkçesi kullanılır. */
  valueEn?: string;
  labelEn?: string;
}

// TODO: gerçek rakamlarınızla güncelleyin
export const TRUST_STATS: Stat[] = [
  { value: '%100', label: 'El Yapımı Üretim', valueEn: '100%', labelEn: 'Handmade Production' },
  { value: 'Tasarımcı', label: 'İmzalı Koleksiyon', valueEn: 'Designer', labelEn: 'Signed Collection' },
  { value: 'Özenli', label: 'Malzeme Seçimi', valueEn: 'Curated', labelEn: 'Material Selection' },
];
