# 🧭 AR Özellikleri (Artırılmış Gerçeklik)

Bu belge, *Dünya Kaşifi* projesinde kullanılan Artırılmış Gerçeklik (AR) modüllerinin yapısını, kullanım senaryolarını ve teknik detaylarını açıklar. Amaç, geliştiricilerin ve tasarımcıların AR deneyimlerini projeye entegre etmesini kolaylaştırmaktır.

---

## 🎯 Amaç

AR modülleri ile çocukların öğrenme deneyimi daha **etkileşimli**, **görsel** ve **eğlenceli** hale getirilir. Öğrenciler, ülkelerle ilgili nesneleri 3D olarak görüntüleyebilir, haritalarla etkileşime geçebilir ve kültürel ögeleri gerçek dünya ortamına yansıtabilir.

---

## 🧱 Modül Türleri

### 1. 📌 3D Model İnceleme
- Kullanıcılar geleneksel kıyafetleri, sembolleri, yemekleri veya hayvanları 3D olarak döndürebilir, yakınlaştırabilir.
- Model örnekleri:
  - Japonya: Kimono kıyafeti
  - Türkiye: Semazen figürü

### 2. 🗺️ İnteraktif Haritalar
- Ülkelerin konumları ve coğrafi özellikleri artırılmış gerçeklikte harita üstünde gösterilir.
- Kullanıcı haritada bastığında bilgi kutucuğu açılır.

### 3. 🏛️ Sanal Tur
- Kültürel miraslara ve doğal güzelliklere dair 360° görüntüler sunulur.
- Kullanıcılar AR gözlüğü veya mobil cihaz üzerinden sanal gezinti yapabilir.

---

## ⚙️ Teknik Gereksinimler

| Özellik         | Açıklama                                       |
|----------------|------------------------------------------------|
| Platform        | React Native (ViroReact)                       |
| Destek          | Android / iOS                                  |
| Donanım         | Mobil cihaz kamerası, tercihen ARCore / ARKit |
| 3D Model Format | `.glb`, `.usdz`                                |
| SDK / Kütüphane | ViroReact, Zappar, 8thWall                    |

---

## 📂 Dosya Yapısı Örneği

AR modüllerinin organize edilmesi için önerilen dizin yapısı:

```plaintext
ar/
├── models/                      # 3D model dosyaları (ülkelere göre gruplanmış)
│   ├── turkey/
│   │   └── whirling_dervish.glb      # Türkiye için semazen modeli
│   └── japan/
│       └── kimono_model.glb          # Japonya için kimono modeli
├── maps/                        # AR tabanlı etkileşimli haritalar
│   └── world_map.viro.json           # 3D dünya haritası JSON tanımı
└── tours/                       # 360° sanal tur görselleri
    └── eiffel_tower_360.jpg          # Eyfel Kulesi sanal tur resmi

```

## 🧪 Test ve Kalite

- Her model düşük poligonlu ve mobil uyumlu olmalıdır.
- Işıklandırma, gölgeleme ve animasyonlar performansa uygun şekilde optimize edilmelidir.
- AR başlatma arayüzü kullanıcı dostu olmalı, çocuklara rehberlik etmelidir.

---

## 🔄 Entegrasyon Adımları (React Native için)

1. React Native ortamının hazırlanması  
2. `react-viro` veya `@viro-community/react-viro` kurulumu  
3. 3D model (.glb) yükleme ve sahne yerleşimi  
4. Etkileşimli AR bileşenlerinin eklenmesi  
5. Cihaz testleri ve APK/IPA üretimi  

---

## 🔧 Notlar

- WebAR desteği ileride eklenecektir.
- Tüm 3D içerikler açık lisanslı kaynaklardan alınmalıdır.
- AR içeriklerine ebeveyn kontrolü ile erişim sınırlaması getirilebilir.

