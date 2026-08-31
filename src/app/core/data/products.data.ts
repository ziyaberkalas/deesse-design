import { Product } from '../models/product.model';

export const CATEGORY_LABELS: Record<string, string> = {
  canta: 'Çanta',
  kartlik: 'Kartlık',
  aksesuar: 'Aksesuar',
};

// Ürünler ve fiyatlar Shopier mağazasından alınmıştır.
// TODO: her ürüne kendi Shopier linkini ekleyin (shopierUrl). Boş bırakılanlar mağaza köküne yönlenir.
// TODO: SVG yer tutucuların yerine gerçek ürün fotoğraflarını koyun (public/images/products/).
export const PRODUCTS: Product[] = [
  {
    id: 'elegance',
    name: 'Elegance',
    categoryId: 'canta',
    shortDescription: 'Zamansız hatlara sahip, özel dokulu el yapımı çanta.',
    description:
      'Elegance, koleksiyonun en gösterişli parçalarından biri. Yumuşak hatları ve dengeli oranlarıyla ' +
      'hem davetlerde hem gündüz kullanımında rahatlıkla taşınır. Her parça atölyemizde tek tek elde üretilir.',
    images: [
      { url: 'images/products/elegance-1.svg', alt: 'Elegance çanta, ön görünüm' },
      { url: 'images/products/elegance-2.svg', alt: 'Elegance çanta, detay görünümü' },
    ],
    price: 4200,
    featured: true,
    reviews: [],
  },
  {
    id: 'sienna',
    name: 'Sienna',
    categoryId: 'canta',
    shortDescription: 'Sıcak tonlarda, yapılı formuyla öne çıkan tasarım çanta.',
    description:
      'Sienna, net çizgileri ve dik duruşuyla dikkat çeken bir tasarım. Günlük eşyalarınızı düzenli ' +
      'taşımanız için planlanmış iç hacmi, zarif görünümünden ödün vermez.',
    images: [
      { url: 'images/products/sienna-1.svg', alt: 'Sienna çanta, ön görünüm' },
      { url: 'images/products/sienna-2.svg', alt: 'Sienna çanta, detay görünümü' },
    ],
    price: 4200,
    featured: true,
    reviews: [],
  },
  {
    id: 'venus',
    name: 'Venüs',
    categoryId: 'canta',
    shortDescription: 'Yumuşak kıvrımlı, feminen siluetli imza modeli.',
    description:
      'Venüs, markanın imza siluetlerinden biri. Yuvarlatılmış hatları kadınsı bir zarafet taşırken, ' +
      'özenle seçilmiş malzemesi uzun yıllar kullanım sunar.',
    images: [
      { url: 'images/products/venus-1.svg', alt: 'Venüs çanta, ön görünüm' },
      { url: 'images/products/venus-2.svg', alt: 'Venüs çanta, detay görünümü' },
    ],
    price: 4200,
    featured: true,
    reviews: [],
  },
  {
    id: 'love-maxi',
    name: 'Love Maxi',
    categoryId: 'canta',
    shortDescription: 'Love modelinin daha geniş hacimli maxi versiyonu.',
    description:
      'Love Maxi, sevilen Love modelinin günlük kullanıma uygun büyütülmüş hâli. Daha fazla eşya ' +
      'taşımak isteyenler için tasarlandı; formu ve el işçiliği aynen korunuyor.',
    images: [
      { url: 'images/products/love-maxi-1.svg', alt: 'Love Maxi çanta, ön görünüm' },
      { url: 'images/products/love-maxi-2.svg', alt: 'Love Maxi çanta, detay görünümü' },
    ],
    price: 4250,
    reviews: [],
  },
  {
    id: 'queen',
    name: 'Queen',
    categoryId: 'canta',
    shortDescription: 'Güçlü duruşuyla öne çıkan, iddialı tasarım çanta.',
    description:
      'Queen, adını hak eden bir duruşa sahip. Yapılı formu ve dengeli detaylarıyla özel günlerde ' +
      'tamamlayıcı bir parça olarak tasarlandı.',
    images: [
      { url: 'images/products/queen-1.svg', alt: 'Queen çanta, ön görünüm' },
      { url: 'images/products/queen-2.svg', alt: 'Queen çanta, detay görünümü' },
    ],
    price: 3500,
    featured: true,
    reviews: [],
  },
  {
    id: 'paris-maxi',
    name: 'Paris Maxi',
    categoryId: 'canta',
    shortDescription: 'Paris esintili, geniş hacimli günlük çanta.',
    description:
      'Paris Maxi, şehirli ve pratik bir tasarım. Gün boyu yanınızda taşıyabileceğiniz hacmi ve ' +
      'sade zarafetiyle her kombinle uyumlu.',
    images: [
      { url: 'images/products/paris-maxi-1.svg', alt: 'Paris Maxi çanta, ön görünüm' },
      { url: 'images/products/paris-maxi-2.svg', alt: 'Paris Maxi çanta, detay görünümü' },
    ],
    price: 3200,
    reviews: [],
  },
  {
    id: 'love',
    name: 'Love',
    categoryId: 'canta',
    shortDescription: 'Koleksiyonun en sevilen, kompakt imza modeli.',
    description:
      'Love, markanın en çok tercih edilen parçası. Kompakt boyutu ve zarif formuyla akşam ' +
      'davetlerinden günlük kullanıma kadar geniş bir kullanım alanı sunar.',
    images: [
      { url: 'images/products/love-1.svg', alt: 'Love çanta, ön görünüm' },
      { url: 'images/products/love-2.svg', alt: 'Love çanta, detay görünümü' },
    ],
    price: 2700,
    featured: true,
    reviews: [],
  },
  {
    id: 'chloe',
    name: 'Chloe',
    categoryId: 'canta',
    shortDescription: 'Sade ve zarif hatlara sahip günlük çanta.',
    description:
      'Chloe, gösterişten uzak ama detaylarıyla fark yaratan bir tasarım. Sadeliği sevenler için ' +
      'hazırlanmış, el işçiliğiyle tamamlanmış bir parça.',
    images: [
      { url: 'images/products/chloe-1.svg', alt: 'Chloe çanta, ön görünüm' },
      { url: 'images/products/chloe-2.svg', alt: 'Chloe çanta, detay görünümü' },
    ],
    price: 2800,
    reviews: [],
  },
  {
    id: 'candy',
    name: 'Candy',
    categoryId: 'canta',
    shortDescription: 'Canlı duruşuyla neşeli bir dokunuş sunan mini çanta.',
    description:
      'Candy, koleksiyonun en oyuncu parçası. Küçük boyutu ve dikkat çeken formuyla ' +
      'kombinlerinize karakter katar.',
    images: [
      { url: 'images/products/candy-1.svg', alt: 'Candy çanta, ön görünüm' },
      { url: 'images/products/candy-2.svg', alt: 'Candy çanta, detay görünümü' },
    ],
    price: 2800,
    reviews: [],
  },
  {
    id: 'lena',
    name: 'Lena',
    categoryId: 'canta',
    shortDescription: 'Yumuşak formlu, gündelik kullanıma uygun tasarım.',
    description:
      'Lena, rahat ve akıcı formuyla gün boyu konfor sunar. Zarif detayları el işçiliğiyle tamamlanır.',
    images: [
      { url: 'images/products/lena-1.svg', alt: 'Lena çanta, ön görünüm' },
      { url: 'images/products/lena-2.svg', alt: 'Lena çanta, detay görünümü' },
    ],
    price: 2500,
    reviews: [],
  },
  {
    id: 'velora',
    name: 'Velora',
    categoryId: 'canta',
    shortDescription: 'İnce işçilikli, zarif görünümlü kompakt çanta.',
    description:
      'Velora, ince detaylarıyla öne çıkan zarif bir tasarım. Koleksiyona yeni başlayanlar için ' +
      'ideal bir giriş parçası.',
    images: [
      { url: 'images/products/velora-1.svg', alt: 'Velora çanta, ön görünüm' },
      { url: 'images/products/velora-2.svg', alt: 'Velora çanta, detay görünümü' },
    ],
    price: 2400,
    reviews: [],
  },
  {
    id: 'kartlik',
    name: 'Kartlık',
    categoryId: 'kartlik',
    shortDescription: 'Çanta koleksiyonuyla uyumlu, el yapımı kartlık.',
    description:
      'Kartlarınızı düzenli taşımanız için tasarlanmış kompakt bir parça. Çantalarla aynı özenle ' +
      've aynı malzemelerle üretilir; ikili kullanım için ideal.',
    images: [
      { url: 'images/products/kartlik-1.svg', alt: 'Kartlık, ön görünüm' },
      { url: 'images/products/kartlik-2.svg', alt: 'Kartlık, detay görünümü' },
    ],
    price: 1200,
    reviews: [],
  },
  {
    id: 'airpods-kilifi',
    name: 'AirPods Kılıfı',
    categoryId: 'aksesuar',
    shortDescription: 'Koleksiyonla uyumlu, el yapımı AirPods kılıfı.',
    description:
      'Günlük teknolojinizi koleksiyonun zarafetiyle buluşturan küçük bir dokunuş. Çantalarla aynı ' +
      'malzeme ve işçilikle üretilir.',
    images: [
      { url: 'images/products/airpods-kilifi-1.svg', alt: 'AirPods kılıfı, ön görünüm' },
      { url: 'images/products/airpods-kilifi-2.svg', alt: 'AirPods kılıfı, detay görünümü' },
    ],
    price: 1200,
    reviews: [],
  },
];
