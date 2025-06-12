import React, { act, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  FlatList, 
  TextInput,
  Image,
  ScrollView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

// Mock data for providers
const allProviders = [
  {
    id: '1',
    name: 'John M.',
    service: 'Plumbing',
    rating: 4.8,
    reviews: 24,
    distance: '0.8 km',
    imageUrl: 'https://api.a0.dev/assets/image?text=John%20M.%20Plumber&aspect=1:1',
    verified: true,
    skills: ['Pipe repairs', 'Installation', 'Maintenance'],
    hourlyRate: 'R150-R200',
    description: 'Professional plumber with 8+ years of experience in residential repairs.'
  },
  {
    id: '2',
    name: 'Sarah K.',
    service: 'Tutoring',
    rating: 4.9,
    reviews: 37,
    distance: '1.2 km',
    imageUrl: 'https://api.a0.dev/assets/image?text=Sarah%20K.%20Tutor&aspect=1:1',
    verified: true,
    skills: ['Mathematics', 'Science', 'English'],
    hourlyRate: 'R120-R180',
    description: 'Certified teacher providing tutoring services for primary and high school students.'
  },
  {
    id: '3',
    name: 'David N.',
    service: 'Electrical',
    rating: 4.7,
    reviews: 18,
    distance: '1.5 km',
    imageUrl: 'https://api.a0.dev/assets/image?text=David%20N.%20Electrician&aspect=1:1',
    verified: false,
    skills: ['Wiring', 'Installations', 'Repairs'],
    hourlyRate: 'R180-R250',
    description: 'Experienced electrician specializing in residential and small business services.'
  },
  {
    id: '4',
    name: 'Thandi M.',
    service: 'Cleaning',
    rating: 4.6,
    reviews: 42,
    distance: '0.5 km',
    imageUrl: 'https://api.a0.dev/assets/image?text=Thandi%20M.%20Cleaner&aspect=1:1',
    verified: true,
    skills: ['Deep cleaning', 'Regular maintenance', 'Office cleaning'],
    hourlyRate: 'R100-R140',
    description: 'Thorough and efficient cleaning services for homes and small offices.'
  },
  {
    id: '5',
    name: 'Sipho Z.',
    service: 'Gardening',
    rating: 4.5,
    reviews: 15,
    distance: '2.0 km',
    imageUrl: 'https://api.a0.dev/assets/image?text=Sipho%20Z.%20Gardener&aspect=1:1',
    verified: false,
    skills: ['Lawn maintenance', 'Plant care', 'Garden design'],
    hourlyRate: 'R100-R150',
    description: 'Passionate gardener with expertise in local plants and landscape maintenance.'
  }
];

// Mock data for requests
const allRequests = [
  {
    id: '1',
    title: 'Fix leaking tap urgently',
    category: 'Plumbing',
    location: 'Soweto, Zone 4',
    time: 'Today, ASAP',
    postedTime: '25 min ago',
    description: 'Kitchen sink is leaking badly and causing water damage. Need someone to fix it today.',
    budget: 'R200-R350',
    poster: {
      name: 'Themba K.',
      rating: 4.7,
      imageUrl: 'https://api.a0.dev/assets/image?text=Themba%20K.&aspect=1:1'
    }
  },
  {
    id: '2',
    title: 'Need help with Grade 10 Math',
    category: 'Tutoring',
    location: 'Orlando East',
    time: 'Tomorrow, 4PM',
    postedTime: '1 hour ago',
    description: 'Looking for a tutor to help my child with Grade 10 algebra and trigonometry. Must be patient and experienced.',
    budget: 'R150/hour',
    poster: {
      name: 'Nomsa S.',
      rating: 4.8,
      imageUrl: 'https://api.a0.dev/assets/image?text=Nomsa%20S.&aspect=1:1'
    }
  },
  {
    id: '3',
    title: 'Garden maintenance needed',
    category: 'Gardening',
    location: 'Diepkloof',
    time: 'This weekend',
    postedTime: '3 hours ago',
    description: 'Regular garden maintenance including cutting grass, trimming trees, and general cleanup.',
    budget: 'R300-R500',
    poster: {
      name: 'Bheki M.',
      rating: 4.5,
      imageUrl: 'https://api.a0.dev/assets/image?text=Bheki%20M.&aspect=1:1'
    }
  },
  {
    id: '4',
    title: 'House cleaning service',
    category: 'Cleaning',
    location: 'Meadowlands',
    time: 'Friday, 9AM-1PM',
    postedTime: '6 hours ago',
    description: 'Need thorough cleaning of 3-bedroom house including kitchen and bathrooms.',
    budget: 'R350-R500',
    poster: {
      name: 'Lerato P.',
      rating: 4.6,
      imageUrl: 'https://api.a0.dev/assets/image?text=Lerato%20P.&aspect=1:1'
    }
  },
  {
    id: '5',
    title: 'Electrical fault in bathroom',
    category: 'Electrical',
    location: 'Pimville',
    time: 'ASAP',
    postedTime: '12 hours ago',
    description: 'Light in bathroom not working and possible electrical issue with shower. Need quick repair.',
    budget: 'R250-R400',
    poster: {
      name: 'Mandla T.',
      rating: 4.9,
      imageUrl: 'https://api.a0.dev/assets/image?text=Mandla%20T.&aspect=1:1'
    }
  }
];

// Service categories
const serviceCategories = [
  { id: '1', name: 'All', icon: 'apps' },
  { id: '2', name: 'Plumbing', icon: 'plumbing' },
  { id: '3', name: 'Electrical', icon: 'electrical-services' },
  { id: '4', name: 'Tutoring', icon: 'school' },
  { id: '5', name: 'Cleaning', icon: 'cleaning-services' },
  { id: '6', name: 'Gardening', icon: 'yard' },
  { id: '7', name: 'Beauty', icon: 'content-cut' },
  { id: '8', name: 'Transport', icon: 'directions-car' },
  { id: '9', name: 'Cooking', icon: 'restaurant' },
];

export default function DiscoverScreen({ route }) {
  const navigation = useNavigation();

  const initialTab = route.params?.tab || 'providers';
  const initialCategory = route.params?.category || 'All';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  
  // Filter providers based on search and category
  const filteredProviders = allProviders.filter(provider => {
    const matchesSearch = searchQuery === '' || 
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === 'All' || provider.service === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Filter requests based on search and category
  const filteredRequests = allRequests.filter(request => {
    const matchesSearch = searchQuery === '' || 
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === 'All' || request.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleProviderPress = (provider) => {
    //@ts-ignore
    navigation.navigate('ProviderDetails', { provider });
  };

  const handleRequestPress = (request) => {
    //@ts-ignore
    navigation.navigate('RequestDetails', { request });
  };

  const handleAddPress = () => {
    //@ts-ignore
    navigation.navigate('CreateRequest')
  }


  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
      </View>
      
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={activeTab === 'providers' ? "Find a service provider..." : "Search requests..."}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'providers' && styles.activeTabButton]}
          onPress={() => setActiveTab('providers')}
        >
          <MaterialIcons 
            name="person" 
            size={20} 
            color={activeTab === 'providers' ? colors.buttonColor : '#666'} 
            style={styles.tabIcon}
          />
          <Text style={[styles.tabText, activeTab === 'providers' && styles.activeTabText]}>
            Providers
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'requests' && styles.activeTabButton]}
          onPress={() => setActiveTab('requests')}
        >
          <MaterialIcons 
            name="list-alt" 
            size={20} 
            color={activeTab === 'requests' ? colors.buttonColor : '#666'} 
            style={styles.tabIcon}
          />
          <Text style={[styles.tabText, activeTab === 'requests' && styles.activeTabText]}>
            Requests
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {serviceCategories.map((category) => (
            <TouchableOpacity 
              key={category.id} 
              style={[
                styles.categoryItem,
                selectedCategory === category.name && styles.selectedCategoryItem
              ]}
              onPress={() => setSelectedCategory(category.name)}
            >
              <MaterialIcons 
                name={category.icon as any} 
                size={16} 
                color={selectedCategory === category.name ? '#FFFFFF' : '#666'} 
              />
              <Text 
                style={[
                  styles.categoryText,
                  selectedCategory === category.name && styles.selectedCategoryText
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Content based on active tab */}
      {activeTab === 'providers' ? (
        <FlatList
          data={filteredProviders}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <TouchableOpacity 
              style={styles.providerCard}
              onPress={() => handleProviderPress(item)}
            >
              <View style={styles.providerHeader}>
                <Image source={{ uri: item.imageUrl }} style={styles.providerImage} />
                <View style={styles.providerInfo}>
                  <View style={styles.nameContainer}>
                    <Text style={styles.providerName}>{item.name}</Text>
                    {item.verified && (
                      <MaterialIcons name="verified" size={16} color="#2196F3" style={styles.verifiedIcon} />
                    )}
                  </View>
                  <Text style={styles.providerService}>{item.service}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>{item.rating} ({item.reviews} reviews)</Text>
                    <Text style={styles.distanceText}>• {item.distance}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.providerDescription}>{item.description}</Text>
              <View style={styles.skillsContainer}>
                {item.skills.map((skill, index) => (
                  <View key={index} style={styles.skillBadge}>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.rateContainer}>
                <MaterialIcons name="payments" size={14} color="#666" />
                <Text style={styles.rateText}>{item.hourlyRate}</Text>
              </View>
              <TouchableOpacity 
                style={styles.contactButton}
                //@ts-ignore
                onPress={() => navigation.navigate('ProviderDetails', { provider: item })}
              >
                <Text style={styles.contactButtonText}>View Profile</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <FlatList
          data={filteredRequests}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <TouchableOpacity 
              style={styles.requestCard}
              onPress={() => handleRequestPress(item)}
            >
              <View style={styles.requestHeader}>
                <View style={styles.requestCategoryContainer}>
                  <Text style={styles.requestCategory}>{item.category}</Text>
                  <Text style={styles.postedTime}>{item.postedTime}</Text>
                </View>
              </View>
              <Text style={styles.requestTitle}>{item.title}</Text>
              <Text numberOfLines={2} style={styles.requestDescription}>
                {item.description}
              </Text>
              <View style={styles.requestDetails}>
                <View style={styles.requestDetail}>
                  <Ionicons name="location-outline" size={14} color="#666" />
                  <Text style={styles.detailText}>{item.location}</Text>
                </View>
                <View style={styles.requestDetail}>
                  <Ionicons name="time-outline" size={14} color="#666" />
                  <Text style={styles.detailText}>{item.time}</Text>
                </View>
                <View style={styles.requestDetail}>
                  <Ionicons name="cash-outline" size={14} color="#666" />
                  <Text style={styles.detailText}>{item.budget}</Text>
                </View>
              </View>
              <View style={styles.posterContainer}>
                <Image source={{uri: item.poster.imageUrl}} style={styles.posterImage} />
                <View style={styles.posterInfo}>
                  <Text style={styles.posterName}>{item.poster.name}</Text>
                  <View style={styles.posterRating}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.posterRatingText}>{item.poster.rating}</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  style={styles.respondButton}
                  onPress={() => handleRequestPress(item)}
                >
                  <Text style={styles.respondButtonText}>Respond</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
      <TouchableOpacity style={styles.add_button} 
        role='button' 
        activeOpacity={0.1}
        onPress={handleAddPress}
        > 
        <Ionicons name='add' size={38} color='white' />
      </TouchableOpacity>
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.searchBgColor,
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
    backgroundColor: colors.buttonColor,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: colors.buttonColor,
  },
  tabIcon: {
    marginRight: 6,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: colors.buttonColor,
  },
  categoriesContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  selectedCategoryItem: {
    backgroundColor: colors.buttonColor,
    borderColor: '#2196F3',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    marginLeft: 4,
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  listContent: {
    padding: 16,
  },
  providerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  providerHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  providerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  providerInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  providerService: {
    fontSize: 14,
    color: 'green',
    marginVertical: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  distanceText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  providerDescription: {
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
    lineHeight: 20,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  skillBadge: {
    backgroundColor: '#F0F7FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 12,
    color: '#2196F3',
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rateText: {
    fontSize: 13,
    color: '#444',
    fontWeight: '500',
    marginLeft: 4,
  },
  contactButton: {
    backgroundColor: colors.buttonColor,
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  requestHeader: {
    marginBottom: 8,
  },
  requestCategoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  requestCategory: {
    fontSize: 13,
    color: '#2196F3',
    fontWeight: '500',
  },
  postedTime: {
    fontSize: 12,
    color: '#999',
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  requestDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  requestDetails: {
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
  posterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 12,
  },
  posterImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  posterInfo: {
    flex: 1,
    marginLeft: 10,
  },
  posterName: {
    fontSize: 13,
    fontWeight: '500',
  },
  posterRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  posterRatingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  respondButton: {
    backgroundColor: colors.buttonColor,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  respondButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },

  add_button: {
    position: 'absolute',

    top: 675,
    left: 325,
    borderRadius: 100,
    height: 52,
    width: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.buttonColor,
  }
});