# İçerik Düzenleme Rehberi

Bu dosya, **kod bilmeden** sitenin içeriğini güncellemeniz için hazırlandı.
Aşağıdaki 5 dosya dışında hiçbir şeye dokunmanıza gerek yok.

> Her düzenlemeden sonra: dosyayı kaydedin → `npm start` çalışıyorsa tarayıcı kendini yeniler.
> Yayına almak için: `git add -A` → `git commit -m "içerik güncellendi"` → `git push`

---

## 1. Ürünler → `src/app/core/data/products.data.ts`

**En sık düzenleyeceğiniz dosya.** Ürün ekleme, silme, fiyat/açıklama/foto değiştirme burada.

Bir ürün şu kalıpta yazılır:

```ts
  {
    id: 'elegance',                    // URL'de görünür: /urunler/elegance  (boşluk/Türkçe harf KULLANMAYIN)
    name: 'Elegance',                  // Sitede görünen ad
    categoryId: 'canta',               // 'canta' | 'kartlik' | 'aksesuar'
    shortDescription: 'Kısa açıklama', // Ürün kartında (listede) görünür, 1 cümle
    description: 'Uzun açıklama...',   // Ürün detay sayfasında görünür
    images: [
      { url: 'images/products/elegance-1.jpeg', alt: 'Elegance çanta', width: 250, height: 250 },
    ],
    price: 4200,                       // Sadece rakam. ₺ ve nokta YAZMAYIN. Fiyat yoksa: null
    shopierUrl: 'https://...',         // İsteğe bağlı (bkz. bölüm 2)
    featured: true,                    // Ana sayfada "Öne Çıkan"da görünsün mü? Görünmesin diye satırı silin
    reviews: [],                       // ELLEMEYİN — yorumlar veritabanından gelir
  },
```

### Fiyat değiştirme
`price: 4200` → `price: 4500`. Nokta veya ₺ eklemeyin, site otomatik `₺4.500` yazar.

### Ürün silme
`{` ile başlayıp `},` ile biten bloğun tamamını silin.

### Yeni ürün ekleme
Var olan bir bloğu kopyalayıp yapıştırın, sonra `id`, `name`, `price`, `images` alanlarını değiştirin.
**`id` benzersiz olmalı** ve başka bir üründe kullanılmamalı.

### ⚠️ Dikkat edilecekler
- Her satırın sonundaki **virgül** durmalı.
- Metin içinde kesme işareti varsa: `'Ürün\'ün'` şeklinde ters eğik çizgi koyun, ya da baştan sona çift tırnak kullanın: `"Ürün'ün"`.
- `width`/`height` fotoğrafın **gerçek** piksel boyutu olmalı (bkz. bölüm 3).

---

## 2. Shopier satın alma linkleri

Şu an ürünlerin **hiçbirinde** kendi Shopier linki yok — hepsi mağaza ana sayfasına gidiyor.

Her ürüne kendi linkini eklemek için, o ürünün bloğuna şu satırı ekleyin:

```ts
    shopierUrl: 'https://www.shopier.com/XXXXXXX',
```

Link nereden bulunur: Shopier panelinizde ürüne girin → tarayıcının adres çubuğundaki adresi kopyalayın.

Satır eklenmezse ürün mağaza kökü olan `https://www.shopier.com/DeesseDesinger` adresine gider — yani site bozulmaz, sadece müşteri ürünü mağazada kendi bulur.

---

## 3. Fotoğraflar → `public/images/products/`

### Yeni fotoğraf ekleme
1. Fotoğrafı bu klasöre kopyalayın.
2. **Dosya adında boşluk, parantez ve Türkçe karakter OLMASIN.**
   ❌ `Venüs (2).jpeg`  ✅ `venus-mavi-2.jpeg`
3. `products.data.ts` içindeki ilgili ürünün `images` listesine ekleyin.

