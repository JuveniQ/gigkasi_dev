import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const colors = {
  backgroundColor: '#F5F7FA',
  serviceColor: '#FFFFFF', // fallback for service blocks
  categoryColor: '#00897A',
  searchBgColor: '#004D40',
  headerColor: '#004D40',
  buttonColor: '#00897A',
  tabBarColor: '#00897A',
};

export default function UnifiedProfileScreen() {
  const navigation = useNavigation();
  const [showServices, setShowServices] = useState(true);

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
    requests: [
      { id: '1', title: 'Fix leaking tap urgently', status: 'Active', location: 'Soweto, Zone 4', responses: 4, date: '2 days ago' },
      { id: '2', title: 'Need help with garden cleanup', status: 'Pending', location: 'Orlando East', responses: 1, date: '5 days ago' },
      { id: '3', title: 'Mathematics tutoring for Grade 10', status: 'Completed', location: 'Online', completedBy: 'Sarah K.', rating: 4.9, date: '2 weeks ago' },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={() => setShowServices(!showServices)}>
          <Text style={styles.toggleView}>{showServices ? 'View Requests' : 'View Services'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: profileData.imageUrl }} style={styles.profileImage} />
          <View>
            <Text style={styles.profileName}>{profileData.name}</Text>
            <Text style={styles.profileLocation}>{profileData.location}</Text>
            <Text style={styles.memberSince}>Member since {profileData.joinDate}</Text>
          </View>
        </View>

        {showServices ? (
          <View>
            <Text style={styles.sectionTitle}>My Services</Text>
            {profileData.services.map(service => (
              <View key={service.id} style={styles.card}>
                <Text style={styles.cardTitle}>{service.name}</Text>
                <Text style={styles.cardText}>{service.description}</Text>
                <Text style={styles.cardText}>{service.priceRange}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Add Service</Text></TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.sectionTitle}>My Requests</Text>
            {profileData.requests.map(req => (
              <View key={req.id} style={styles.card}>
                <Text style={styles.cardTitle}>{req.title}</Text>
                <Text style={styles.cardText}>Status: {req.status}</Text>
                <Text style={styles.cardText}>Location: {req.location}</Text>
                <Text style={styles.cardText}>Posted: {req.date}</Text>
                {req.status === 'Completed' && (
                  <Text style={styles.cardText}>Rated: {req.rating} by {req.completedBy}</Text>
                )}
              </View>
            ))}
            <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Create Request</Text></TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor
  },
  header: {
    backgroundColor: colors.headerColor,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  toggleView: {
    color: '#fff',
    textDecorationLine: 'underline'
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  profileLocation: {
    color: '#555'
  },
  memberSince: {
    color: '#999'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingTop: 16
  },
  card: {
    backgroundColor: colors.serviceColor,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16
  },
  cardText: {
    marginTop: 4,
    color: '#444'
  },
  button: {
    backgroundColor: colors.buttonColor,
    margin: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
