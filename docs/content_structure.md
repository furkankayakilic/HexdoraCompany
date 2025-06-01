# Proje İçerik Yapısı (Content Structure)

Bu belge, "Dünya Kaşifi" uygulamasının görsellerine dayalı olarak oluşturulmuş temel içerik ve ekran akışını tanımlar.

## I. Başlangıç Akışı (Onboarding/First-Time User Experience)

Bu akış, uygulamanın ilk açılışında veya yeni bir başlangıçta kullanıcının kişiselleştirme yapmasını ve uygulamaya adapte olmasını sağlar.

### 1. Kaşif Karakter Seçimi

* **Üst Alan**: İlerleme göstergesi (boş/dolu daireler).
* **Başlık**: "Kaşif Olmaya Hazır mısın?" başlığı (yıldız simgesiyle).
* **Alt Başlık**: "Harika bir maceraya başlamak üzeresin! Önce kendi kaşif karakterini yarat!"
* **Karakter Seçim Kartları (Grid Layout)**:
    * Dört adet karakter kartı.
    * Her kartta:
        * Karakter görseli (örn. Küçük Kaşif, Macera Perisi, Süper Kahraman, Uzay Yolcusu).
        * Karakter adı.
        * Seçili karakter için vurgu çerçevesi.
* **Buton**: "İlerle" butonu .

### 2. Macera Aracı Seçimi 

* **Üst Alan**: İlerleme göstergesi.
* **Başlık**: "Aracını Seç" başlığı (roket simgesiyle).
* **Alt Başlık**: "Dünyayı keşfetmek için harika bir araç seç! Uçmak mı, yüzmek mi, yoksa koşmak mı istersin?"
* **Alt Başlık 2**: "Macera Aracını Seç!"
* **Açıklama**: "Seni nereye götürmesini istersin?"
* **Araç Seçim Kartları (Grid Layout)**:
    * Dört adet araç kartı.
    * Her kartta:
        * Araç görseli (Sihirli Halı, Mini Uçak, Roket, Sıcak Hava Balonu).
        * Araç adı.
        * Kısa açıklama.
        * Seçili araç için vurgu çerçevesi.
* **Alt Navigasyon Butonları**:
    * "Geri" butonu.
    * "İlerle" butonu.

### 3. Ekipman Seçimi 

* **Üst Alan**: İlerleme göstergesi.
* **Başlık**: "Ekipmanlarını Seç" başlığı (çanta simgesiyle).
* **Alt Başlık**: "Bir kaşifin en önemli arkadaşları ekipmanlarıdır. Senin en sevdiğin ekipmanları seç!"
* **Seçim Bilgisi**: "0/4 Ekipman Seçildi" ve "En fazla 4 ekipman seçebilirsin!"
* **Ekipman Seçim Kartları (Grid Layout)**:
    * Altı adet ekipman kartı.
    * Her kartta:
        * Ekipman görseli (Dürbün, Sihirli Pusula, Not Defteri, Kamera, Harita, Atıştırmalık).
        * Ekipman adı.
        * Kısa açıklama.
        * Seçili ekipman için vurgu çerçevesi.
* **Alt Navigasyon Butonları**:
    * "Geri" butonu.
    * "İlerle" butonu.

### 4. Kaşif Sertifikası 

* **Üst Alan**: İlerleme göstergesi.
* **Başlık**: "Kaşif Sertifikan Hazır!" başlığı (havai fişek simgesiyle).
* **Alt Başlık**: "Tebrikler! Artık resmi bir Dünya Kaşifisin! Maceraya başlamaya hazır mısın?"
* **Sertifika Kartı**:
    * Ortada büyük bir kart.
    * İçinde "Kaşif Sertifikası" başlığı (rozet simgesiyle).
    * Ortada seçilen kaşif karakterinin avatarı.
    * "Dünya Kaşifi" yazısı (yeşil buton benzeri).
    * Tebrik metni: "Tebrikler! Artık resmi bir Dünya Kaşifisin!" (kuş ve yıldız emojileriyle).
    * Görsel süslemeler (balon, yıldız, dünya).
* **Alt Navigasyon Butonları**:
    * "Geri" butonu.
    * "Maceralara Başla!" butonu (roket simgesiyle).

---

## II. Ana Navigasyon (Bottom Tab Navigator)

Uygulamanın ana navigasyonu, ekranın altında sabit bir sekme çubuğu (`Bottom Tab Navigator`) ile sağlanmaktadır. Kullanıcı başlangıç akışını tamamladıktan sonra bu navigasyona yönlendirilir.

* **Ana Sayfa (Home)**: Genel uygulama başlangıç ekranı.
* **Pasaport (Passport)**: Kullanıcının kaşif pasaportu ve başarılarının görüntülendiği ekran.
* **Rotalar (Routes)**: Dünya haritası ve keşfedilecek yerlerin gösterildiği ekran.
* **Oyunlar (Games)**: Eğitici mini oyunların bulunduğu ekran.
* **Ayarlar (Settings)**: Uygulama ayarları ve genel bilgiler ekranı.

---

## III. Ana Uygulama Ekranları ve İçerikleri

### 1. Ana Sayfa (Home) 

* **Başlık Alanı**:
    * "Dünya Haritası" başlığı.
    * "Keşfetmek istediğin yeri seç!" alt başlığı.
    * Küresel simge.
* **Dünya Haritası Bileşeni**:
    * Etkileşimli dünya haritası görseli.
    * Harita üzerinde işaretlenmiş keşfedilebilir konumlar (pinler).
    * Büyütülmüş bir bölge veya dünya haritası gösterimi.
