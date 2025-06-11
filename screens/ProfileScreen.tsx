import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
  Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [isServiceProvider, setIsServiceProvider] = useState(true);
  
  // Mock profile data
  const profileData = {
    name: 'Thabo Mokoena',
    imageUrl: 'https://api.a0.dev/assets/image?text=Thabo%20M.&aspect=1:1',
    location: 'Soweto, Johannesburg',
    rating: 4.7,
    reviews: 23,
    joinDate: 'August 2023',
    verified: true,
    services: [
      { id: '1', name: 'Electrical', description: 'Residential electrical repairs and installations', priceRange: 'R150-R300/hr' },
      { id: '2', name: 'Plumbing', description: 'Water system repairs and maintenance', priceRange: 'R180-R250/hr' }
    ],
    portfolio: [
      { id: '1', title: 'Kitchen Renovation', imageUrl: 'https://api.a0.dev/assets/image?text=Kitchen%20Renovation&aspect=16:9' },
      { id: '2', title: 'Bathroom Plumbing', imageUrl: 'https://api.a0.dev/assets/image?text=Bathroom%20Plumbing&aspect=16:9' },
      { id: '3', title: 'Electrical Panel', imageUrl: 'https://api.a0.dev/assets/image?text=Electrical%20Panel&aspect=16:9' }
    ],
    skills: ['Electrical wiring', 'Circuit repair', 'Pipe fitting', 'Leak repair', 'Light fixtures', 'Water heaters'],
    qualifications: ['National Certificate: Electrical Engineering', 'Plumbing Service Certificate'],
    completedJobs: 48,
    currentBalance: 'R3,200'
  };
  
  const renderProviderProfile = () => {
    return (
      <ScrollView style={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: profileData.imageUrl }} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <View style={styles.nameContainer}>
              <Text style={styles.profileName}>{profileData.name}</Text>
              {profileData.verified && (
                <MaterialIcons name="verified" size={16} color="#2196F3" style={styles.verifiedIcon} />
              )}
            </View>
            <Text style={styles.profileLocation}>{profileData.location}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{profileData.rating} ({profileData.reviews} reviews)</Text>
            </View>
          </View>
        </View>

        {/* Professional Status */}
        <View style={styles.statusContainer}>
          <View style={styles.statusItem}>
            <Text style={styles.statusValue}>{profileData.completedJobs}</Text>
            <Text style={styles.statusLabel}>Jobs Completed</Text>
          </View>
          <View style={styles.statusDivider} />
          <View style={styles.statusItem}>
            <Text style={styles.statusValue}>{profileData.currentBalance}</Text>
            <Text style={styles.statusLabel}>Current Balance</Text>
          </View>
        </View>
        
        {/* Services Offered */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>My Services</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add-circle" size={20} color="#2196F3" />
            <Text style={styles.addButtonText}>Add Service</Text>
          </TouchableOpacity>
        </View>
        
        {profileData.services.map((service) => (
          <View key={service.id} style={styles.serviceCard}>
            <View style={styles.serviceHeader}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <TouchableOpacity>
                <MaterialIcons name="edit" size={18} color="#666" />
              </TouchableOpacity>
            </View>
            <Text style={styles.serviceDescription}>{service.description}</Text>
            <View style={styles.priceContainer}>
              <MaterialIcons name="payments" size={16} color="#666" />
              <Text style={styles.priceText}>{service.priceRange}</Text>
            </View>
          </View>
        ))}
        
        {/* Portfolio */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Portfolio</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add-circle" size={20} color="#2196F3" />
            <Text style={styles.addButtonText}>Add Photo</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.portfolioContainer}>
          {profileData.portfolio.map((item) => (
            <View key={item.id} style={styles.portfolioItem}>
              <Image source={{ uri: item.imageUrl }} style={styles.portfolioImage} />
              <Text style={styles.portfolioTitle}>{item.title}</Text>
            </View>
          ))}
        </ScrollView>
        
        {/* Skills & Qualifications */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Skills & Expertise</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add-circle" size={20} color="#2196F3" />
            <Text style={styles.addButtonText}>Add Skill</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.skillsContainer}>
          {profileData.skills.map((skill, index) => (
            <View key={index} style={styles.skillBadge}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Qualifications & Certificates</Text>
        </View>
        
        {profileData.qualifications.map((qualification, index) => (
          <View key={index} style={styles.qualificationItem}>
            <MaterialIcons name="school" size={18} color="#2196F3" />
            <Text style={styles.qualificationText}>{qualification}</Text>
          </View>
        ))}
        
        {/* Account Settings */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
        </View>
        
        <TouchableOpacity style={styles.settingItem}>
          <MaterialIcons name="person" size={22} color="#666" />
          <Text style={styles.settingText}>Edit Profile</Text>
          <MaterialIcons name="chevron-right" size={22} color="#999" style={styles.settingArrow} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <MaterialIcons name="payment" size={22} color="#666" />
          <Text style={styles.settingText}>Payment Information</Text>
          <MaterialIcons name="chevron-right" size={22} color="#999" style={styles.settingArrow} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <MaterialIcons name="notifications" size={22} color="#666" />
          <Text style={styles.settingText}>Notifications</Text>
          <MaterialIcons name="chevron-right" size={22} color="#999" style={styles.settingArrow} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <MaterialIcons name="privacy-tip" size={22} color="#666" />
          <Text style={styles.settingText}>Privacy & Security</Text>
          <MaterialIcons name="chevron-right" size={22} color="#999" style={styles.settingArrow} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <MaterialIcons name="help" size={22} color="#666" />
          <Text style={styles.settingText}>Help & Support</Text>
          <MaterialIcons name="chevron-right" size={22} color="#999" style={styles.settingArrow} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => Alert.alert('Logout', 'Are you sure you want to logout?')}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>GigKasi v1.0.0</Text>
        </View>
      </ScrollView>
    );
  };
  
  const renderClientProfile = () => {
    return (
      <ScrollView style={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: profileData.imageUrl }} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profileData.name}</Text>
            <Text style={styles.profileLocation}>{profileData.location}</Text>
            <Text style={styles.memberSince}>Member since {profileData.joinDate}</Text>
          </View>
        </View>
        
        {/* My Requests */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>My Requests</Text>
        </View>
        
        <TouchableOpacity style={styles.clientCard}>
          <View style={styles.clientCardHeader}>
            <View style={styles.requestStatusContainer}>
              <View style={[styles.statusDot, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.requestStatus}>Active</Text>
            </View>
            <Text style={styles.requestDate}>Posted 2 days ago</Text>
          </View>
          <Text style={styles.requestTitle}>Fix leaking tap urgently</Text>
          <View style={styles.requestDetail}>
            <Ionicons name="person" size={14} color="#666" />
            <Text style={styles.detailText}>4 responses</Text>
          </View>
          <View style={styles.requestDetail}>
            <Ionicons name="location" size={14} color="#666" />
            <Text style={styles.detailText}>Soweto, Zone 4</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.clientCard}>
          <View style={styles.clientCardHeader}>
            <View style={styles.requestStatusContainer}>
              <View style={[styles.statusDot, { backgroundColor: '#FF9800' }]} />
              <Text style={styles.requestStatus}>Pending</Text>
            </View>
            <Text style={styles.requestDate}>Posted 5 days ago</Text>
          </View>
          <Text style={styles.requestTitle}>Need help with garden cleanup</Text>
          <View style={styles.requestDetail}>
            <Ionicons name="person" size={14} color="#666" />
            <Text style={styles.detailText}>1 response</Text>
          </View>
          <View style={styles.requestDetail}>
            <Ionicons name="location" size={14} color="#666" />
            <Text style={styles.detailText}>Orlando East</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.clientCard}>
          <View style={styles.clientCardHeader}>
            <View style={styles.requestStatusContainer}>
              <View style={[styles.statusDot, { backgroundColor: '#8BC34A' }]} />
              <Text style={styles.requestStatus}>Completed</Text>
            </View>
            <Text style={styles.requestDate}>2 weeks ago</Text>
          </View>
          <Text style={styles.requestTitle}>Mathematics tutoring for Grade 10</Text>
          <View style={styles.requestDetail}>
            <Ionicons name="checkmark-circle" size={14} color="#4CAF50" />
            <Text style={styles.detailText}>Completed by Sarah K.</Text>
          </View>
          <View style={styles.requestDetail}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.detailText}>You rated: 4.9</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.createRequestButton}
          onPress={() => navigation.navigate('CreateRequest')}
        >
          <Text style={styles.createRequestText}>Create New Request</Text>
        </TouchableOpacity>
        
        {/* Account Settings */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
        </View>
        
        <TouchableOpacity style={styles.settingItem}>
          <MaterialIcons name="person" size={22} color="#666" />
          <Text style={styles.settingText}>Edit Profile</Text>
          <MaterialIcons name="chevron-right" size={22} color="#999" style={styles.settingArrow} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <MaterialIcons name="payment" size={22} color="#666" />
          <Text style={styles.settingText}>Payment Methods</Text>
          <MaterialIcons name="chevron-right" size={22} color="#999" style={styles.settingArrow} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <MaterialIcons name="notifications" size={22} color="#666" />
          <Text style={styles.settingText}>Notifications</Text>
          <MaterialIcons name="chevron-right" size={22} color="#999" style={styles.settingArrow} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <MaterialIcons name="help" size={22} color="#666" />
          <Text style={styles.settingText}>Help & Support</Text>
          <MaterialIcons name="chevron-right" size={22} color="#999" style={styles.settingArrow} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => Alert.alert('Logout', 'Are you sure you want to logout?')}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>GigKasi v1.0.0</Text>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      
      {/* Mode Toggle */}
      <View style={styles.modeToggleContainer}>
        <Text style={styles.modeLabel}>Client Mode</Text>
        <Switch
          trackColor={{ false: "#CCCCCC", true: "#81b0ff" }}
          thumbColor={isServiceProvider ? "#2196F3" : "#f4f3f4"}
          ios_backgroundColor="#CCCCCC"
          onValueChange={() => setIsServiceProvider(previousState => !previousState)}
          value={isServiceProvider}
        />
        <Text style={styles.modeLabel}>Provider Mode</Text>
      </View>
      
      {isServiceProvider ? renderProviderProfile() : renderClientProfile()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#0D47A1',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modeToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  modeLabel: {
    marginHorizontal: 8,
    fontSize: 14,
    color: '#333',
  },
  scrollContent: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 16,
    justifyContent: 'center',
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  profileLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  memberSince: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  statusItem: {
    flex: 1,
    alignItems: 'center',
  },
  statusDivider: {
    width: 1,
    backgroundColor: '#EEEEEE',
  },
  statusValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statusLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 14,
    color: '#444',
    marginLeft: 6,
  },
  portfolioContainer: {
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  portfolioItem: {
    width: 160,
    marginHorizontal: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  portfolioImage: {
    width: '100%',
    height: 100,
  },
  portfolioTitle: {
    fontSize: 12,
    padding: 8,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  skillBadge: {
    backgroundColor: '#F0F7FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 12,
    color: '#2196F3',
  },
  qualificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  qualificationText: {
    fontSize: 14,
    marginLeft: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  settingText: {
    fontSize: 15,
    marginLeft: 12,
    flex: 1,
  },
  settingArrow: {
    marginLeft: 'auto',
  },
  logoutButton: {
    backgroundColor: '#F0F7FF',
    marginHorizontal: 16,
    marginVertical: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  logoutText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '500',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingBottom: 32,
  },
  versionText: {
    color: '#999',
    fontSize: 12,
  },
  clientCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  clientCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  requestStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  requestStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  requestDate: {
    fontSize: 12,
    color: '#999',
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  requestDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  detailText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 6,
  },
  createRequestButton: {
    backgroundColor: '#2196F3',
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  createRequestText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});