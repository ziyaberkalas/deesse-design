export interface Stat {
  value: string;
  label: string;
}

// TODO: gerçek rakamlarınızla güncelleyin
export const TRUST_STATS: Stat[] = [
  { value: '%100', label: 'El Yapımı Üretim' },
  { value: 'Tasarımcı', label: 'İmzalı Koleksiyon' },
  { value: 'Özenli', label: 'Malzeme Seçimi' },
];
