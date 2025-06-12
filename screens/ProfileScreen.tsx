import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Alert,
  Switch
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [isServiceProvider, setIsServiceProvider] = useState(true);

  // Mock user data
  const userData = {
    name: 'Thabo Mokoena',
    imageUrl: 'https://api.a0.dev/assets/image?text=TM&aspect=1:1',
    location: 'Soweto, Johannesburg',
    rating: 4.7,
    reviews: 23,
    joinDate: 'Joined August 2023',
    verified: true,
    completedJobs: 48,
    requestsMade: 12,
    services: [
      { id: '1', name: 'Electrical', description: 'Residential electrical repairs', price: 'R150-R300/hr' },
      { id: '2', name: 'Plumbing', description: 'Water system repairs', price: 'R180-R250/hr' }
    ],
    requests: [
      { id: '1', title: 'Fix leaking tap', status: 'active', date: '2 days ago', responses: 4 },
      { id: '2', title: 'Garden cleanup', status: 'pending', date: '5 days ago', responses: 1 },
      { id: '3', title: 'Math tutoring', status: 'completed', date: '2 weeks ago', provider: 'Sarah K.' }
    ],
    portfolio: [
      { id: '1', title: 'Kitchen Renovation', imageUrl: 'https://api.a0.dev/assets/image?text=Kitchen&aspect=16:9' },
      { id: '2', title: 'Bathroom Plumbing', imageUrl: 'https://api.a0.dev/assets/image?text=Bathroom&aspect=16:9' }
    ],
    skills: ['Electrical wiring', 'Circuit repair', 'Pipe fitting', 'Leak repair'],
    qualifications: ['National Certificate: Electrical Engineering', 'Plumbing Service Certificate']
  };

  const renderProfileHeader = () => (
    <View style={styles.profileHeader}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: userData.imageUrl }} style={styles.profileImage} />
        {userData.verified && (
          <View style={styles.verifiedBadge}>
            <MaterialIcons name="verified" size={20} color="blue" />
          </View>
        )}
      </View>
      <View style={styles.profileInfo}>
        <View>
          <Text style={styles.profileName}>{userData.name}</Text>
        </View>
        <Text style={styles.profileLocation}>
          <Feather name="map-pin" size={12} color="#666" /> {userData.location}
        </Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>
            {userData.rating} ({userData.reviews} reviews)
          </Text>
        </View>
        <Text style={styles.joinDate}>{userData.joinDate}</Text>
      </View>
    </View>
  );

  const renderStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{userData.completedJobs}</Text>
        <Text style={styles.statLabel}>Jobs Completed</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{userData.requestsMade}</Text>
        <Text style={styles.statLabel}>Requests Made</Text>
      </View>
    </View>
  );

  const renderServices = () => (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>My Services</Text>
        <TouchableOpacity style={styles.addButton}>
          <Feather name="plus" size={16} color="#2196F3" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={userData.services}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.serviceCard}>
            <Text style={styles.serviceName}>{item.name}</Text>
            <Text style={styles.serviceDescription}>{item.description}</Text>
            <View style={styles.serviceFooter}>
              <Text style={styles.servicePrice}>{item.price}</Text>
              <TouchableOpacity>
                <Feather name="edit-2" size={16} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </>
  );

  const renderRequests = () => (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>My Requests</Text>
      </View>
      <FlatList
        data={userData.requests}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.requestCard}>
            <View style={styles.requestHeader}>
              <View style={[
                styles.statusIndicator,
                {
                  backgroundColor:
                    item.status === 'active' ? '#4CAF50' :
                      item.status === 'pending' ? '#FF9800' : '#8BC34A'
                }
              ]} />
              <Text style={styles.requestStatus}>{item.status}</Text>
              <Text style={styles.requestDate}>{item.date}</Text>
            </View>
            <Text style={styles.requestTitle}>{item.title}</Text>
            {item.status === 'completed' ? (
              <Text style={styles.requestDetail}>
                <Feather name="check" size={12} color="#4CAF50" /> Completed by {item.provider}
              </Text>
            ) : (
              <Text style={styles.requestDetail}>
                <Feather name="users" size={12} color="#666" /> {item.responses} responses
              </Text>
            )}
          </TouchableOpacity>
        )}
      />
    </>
  );

  const renderPortfolio = () => (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Portfolio</Text>
        <TouchableOpacity style={styles.addButton}>
          <Feather name="plus" size={16} color="#2196F3" />
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={userData.portfolio}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.portfolioItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.portfolioImage} />
            <Text style={styles.portfolioTitle}>{item.title}</Text>
          </View>
        )}
      />
    </>
  );

  const renderSkills = () => (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Skills & Qualifications</Text>
      </View>
      <View style={styles.skillsContainer}>
        {userData.skills.map((skill, index) => (
          <View key={index} style={styles.skillTag}>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
      </View>
      {userData.qualifications.map((qual, index) => (
        <View key={`qual-${index}`} style={styles.qualificationItem}>
          <Feather name="award" size={16} color="#2196F3" />
          <Text style={styles.qualificationText}>{qual}</Text>
        </View>
      ))}
    </>
  );

  const renderSettings = () => (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
      </View>
      
      <TouchableOpacity style={styles.settingItem} 
      //@ts-ignore
      onPress={()=>navigation.navigate("EditProfile")}>
        <Feather name="user" size={18} color="#666" />
        <Text style={styles.settingText}>Edit Profile</Text>
        <Feather name="chevron-right" size={18} color="#999" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem}>
        <Feather name="credit-card" size={18} color="#666" />
        <Text style={styles.settingText}>Payment Methods</Text>
        <Feather name="chevron-right" size={18} color="#999" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem}>
        <Feather name="bell" size={18} color="#666" />
        <Text style={styles.settingText}>Notifications</Text>
        <Feather name="chevron-right" size={18} color="#999" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem}>
        <Feather name="lock" size={18} color="#666" />
        <Text style={styles.settingText}>Privacy & Security</Text>
        <Feather name="chevron-right" size={18} color="#999" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={() => Alert.alert('Logout', 'Are you sure you want to logout?')}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      <Text style={styles.versionText}>App Version 1.0.0</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        {renderProfileHeader()}

        {/* Stats */}
        {renderStats()}

        {/* Mode Toggle */}
        <View style={styles.modeToggle}>
          <Text style={styles.modeText}>Client Mode</Text>
          <Switch
            value={isServiceProvider}
            onValueChange={() => setIsServiceProvider(!isServiceProvider)}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isServiceProvider ? '#2196F3' : '#f4f3f4'}
          />
          <Text style={styles.modeText}>Provider Mode</Text>
        </View>

        {/* Content based on mode */}
        {isServiceProvider ? (
          <>
            {userData.services.length > 0 && renderServices()}
            {userData.portfolio.length > 0 && renderPortfolio()}
            {userData.skills.length > 0 && renderSkills()}
          </>
        ) : (
          userData.requests.length > 0 && renderRequests()
        )}

        {/* Settings */}
        {renderSettings()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: colors.headerColor,
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
  profileHeader: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatarContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#eee',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 10,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: 16,
    justifyContent: 'center',
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  profileLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
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
  joinDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 16,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#eee',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2196F3',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  modeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modeText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#333',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  addButton: {
    padding: 4,
  },
  serviceCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 8,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  servicePrice: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
  },
  requestCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  requestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  requestStatus: {
    fontSize: 12,
    fontWeight: '500',
    marginRight: 10,
    textTransform: 'capitalize',
  },
  requestDate: {
    fontSize: 12,
    color: '#999',
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  requestDetail: {
    fontSize: 13,
    color: '#666',
  },
  portfolioItem: {
    width: 160,
    marginLeft: 16,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
  },
  portfolioImage: {
    width: '100%',
    height: 100,
    backgroundColor: '#eee',
  },
  portfolioTitle: {
    fontSize: 12,
    padding: 8,
    color: '#333',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  skillTag: {
    backgroundColor: '#E3F2FD',
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
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  qualificationText: {
    fontSize: 14,
    marginLeft: 12,
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingText: {
    flex: 1,
    fontSize: 15,
    marginLeft: 12,
    color: '#333',
  },
  logoutButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2196F3',
    alignItems: 'center',
  },
  logoutText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '500',
  },
  versionText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginVertical: 16,
  },
});