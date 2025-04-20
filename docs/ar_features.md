
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

| Özellik | Açıklama |
|--------|----------|
| Platform | Unity 3D (AR Foundation) veya WebAR teknolojileri |
| Destek | Android / iOS / Web |
| Gerekli Donanım | Mobil cihaz kamerası, tercihen ARCore / ARKit desteği |
| Format | 3D modeller `.glb` veya `.usdz` formatında |
| SDK | AR Foundation (Unity), 8thWall (Web), Zappar veya Vuforia |

---

## 📂 Dosya Yapısı Örneği

```
ar/
├── models/
│   ├── turkey/
│   │   └── whirling_dervish.glb
│   └── japan/
│       └── kimono_model.glb
├── maps/
│   └── world_map.arproject
└── tours/
    └── eiffel_tower_360.jpg
```

---

## 🧪 Test ve Kalite

- Her model kullanım öncesinde düşük poligonlu, mobil cihaz uyumlu olmalı
- Gölgeleme, ışık ve animasyonlar performans dostu ayarlanmalı
- Kullanıcı AR başlatma deneyiminde basit arayüz ile yönlendirilmeli

---

## 🔄 Entegrasyon Adımları (Unity için)

1. AR Foundation kurulumu
2. Cihaz uyumluluk ayarları
3. Model import işlemi
4. Model üzeri bilgi kutuları ve animasyonlar
5. Test ve yayınlama

---

## 🔧 Notlar

- Gelecekte WebAR sürümü planlanmaktadır.
- Model kaynakları açık lisanslı olmalıdır.
- AR içerikleri isteğe göre açılıp kapanabilir olmalıdır (ebeveyn kontrolü).

---
