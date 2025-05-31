import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { Eye, Clock, X } from 'lucide-react-native';

interface HealthReminderModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function HealthReminderModal({ visible, onClose }: HealthReminderModalProps) {
  const [eyeReminderEnabled, setEyeReminderEnabled] = useState(true);
  const [positionReminderEnabled, setPositionReminderEnabled] = useState(true);
  const [reminderInterval, setReminderInterval] = useState(20);
  
  const intervalOptions = [10, 15, 20, 30, 45, 60];
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Sağlık Hatırlatıcısı</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
            >
              <X size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.infoCard}>
              <Eye size={24} color="#4285F4" />
              <Text style={styles.infoText}>
                Uzun süre ekrana bakmak göz yorgunluğuna neden olabilir. 
                Düzenli molalar vererek gözlerini dinlendir!
              </Text>
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingLabel}>
                <Text style={styles.settingTitle}>Göz Molası</Text>
                <Text style={styles.settingDescription}>
                  Göz dinlendirme hatırlatması
                </Text>
              </View>
              <Switch
                trackColor={{ false: '#E0E0E0', true: '#C6E3FF' }}
                thumbColor={eyeReminderEnabled ? '#4285F4' : '#F5F5F5'}
                ios_backgroundColor="#E0E0E0"
                onValueChange={setEyeReminderEnabled}
                value={eyeReminderEnabled}
              />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingLabel}>
                <Text style={styles.settingTitle}>Oturuş Hatırlatması</Text>
                <Text style={styles.settingDescription}>
                  Doğru duruş hatırlatması
                </Text>
              </View>
              <Switch
                trackColor={{ false: '#E0E0E0', true: '#C6E3FF' }}
                thumbColor={positionReminderEnabled ? '#4285F4' : '#F5F5F5'}
                ios_backgroundColor="#E0E0E0"
                onValueChange={setPositionReminderEnabled}
                value={positionReminderEnabled}
              />
            </View>
            
            <Text style={styles.sectionTitle}>Hatırlatma Aralığı</Text>
            
            <View style={styles.intervalOptions}>
              {intervalOptions.map((interval) => (
                <TouchableOpacity
                  key={interval}
                  style={[
                    styles.intervalOption,
                    reminderInterval === interval && styles.selectedInterval
                  ]}
                  onPress={() => setReminderInterval(interval)}
                >
                  <Text style={[
                    styles.intervalText,
                    reminderInterval === interval && styles.selectedIntervalText
                  ]}>
                    {interval} dk
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.tipsContainer}>
              <Text style={styles.tipsTitle}>Göz Sağlığı İpuçları</Text>
              <View style={styles.tipItem}>
                <View style={styles.tipBullet} />
                <Text style={styles.tipText}>
                  20-20-20 Kuralı: Her 20 dakikada bir, 20 saniye boyunca 20 adım uzaklıktaki bir şeye bak.
                </Text>
              </View>
              <View style={styles.tipItem}>
                <View style={styles.tipBullet} />
                <Text style={styles.tipText}>
                  Düzenli olarak göz kırp. Ekrana bakarken daha az göz kırpıyoruz.
                </Text>
              </View>
              <View style={styles.tipItem}>
                <View style={styles.tipBullet} />
                <Text style={styles.tipText}>
                  Gözlerini ovala: Ellerini 15 saniye boyunca ısıt ve nazikçe gözlerine koy (dokunmadan).
                </Text>
              </View>
            </View>
          </ScrollView>
          
          <TouchableOpacity
            style={styles.saveButton}
            onPress={onClose}
          >
            <Text style={styles.saveButtonText}>Kaydet</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: 'BubblegumSans',
    fontSize: 22,
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  modalContent: {
    maxHeight: '80%',
  },
  infoCard: {
    backgroundColor: '#F0F7FF',
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingLabel: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  settingDescription: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontFamily: 'BubblegumSans',
    fontSize: 18,
    color: '#333',
    marginTop: 10,
    marginBottom: 15,
  },
  intervalOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  intervalOption: {
    width: '31%',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedInterval: {
    backgroundColor: '#4285F4',
  },
  intervalText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#666',
  },
  selectedIntervalText: {
    color: '#FFFFFF',
  },
  tipsContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  tipsTitle: {
    fontFamily: 'BubblegumSans',
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  tipBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4285F4',
    marginTop: 6,
    marginRight: 8,
  },
  tipText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});