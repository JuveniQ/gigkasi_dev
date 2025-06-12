import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  TextInput
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function RequestDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { request  } : any = route.params || {
    // Default request data if none provided
    id: '1',
    title: 'Fix leaking tap urgently',
    category: 'Plumbing',
    location: 'Soweto, Zone 4',
    time: 'Today, ASAP',
    postedTime: '25 min ago',
    description: 'Kitchen sink is leaking badly and causing water damage. Need someone to fix it today.',
    budget: 'R200-R350',
    images: [
      'https://api.a0.dev/assets/image?text=Leaking%20Tap&aspect=16:9',
      'https://api.a0.dev/assets/image?text=Water%20Damage&aspect=16:9'
    ],
    preferences: ['Professional tools', 'Same day service', 'Experienced plumber'],
    poster: {
      id: '101',
      name: 'Themba K.',
      rating: 4.7,
      imageUrl: 'https://api.a0.dev/assets/image?text=Themba%20K.&aspect=1:1',
      joinedDate: 'June 2022',
      completedJobs: 8
    }
  };

  const [offerAmount, setOfferAmount] = useState('');
  const [message, setMessage] = useState('');
  const [responseSubmitted, setResponseSubmitted] = useState(false);
  
  // Mock responders data
  const responders = [
    {
      id: '1',
      name: 'John M.',
      service: 'Plumbing',
      rating: 4.8,
      imageUrl: 'https://api.a0.dev/assets/image?text=John%20M.%20Plumber&aspect=1:1',
      verified: true,
      offer: 'R250',
      timeframe: 'Today, 3PM'
    },
    {
      id: '2',
      name: 'David N.',
      service: 'Plumbing',
      rating: 4.6,
      imageUrl: 'https://api.a0.dev/assets/image?text=David%20N.%20Plumber&aspect=1:1',
      verified: false,
      offer: 'R300',
      timeframe: 'Today, 5PM'
    }
  ];
  
  const handleBackPress = () => {
    navigation.goBack();
  };
  
  const handleSendResponse = () => {
    if (!offerAmount.trim()) {
      Alert.alert('Error', 'Please enter your offer amount');
      return;
    }
    
    Alert.alert(
      'Response Submitted',
      'Your offer has been sent to the client. They will contact you if interested.',
      [{ text: 'OK', onPress: () => setResponseSubmitted(true) }]
    );
  };
  
  const handleViewProfile = () => {
    //@ts-ignore
    navigation.navigate('Profile');
  };
  
  const handleContactClient = () => {
    //@ts-ignore
    navigation.navigate('Messages');
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Request Details</Text>
        <TouchableOpacity style={styles.headerAction}>
          <Ionicons name="share-social-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Request Info */}
        <View style={styles.requestHeader}>
          <Text style={styles.requestTitle}>{request.title}</Text>
          <View style={styles.requestMetaInfo}>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>{request.category}</Text>
            </View>
            <Text style={styles.postedTimeText}>Posted {request.postedTime}</Text>
          </View>
        </View>
        
        {/* Request Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={20} color="#666" />
            <Text style={styles.detailText}>{request.location}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={20} color="#666" />
            <Text style={styles.detailText}>{request.time}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="cash-outline" size={20} color="#666" />
            <Text style={styles.detailText}>Budget: {request.budget}</Text>
          </View>
        </View>
        
        {/* Description */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{request.description}</Text>
        </View>
        
        {/* Images */}
        {request.images && request.images.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Images</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagesScrollView}>
              {request.images.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={styles.requestImage}
                />
              ))}
            </ScrollView>
          </View>
        )}
        
        {/* Preferences */}
        {request.preferences && request.preferences.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Client Preferences</Text>
            <View style={styles.preferencesContainer}>
              {request.preferences.map((preference, index) => (
                <View key={index} style={styles.preferenceItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#2196F3" />
                  <Text style={styles.preferenceText}>{preference}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        
        {/* Client Info */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Posted By</Text>
          <View style={styles.clientContainer}>
            <Image source={{ uri: request.poster.imageUrl }} style={styles.clientImage} />
            <View style={styles.clientInfo}>
              <Text style={styles.clientName}>{request.poster.name}</Text>
              <View style={styles.clientRatingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.clientRatingText}>{request.poster.rating}</Text>
              </View>
              <Text style={styles.clientAdditionalInfo}>Member since {request.poster.joinedDate}</Text>
              <Text style={styles.clientAdditionalInfo}>Completed Requests: {request.poster.completedJobs}</Text>
            </View>
            <TouchableOpacity style={styles.clientProfileButton} onPress={handleViewProfile}>
              <Text style={styles.clientProfileButtonText}>View</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Other Responders */}
        {responders && responders.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Other Responders</Text>
            {responders.map((responder) => (
              <View key={responder.id} style={styles.responderItem}>
                <Image source={{ uri: responder.imageUrl }} style={styles.responderImage} />
                <View style={styles.responderInfo}>
                  <View style={styles.responderNameContainer}>
                    <Text style={styles.responderName}>{responder.name}</Text>
                    {responder.verified && (
                      <MaterialIcons name="verified" size={14} color="#2196F3" style={styles.verifiedIcon} />
                    )}
                  </View>
                  <Text style={styles.responderService}>{responder.service}</Text>
                  <View style={styles.responderDetails}>
                    <View style={styles.responderRating}>
                      <Ionicons name="star" size={12} color="#FFD700" />
                      <Text style={styles.responderRatingText}>{responder.rating}</Text>
                    </View>
                    <View style={styles.responderOffer}>
                      <Text style={styles.offerLabel}>Offer: </Text>
                      <Text style={styles.offerValue}>{responder.offer}</Text>
                    </View>
                    <View style={styles.responderTimeframe}>
                      <Text style={styles.timeframeLabel}>When: </Text>
                      <Text style={styles.timeframeValue}>{responder.timeframe}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
        
        {/* Response Form */}
        {!responseSubmitted ? (
          <View style={styles.responseFormContainer}>
            <Text style={styles.responseFormTitle}>Respond to this Request</Text>
            <View style={styles.offerInputContainer}>
              <Text style={styles.offerInputLabel}>Your Offer</Text>
              <View style={styles.offerAmountContainer}>
                <Text style={styles.currencySymbol}>R</Text>
                <TextInput
                  style={styles.offerAmountInput}
                  placeholder="Amount"
                  keyboardType="number-pad"
                  value={offerAmount}
                  onChangeText={setOfferAmount}
                />
              </View>
            </View>
            <View style={styles.messageContainer}>
              <Text style={styles.messageLabel}>Message (optional)</Text>
              <TextInput
                style={styles.messageInput}
                placeholder="Introduce yourself and explain how you can help..."
                multiline
                numberOfLines={3}
                value={message}
                onChangeText={setMessage}
              />
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handleSendResponse}>
              <Text style={styles.submitButtonText}>Submit Response</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.responseSubmittedContainer}>
            <View style={styles.responseSubmittedContent}>
              <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
              <Text style={styles.responseSubmittedTitle}>Response Submitted!</Text>
              <Text style={styles.responseSubmittedText}>
                Your offer has been sent to the client. They will contact you if interested.
              </Text>
              <TouchableOpacity 
                style={styles.contactClientButton} 
                onPress={handleContactClient}
              >
                <Text style={styles.contactClientText}>Message Client</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        <View style={{ height: 20 }} />
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
  requestHeader: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  requestTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  requestMetaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryContainer: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: '#2196F3',
    fontWeight: '500',
    fontSize: 13,
  },
  postedTimeText: {
    color: '#999',
    fontSize: 13,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 15,
    color: '#444',
    marginLeft: 10,
  },
  sectionContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  imagesScrollView: {
    marginLeft: -16,
    paddingLeft: 16,
  },
  requestImage: {
    width: 200,
    height: 120,
    borderRadius: 8,
    marginRight: 12,
  },
  preferencesContainer: {
    marginTop: 4,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  preferenceText: {
    fontSize: 14,
    color: '#444',
    marginLeft: 8,
  },
  clientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  clientInfo: {
    flex: 1,
    marginLeft: 12,
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  clientRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  clientRatingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  clientAdditionalInfo: {
    fontSize: 12,
    color: '#666',
  },
  clientProfileButton: {
    backgroundColor: '#F0F7FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  clientProfileButtonText: {
    color: '#2196F3',
    fontWeight: '500',
  },
  responderItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  responderImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  responderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  responderNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  responderName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  responderService: {
    fontSize: 12,
    color: '#2196F3',
    marginTop: 2,
  },
  responderDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  responderRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  responderRatingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 2,
  },
  responderOffer: {
    flexDirection: 'row',
    marginRight: 12,
  },
  offerLabel: {
    fontSize: 12,
    color: '#666',
  },
  offerValue: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4CAF50',
  },
  responderTimeframe: {
    flexDirection: 'row',
  },
  timeframeLabel: {
    fontSize: 12,
    color: '#666',
  },
  timeframeValue: {
    fontSize: 12,
    fontWeight: '500',
  },
  responseFormContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  responseFormTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  offerInputContainer: {
    marginBottom: 16,
  },
  offerInputLabel: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  offerAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  currencySymbol: {
    fontSize: 16,
    color: '#666',
    paddingRight: 8,
  },
  offerAmountInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  messageContainer: {
    marginBottom: 16,
  },
  messageLabel: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  responseSubmittedContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  responseSubmittedContent: {
    alignItems: 'center',
    padding: 16,
  },
  responseSubmittedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  responseSubmittedText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  contactClientButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  contactClientText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});