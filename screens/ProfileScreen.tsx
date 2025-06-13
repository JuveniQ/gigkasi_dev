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
  Switch,
  TextInput,
  Modal,
  Button
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import * as ImagePicker from 'expo-image-picker';
import { mockReviews } from '../constants/mockData';

// Service options with icons
const serviceOptions = [
  { id: '1', name: 'Plumbing', icon: 'plumbing' },
  { id: '2', name: 'Electrical', icon: 'electrical-services' },
  { id: '3', name: 'Tutoring', icon: 'school' },
  { id: '4', name: 'Cleaning', icon: 'cleaning-services' },
  { id: '5', name: 'Gardening', icon: 'yard' },
  { id: '6', name: 'Beauty', icon: 'content-cut' },
  { id: '7', name: 'Transport', icon: 'directions-car' },
  { id: '8', name: 'Cooking', icon: 'restaurant' },
  { id: '9', name: 'Other', icon: 'add-circle-outline' }
];

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [isServiceProvider, setIsServiceProvider] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showPortfolioForm, setShowPortfolioForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [editingPortfolio, setEditingPortfolio] = useState(null);
  const [portfolioImage, setPortfolioImage] = useState(null);

  // Form states
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [portfolioTitle, setPortfolioTitle] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [customServiceName, setCustomServiceName] = useState('');

  // Mock user data with state
  const [userData, setUserData] = useState({
    name: 'Jay Anderson',
    imageUrl: 'https://api.a0.dev/assets/image?text=TM&aspect=1:1',
    location: 'Ext 4, Emalahleni, Mpumalanga',
    rating: 4.7,
    reviews: 23,
    joinDate: 'Joined August 2023',
    verified: true,
    completedJobs: 48,
    requestsMade: 12,
    services: [
      { id: '1', name: 'Electrical', description: 'Residential electrical repairs', price: 'R150-R300/hr', icon: 'electrical-services' },
      { id: '2', name: 'Plumbing', description: 'Water system repairs', price: 'R180-R250/hr', icon: 'plumbing' }
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
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

 


    if (!result.canceled) {
      setPortfolioImage(result.assets[0].uri);
    }
  };

  const handleAddService = () => {
    const finalServiceName = selectedService?.name === 'Other' ? customServiceName : selectedService?.name;
    const finalServiceIcon = selectedService?.name === 'Other' ? 'add-circle-outline' : selectedService?.icon;

    if (!finalServiceName || !serviceDescription || !servicePrice) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (editingService) {
      // Update existing service
      const updatedServices = userData.services.map(service => 
        service.id === editingService.id 
          ? { 
              ...service, 
              name: finalServiceName, 
              description: serviceDescription, 
              price: servicePrice,
              icon: finalServiceIcon
            }
          : service
      );
      setUserData({...userData, services: updatedServices});
    } else {
      // Add new service
      const newService = {
        id: Date.now().toString(),
        name: finalServiceName,
        description: serviceDescription,
        price: servicePrice,
        icon: finalServiceIcon
      };
      setUserData({...userData, services: [...userData.services, newService]});
    }

    resetServiceForm();
  };

  const handleAddPortfolio = () => {
    if (!portfolioTitle || (!portfolioImage && !editingPortfolio)) {
      Alert.alert('Error', 'Please add a title and image');
      return;
    }

    if (editingPortfolio) {
      // Update existing portfolio item
      const updatedPortfolio = userData.portfolio.map(item => 
        item.id === editingPortfolio.id 
          ? { ...item, title: portfolioTitle, imageUrl: portfolioImage || item.imageUrl }
          : item
      );
      setUserData({...userData, portfolio: updatedPortfolio});
    } else {
      // Add new portfolio item
      const newPortfolio = {
        id: Date.now().toString(),
        title: portfolioTitle,
        imageUrl: portfolioImage || 'https://api.a0.dev/assets/image?text=Project&aspect=16:9'
      };
      setUserData({...userData, portfolio: [...userData.portfolio, newPortfolio]});
    }

    resetPortfolioForm();
  };

  const resetServiceForm = () => {
    setServiceName('');
    setServiceDescription('');
    setServicePrice('');
    setSelectedService(null);
    setCustomServiceName('');
    setEditingService(null);
    setShowServiceForm(false);
  };

  const resetPortfolioForm = () => {
    setPortfolioTitle('');
    setPortfolioImage(null);
    setEditingPortfolio(null);
    setShowPortfolioForm(false);
  };

  const editService = (service) => {
    // Find if this is a predefined service
    const predefinedService = serviceOptions.find(opt => opt.name === service.name);
    
    if (predefinedService) {
      setSelectedService(predefinedService);
    } else {
      // For custom services
      setSelectedService(serviceOptions.find(opt => opt.name === 'Other'));
      setCustomServiceName(service.name);
    }
    
    setServiceDescription(service.description);
    setServicePrice(service.price);
    setEditingService(service);
    setShowServiceForm(true);
  };

  const editPortfolio = (item) => {
    setPortfolioTitle(item.title);
    setPortfolioImage(item.imageUrl);
    setEditingPortfolio(item);
    setShowPortfolioForm(true);
  };

  const deletePortfolio = (id) => {
    Alert.alert(
      'Delete Portfolio Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            setUserData({
              ...userData,
              portfolio: userData.portfolio.filter(item => item.id !== id)
            });
          }
        }
      ]
    );
  };
