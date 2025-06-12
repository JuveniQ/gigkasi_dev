import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  FlatList
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

// Service categories for the app
const serviceCategories = [
  { id: '1', name: 'Plumbing', icon: 'plumbing' },
  { id: '2', name: 'Electrical', icon: 'electrical-services' },
  { id: '3', name: 'Tutoring', icon: 'school' },
  { id: '4', name: 'Cleaning', icon: 'cleaning-services' },
  { id: '5', name: 'Gardening', icon: 'yard' },
  { id: '6', name: 'Beauty', icon: 'content-cut' },
  { id: '7', name: 'Transport', icon: 'directions-car' },
  { id: '8', name: 'Cooking', icon: 'restaurant' },
];

// Mock data for nearby providers
const nearbyProviders = [
  {
    id: '1',
    name: 'John M.',
    service: 'Plumbing',
    rating: 4.8,
    reviews: 24,
    distance: '0.8 km',
    imageUrl: 'https://api.a0.dev/assets/image?text=John%20M.%20Plumber&aspect=1:1',
    verified: true
  },
  {
    id: '2',
    name: 'Sarah K.',
    service: 'Tutoring',
    rating: 4.9,
    reviews: 37,
    distance: '1.2 km',
    imageUrl: 'https://api.a0.dev/assets/image?text=Sarah%20K.%20Tutor&aspect=1:1',
    verified: true
  },
  {
    id: '3',
    name: 'David N.',
    service: 'Electrical',
    rating: 4.7,
    reviews: 18,
    distance: '1.5 km',
    imageUrl: 'https://api.a0.dev/assets/image?text=David%20N.%20Electrician&aspect=1:1',
    verified: false
  },
];

// Mock data for live gigs (requests)
const liveRequests = [
  {
    id: '1',
    title: 'Fix leaking tap urgently',
    category: 'Plumbing',
    location: 'Soweto, Zone 4',
    time: 'Today, ASAP',
    postedTime: '25 min ago',
  },
  {
    id: '2',
    title: 'Need help with Grade 10 Math',
    category: 'Tutoring',
    location: 'Orlando East',
    time: 'Tomorrow, 4PM',
    postedTime: '1 hour ago',
  },
  {
    id: '3',
    title: 'Garden maintenance needed',
    category: 'Gardening',
    location: 'Diepkloof',
    time: 'This weekend',
    postedTime: '3 hours ago',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Soweto, Johannesburg');
  
  const handleProviderPress = (provider) => {
    //@ts-ignore
    navigation.navigate('ProviderDetails', { provider });
  };

  const handleRequestPress = (request) => {
    //@ts-ignore
    navigation.navigate('RequestDetails', { request });
  };

  const handleCreateRequestPress = () => {
    //@ts-ignore
    navigation.navigate('CreateRequest');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header with location */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <MaterialIcons name="location-on" size={24} color="#FFFFFF" />
          <Text style={styles.locationText}>{location}</Text>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#FFFFFF" />
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          //@ts-ignore
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons name="person-circle-outline" size={32} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Find a service provider..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Service Categories */}
        <Text style={styles.sectionTitle}>Services</Text>
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {serviceCategories.map((category) => (
              <TouchableOpacity 
                key={category.id} 
                style={styles.categoryItem}
                //@ts-ignore
                onPress={() => navigation.navigate('Discover', { category: category.name })}
              >
                <View style={styles.categoryIcon}>
                  <MaterialIcons name={category.icon as any} size={22} color="#FFFFFF" />
                </View>
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Live Requests Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Live Requests</Text>
          
          <TouchableOpacity 
          //@ts-ignore
          onPress={() => navigation.navigate('Discover', { tab: 'requests' })}>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.requestsContainer}>
          {liveRequests.map((request) => (
            <TouchableOpacity 
              key={request.id} 
              style={styles.requestCard}
              onPress={() => handleRequestPress(request)}
            >
              <View style={styles.requestHeader}>
                <Text style={styles.requestCategory}>{request.category}</Text>
                <Text style={styles.requestTime}>{request.postedTime}</Text>
              </View>
              <Text style={styles.requestTitle}>{request.title}</Text>
              <View style={styles.requestDetails}>
                <View style={styles.requestDetail}>
                  <Ionicons name="location-outline" size={14} color="#666" />
                  <Text style={styles.requestDetailText}>{request.location}</Text>
                </View>
                <View style={styles.requestDetail}>
                  <Ionicons name="time-outline" size={14} color="#666" />
                  <Text style={styles.requestDetailText}>{request.time}</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.respondButton}
                onPress={() => handleRequestPress(request)}
              >
                <Text style={styles.respondButtonText}>Respond</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Nearby Providers Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Providers</Text>
          {/*@ts*/}
          <TouchableOpacity 
          //@ts-ignore
          onPress={() => navigation.navigate('Discover', { tab: 'providers' })}>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={nearbyProviders}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity 
              style={styles.providerCard}
              onPress={() => handleProviderPress(item)}
            >
              <Image source={{uri: item.imageUrl}} style={styles.providerImage} />
              {item.verified && (
                <View style={styles.verifiedBadge}>
                  <MaterialIcons name="verified" size={14} color="#FFFFFF" />
                </View>
              )}
              <Text style={styles.providerName}>{item.name}</Text>
              <Text style={styles.providerService}>{item.service}</Text>
              <View style={styles.providerDetails}>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.ratingText}>{item.rating} ({item.reviews})</Text>
                </View>
                <Text style={styles.distanceText}>{item.distance}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          style={styles.providersContainer}
        />

        {/* Create Request Button */}
        <View style={styles.createRequestContainer}>
          <TouchableOpacity 
            style={styles.createRequestButton}
            onPress={handleCreateRequestPress}
          >
            <MaterialIcons name="add" size={24} color="#FFFFFF" />
            <Text style={styles.createRequestText}>Post a Request</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom navigation is now handled by Tab Navigator */}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 4,
  },
  profileButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0D47A1',
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 15,
  },
  filterButton: {
    width: 40,
    height: 40,
    backgroundColor: '#2196F3',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  viewAllText: {
    color: '#2196F3',
    fontSize: 14,
  },
  categoriesContainer: {
    paddingLeft: 16,
    marginBottom: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 70,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    textAlign: 'center',
  },
  requestsContainer: {
    paddingHorizontal: 16,
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  requestCategory: {
    fontSize: 13,
    color: '#2196F3',
    fontWeight: '500',
  },
  requestTime: {
    fontSize: 12,
    color: '#999',
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  requestDetails: {
    marginBottom: 12,
  },
  requestDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  requestDetailText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  respondButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    paddingVertical: 8,
    alignItems: 'center',
  },
  respondButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  providersContainer: {
    paddingLeft: 16,
    marginBottom: 24,
  },
  providerCard: {
    width: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  providerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
    alignSelf: 'center',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  providerName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  providerService: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  providerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 2,
  },
  distanceText: {
    fontSize: 12,
    color: '#666',
  },
  createRequestContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  createRequestButton: {
    backgroundColor: '#2196F3',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  createRequestText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});