* **Popüler Yerler Bölümü**:
    * "Popüler Yerler" başlığı.
    * Yatay kaydırılabilir kartlar (horizontal scrollable cards).
    * Her kartta:
        * Ülke simgesi (konum pini).
        * Ülke adı (örn. Fransa, İtalya, Brezilya).
        * Kıta bilgisi (örn. Europe, South America).
* **Ülke Detay/Keşfet Kartı (Örn: Brezilya)**:
    * Ülke bayrağı.
    * Ülke adı (örn. Brezilya).
    * Kıta ve Başkent bilgisi (örn. South America • Brasília).
    * "Keşfet" butonu (roket simgesiyle).

### 2. Pasaport Ekranı (Passport Screen) 

* **Üst Alan (Gradient Arka Plan)**:
    * "Kaşif Pasaportu" başlığı (kitap simgesiyle).
    * "Dünya yolculuğundaki maceralarını takip et!" alt başlığı.
* **Sekme Navigasyonu (Top Tab Navigator)**:
    * "Pasaport" (Varsayılan aktif)
    * "Rozetler"
    * "Diller"
* **Pasaport Sekmesi İçeriği (Görsel: 2.jpg)**:
    * "DÜNYA KAŞİFİ PASAPORTU" başlığı.
    * "Kaşif Akademisi" alt başlığı.
    * **Kaşif Avatarı**: Ortada büyük kaşif karakteri avatarı.
    * **Kaşif Bilgileri**:
        * "Dünya Kaşifi" başlığı.
        * Seviye bilgisi (örn. "Seviye: 1 - Süper Kaşif").
        * Ziyaret edilen ülke sayısı (örn. "Ziyaret: 0 ülke").
        * Yayın tarihi (örn. "Yayın Tarihi: 6/1/2025").
    * **Alt Durum Göstergeleri**:
        * Hedef simgesi: "1 Seviye"
        * Kupa simgesi: "0 Damga" (Muhtemelen Rozet sayısı)
        * Dil simgesi: "0 Dil"
* **Diller Sekmesi İçeriği (Görsel: 3.jpg)**:
    * Ülke bayrağı ve dil adı (örn. "Fransa Dili", "İtalya Dili").
    * Her dil altında liste öğeleri:
        * İfade (örn. "Merhaba", "Hoşçakal", "Teşekkürler").
        * Asma kilit simgesi (kilitli/açık durumu gösterir).
        * Kilitli durum için "Henüz öğrenilmedi" metni.

### 3. Oyunlar Ekranı (Games Screen)

Bu ekran, farklı mini oyunlara erişim sağlar. Görsellerde iki farklı oyun gösterilmiştir:

#### 3.1. Ülke Bilgi Yarışması (Görsel: 4.jpg)

* **Üst Çubuk**: "Kapat" butonu ve "Ülke Bilgi Yarışması" başlığı.
* **Yarışma Bilgisi**: "Soru 1/6" bilgisi.
* **Soru Alanı**:
    * Ülke bayrağı (örn. Türkiye bayrağı).
    * Soru metni (örn. "Türkiye'nin başkenti neresidir?").
* **Cevap Seçenekleri**:
    * Dört adet buton şeklinde cevap seçeneği (örn. İstanbul, Ankara, İzmir, Bursa).

#### 3.2. Bulut Boyama Oyunu 

* **Üst Çubuk**: "Kapat" butonu ve "Bulut Boyama" başlığı.
* **Boyama Alanı**:
    * Boyanabilir bulut görseli.
* **Renk Paleti**:
    * Yuvarlak renk seçenekleri (kırmızı, turkuaz, sarı vb.).
* **Araçlar**:
    * Silgi simgesi.
    * Geri al/Yenile simgesi.

#### 3.3. Matematik Macerası 

* **Üst Çubuk**: "Kapat" butonu ve "Matematik Macerası" başlığı.
* **Oyun Bilgisi**:
    * "Matematik Oyunu" başlığı.
    * "Soru 1 | Puan: 0" bilgisi.
* **Soru Alanı**: Matematiksel işlem (örn. "6 - 5 = ?").
* **Cevap Seçenekleri**: Dört adet buton şeklinde cevap seçeneği (örn. 5, 1, 4, 2).

---

## IV. Ortak UI Bileşenleri (Common UI Components)

* **Üst Başlık Çubuğu (Header)**: Genel başlık, geri/kapat butonu, sağda ikonlar (batarya, sinyal).
* **Alt Navigasyon Çubuğu (Bottom Navigation Bar)**: Sabit, 5 ikonlu.
* **Kartlar (Cards)**: Köşeleri yuvarlak, gölgeli kutular.
* **Butonlar (Buttons)**: Gradient arka planlı ("Keşfet", "İlerle", "Maceralara Başla"), düz renkli ("Geri"), veya metin butonlar.
* **Toggle Butonları (Toggle Buttons)**: "Pasaport", "Rozetler", "Diller" gibi seçenekleri içeren yatay sekmeler.
* **İlerleme Göstergeleri (Progress Indicators)**: Başlangıç akışındaki yuvarlak göstergeler.
* **İkonlar**: Çeşitli ikonlar (kitap, küre, roket, kupa, asma kilit, dürbün vb.).
* **Görseller/Avatarlar**: Karakter ve araç görselleri.

---

## V. Temalar ve Renkler

* Genel olarak pastel tonlar, canlı ve çocuk dostu renkler kullanılmıştır.
* Mor ve mavi-pembe gradyanlar sıkça kullanılıyor.
* Beyaz arka planlar ve yumuşak gölgeler.
