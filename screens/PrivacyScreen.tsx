import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert
} from 'react-native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';

const PrivacySecurityScreen = () => {
  const [settings, setSettings] = useState({
    biometricAuth: true,
    activityAlerts: true,
    marketingEmails: false,
    locationTracking: false,
    searchVisibility: true,
    messagePrivacy: 'all',
    dataSharing: false
  });

  const toggleSetting = (setting) => {
    setSettings({...settings, [setting]: !settings[setting]});
  };

  const showConfirmation = (action) => {
    Alert.alert(
      `Change ${action} setting?`,
      `Are you sure you want to ${settings[action] ? 'disable' : 'enable'} ${action}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm', 
          onPress: () => toggleSetting(action),
          style: 'destructive'
        }
      ]
    );
  };

  const renderPrivacyOption = (title, description, iconName, action, needsConfirmation = false) => (
    <TouchableOpacity 
      style={styles.optionContainer}
      onPress={() => needsConfirmation ? showConfirmation(action) : toggleSetting(action)}
      activeOpacity={0.7}
    >
      <View style={styles.optionLeft}>
        <View style={styles.iconCircle}>
          <Feather name={iconName} size={20} color="#2196F3" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.optionTitle}>{title}</Text>
          <Text style={styles.optionDescription}>{description}</Text>
        </View>
      </View>
      <Switch
        value={settings[action]}
        onValueChange={() => needsConfirmation ? showConfirmation(action) : toggleSetting(action)}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={settings[action] ? "#2196F3" : "#f4f3f4"}
      />
    </TouchableOpacity>
  );

  const renderSecuritySection = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Security</Text>
      {renderPrivacyOption(
        "Biometric Authentication", 
        "Use fingerprint or face recognition to log in", 
        "lock", 
        "biometricAuth",
        true
      )}
      {renderPrivacyOption(
        "Activity Alerts", 
        "Get notified about suspicious account activity", 
        "alert-circle", 
        "activityAlerts"
      )}
      <TouchableOpacity style={styles.optionContainer} activeOpacity={0.7}>
        <View style={styles.optionLeft}>
          <View style={styles.iconCircle}>
            <Feather name="shield" size={20} color="#2196F3" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>Change Password</Text>
            <Text style={styles.optionDescription}>Update your account password</Text>
          </View>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#999" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionContainer} activeOpacity={0.7}>
        <View style={styles.optionLeft}>
          <View style={styles.iconCircle}>
            <Feather name="users" size={20} color="#2196F3" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>Active Sessions</Text>
            <Text style={styles.optionDescription}>View and manage logged-in devices</Text>
          </View>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#999" />
      </TouchableOpacity>
    </View>
  );

  const renderPrivacySection = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Privacy</Text>
      {renderPrivacyOption(
        "Location Tracking", 
        "Allow app to access your location for better service matching", 
        "map-pin", 
        "locationTracking",
        true
      )}
      {renderPrivacyOption(
        "Profile Visibility", 
        "Control who can see your profile in search results", 
        "eye", 
        "searchVisibility",
        true
      )}
      <View style={styles.privacyOption}>
        <View style={styles.optionLeft}>
          <View style={styles.iconCircle}>
            <Feather name="message-square" size={20} color="#2196F3" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>Message Privacy</Text>
            <Text style={styles.optionDescription}>Control who can message you</Text>
          </View>
        </View>
        <View style={styles.privacySelector}>
          <TouchableOpacity 
            style={[
              styles.privacyChoice, 
              settings.messagePrivacy === 'all' && styles.activeChoice
            ]}
            onPress={() => setSettings({...settings, messagePrivacy: 'all'})}
          >
            <Text style={[
              styles.choiceText,
              settings.messagePrivacy === 'all' && styles.activeChoiceText
            ]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.privacyChoice, 
              settings.messagePrivacy === 'contacts' && styles.activeChoice
            ]}
            onPress={() => setSettings({...settings, messagePrivacy: 'contacts'})}
          >
            <Text style={[
              styles.choiceText,
              settings.messagePrivacy === 'contacts' && styles.activeChoiceText
            ]}>Contacts</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.privacyChoice, 
              settings.messagePrivacy === 'none' && styles.activeChoice
            ]}
            onPress={() => setSettings({...settings, messagePrivacy: 'none'})}
          >
            <Text style={[
              styles.choiceText,
              settings.messagePrivacy === 'none' && styles.activeChoiceText
            ]}>None</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderDataSection = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Data & Permissions</Text>
      {renderPrivacyOption(
        "Marketing Communications", 
        "Receive emails about new features and promotions", 
        "mail", 
        "marketingEmails"
      )}
      {renderPrivacyOption(
        "Data Sharing for Analytics", 
        "Help improve the app by sharing usage data", 
        "bar-chart-2", 
        "dataSharing",
        true
      )}
      <TouchableOpacity style={styles.optionContainer} activeOpacity={0.7}>
        <View style={styles.optionLeft}>
          <View style={styles.iconCircle}>
            <Feather name="download" size={20} color="#2196F3" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>Download Your Data</Text>
            <Text style={styles.optionDescription}>Get a copy of your personal data</Text>
          </View>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#999" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionContainer} activeOpacity={0.7}>
        <View style={styles.optionLeft}>
          <View style={styles.iconCircle}>
            <Feather name="trash-2" size={20} color="#2196F3" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>Delete Account</Text>
            <Text style={styles.optionDescription}>Permanently remove your account and data</Text>
          </View>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#999" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Privacy & Security</Text>
        </View>
        
        {/* Security Section */}
        {renderSecuritySection()}
        
        {/* Privacy Section */}
        {renderPrivacySection()}
        
        {/* Data Section */}
        {renderDataSection()}
        
        {/* Footer Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Last updated: {new Date().toLocaleDateString()}
          </Text>
          <TouchableOpacity style={styles.privacyPolicyButton}>
            <Text style={styles.privacyPolicyText}>View Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    padding: 16,
    paddingBottom: 8,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  privacyOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 13,
    color: '#666',
  },
  privacySelector: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    overflow: 'hidden',
  },
  privacyChoice: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  activeChoice: {
    backgroundColor: '#2196F3',
    borderRadius: 6,
  },
  choiceText: {
    fontSize: 14,
    color: '#666',
  },
  activeChoiceText: {
    color: '#fff',
  },
  infoContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 16,
  },
  privacyPolicyButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  privacyPolicyText: {
    color: '#2196F3',
    fontWeight: '500',
  },
});

export default PrivacySecurityScreen;