import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, Bell, Timer, Eye, Lock, Info, ChevronRight } from 'lucide-react-native';
import HealthReminderModal from '@/components/settings/HealthReminderModal';
import ParentalControlsModal from '@/components/settings/ParentalControlsModal';
import { useAppState } from '@/context/AppStateContext';

export default function SettingsScreen() {
  const { resetAppState } = useAppState();
  const [healthReminderEnabled, setHealthReminderEnabled] = useState(true);
  const [screenTimeLimit, setScreenTimeLimit] = useState(true);
  const [contentFiltering, setContentFiltering] = useState(true);
  const [showHealthModal, setShowHealthModal] = useState(false);
  const [showParentalModal, setShowParentalModal] = useState(false);

  const handleReset = () => {
    Alert.alert(
      'Tüm ilerlemeyi sıfırla',
      'Bu işlem tüm ilerlemeyi ve ayarları sıfırlayacak. Emin misin?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Sıfırla',
          style: 'destructive',
          onPress: () => resetAppState(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient
        colors={['#A9C9FF', '#FFBBEC']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Ayarlar</Text>
        <Text style={styles.headerSubtitle}>
          Uygulama ayarlarını buradan değiştirebilirsin
        </Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sağlık ve Konfor</Text>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => setShowHealthModal(true)}
          >
            <View style={styles.settingItemLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#F0F7FF' }]}>
                <Eye size={20} color="#4285F4" />
              </View>
              <View>
                <Text style={styles.settingItemTitle}>Göz Sağlığı Hatırlatıcısı</Text>
                <Text style={styles.settingItemDescription}>
                  Her 20 dakikada bir mola hatırlatması
                </Text>
              </View>
            </View>
            <Switch
              trackColor={{ false: '#E0E0E0', true: '#C6E3FF' }}
              thumbColor={healthReminderEnabled ? '#4285F4' : '#F5F5F5'}
              ios_backgroundColor="#E0E0E0"
              onValueChange={setHealthReminderEnabled}
              value={healthReminderEnabled}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ebeveyn Kontrolleri</Text>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => setShowParentalModal(true)}
          >
            <View style={styles.settingItemLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#FFF0F7' }]}>
                <Lock size={20} color="#FF4081" />
              </View>
              <View>
                <Text style={styles.settingItemTitle}>Ebeveyn Kontrol Paneli</Text>
                <Text style={styles.settingItemDescription}>
                  İçerik filtreleme ve ekran süresi ayarları
                </Text>
              </View>
            </View>
            <ChevronRight size={20} color="#BBBBBB" />
          </TouchableOpacity>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#FFF0F0' }]}>
                <Timer size={20} color="#F44336" />
              </View>
              <View>
                <Text style={styles.settingItemTitle}>Ekran Süresi Limiti</Text>
                <Text style={styles.settingItemDescription}>
                  Günlük kullanım süresi sınırı
                </Text>
              </View>
            </View>
            <Switch
              trackColor={{ false: '#E0E0E0', true: '#FFD0D0' }}
              thumbColor={screenTimeLimit ? '#F44336' : '#F5F5F5'}
              ios_backgroundColor="#E0E0E0"
              onValueChange={setScreenTimeLimit}
              value={screenTimeLimit}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#F0FFF0' }]}>
                <Bell size={20} color="#4CAF50" />
              </View>
              <View>
                <Text style={styles.settingItemTitle}>İçerik Filtreleme</Text>
                <Text style={styles.settingItemDescription}>
                  Yaşa uygun içerik kontrolü
                </Text>
              </View>
            </View>
            <Switch
              trackColor={{ false: '#E0E0E0', true: '#C8E6C9' }}
              thumbColor={contentFiltering ? '#4CAF50' : '#F5F5F5'}
              ios_backgroundColor="#E0E0E0"
              onValueChange={setContentFiltering}
              value={contentFiltering}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Uygulama Hakkında</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#F0F0FF' }]}>
                <Info size={20} color="#673AB7" />
              </View>
              <View>
                <Text style={styles.settingItemTitle}>Uygulama Bilgisi</Text>
                <Text style={styles.settingItemDescription}>
                  Sürüm 1.0.0
                </Text>
              </View>
            </View>
            <ChevronRight size={20} color="#BBBBBB" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.resetButton}
          onPress={handleReset}
        >
          <Text style={styles.resetButtonText}>
            Tüm İlerlemeyi Sıfırla
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <HealthReminderModal 
        visible={showHealthModal}
        onClose={() => setShowHealthModal(false)}
      />
      
      <ParentalControlsModal
        visible={showParentalModal}
        onClose={() => setShowParentalModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontFamily: 'BubblegumSans',
    fontSize: 28,
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontFamily: 'BubblegumSans',
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingItemTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  settingItemDescription: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#666',
  },
  resetButton: {
    backgroundColor: '#FF6A88',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  resetButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});