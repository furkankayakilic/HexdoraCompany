# 📲 INSTALLATION.md – Dünya Kaşifi Uygulaması Kurulum Rehberi

Bu belge, *Dünya Kaşifi* mobil uygulamasının kurulumu, çalıştırılması ve olası sorunların çözümü için hazırlanmıştır.

---

## ✅ Sistem Gereksinimleri

### 💻 Geliştirme Ortamı (Opsiyonel)

- Node.js ≥ 18.x  
- Expo CLI ≥ 6.x (React Native için)  
- Android Studio (emülatör için)  
- VS Code veya benzeri kod editörü

### 📱 Mobil Cihazlar için

- Android 8.0 (Oreo) ve üzeri  
- Minimum 3 GB RAM  
- ARCore desteği olan bir Android cihaz  
- Yaklaşık 250 MB boş alan

---

## 🔧 Kurulum Adımları (Geliştirici Modu)

> Eğer kaynak kodu çalıştırmak istiyorsanız aşağıdaki adımları takip edin:

### 1. Repo'yu Klonla

```bash
git clone https://github.com/kullanici-adi/dunya-kasifi.git
cd dunya-kasifi
```

### 2. Bağımlılıkları Kur

```bash
npm install
```

### 3. Expo ile Çalıştır

```bash
npx expo start
```

- Android cihazınızı USB ile bağlayarak canlı test edebilirsiniz.  
- Ya da QR kodu Expo Go uygulamasından okutabilirsiniz.

---

## 📦 APK Kurulumu (Kullanıcı Modu)

> Eğer `.apk` dosyasını doğrudan yüklemek istiyorsanız:

1. `release/app-release.apk` dosyasını Android cihazınıza aktarın.  
2. Cihazda "Bilinmeyen kaynaklardan yüklemeye izin ver" ayarını aktif edin.  
3. Dosyaya dokunarak kurulumu başlatın.

---

## 🛠️ Troubleshooting (Sorun Giderme)

### ⚠️ Expo CLI Hatası: `command not found`

**Çözüm:** Expo yüklü değilse şu komutu çalıştır:

```bash
npm install -g expo-cli
```

---

### ⚠️ "App not installed" Hatası (APK)

**Çözüm:**

- Cihaz sürümünüz Android 8.0 ve üzeri mi kontrol edin.  
- Önceki bir sürüm yüklüyse kaldırıp tekrar deneyin.  
- `release` imzası eksikse, manuel imzalama gerekebilir.

---

### ⚠️ Kamera veya AR Çalışmıyor

**Çözüm:**

- Uygulamanın kamera izinlerini kontrol edin.  
- ARCore destekli bir cihaz kullanın.  
- Gerekirse ARCore güncellemesi yapın (Play Store’da mevcut).

---

### ⚠️ Siyah Ekran ya da Açılmıyor

**Çözüm:**

- Cihazın RAM’i yetersiz olabilir.  
- Uygulamayı kapatıp yeniden başlatın.  
- Gerekirse uygulamayı silip yeniden yükleyin.

---

## ℹ️ Yardım ve Destek

Herhangi bir sorunla karşılaşırsanız lütfen `issues` sekmesi üzerinden bildirin veya bizimle iletişime geçin:

📧 destek@dunyakasifi.com  
🌐 [github.com/kullanici-adi/dunya-kasifi/issues](https://github.com/kullanici-adi/dunya-kasifi/issues)

---

**İyi keşifler dileriz! 🌍✨**
