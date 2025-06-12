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
import {  } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function ProviderDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { provider }:any = route.params || {
    // Default provider data if none provided
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
    description: 'Professional plumber with 8+ years of experience in residential repairs.',
    about: 'I specialize in all types of residential plumbing services including installations, repairs, and maintenance. I have over 8 years of experience and prioritize quality workmanship and reliability.',
    contactNumber: '+27 72 345 6789',
    jobsCompleted: 48,
    memberSince: 'May 2022',
    location: 'Soweto, Johannesburg',
    availability: 'Monday to Saturday, 8AM - 6PM',
    portfolio: [
      { id: '1', title: 'Bathroom Renovation', imageUrl: 'https://api.a0.dev/assets/image?text=Bathroom%20Renovation&aspect=16:9' },
      { id: '2', title: 'Kitchen Sink Installation', imageUrl: 'https://api.a0.dev/assets/image?text=Kitchen%20Sink%20Installation&aspect=16:9' },
      { id: '3', title: 'Water Heater Repair', imageUrl: 'https://api.a0.dev/assets/image?text=Water%20Heater%20Repair&aspect=16:9' }
    ]
  };

  const [showContactInfo, setShowContactInfo] = useState(false);
  
  // Mock review data
  const reviews = [
    {
      id: '1',
      userName: 'Themba K.',
      rating: 5.0,
      comment: 'John was very professional and fixed my leaking tap quickly. Fair pricing too. Highly recommended!',
      date: '2 weeks ago',
      userImageUrl: 'https://api.a0.dev/assets/image?text=Themba%20K.&aspect=1:1'
    },
    {
      id: '2',
      userName: 'Nomsa S.',
      rating: 4.5,
      comment: 'Good service, arrived on time and completed the work as promised. Only small issue was some water spill that I had to clean up afterward.',
      date: '1 month ago',
      userImageUrl: 'https://api.a0.dev/assets/image?text=Nomsa%20S.&aspect=1:1'
    },
    {
      id: '3',
      userName: 'David R.',
      rating: 5.0,
      comment: 'Excellent service! John helped install a new bathroom sink and fixed some old piping issues as well. Very knowledgeable and professional.',
      date: '2 months ago',
      userImageUrl: 'https://api.a0.dev/assets/image?text=David%20R.&aspect=1:1'
    }
  ];
  
  const handleBookNow = () => {
    // In a real app, this would navigate to a booking form
    // For now, just show an alert
    Alert.alert(
      'Contact Provider',
      `You can contact ${provider.name} directly to arrange a booking.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Show Contact Info', onPress: () => setShowContactInfo(true) }
      ]
    );
  };
  
  const handleSendMessage = () => {
    // In a real app, this would open a chat with the provider
    //@ts-ignore
    navigation.navigate('Messages');
  };
  
  const handleBackPress = () => {
    navigation.goBack();
  };
  
  const renderContactInfo = () => {
    if (showContactInfo) {
      return (
        <View style={styles.contactInfoContainer}>
          <Text style={styles.contactInfoTitle}>Contact Information</Text>
          <View style={styles.contactDetail}>
            <Ionicons name="call-outline" size={20} color="#2196F3" />
            <Text style={styles.contactText}>{provider.contactNumber}</Text>
          </View>
          <TouchableOpacity style={styles.hideContactButton} onPress={() => setShowContactInfo(false)}>
            <Text style={styles.hideContactText}>Hide Contact Info</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Provider Details</Text>
        <TouchableOpacity style={styles.headerAction}>
          <Ionicons name="bookmark-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Provider profile header */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: provider.imageUrl }} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <View style={styles.nameContainer}>
              <Text style={styles.profileName}>{provider.name}</Text>
              {provider.verified && (
                <MaterialIcons name="verified" size={16} color="#2196F3" style={styles.verifiedIcon} />
              )}
            </View>
            <Text style={styles.profileService}>{provider.service} Provider</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{provider.rating} ({provider.reviews} reviews)</Text>
              <Text style={styles.distanceText}>• {provider.distance}</Text>
            </View>
          </View>
        </View>
        
        {/* Provider stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{provider.jobsCompleted}</Text>
            <Text style={styles.statLabel}>Jobs Done</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{provider.memberSince}</Text>
            <Text style={styles.statLabel}>Member Since</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <MaterialIcons name="payments" size={20} color="#2196F3" />
            <Text style={styles.statLabel}>{provider.hourlyRate}</Text>
          </View>
        </View>
        
        {/* Contact info if shown */}
        {renderContactInfo()}
        
        {/* About Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>{provider.about}</Text>
        </View>
        
        {/* Services & Skills */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Skills & Expertise</Text>
          <View style={styles.skillsContainer}>
            {provider.skills.map((skill, index) => (
              <View key={index} style={styles.skillBadge}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* Availability */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Availability</Text>
          <View style={styles.availabilityContainer}>
            <Ionicons name="time-outline" size={18} color="#666" />
            <Text style={styles.availabilityText}>{provider.availability}</Text>
          </View>
          <View style={styles.availabilityContainer}>
            <Ionicons name="location-outline" size={18} color="#666" />
            <Text style={styles.availabilityText}>Serves {provider.location}</Text>
          </View>
        </View>
        
        {/* Portfolio */}
        {provider.portfolio && provider.portfolio.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Portfolio</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.portfolioContainer}>
              {provider.portfolio.map((item) => (
                <View key={item.id} style={styles.portfolioItem}>
                  <Image source={{ uri: item.imageUrl }} style={styles.portfolioImage} />
                  <Text style={styles.portfolioTitle}>{item.title}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
        
        {/* Reviews */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewItem}>
              <Image source={{ uri: review.userImageUrl }} style={styles.reviewerImage} />
              <View style={styles.reviewContent}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewerName}>{review.userName}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <View style={styles.reviewRating}>
                  {[...Array(5)].map((_, i) => (
                    <Ionicons 
                      key={i} 
                      name={i < Math.floor(review.rating) ? "star" : (i < review.rating ? "star-half" : "star-outline")}
                      size={14} 
                      color="#FFD700" 
                      style={styles.starIcon}
                    />
                  ))}
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            </View>
          ))}
        </View>
        
        {/* Similar providers */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Similar Providers</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.similarProvidersContainer}>
            <TouchableOpacity style={styles.similarProviderItem}>
              <Image 
                source={{ uri: 'https://api.a0.dev/assets/image?text=Mike%20T.%20Plumber&aspect=1:1' }} 
                style={styles.similarProviderImage} 
              />
              <Text style={styles.similarProviderName}>Mike T.</Text>
              <View style={styles.similarProviderRating}>
                <Ionicons name="star" size={12} color="#FFD700" />
                <Text style={styles.similarProviderRatingText}>4.7</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.similarProviderItem}>
              <Image 
                source={{ uri: 'https://api.a0.dev/assets/image?text=Sipho%20K.%20Plumber&aspect=1:1' }} 
                style={styles.similarProviderImage} 
              />
              <Text style={styles.similarProviderName}>Sipho K.</Text>
              <View style={styles.similarProviderRating}>
                <Ionicons name="star" size={12} color="#FFD700" />
                <Text style={styles.similarProviderRatingText}>4.6</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.similarProviderItem}>
              <Image 
                source={{ uri: 'https://api.a0.dev/assets/image?text=Lindiwe%20N.%20Plumber&aspect=1:1' }} 
                style={styles.similarProviderImage} 
              />
              <Text style={styles.similarProviderName}>Lindiwe N.</Text>
              <View style={styles.similarProviderRating}>
                <Ionicons name="star" size={12} color="#FFD700" />
                <Text style={styles.similarProviderRatingText}>4.9</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        
        {/* Space for action buttons */}
        <View style={{ height: 80 }} />
      </ScrollView>
      
      {/* Action buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.messageButton} onPress={handleSendMessage}>
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerAction: {
    padding: 4,
  },
  content: {
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
  profileService: {
    fontSize: 14,
    color: '#2196F3',
    marginVertical: 2,
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
  distanceText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#EEEEEE',
    marginHorizontal: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  contactInfoContainer: {
    backgroundColor: '#F0F7FF',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  contactInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  contactDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 16,
    marginLeft: 8,
  },
  hideContactButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  hideContactText: {
    color: '#2196F3',
    fontWeight: '500',
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  seeAllText: {
    color: '#2196F3',
    fontSize: 14,
  },
  aboutText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  availabilityText: {
    fontSize: 14,
    color: '#444',
    marginLeft: 8,
  },
  portfolioContainer: {
    marginLeft: -16,
    paddingLeft: 16,
  },
  portfolioItem: {
    width: 200,
    marginRight: 12,
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
    overflow: 'hidden',
  },
  portfolioImage: {
    width: '100%',
    height: 120,
  },
  portfolioTitle: {
    fontSize: 12,
    padding: 8,
    color: '#444',
  },
  reviewItem: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  reviewerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reviewContent: {
    flex: 1,
    marginLeft: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
  },
  reviewRating: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  starIcon: {
    marginRight: 2,
  },
  reviewComment: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  similarProvidersContainer: {
    marginLeft: -16,
    paddingLeft: 16,
  },
  similarProviderItem: {
    width: 80,
    marginRight: 16,
    alignItems: 'center',
  },
  similarProviderImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  similarProviderName: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  similarProviderRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  similarProviderRatingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 2,
  },
  actionButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  messageButton: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2196F3',
    backgroundColor: '#F0F7FF',
  },
  messageButtonText: {
    color: '#2196F3',
    fontWeight: '600',
    fontSize: 15,
  },
  bookButton: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
});