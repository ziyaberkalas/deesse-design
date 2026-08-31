/**
 * Site metinleri. Türkçe (TR) kaynak dildir; İngilizce sözlük tipini ondan türetir
 * (`const EN: Translations`), böylece bir anahtarı çevirmeyi unutmak çalışma zamanında
 * boş metin değil, DERLEME HATASI üretir. Yeni metin eklerken önce TR'ye yazın,
 * ardından derleyici sizi EN'de eksik olan yere götürür.
 *
 * Araya değer giren metinler düz string değil fonksiyondur (ör. `greeting: (name) => ...`):
 * cümledeki sıra dillere göre değişebildiği için parça parça birleştirmek yerine
 * her dil kendi tam cümlesini kurar.
 */
export const TR = {
  nav: {
    home: 'Ana Sayfa',
    products: 'Ürünler',
    contact: 'İletişim',
    favorites: 'Favorilerim',
    account: 'Hesabım',
    orders: 'Siparişler',
    stock: 'Stok',
    login: 'Giriş Yap',
    mainMenu: 'Ana menü',
    openMenu: 'Menüyü aç',
    closeMenu: 'Menüyü kapat',
    instagramFollow: "Instagram'da takip edin",
    toLightMode: 'Aydınlık moda geç',
    toDarkMode: 'Karanlık moda geç',
    skipToContent: 'İçeriğe geç',
    /**
     * Dil düğmesi. Erişilebilir ad, GÖRÜNEN metinle ("EN") başlar: WCAG 2.5.3 "Label in Name",
     * sesle komut veren kullanıcının gördüğü kelimeyi söyleyerek butonu çalıştırabilmesini ister.
     * Metin hedef dilde yazılır, çünkü butonun kendisi o dile geçişi temsil eder.
     */
    switchLanguage: 'EN — Switch to English',
    languageCode: 'EN',
  },

  common: {
    priceOnRequest: 'Fiyat için iletişime geçin',
    addToFavorites: 'Favorilere ekle',
    removeFromFavorites: 'Favorilerden çıkar',
    inFavorites: 'Favorilerde',
    addToFavoritesLabel: 'Favorilere Ekle',
    loading: 'Yükleniyor...',
    dash: '—',
  },

  home: {
    heroTitle: 'El Yapımı Tasarım Çantalar',
    heroLead: (tagline: string, designer: string) =>
      `${tagline}. Her parça, ${designer} imzasıyla atölyemizde tek tek elde üretilir.`,
    exploreCollection: 'Koleksiyonu Keşfedin',
    ourShopierStore: 'Shopier Mağazamız',
    aboutBrand: 'Markamız hakkında',
    featured: 'Öne Çıkan Modeller',
    instagramHeading: "Instagram'da Biz",
    seeAllOnInstagram: "Tümünü Instagram'da Gör",
    testimonialsHeading: 'Müşterilerimiz Ne Diyor?',
  },

  // NOT: Kategori adları products.data.ts → CATEGORY_LABELS, ana sayfa rakamları ise
  // stats.data.ts içinde iki dilli tutulur -- düzenlenen içerik kendi dosyasında kalsın diye.

  productList: {
    title: 'Ürünler',
    searchLabel: 'Ürün ara',
    searchPlaceholder: 'Ürün adı veya açıklamada ara...',
    filterByCategory: 'Kategoriye göre filtrele',
    all: 'Tümü',
    noResults: 'Aramanıza veya seçtiğiniz filtrelere uyan ürün bulunamadı.',
  },

  productDetail: {
    productImages: 'Ürün görselleri',
    imageNumber: (n: number) => `Görsel ${n}`,
    handmadeNote:
      'Her parça atölyemizde elde üretilir; bu nedenle küçük doku ve ton farklılıkları olabilir. ' +
      'Sorularınız için WhatsApp üzerinden bize yazabilirsiniz.',
    reviewsHeading: 'Değerlendirmeler',
    notFoundTitle: 'Ürün bulunamadı',
    notFoundBody: 'Aradığınız ürün mevcut değil ya da kaldırılmış olabilir.',
    browseAll: 'Tüm ürünlere göz atın',
    outOfStockCta: 'Stokta Yok — Bilgi İçin Yazın',
    restockMessage: (name: string) => `Merhaba, "${name}" ürünü stokta yok. Tekrar üretilecek mi?`,
  },

  review: {
    loginPromptLead: 'Bu ürünü satın aldıysanız değerlendirme yazabilirsiniz.',
    loginPromptLink: 'Giriş yapın',
    loginPromptOr: 'veya',
    loginPromptSignup: 'üye olun',
    checkingEligibility: 'Değerlendirme hakkınız kontrol ediliyor...',
    noConfirmedOrder:
      'Değerlendirme yazabilmek için bu ürünü satın almış olmanız gerekir. Siparişiniz ' +
      'hazırlandığında hesabınıza işlenir ve burada yorum yazabilirsiniz.',
    alreadyReviewed: 'Bu ürün için değerlendirmenizi paylaştınız, teşekkürler!',
    formHeading: 'Değerlendirmenizi Yazın',
    commentLabel: 'Yorumunuz',
    submit: 'Değerlendirmeyi Gönder',
    submitting: 'Gönderiliyor...',
    commentRequired: 'Lütfen bir değerlendirme yazın',
    commentMinLength: 'Değerlendirmeniz en az 10 karakter olmalı',
    verifiedBadge: 'Onaylı Satın Alma',
    empty: 'Henüz değerlendirme yok.',
    ratingLegend: 'Puanınız',
    starCount: (n: number) => `${n} yıldız`,
    ratingLabel: (rating: string) => `${rating} / 5 yıldız`,
    ratingLabelWithCount: (rating: string, count: number) =>
      `${rating} / 5 yıldız (${count} değerlendirme)`,
    mustLogIn: 'Yorum yazmak için giriş yapmalısınız.',
    anonymousAuthor: 'Müşteri',
  },

  stock: {
    lastOne: 'Son ürün',
    outOfStock: 'Stokta yok',
  },

  contact: {
    title: 'İletişim',
    intro:
      'Koleksiyonumuz, ürünlerimiz veya siparişiniz hakkında merak ettikleriniz için bize yazın. ' +
      'En hızlı yanıtı WhatsApp üzerinden alırsınız. Satın alma işlemleri Shopier mağazamızdan yapılır.',
    phone: 'Telefon',
    email: 'E-posta',
    instagram: 'Instagram',
    store: 'Mağaza',
    buyOnShopier: "Shopier'de satın alın",
  },

  favorites: {
    title: 'Favorilerim',
    empty: 'Henüz favori ürününüz yok.',
    exploreLink: 'Tasarımları keşfedin',
  },

  notFound: {
    title: 'Sayfa bulunamadı',
    body: 'Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.',
    backHome: 'Ana sayfaya dön',
  },

  auth: {
    loginTitle: 'Giriş Yap',
    signupTitle: 'Kayıt Ol',
    notConfigured:
      'Üyelik sistemi henüz yapılandırılmadı. Site yöneticisinin Supabase bağlantı bilgilerini ' +
      'girmesi gerekiyor.',
    email: 'E-posta',
    password: 'Şifre',
    fullName: 'Ad Soyad',
    phoneWhatsapp: 'Telefon (WhatsApp)',
    phoneHint: 'Siparişlerinizi hesabınızla eşleştirebilmemiz için WhatsApp numaranız.',
    loggingIn: 'Giriş yapılıyor...',
    signingUp: 'Kaydediliyor...',
    noAccount: 'Hesabınız yok mu?',
    signupLink: 'Kayıt olun',
    haveAccount: 'Zaten üye misiniz?',
    loginLink: 'Giriş yapın',
    signupIntro:
      'Sipariş geçmişinizi görebilmek ve satın aldığınız ürünlere değerlendirme yazabilmek için ' +
      'üye olun. Satın alma işlemleri Shopier mağazamızdan yapılmaya devam eder.',
    confirmEmailLead:
      'Kaydınız alındı. Girişi tamamlamak için e-posta adresinize gönderdiğimiz onay bağlantısına tıklayın, ardından',
    confirmEmailLink: 'giriş yapabilirsiniz',
    emailRequired: 'E-posta adresinizi girin',
    emailInvalid: 'Geçerli bir e-posta adresi girin',
    passwordRequired: 'Şifrenizi girin',
    passwordChoose: 'Bir şifre belirleyin',
    passwordMinLength: 'Şifre en az 6 karakter olmalı',
    nameRequired: 'Adınızı girin',
    phoneRequired: 'Telefon numaranızı girin',
  },

  account: {
    title: 'Hesabım',
    greeting: (name: string) => `Merhaba, ${name}`,
    signOut: 'Çıkış Yap',
    adminNotice: 'Yönetici hesabıyla giriş yaptınız.',
    adminLink: 'Sipariş yönetimine gidin',
    myOrders: 'Siparişlerim',
    loadingOrders: 'Siparişleriniz yükleniyor...',
    ordersError: 'Siparişleriniz yüklenemedi. Bağlantınızı kontrol edip sayfayı yenileyin.',
    confirmedNote: 'Onaylanan siparişleriniz için ilgili ürün sayfasından değerlendirme yazabilirsiniz.',
    noOrders: 'Henüz kayıtlı siparişiniz yok.',
    noOrdersHint:
      "Shopier'den verdiğiniz siparişler, hazırlandıktan sonra atölyemiz tarafından hesabınıza işlenir.",
    browseCollection: 'Koleksiyona göz atın',
  },

  orderStatus: {
    pending: 'Onay Bekliyor',
    confirmed: 'Onaylandı',
    cancelled: 'İptal Edildi',
  },

  adminOrders: {
    title: 'Sipariş Yönetimi',
    intro:
      "Shopier'den gelen siparişleri buradan müşterinin hesabına ekleyin. Siparişi onayladığınızda " +
      'müşteri o ürüne "Onaylı Satın Alma" değerlendirmesi yazabilir hale gelir.',
    newOrder: 'Yeni Sipariş Kaydet',
    customerSearchLabel: 'Müşteri ara (telefon veya ad)',
    search: 'Ara',
    searching: 'Aranıyor...',
    customerHint: 'Müşterinin önce siteye kayıt olmuş olması gerekir.',
    unnamed: 'İsimsiz',
    selectedCustomer: 'Seçili müşteri:',
    product: 'Ürün',
    selectProduct: 'Ürün seçin...',
    saveOrder: 'Siparişi Kaydet',
    saving: 'Kaydediliyor...',
    allOrders: 'Tüm Siparişler',
    loadingOrders: 'Siparişler yükleniyor...',
    ordersError: 'Siparişler yüklenemedi.',
    tableCaption: 'Kayıtlı tüm siparişler ve durumları',
    colCustomer: 'Müşteri',
    colPhone: 'Telefon',
    colProduct: 'Ürün',
    colDate: 'Tarih',
    colStatus: 'Durum',
    colAction: 'İşlem',
    confirm: 'Onayla',
    confirmLabel: (productName: string) => `${productName} siparişini onayla`,
    noOrders: 'Henüz kayıtlı sipariş yok.',
    minTwoChars: 'Aramak için en az 2 karakter girin.',
    searchFailed: 'Müşteri araması başarısız oldu.',
    createFailed: 'Sipariş oluşturulamadı.',
    confirmFailed: 'Sipariş onaylanamadı.',
    createdMessage: (productName: string, customerName: string) =>
      `"${productName}" siparişi ${customerName} eklendi.`,
    toCustomerFallback: 'müşteriye',
  },

  adminStock: {
    title: 'Stok Yönetimi',
    intro1: 'Satış olduğunda stoğu buradan düşürün. Stok',
    intro2: 'olduğunda ürün kartında "Son ürün",',
    intro3: 'olduğunda "Stokta yok" görünür ve satın alma butonu WhatsApp\'a dönüşür.',
    trackingNote: (tracked: number, total: number) =>
      `Takip edilmeyen ürünlerde hiçbir rozet çıkmaz ve satın alma normal çalışır — yani stok ` +
      `takibini istediğiniz ürünlerde açabilirsiniz. Şu an ${tracked} / ${total} ürün takip ediliyor.`,
    loading: 'Stok bilgileri yükleniyor...',
    tableCaption: 'Ürünlerin stok adetleri ve düzenleme işlemleri',
    colProduct: 'Ürün',
    colStock: 'Stok',
    colAction: 'İşlem',
    notTracked: 'Takip edilmiyor',
    stockCountLabel: (productName: string) => `${productName} stok adedi`,
    startTracking: 'Takibe al',
    stopTracking: 'Takipten çıkar',
    decreaseLabel: (productName: string) => `${productName} stoğunu bir azalt`,
    increaseLabel: (productName: string) => `${productName} stoğunu bir artır`,
    actionFailed: 'İşlem başarısız oldu.',
  },

  footer: {
    contact: 'İletişim',
    phone: 'Telefon',
    email: 'E-posta',
    rightsReserved: 'Tüm hakları saklıdır.',
  },

  whatsapp: {
    writeUs: 'WhatsApp’tan Yazın',
    floatingLabel: "WhatsApp'tan yazın",
    defaultInquiry: 'Merhaba, koleksiyonunuz hakkında bilgi almak istiyorum.',
  },

  shopier: {
    buy: 'Shopier’den Satın Al',
  },

  instagram: {
    viewPost: "Bu gönderiyi Instagram'da görüntüleyin",
    embedTitle: 'Instagram gönderisi',
  },

  /** Tarayıcı sekmesinde ve arama sonuçlarında görünen sayfa başlıkları. */
  pageTitles: {
    home: 'Ana Sayfa',
    products: 'Ürünler',
    contact: 'İletişim',
    favorites: 'Favorilerim',
    login: 'Giriş Yap',
    signup: 'Kayıt Ol',
    account: 'Hesabım',
    adminOrders: 'Sipariş Yönetimi',
    adminStock: 'Stok Yönetimi',
    notFound: 'Sayfa Bulunamadı',
  },
} as const satisfies Record<string, unknown>;

