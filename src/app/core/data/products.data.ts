import { Product } from '../models/product.model';

/**
 * Kategori adları. Yeni bir kategori eklerken buraya hem Türkçe hem İngilizce karşılığını yazın;
 * listede olmayan bir categoryId kullanılırsa site id'yi olduğu gibi gösterir (bozulmaz).
 */
export const CATEGORY_LABELS: Record<string, { tr: string; en: string }> = {
  canta: { tr: 'Çanta', en: 'Bag' },
  kartlik: { tr: 'Kartlık', en: 'Card Holder' },
  aksesuar: { tr: 'Aksesuar', en: 'Accessory' },
};

// TODO: her ürüne kendi Shopier linkini ekleyin (shopierUrl). Boş bırakılanlar mağaza köküne yönlenir.
//
// Fotoğraf boyutları: Shopier'den gelen görseller kare (1:1) ve düşük çözünürlüklü
// (250x250 veya 458x458). Kart/detay düzeni bu yüzden kareye ayarlandı -- 4:5 kullansaydık
// çantaların sapı/tabanı kırpılırdı. Daha yüksek çözünürlüklü fotoğraflarınız varsa
// değiştirin: ürün detayında 250px'lik görseller büyütüldüğünde bulanık görünür.
//
// İngilizce alanlar (nameEn / shortDescriptionEn / descriptionEn / altEn) İSTEĞE BAĞLIDIR.
// Yazmazsanız o alan İngilizce sitede de Türkçe görünür; site çalışmaya devam eder.
export const PRODUCTS: Product[] = [
  {
    id: 'elegance',
    name: 'Elegance',
    categoryId: 'canta',
    shortDescription: 'Zamansız hatlara sahip, özel dokulu el yapımı çanta.',
    description:
      'Elegance, koleksiyonun en gösterişli parçalarından biri. Yumuşak hatları ve dengeli oranlarıyla ' +
      'hem davetlerde hem gündüz kullanımında rahatlıkla taşınır. Her parça atölyemizde tek tek elde üretilir.',
    shortDescriptionEn: 'A handmade bag with timeless lines and a distinctive texture.',
    descriptionEn:
      'Elegance is one of the most striking pieces in the collection. Its soft lines and balanced ' +
      'proportions carry it easily from evening events to daytime wear. Every piece is made by hand in our atelier.',
    images: [
      { url: 'images/products/elegance-1.jpeg', alt: 'Elegance çanta', altEn: 'Elegance bag', width: 250, height: 250 },
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
    shortDescriptionEn: 'A structured designer bag in warm tones.',
    descriptionEn:
      'Sienna stands out with its clean lines and upright silhouette. Its interior is planned to keep ' +
      'your everyday essentials in order, without compromising on elegance.',
    images: [
      { url: 'images/products/sienna-1.jpeg', alt: 'Sienna çanta', altEn: 'Sienna bag', width: 250, height: 250 },
    ],
    price: 4200,
    featured: true,
    reviews: [],
  },
  {
    id: 'venus',
    name: 'Venüs',
    nameEn: 'Venus',
    categoryId: 'canta',
    shortDescription: 'Yumuşak kıvrımlı, feminen siluetli imza modeli.',
    description:
      'Venüs, markanın imza siluetlerinden biri. Yuvarlatılmış hatları kadınsı bir zarafet taşırken, ' +
      'özenle seçilmiş malzemesi uzun yıllar kullanım sunar.',
    shortDescriptionEn: 'A signature model with soft curves and a feminine silhouette.',
    descriptionEn:
      'Venus is one of the brand’s signature silhouettes. Its rounded lines carry a feminine elegance, ' +
      'while the carefully chosen materials are made to last for years.',
    images: [
      {
        url: 'images/products/venus-1.jpeg',
        alt: 'Venüs çanta, lacivert',
        altEn: 'Venus bag in navy blue',
        width: 250,
        height: 250,
      },
    ],
    price: 4200,
    featured: true,
    reviews: [],
  },
  {
    // TODO: Shopier'deki tam ürün adıyla değiştirin. İsim fotoğraftaki renge göre verildi.
    id: 'venus-mavi',
    name: 'Venüs Mavi',
    nameEn: 'Venus Blue',
    categoryId: 'canta',
    shortDescription: 'Venüs formunun mavi boncuklu, silindir siluetli versiyonu.',
    description:
      'Venüs Mavi, imza Venüs formunun daha uzun, silindir hatlı yorumu. Parlak mavi boncuk ' +
      'işçiliği ve büzgülü üst detayıyla akşam kullanımı için tasarlandı.',
    shortDescriptionEn: 'The Venus shape in a cylindrical silhouette with blue beadwork.',
    descriptionEn:
      'Venus Blue is a longer, cylindrical interpretation of the signature Venus shape. Designed for ' +
      'evening wear, with bright blue beadwork and a gathered detail at the top.',
    images: [
      {
        url: 'images/products/venus-mavi-1.jpeg',
        alt: 'Venüs Mavi çanta',
        altEn: 'Venus Blue bag',
        width: 250,
        height: 250,
      },
    ],
    price: 3200,
    reviews: [],
  },
  {
    // TODO: Shopier'deki tam ürün adıyla değiştirin. İsim fotoğraftaki renge göre verildi.
    id: 'venus-buz-mavi',
    name: 'Venüs Buz Mavi',
    nameEn: 'Venus Ice Blue',
    categoryId: 'canta',
    shortDescription: 'Buz mavisi kristal boncuklu, daire formlu Venüs modeli.',
    description:
      'Venüs Buz Mavi, daire silueti ve ışığı yansıtan buz mavisi kristal boncuklarıyla ' +
      'koleksiyonun en dikkat çekici parçalarından biri. Metal çerçeve sapı ve zinciriyle birlikte gelir.',
    shortDescriptionEn: 'A round Venus model with ice-blue crystal beads.',
    descriptionEn:
      'Venus Ice Blue is one of the most eye-catching pieces in the collection, with its circular ' +
      'silhouette and light-catching ice-blue crystal beads. Comes with a metal frame handle and chain.',
    images: [
      {
        url: 'images/products/venus-buz-mavi-1.jpeg',
        alt: 'Venüs Buz Mavi çanta',
        altEn: 'Venus Ice Blue bag',
        width: 458,
        height: 458,
      },
    ],
    price: 2800,
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
    shortDescriptionEn: 'The roomier maxi version of the Love model.',
    descriptionEn:
      'Love Maxi is the scaled-up, everyday version of the much-loved Love model. Designed for those ' +
      'who carry a little more, while keeping the same shape and handcraft.',
    images: [
      { url: 'images/products/love-maxi-1.jpeg', alt: 'Love Maxi çanta', altEn: 'Love Maxi bag', width: 458, height: 458 },
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
    shortDescriptionEn: 'A bold designer bag with a commanding presence.',
    descriptionEn:
      'Queen lives up to its name. With its structured shape and balanced detailing, it is designed ' +
      'as the finishing piece for special occasions.',
    images: [{ url: 'images/products/queen-1.jpeg', alt: 'Queen çanta', altEn: 'Queen bag', width: 250, height: 250 }],
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
    shortDescriptionEn: 'A roomy everyday bag with a Parisian air.',
    descriptionEn:
      'Paris Maxi is an urban, practical design. Its capacity carries you through the day, and its ' +
      'understated elegance works with everything.',
    images: [
      { url: 'images/products/paris-maxi-1.jpeg', alt: 'Paris Maxi çanta', altEn: 'Paris Maxi bag', width: 458, height: 458 },
      {
        url: 'images/products/paris-maxi-2.png',
        alt: 'Paris Maxi çanta, farklı açıdan',
        altEn: 'Paris Maxi bag from another angle',
        width: 728,
        height: 782,
      },
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
    shortDescriptionEn: 'The best-loved, compact signature model of the collection.',
    descriptionEn:
      'Love is the brand’s most popular piece. Its compact size and elegant shape take it from ' +
      'evening events to everyday wear.',
    images: [
      {
        url: 'images/products/love-1.jpeg',
        alt: 'Love çanta, pudra rengi',
        altEn: 'Love bag in powder pink',
        width: 458,
        height: 458,
      },
      {
        url: 'images/products/love-2.jpeg',
        alt: 'Love çanta, farklı açıdan',
        altEn: 'Love bag from another angle',
        width: 458,
        height: 458,
      },
    ],
    price: 2700,
    featured: true,
    reviews: [],
  },
  {
    // TODO: Shopier'deki tam ürün adıyla değiştirin. İsim fotoğraftaki renge göre verildi.
    id: 'love-kirmizi',
    name: 'Love Kırmızı',
    nameEn: 'Love Red',
    categoryId: 'canta',
    shortDescription: 'Love modelinin canlı kırmızı boncuklu versiyonu.',
    description:
      'Love Kırmızı, sevilen Love formunun iddialı bir yorumu. Canlı kırmızı boncuk işçiliği ve ' +
      'zincir askısıyla özel günlerde öne çıkan bir parça.',
    shortDescriptionEn: 'The Love model with vivid red beadwork.',
    descriptionEn:
      'Love Red is a bolder take on the beloved Love shape. Vivid red beadwork and a chain strap ' +
      'make it a standout piece for special occasions.',
    images: [
      {
        url: 'images/products/love-kirmizi-1.jpeg',
        alt: 'Love Kırmızı çanta',
        altEn: 'Love Red bag',
        width: 250,
        height: 250,
      },
    ],
    price: 3200,
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
    shortDescriptionEn: 'An everyday bag with simple, elegant lines.',
    descriptionEn:
      'Chloe is understated, but its details set it apart. A handcrafted piece made for those who ' +
      'prefer simplicity.',
    images: [{ url: 'images/products/chloe-1.jpeg', alt: 'Chloe çanta', altEn: 'Chloe bag', width: 250, height: 250 }],
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
    shortDescriptionEn: 'A mini bag that brings a playful, lively touch.',
    descriptionEn:
      'Candy is the most playful piece in the collection. Its small size and eye-catching shape add ' +
      'character to any outfit.',
    images: [{ url: 'images/products/candy-1.jpeg', alt: 'Candy çanta', altEn: 'Candy bag', width: 250, height: 250 }],
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
    shortDescriptionEn: 'A soft-shaped design made for everyday wear.',
    descriptionEn:
      'Lena offers all-day comfort with its relaxed, flowing shape. Its elegant details are finished by hand.',
    images: [
      { url: 'images/products/lena-1.jpeg', alt: 'Lena çanta', altEn: 'Lena bag', width: 250, height: 250 },
      {
        url: 'images/products/lena-2.jpeg',
        alt: 'Lena çanta, farklı açıdan',
        altEn: 'Lena bag from another angle',
        width: 250,
        height: 250,
      },
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
    shortDescriptionEn: 'A compact bag with fine craftsmanship and an elegant look.',
    descriptionEn:
      'Velora is an elegant design distinguished by its fine detailing — an ideal first piece for ' +
      'those new to the collection.',
    images: [{ url: 'images/products/velora-1.png', alt: 'Velora çanta', altEn: 'Velora bag', width: 467, height: 567 }],
    price: 2400,
    reviews: [],
  },
  {
    id: 'kartlik',
    name: 'Kartlık',
    nameEn: 'Card Holder',
    categoryId: 'kartlik',
    shortDescription: 'Çanta koleksiyonuyla uyumlu, el yapımı kartlık.',
    description:
      'Kartlarınızı düzenli taşımanız için tasarlanmış kompakt bir parça. Çantalarla aynı özenle ' +
      've aynı malzemelerle üretilir; ikili kullanım için ideal.',
    shortDescriptionEn: 'A handmade card holder that matches the bag collection.',
    descriptionEn:
      'A compact piece designed to keep your cards in order. Made with the same care and the same ' +
      'materials as the bags — ideal as a pair.',
    images: [
      { url: 'images/products/kartlik-1.jpeg', alt: 'Kartlık', altEn: 'Card holder', width: 458, height: 458 },
    ],
    price: 1200,
    reviews: [],
  },
  {
    id: 'airpods-kilifi',
    name: 'AirPods Kılıfı',
    nameEn: 'AirPods Case',
    categoryId: 'aksesuar',
    shortDescription: 'Koleksiyonla uyumlu, el yapımı AirPods kılıfı.',
    description:
      'Günlük teknolojinizi koleksiyonun zarafetiyle buluşturan küçük bir dokunuş. Çantalarla aynı ' +
      'malzeme ve işçilikle üretilir.',
    shortDescriptionEn: 'A handmade AirPods case that matches the collection.',
    descriptionEn:
      'A small touch that brings the elegance of the collection to your everyday tech. Made with the ' +
      'same materials and craftsmanship as the bags.',
    images: [
      {
        url: 'images/products/airpods-kilifi-1.jpeg',
        alt: 'AirPods kılıfı',
        altEn: 'AirPods case',
        width: 458,
        height: 458,
      },
    ],
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
    shortDescriptionEn: 'A letter charm that adds a personal touch to your bag.',
    descriptionEn:
      'Letter Charm adds a personal signature to your bag with your initial. Handcrafted with the ' +
      'same care as every other piece in the collection.',
    images: [
      {
        url: 'images/products/letter-charm-1.jpeg',
        alt: 'Letter Charm harf aksesuarı',
        altEn: 'Letter Charm letter accessory',
        width: 458,
        height: 458,
      },
    ],
    price: null,
    reviews: [],
  },
];
