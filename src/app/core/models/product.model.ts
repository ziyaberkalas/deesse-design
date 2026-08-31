export interface ProductImage {
  url: string;
  alt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  date: string;
  /** Yalnızca veritabanından gelen, onaylı siparişe dayanan yorumlarda true. */
  verified?: boolean;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  images: ProductImage[];
  /** null → fiyat sabit değildir, müşteriyle iletişime geçilerek belirlenir */
  price: number | null;
  /** Ürünün Shopier sayfası. Boşsa SITE_CONFIG.shopier.shopUrl (mağaza kökü) kullanılır. */
  shopierUrl?: string;
  featured?: boolean;
  reviews: Review[];
}