### Boyutları öğrenme (`width`/`height` için)
Dosyaya sağ tık → **Özellikler** → **Ayrıntılar** sekmesi → Genişlik / Yükseklik.
Bu değerleri doğru yazmak önemli: yanlışsa sayfa yüklenirken görsel zıplar.

### Bir ürüne 2. fotoğraf ekleme
`images` listesine ikinci satırı ekleyin; detay sayfasında küçük önizlemeler otomatik çıkar:

```ts
    images: [
      { url: 'images/products/lena-1.jpeg', alt: 'Lena çanta', width: 250, height: 250 },
      { url: 'images/products/lena-2.jpeg', alt: 'Lena çanta, farklı açıdan', width: 250, height: 250 },
    ],
```

### 💡 Fotoğraf çekimi ipucu
Site fotoğrafları **4:5 dikey** orana kırpar (üstten/alttan değil, yanlardan). Ürünü karenin
tam ortasına alırsanız kırpma sorun çıkarmaz. Shopier'den indirdiğiniz fotoğrafların yanlarındaki
beyaz boşluklar bu sayede otomatik kırpılıyor.

**Not:** Mevcut fotoğraflar 250×250 ve 458×458 piksel — detay sayfasında büyütülünce bir miktar
bulanık görünüyor. Elinizde daha büyük hâlleri varsa değiştirmeniz görüntü kalitesini belirgin artırır.

---

## 4. İletişim bilgileri → `src/app/core/config/site-config.ts`

Telefon, Instagram, e-posta, Shopier mağaza adresi ve site sloganı burada. Tek yerden değişir,
sitenin her yerine (header, footer, iletişim sayfası, WhatsApp butonu) otomatik yansır.

```ts
  whatsapp: {
    phoneDisplay: '+90 505 646 33 76',   // Ekranda görünen hâli
    phoneE164: '905056463376',           // WhatsApp linki için: sadece rakam, başında + ve 0 YOK
  },
```

⚠️ `phoneE164` yanlışsa WhatsApp butonu boş sohbet açar. İki alanı da birlikte güncelleyin.

---

## 5. Ana sayfa rakamları → `src/app/core/data/stats.data.ts`

Ana sayfadaki üç kutu ("%100 El Yapımı Üretim" vb.):

```ts
  { value: '%100', label: 'El Yapımı Üretim' },
```

`value` büyük yazı, `label` altındaki küçük yazı. Üçten fazla veya az olabilir.

---

## 6. Instagram gönderileri → `src/app/core/data/instagram-posts.data.ts`

Ana sayfada gömülü görünen 3 gönderi. Değiştirmek için Instagram'da gönderiye girin,
adres çubuğundaki linki kopyalayıp listeye yapıştırın:

```ts
  'https://www.instagram.com/p/DGoCRWmsybM/',
```

Link `https://www.instagram.com/p/KOD/` veya `https://www.instagram.com/reel/KOD/` biçiminde olmalı.
Sonundaki `?utm_source=...` kısmını silin, gerek yok.

---

## Bir şey bozulursa

Kaydettikten sonra sayfa beyaz kalır veya hata verirse, büyük ihtimalle **eksik virgül** veya
**kapanmamış tırnak** vardır. En son değiştirdiğiniz satıra bakın.

Geri almak için (son commit'ten bu yana yaptığınız tüm değişiklikleri siler):

```
git restore src/app/core/data/products.data.ts
```

---

## ELLEMEYİN

Bunlar site mantığı; bozulursa sayfalar çalışmaz:

- `src/app/features/` — sayfa kodları
- `src/app/shared/` — ortak bileşenler
- `src/app/core/services/` — üyelik, sipariş, yorum mantığı
- `supabase/migrations/` — veritabanı kurulumu (bir kez çalıştırıldı, tekrar çalıştırmayın)
- `src/styles.css` — renkler ve yazı tipleri (değiştirmek isterseniz bana söyleyin,
  renk kontrastlarının erişilebilirlik standardını bozmaması gerekiyor)