/**
 * Sözlüğün şekli. TR'den türetilir; `as const` yüzünden değerler dar literal tipler olurdu,
 * bu yüzden string/fonksiyon tiplerine genişletiliyor -- yoksa EN'e farklı metin yazılamazdı.
 */
export type Translations = {
  [Section in keyof typeof TR]: {
    [Key in keyof (typeof TR)[Section]]: (typeof TR)[Section][Key] extends (...args: infer A) => string
      ? (...args: A) => string
      : string;
  };
};

export const EN: Translations = {
  nav: {
    home: 'Home',
    products: 'Shop',
    contact: 'Contact',
    favorites: 'Favourites',
    account: 'My Account',
    orders: 'Orders',
    stock: 'Stock',
    login: 'Sign In',
    mainMenu: 'Main menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    instagramFollow: 'Follow us on Instagram',
    toLightMode: 'Switch to light mode',
    toDarkMode: 'Switch to dark mode',
    skipToContent: 'Skip to content',
    switchLanguage: 'TR — Türkçe’ye geç',
    languageCode: 'TR',
  },

  common: {
    priceOnRequest: 'Contact us for pricing',
    addToFavorites: 'Add to favourites',
    removeFromFavorites: 'Remove from favourites',
    inFavorites: 'In Favourites',
    addToFavoritesLabel: 'Add to Favourites',
    loading: 'Loading...',
    dash: '—',
  },

  home: {
    heroTitle: 'Handcrafted Designer Bags',
    heroLead: (tagline: string, designer: string) =>
      `${tagline}. Every piece is made by hand in our atelier, signed by ${designer}.`,
    exploreCollection: 'Explore the Collection',
    ourShopierStore: 'Our Shopier Store',
    aboutBrand: 'About our brand',
    featured: 'Featured Designs',
    instagramHeading: 'We’re on Instagram',
    seeAllOnInstagram: 'See Everything on Instagram',
    testimonialsHeading: 'What Our Customers Say',
  },

  productList: {
    title: 'Products',
    searchLabel: 'Search products',
    searchPlaceholder: 'Search by name or description...',
    filterByCategory: 'Filter by category',
    all: 'All',
    noResults: 'No products match your search or selected filters.',
  },

  productDetail: {
    productImages: 'Product images',
    imageNumber: (n: number) => `Image ${n}`,
    handmadeNote:
      'Every piece is made by hand in our atelier, so slight variations in texture and tone are ' +
      'natural. Feel free to message us on WhatsApp with any questions.',
    reviewsHeading: 'Reviews',
    notFoundTitle: 'Product not found',
    notFoundBody: 'The product you are looking for does not exist or may have been removed.',
    browseAll: 'Browse all products',
    outOfStockCta: 'Out of Stock — Message Us',
    restockMessage: (name: string) => `Hello, "${name}" is out of stock. Will it be made again?`,
  },

  review: {
    loginPromptLead: 'If you have purchased this product, you can write a review.',
    loginPromptLink: 'Sign in',
    loginPromptOr: 'or',
    loginPromptSignup: 'create an account',
    checkingEligibility: 'Checking whether you can review this product...',
    noConfirmedOrder:
      'To write a review you need to have purchased this product. Once your order is prepared it ' +
      'is added to your account, and you can leave a review here.',
    alreadyReviewed: 'You have already shared your review for this product — thank you!',
    formHeading: 'Write Your Review',
    commentLabel: 'Your review',
    submit: 'Submit Review',
    submitting: 'Submitting...',
    commentRequired: 'Please write a review',
    commentMinLength: 'Your review must be at least 10 characters',
    verifiedBadge: 'Verified Purchase',
    empty: 'No reviews yet.',
    ratingLegend: 'Your rating',
    starCount: (n: number) => `${n} ${n === 1 ? 'star' : 'stars'}`,
    ratingLabel: (rating: string) => `${rating} out of 5 stars`,
    ratingLabelWithCount: (rating: string, count: number) =>
      `${rating} out of 5 stars (${count} ${count === 1 ? 'review' : 'reviews'})`,
    mustLogIn: 'You must sign in to write a review.',
    anonymousAuthor: 'Customer',
  },

  stock: {
    lastOne: 'Last one',
    outOfStock: 'Out of stock',
  },

  contact: {
    title: 'Contact',
    intro:
      'Get in touch with any questions about our collection, our pieces, or your order. WhatsApp ' +
      'is the fastest way to reach us. Purchases are completed through our Shopier store.',
    phone: 'Phone',
    email: 'Email',
    instagram: 'Instagram',
    store: 'Store',
    buyOnShopier: 'Buy on Shopier',
  },

  favorites: {
    title: 'My Favourites',
    empty: 'You have no favourites yet.',
    exploreLink: 'Explore the designs',
  },

  notFound: {
    title: 'Page not found',
    body: 'The page you are looking for may have moved or never existed.',
    backHome: 'Back to home',
  },

  auth: {
    loginTitle: 'Sign In',
    signupTitle: 'Create Account',
    notConfigured:
      'The membership system is not configured yet. The site administrator needs to enter the ' +
      'Supabase connection details.',
    email: 'Email',
    password: 'Password',
    fullName: 'Full Name',
    phoneWhatsapp: 'Phone (WhatsApp)',
    phoneHint: 'Your WhatsApp number, so we can match your orders to your account.',
    loggingIn: 'Signing in...',
    signingUp: 'Creating account...',
    noAccount: 'Don’t have an account?',
    signupLink: 'Sign up',
    haveAccount: 'Already have an account?',
    loginLink: 'Sign in',
    signupIntro:
      'Create an account to see your order history and to review the pieces you have purchased. ' +
      'Purchases continue to be made through our Shopier store.',
    confirmEmailLead:
      'Your registration was received. To finish signing up, click the confirmation link we sent to your email address, then you can',
    confirmEmailLink: 'sign in',
    emailRequired: 'Enter your email address',
    emailInvalid: 'Enter a valid email address',
    passwordRequired: 'Enter your password',
    passwordChoose: 'Choose a password',
    passwordMinLength: 'Password must be at least 6 characters',
    nameRequired: 'Enter your name',
    phoneRequired: 'Enter your phone number',
  },

  account: {
    title: 'My Account',
    greeting: (name: string) => `Hello, ${name}`,
    signOut: 'Sign Out',
    adminNotice: 'You are signed in with an administrator account.',
    adminLink: 'Go to order management',
    myOrders: 'My Orders',
    loadingOrders: 'Loading your orders...',
    ordersError: 'Your orders could not be loaded. Check your connection and refresh the page.',
    confirmedNote: 'For confirmed orders you can write a review on the relevant product page.',
    noOrders: 'You have no recorded orders yet.',
    noOrdersHint:
      'Orders you place on Shopier are added to your account by our atelier once they are prepared.',
    browseCollection: 'Browse the collection',
  },

  orderStatus: {
    pending: 'Awaiting Confirmation',
    confirmed: 'Confirmed',
    cancelled: 'Cancelled',
  },

  adminOrders: {
    title: 'Order Management',
    intro:
      'Add orders that came in through Shopier to the customer’s account here. Once you confirm an ' +
      'order, the customer can leave a "Verified Purchase" review for that product.',
    newOrder: 'Record New Order',
    customerSearchLabel: 'Search customer (phone or name)',
    search: 'Search',
    searching: 'Searching...',
    customerHint: 'The customer must have registered on the site first.',
    unnamed: 'Unnamed',
    selectedCustomer: 'Selected customer:',
    product: 'Product',
    selectProduct: 'Select a product...',
    saveOrder: 'Save Order',
    saving: 'Saving...',
    allOrders: 'All Orders',
    loadingOrders: 'Loading orders...',
    ordersError: 'Orders could not be loaded.',
    tableCaption: 'All recorded orders and their statuses',
    colCustomer: 'Customer',
    colPhone: 'Phone',
    colProduct: 'Product',
    colDate: 'Date',
    colStatus: 'Status',
    colAction: 'Action',
    confirm: 'Confirm',
    confirmLabel: (productName: string) => `Confirm the ${productName} order`,
    noOrders: 'No orders recorded yet.',
    minTwoChars: 'Enter at least 2 characters to search.',
    searchFailed: 'Customer search failed.',
    createFailed: 'The order could not be created.',
    confirmFailed: 'The order could not be confirmed.',
    createdMessage: (productName: string, customerName: string) =>
      `The "${productName}" order was added to ${customerName}.`,
    toCustomerFallback: 'the customer',
  },

  adminStock: {
    title: 'Stock Management',
    intro1: 'Reduce stock here when a sale happens. When stock is',
    intro2: 'the product card shows "Last one"; when it is',
    intro3: 'it shows "Out of stock" and the buy button turns into a WhatsApp button.',
    trackingNote: (tracked: number, total: number) =>
      `Untracked products show no badge and purchasing works normally — so you can enable stock ` +
      `tracking only for the products you want. Currently ${tracked} / ${total} products are tracked.`,
    loading: 'Loading stock information...',
    tableCaption: 'Product stock counts and editing actions',
    colProduct: 'Product',
    colStock: 'Stock',
    colAction: 'Action',
    notTracked: 'Not tracked',
    stockCountLabel: (productName: string) => `${productName} stock count`,
    startTracking: 'Start tracking',
    stopTracking: 'Stop tracking',
    decreaseLabel: (productName: string) => `Decrease ${productName} stock by one`,
    increaseLabel: (productName: string) => `Increase ${productName} stock by one`,
    actionFailed: 'The operation failed.',
  },

  footer: {
    contact: 'Contact',
    phone: 'Phone',
    email: 'Email',
    rightsReserved: 'All rights reserved.',
  },

  whatsapp: {
    writeUs: 'Message Us on WhatsApp',
    floatingLabel: 'Message us on WhatsApp',
    defaultInquiry: 'Hello, I would like to know more about your collection.',
  },

  shopier: {
    buy: 'Buy on Shopier',
  },

  instagram: {
    viewPost: 'View this post on Instagram',
    embedTitle: 'Instagram post',
  },

  pageTitles: {
    home: 'Home',
    products: 'Products',
    contact: 'Contact',
    favorites: 'My Favourites',
    login: 'Sign In',
    signup: 'Create Account',
    account: 'My Account',
    adminOrders: 'Order Management',
    adminStock: 'Stock Management',
    notFound: 'Page Not Found',
  },
};
