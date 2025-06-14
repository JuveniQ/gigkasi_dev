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
import colors from '../constants/colors'
import { serviceCategories, liveRequests, nearbyProviders } from '../constants/mockData';
import Fuse from 'fuse.js';

export default function Dashboard() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  //const [location, setLocation] = useState('Soweto, Johannesburg');
  
  //search functionality using Fuse.js
const trimmedQuery = searchQuery.trim();

// Configure Fuse.js options
const fuseOptions = {
  keys: ['title', 'category'],  // Fields to search
  threshold: 0.4,              // Adjust for fuzziness (0=exact, 1=loose)
  includeScore: true,           // Optional: shows match confidence
  ignoreLocation: true,        // Search across entire strings
  minMatchCharLength: 2        // Min characters to trigger a match
};

// Initialize Fuse with your data
const fuse = new Fuse(liveRequests, fuseOptions);

// Perform search (returns an array of { item, score } objects)
const fuseResults = trimmedQuery 
  ? fuse.search(trimmedQuery).map(result => result.item) 
  : liveRequests;

// Combine with your original exact match filter (optional)
const exactMatches = liveRequests.filter(req => {
  const lowerQuery = trimmedQuery.toLowerCase();
  return (
    req.title.toLowerCase().includes(lowerQuery) || 
    req.category.toLowerCase().includes(lowerQuery)
  );
});

// Merge and deduplicate results (Set removes duplicates)
const filteredRequests = [...new Set([
  ...exactMatches,
  ...fuseResults
])];

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
      
     <View style={styles.header}>
  <View style={styles.logo_container}>
    <Text style={styles.logo_main}>Gig</Text>
    <Text style={styles.logo_secondary}>Kasi</Text>
  </View>
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
          {filteredRequests.map((request) => (
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
              <Image source={{uri: item.imageUrl}} style={styles.providerImage as any} />
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
            <Ionicons name="add" size={24} color='white' />
            <Text style={styles.createRequestText}>Post a Request</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
},
header: {
    backgroundColor: colors.main,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
},
logo_container: {
    flexDirection: 'row',
    alignItems: 'center',
},
logo_main: {
    fontSize: 36,
    fontWeight: '800',
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    transform: [{ perspective: 1000 }, { rotateX: '5deg' }],
    letterSpacing: 0.5,
    paddingRight: 2,
},
logo_secondary: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFD700', // More refined gold/yellow
    textShadowColor: 'rgba(255,255,255,0.3)',
    textShadowOffset: { 
        width: -1, 
        height: 1 
    },
    textShadowRadius: 2,
    transform: [{ perspective: 1000 }, { rotateX: '5deg' }],
    letterSpacing: 0.5,
    position: 'relative',
},
  profileButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.main,
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
    backgroundColor: colors.support,
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
    color: 'green',
    fontSize: 14,
  },
  categoriesContainer: {
    paddingLeft: 16,
    marginBottom: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 70
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.support,
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
    color: 'green',
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
    backgroundColor: colors.support,
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
    paddingBottom:1.5,
    marginBottom: 28,
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
    backgroundColor: colors.support,
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