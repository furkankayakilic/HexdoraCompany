
# 🧩 Eğitim İçeriği Yapısı

Bu belge, *Dünya Kaşifi* projesindeki eğitim içeriklerinin nasıl organize edildiğini ve her bir modülün yapısal detaylarını açıklar. Amaç, geliştiricilerin ve içerik üreticilerinin projeye kolayca adapte olmasını sağlamaktır.

---

## 📁 İçerik Organizasyonu

Her ülkeye ait veriler belirli bir şemaya göre yapılandırılmıştır:

```
countries/
├── Türkiye/
│   ├── general_info.json
│   ├── geography.json
│   ├── culture.json
│   └── language.json
├── Japonya/
│   └── ...
└── Brezilya/
    └── ...
```

---

## 📄 Dosya Açıklamaları

### 1. `general_info.json`

Ülkenin temel bilgilerini içerir:
```json
{
  "capital": "Ankara",
  "population": 85000000,
  "official_language": "Türkçe"
}
```

### 2. `geography.json`

Önemli coğrafi bilgiler:
```json
{
  "major_cities": ["İstanbul", "İzmir", "Antalya"],
  "natural_features": ["Nemrut Dağı", "Van Gölü"],
  "climate": "Akdeniz iklimi"
}
```

### 3. `culture.json`

Kültürel ögeler:
```json
{
  "traditional_clothing": ["Şalvar", "Bindallı"],
  "cuisine": ["Mantı", "Kebap"],
  "festivals": ["Nevruz", "Hıdrellez"]
}
```

### 4. `language.json`

Dil öğrenimiyle ilgili içerikler:
```json
{
  "greetings": ["Merhaba", "İyi günler"],
  "numbers": ["Bir", "İki", "Üç"],
  "colors": ["Kırmızı", "Mavi", "Yeşil"],
  "proverbs": ["Azıcık aşım, kaygısız başım"]
}
```

---

## 🔄 Modül Yapısı

Her ülke modülü aşağıdaki dört temel bölümden oluşur:

| Modül             | Açıklama |
|------------------|----------|
| **Genel Bilgiler** | Başkent, nüfus, resmi dil gibi temel bilgiler |
| **Coğrafi Özellikler** | Şehirler, doğa, iklim |
| **Kültürel Öğeler** | Kıyafet, yemek, festival bilgisi |
| **Dil Öğrenimi** | Kelime kartları, deyimler, sayılar |

---

## 🎮 Öğrenme Aktiviteleri ile Bağlantı

Her içerik, farklı öğrenme aktivitesine entegre edilecek şekilde tasarlanmıştır:

- 📍 *Keşif Görevleri* → `geography.json`, `culture.json`
- 🧠 *Mini Oyunlar* → `language.json`
- 🧭 *AR Deneyimleri* → tüm modüllerden seçilmiş içerikler

---

## 📌 Standartlar

- Tüm JSON dosyaları UTF-8 formatında olmalıdır.
- Verilerde Türkçe karakter desteği zorunludur.
- Sayısal veriler binlik ayırıcı olmadan girilmelidir (`85000000` gibi).

---

## ✍️ Geliştirici Notları

- Yeni bir ülke eklemek için yukarıdaki klasör yapısı ve JSON şemaları izlenmelidir.
- Medya içerikleri (resim, ses vb.) `assets/` klasöründe tutulur ve ülke klasörlerinde referans verilir.

---
