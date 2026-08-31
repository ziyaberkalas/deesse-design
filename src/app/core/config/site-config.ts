export const SITE_CONFIG = {
  siteName: 'Déesse Design',
  tagline: 'Kadınların zamansız zarafetinden ilham alan el yapımı çantalar',
  /** Markanın kendi Instagram biyografisindeki İngilizce ifade. */
  taglineEn: 'Exquisitely handcrafted pieces inspired by the timeless elegance of women',
  designer: 'Tuğba Ceylan',

  whatsapp: {
    // TODO: Déesse için doğru WhatsApp numarasıyla değiştirin (görüntülenecek hâli)
    phoneDisplay: '+90 5XX XXX XX XX',
    // TODO: aynı numara — ülke kodu dahil, boşluksuz, başında + veya 0 olmadan
    phoneE164: '905XXXXXXXXX',
  },

  instagram: {
    handle: '@deesse_design_',
    url: 'https://www.instagram.com/deesse_design_/',
  },

  shopier: {
    // Satın almalar buraya yönlenir. Ürünün kendi linki yoksa (products.data.ts → shopierUrl)
    // mağaza köküne düşülür.
    shopUrl: 'https://www.shopier.com/DeesseDesinger',
  },

  // TODO: Déesse için doğru e-posta adresiyle değiştirin
  contactEmail: 'info@deessedesign.example',
} as const;
