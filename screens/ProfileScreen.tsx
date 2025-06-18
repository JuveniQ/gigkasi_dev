import React, { useState } from 'react';
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
  Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import colors from '../constants/colors';
import * as ImagePicker from 'expo-image-picker';
import { mockReviews, serviceOptions, userData as ud } from '../constants/mockData';
import * as DocumentPicker from 'expo-document-picker';
import { useUser } from '../contexts/UserContext';



export default function ProfileScreen() {
  const navigation = useNavigation();
  const user = useUser()
  const [isServiceProvider, setIsServiceProvider] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showPortfolioForm, setShowPortfolioForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [editingPortfolio, setEditingPortfolio] = useState(null);
  const [portfolioImage, setPortfolioImage] = useState(null);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationDocs, setVerificationDocs] = useState([]);
  const [isProviderRequested, setIsProviderRequested] = useState(false);

  // Form states
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [portfolioTitle, setPortfolioTitle] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [customServiceName, setCustomServiceName] = useState('');

  // Mock user data with state
  const [userData, setUserData] = useState(ud);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPortfolioImage(result.assets[0].uri);
    }
  };

  const pickVerificationDoc = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setVerificationDocs([...verificationDocs, result.assets[0].uri]);
    }
  };

  const handleRoleChange = (value) => {
    if (value) {
      setShowVerificationModal(true);
    } else {
      setIsServiceProvider(false);
      setIsProviderRequested(false);
    }
  };

  const submitVerification = () => {
    if (verificationDocs.length === 0) {
      Alert.alert('Error', 'Please upload at least one verification document');
      return;
    }

    setIsProviderRequested(true);
    setShowVerificationModal(false);
    Alert.alert(
      'Application Submitted',
      'Your provider application is under review. We\'ll notify you once approved.'
    );
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
      setUserData({ ...userData, services: updatedServices });
    } else {
      // Add new service
      const newService = {
        id: Date.now().toString(),
        name: finalServiceName,
        description: serviceDescription,
        price: servicePrice,
        icon: finalServiceIcon
      };
      setUserData({ ...userData, services: [...userData.services, newService] });
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
      setUserData({ ...userData, portfolio: updatedPortfolio });
    } else {
      // Add new portfolio item
      const newPortfolio = {
        id: Date.now().toString(),
        title: portfolioTitle,
        imageUrl: portfolioImage || 'https://api.a0.dev/assets/image?text=Project&aspect=16:9'
      };
      setUserData({ ...userData, portfolio: [...userData.portfolio, newPortfolio] });
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

  const renderProfileHeader = () => (
    <View style={styles.profileHeader}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: user.imageUrl }} style={styles.profileImage} />
        {user.verified && (
          <View style={styles.verifiedBadge}>
            <MaterialIcons name="verified" size={20} color="blue" />
          </View>
        )}
      </View>
      <View style={styles.profileInfo}>
        <View>
          <Text style={styles.profileName}>{user.displayName}</Text>
        </View>
        <Text style={styles.profileLocation}>
          <Feather name="map-pin" size={12} color="#666" /> {user.location}
        </Text>


        {isServiceProvider && <TouchableOpacity onPress={() => setShowReviewsModal(true)}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>
              {user.rating} ({userData.reviews} reviews)
            </Text>
          </View>
        </TouchableOpacity>}


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


        <Text style={styles.joinDate}>{}</Text>
      </View>
    </View>
  );

  const renderStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{userData.completedJobs}</Text>
        <Text style={styles.statLabel}>{isServiceProvider ? 'Jobs Completed' : 'Random Stat'}</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{userData.requestsMade}</Text>
        <Text style={styles.statLabel}>Requests Made</Text>
      </View>
    </View>
  );

  const renderModeToggle = () => (
    <View style={styles.modeToggle}>
      <Text style={styles.modeText}>Seeker Mode</Text>
      <Switch
        value={isServiceProvider || isProviderRequested}
        onValueChange={handleRoleChange}
        trackColor={{ false: '#767577', true: colors.support }}
        thumbColor={(isServiceProvider || isProviderRequested) ? '#fff' : '#f4f3f4'}
        disabled={isProviderRequested && !isServiceProvider}
      />
      <Text style={styles.modeText}>Provider Mode</Text>
      {isProviderRequested && !isServiceProvider && (
        <Text style={styles.verificationStatusText}>Verification pending</Text>
      )}
    </View>
  );

  const renderVerificationModal = () => {
  const [selfieImage, setSelfieImage] = useState(null);
  const [governmentID, setGovernmentID] = useState(null);
  const [qualifications, setQualifications] = useState([]);

  const captureSelfie = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'We need camera access to take your selfie');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
      cameraType: ImagePicker.CameraType.front,
    });

    if (!result.canceled) {
      setSelfieImage(result.assets[0].uri);
      setVerificationDocs([...verificationDocs, result.assets[0].uri]);
    }
  };

  const pickGovernmentID = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['image/*', 'application/pdf'],
      copyToCacheDirectory: true
    });

    if (result.assets) {
      setGovernmentID({
        name: result.assets[0].name,
        uri: result.assets[0].uri
      });
      setVerificationDocs([...verificationDocs, result.assets[0].uri]);
    }
  };

  const pickQualification = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['image/*', 'application/pdf'],
      copyToCacheDirectory: true,
      multiple: true
    });

    if (result.assets) {
      const newDocs = result.assets.map(asset => asset.uri);
      setQualifications([...qualifications, ...result.assets]);
      setVerificationDocs([...verificationDocs, ...newDocs]);
    }
  };

  const removeQualification = (index) => {
    const newQualifications = [...qualifications];
    const removedDoc = newQualifications.splice(index, 1);
    setQualifications(newQualifications);
    setVerificationDocs(verificationDocs.filter(uri => uri !== removedDoc[0].uri));
  };

  return (
    <Modal
      visible={showVerificationModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowVerificationModal(false)}
    >
      <View style={styles.modalOverlay}>
        <ScrollView style={styles.modalContent}>
          <Text style={styles.modalTitle}>Become a Service Provider</Text>
          <Text style={styles.modalSubtitle}>
            To offer services, please verify your identity and qualifications
          </Text>

          {/* Selfie Section */}
          <View style={styles.verificationSection}>
            <Text style={styles.sectionTitle}>1. Live Selfie Verification</Text>
            {selfieImage ? (
              <Image source={{ uri: selfieImage }} style={styles.verificationDocPreview} />
            ) : (
              <Text style={styles.uploadPromptText}>No selfie taken</Text>
            )}
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={captureSelfie}
            >
              <Feather name="camera" size={20} color="#fff" />
              <Text style={styles.uploadButtonText}>Take Selfie</Text>
            </TouchableOpacity>
          </View>

          {/* Government ID Section */}
          <View style={styles.verificationSection}>
            <Text style={styles.sectionTitle}>2. Government ID</Text>
            {governmentID ? (
              <View style={styles.documentPreview}>
                <Feather name="file-text" size={24} color="#2196F3" />
                <Text style={styles.documentName}>{governmentID.name}</Text>
              </View>
            ) : (
              <Text style={styles.uploadPromptText}>No ID uploaded</Text>
            )}
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={pickGovernmentID}
            >
              <Feather name="upload" size={20} color="#fff" />
              <Text style={styles.uploadButtonText}>Upload Government ID</Text>
            </TouchableOpacity>
          </View>

          {/* Qualifications Section */}
          <View style={styles.verificationSection}>
            <Text style={styles.sectionTitle}>3. Qualifications (Optional)</Text>
            {qualifications.length > 0 ? (
              qualifications.map((doc, index) => (
                <View key={index} style={styles.documentItem}>
                  <Feather name="file-text" size={20} color="#2196F3" />
                  <Text style={styles.documentName}>{doc.name}</Text>
                  <TouchableOpacity onPress={() => removeQualification(index)}>
                    <Feather name="trash-2" size={20} color="#f44336" />
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.uploadPromptText}>No qualifications added</Text>
            )}
            <TouchableOpacity
              style={[styles.uploadButton, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#2196F3' }]}
              onPress={pickQualification}
            >
              <Feather name="plus" size={20} color="#2196F3" />
              <Text style={[styles.uploadButtonText, { color: '#2196F3' }]}>Add Qualification</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowVerificationModal(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.saveButton, (!selfieImage || !governmentID) && styles.disabledButton]}
              onPress={submitVerification}
              disabled={!selfieImage || !governmentID}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

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
              <MaterialIcons name={item.icon as any} size={20} color={colors.support} />
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

  const renderQualifications = () => (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}> Qualifications</Text>
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
      <View style={[styles.sectionHeader, { marginTop: 24 }]}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
      </View>

      <TouchableOpacity style={styles.settingItem}
        //@ts-ignore
        onPress={() => navigation.navigate("EditProfile")}>
        <Feather name="user" size={18} color="#666" />
        <Text style={styles.settingText}>Edit Profile</Text>
        <Feather name="chevron-right" size={18} color="#999" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem}>
        <Feather name="credit-card" size={18} color="#666" />
        <Text style={styles.settingText}>Payment Methods</Text>
        <Feather name="chevron-right" size={18} color="#999" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem}
        //@ts-ignore
        onPress={() => navigation.navigate("Notifications")}>
        <Feather name="bell" size={18} color="#666" />
        <Text style={styles.settingText}>Notifications</Text>
        <Feather name="chevron-right" size={18} color="#999" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem}
        //@ts-ignore
        onPress={() => navigation.navigate("PrivacySecurity")}
      >
        <Feather name="lock" size={18} color="#666" />
        <Text style={styles.settingText}>Privacy & Security</Text>
        <Feather name="chevron-right" size={18} color="#999" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={() => {console.log('logout pressed');user.logout()}}>
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
      <MaterialIcons name={service.icon} size={24} color={colors.support} />
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
        {renderModeToggle()}

        {/* Content based on mode */}
        {(isServiceProvider || isProviderRequested) ? (
          <>
            {userData.services.length > 0 && renderServices()}
            {userData.portfolio.length > 0 && renderPortfolio()}
            {userData.qualifications.length > 0 && renderQualifications()}
          </>
        ) : (
          userData.requests.length > 0 && renderRequests()
        )}

        {/* Settings */}
        {renderSettings()}
      </ScrollView>

      {/* Verification Modal */}
      {renderVerificationModal()}

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
    backgroundColor: colors.main,
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
  verificationStatusText: {
    marginLeft: 10,
    fontSize: 12,
    color: colors.support,
    fontStyle: 'italic',
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
    margin: 4 ,
    marginHorizontal: 64,
    padding: 16,
    backgroundColor: 'rgba(255, 0, 0, 0.6)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#666',
    alignItems: 'center',
  },
  logoutText: {
    color: '#000',
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
    backgroundColor: "white",
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
  modalSubtitle: {
    fontSize: 14,
    color: colors.highlight,
    textAlign: 'center',
    marginBottom: 20,
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
    paddingBottom: 25
  },
  cancelButton: {
    padding: 12,
    borderRadius: 6,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
    backgroundColor: 'rgb(48, 63, 58)',
  },
  saveButton: {
    padding: 12,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.support,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.main,
    padding: 12,
    borderRadius: 6,
    marginBottom: 15,
    
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  buttonText: {
    color: 'black',
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
  verificationDocPreview: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 8,
  },
  uploadPromptText: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 20,
  },
  verificationStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  verificationStepText: {
    marginLeft: 10,
    fontSize: 14,
    color: "black",
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

  verificationSection: {
  marginBottom: 20,
  paddingBottom: 15,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
},
documentPreview: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 10,
  backgroundColor: '#f5f5f5',
  borderRadius: 8,
  marginBottom: 10,
},
documentItem: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 10,
  backgroundColor: '#f5f5f5',
  borderRadius: 8,
  marginBottom: 5,
},
documentName: {
  flex: 1,
  marginLeft: 10,
  color: '#333',
},
disabledButton: {
  opacity: 0.6,
},
});