const [showReviewsModal, setShowReviewsModal] = useState(false);


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


         <TouchableOpacity onPress={() => setShowReviewsModal(true)}>

           
          
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>
            {userData.rating} ({userData.reviews} reviews)
          </Text>
        </View>
</TouchableOpacity>


<Modal
  visible={showReviewsModal}
  transparent
  animationType="slide"
  onRequestClose={() => setShowReviewsModal(false)}
  style={styles.modalBg}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>User Reviews</Text>

      <FlatList
        data={mockReviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.reviewer}</Text>
            <Text style={{ color: '#FFD700' }}>{'★'.repeat(item.rating)}</Text>
            <Text style={{ fontSize: 14, color: '#555' }}>{item.comment}</Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={[styles.cancelButton, { marginTop: 10 }]}
        onPress={() => setShowReviewsModal(false)}
      >
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>


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
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => {
            resetServiceForm();
            setShowServiceForm(true);
          }}
        >
          <Feather name="plus" size={16} color="#2196F3" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={userData.services}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.serviceCard}>
            <View style={styles.serviceHeader}>
              <MaterialIcons name={item.icon as any} size={20} color={colors.categoryColor} />
              <Text style={styles.serviceName}>{item.name}</Text>
            </View>
            <Text style={styles.serviceDescription}>{item.description}</Text>
            <View style={styles.serviceFooter}>
              <Text style={styles.servicePrice}>{item.price}</Text>
              <TouchableOpacity onPress={() => editService(item)}>
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
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => {
            resetPortfolioForm();
            setShowPortfolioForm(true);
          }}
        >
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
            <View style={styles.portfolioOverlay}>
              <Text style={styles.portfolioTitle}>{item.title}</Text>
              <View style={styles.portfolioActions}>
                <TouchableOpacity 
                  style={styles.portfolioActionButton}
                  onPress={() => editPortfolio(item)}
                >
                  <Feather name="edit-2" size={14} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.portfolioActionButton}
                  onPress={() => deletePortfolio(item.id)}
                >
                  <Feather name="trash-2" size={14} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
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

  const renderServiceOption = (service) => (
    <TouchableOpacity
      key={service.id}
      style={[
        styles.serviceOption,
        selectedService?.id === service.id && styles.selectedServiceOption
      ]}
      onPress={() => setSelectedService(service)}
    >
      <MaterialIcons name={service.icon} size={24} color={colors.categoryColor }/>
      <Text style={styles.serviceOptionText}>{service.name}</Text>
    </TouchableOpacity>
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

      {/* Service Form Modal */}
      <Modal
        visible={showServiceForm}
        animationType="slide"
        transparent={true}
        onRequestClose={resetServiceForm}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingService ? 'Edit Service' : 'Add New Service'}
            </Text>
            
            <View style={styles.serviceOptionsContainer}>
              {serviceOptions.map(renderServiceOption)}
            </View>

            {selectedService?.name === 'Other' && (
              <TextInput
                style={styles.input}
                placeholder="Enter service name"
                value={customServiceName}
                onChangeText={setCustomServiceName}
              />
            )}
            
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={serviceDescription}
              onChangeText={setServiceDescription}
              multiline
            />
            
            <TextInput
              style={styles.input}
              placeholder="Price Range (e.g., R150-R300/hr)"
              value={servicePrice}
              onChangeText={setServicePrice}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={resetServiceForm}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleAddService}
              >
                <Text style={styles.buttonText}>
                  {editingService ? 'Update' : 'Save'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Portfolio Form Modal */}
      <Modal
        visible={showPortfolioForm}
        animationType="slide"
        transparent={true}
        onRequestClose={resetPortfolioForm}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingPortfolio ? 'Edit Portfolio Item' : 'Add Portfolio Item'}
            </Text>
            
            <TouchableOpacity 
              style={styles.imagePicker}
              onPress={pickImage}
            >
              {portfolioImage ? (
                <Image 
                  source={{ uri: portfolioImage }} 
                  style={styles.previewImage}
                />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Feather name="image" size={40} color="#666" />
                  <Text style={styles.imagePlaceholderText}>
                    Tap to select an image
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            
            <TextInput
              style={styles.input}
              placeholder="Project Title"
              value={portfolioTitle}
              onChangeText={setPortfolioTitle}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={resetPortfolioForm}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleAddPortfolio}
              >
                <Text style={styles.buttonText}>
                  {editingPortfolio ? 'Update' : 'Save'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
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
  portfolioOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
  },
  portfolioTitle: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  portfolioActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  portfolioActionButton: {
    marginLeft: 8,
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
  // Modal styles
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
   
    padding: 20,
   
  },
  modalContent: {
  
    
    backgroundColor: colors.backgroundColor,
    width: '90%',
    borderRadius: 10,
    padding: 20,
    maxHeight: '100%',
    elevation: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
   
  },
  cancelButton: {
    
    padding: 12,
    borderRadius: 6,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
    backgroundColor: 'rgb(177, 233, 214)', // Red color for cancel button
  },
  saveButton: {
    
    padding: 12,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.categoryColor,  
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  // Image picker styles
  imagePicker: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderText: {
    marginTop: 10,
    color: '#666',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  // Service options styles
  serviceOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  serviceOption: {
    width: '30%',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedServiceOption: {
    borderColor: '#2196F3',
    backgroundColor: '#E3F2FD',
  },
  serviceOptionText: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
});