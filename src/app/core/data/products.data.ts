import { Product } from '../models/product.model';

export const CATEGORY_LABELS: Record<string, string> = {
  canta: 'Çanta',
  kartlik: 'Kartlık',
  aksesuar: 'Aksesuar',
};

// Ürünler, fiyatlar ve fotoğraflar Shopier mağazasından alınmıştır.
// TODO: her ürüne kendi Shopier linkini ekleyin (shopierUrl). Boş bırakılanlar mağaza köküne yönlenir.
//
// Fotoğraf boyutları: Shopier'den gelen görseller kare (1:1) ve düşük çözünürlüklü
// (250x250 veya 458x458). Kart/detay düzeni bu yüzden kareye ayarlandı -- 4:5 kullansaydık
// çantaların sapı/tabanı kırpılırdı. Daha yüksek çözünürlüklü fotoğraflarınız varsa
// değiştirin: ürün detayında 250px'lik görseller büyütüldüğünde bulanık görünür.
export const PRODUCTS: Product[] = [
  {
    id: 'elegance',
    name: 'Elegance',
    categoryId: 'canta',
    shortDescription: 'Zamansız hatlara sahip, özel dokulu el yapımı çanta.',
    description:
      'Elegance, koleksiyonun en gösterişli parçalarından biri. Yumuşak hatları ve dengeli oranlarıyla ' +
      'hem davetlerde hem gündüz kullanımında rahatlıkla taşınır. Her parça atölyemizde tek tek elde üretilir.',
    images: [{ url: 'images/products/elegance-1.jpeg', alt: 'Elegance çanta', width: 250, height: 250 }],
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
    images: [{ url: 'images/products/sienna-1.jpeg', alt: 'Sienna çanta', width: 250, height: 250 }],
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
    images: [{ url: 'images/products/venus-1.jpeg', alt: 'Venüs çanta', width: 250, height: 250 }],
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
    images: [{ url: 'images/products/love-maxi-1.jpeg', alt: 'Love Maxi çanta', width: 458, height: 458 }],
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
    images: [{ url: 'images/products/queen-1.jpeg', alt: 'Queen çanta', width: 250, height: 250 }],
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
      { url: 'images/products/paris-maxi-1.jpeg', alt: 'Paris Maxi çanta', width: 458, height: 458 },
      { url: 'images/products/paris-maxi-2.png', alt: 'Paris Maxi çanta, farklı açıdan', width: 728, height: 782 },
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
      { url: 'images/products/love-1.jpeg', alt: 'Love çanta', width: 458, height: 458 },
      { url: 'images/products/love-2.jpeg', alt: 'Love çanta, farklı açıdan', width: 458, height: 458 },
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
    images: [{ url: 'images/products/chloe-1.jpeg', alt: 'Chloe çanta', width: 250, height: 250 }],
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
    images: [{ url: 'images/products/candy-1.jpeg', alt: 'Candy çanta', width: 250, height: 250 }],
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
      { url: 'images/products/lena-1.jpeg', alt: 'Lena çanta', width: 250, height: 250 },
      { url: 'images/products/lena-2.jpeg', alt: 'Lena çanta, farklı açıdan', width: 250, height: 250 },
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
    images: [{ url: 'images/products/velora-1.png', alt: 'Velora çanta', width: 467, height: 567 }],
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
    images: [{ url: 'images/products/kartlik-1.jpeg', alt: 'Kartlık', width: 458, height: 458 }],
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
    images: [{ url: 'images/products/airpods-kilifi-1.jpeg', alt: 'AirPods kılıfı', width: 458, height: 458 }],
    price: 1200,
    reviews: [],
  },
  {
    id: 'letter-charm',
    name: 'Letter Charm',
    categoryId: 'aksesuar',
    // TODO: fiyatını girin. Fotoğrafı eklendi ama fiyat bilgisi elimde yok; price null olduğu
    // sürece sitede "Fiyat için iletişime geçin" görünür.
    shortDescription: 'Çantanıza kişisel bir dokunuş katan harf aksesuarı.',
    description:
      'Letter Charm, çantanıza baş harfinizle kişisel bir imza ekler. Koleksiyonun diğer ' +
      'parçalarıyla aynı özenle, el işçiliğiyle hazırlanır.',
    images: [{ url: 'images/products/letter-charm-1.jpeg', alt: 'Letter Charm harf aksesuarı', width: 458, height: 458 }],
    price: null,
    reviews: [],
  },
];
