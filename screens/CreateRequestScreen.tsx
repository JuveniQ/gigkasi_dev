import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
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
  { id: '9', name: 'Other', icon: 'more-horiz' }
];

// Urgency levels
const urgencyLevels = [
  { id: '1', name: 'Can wait', color: '#8BC34A', value: 'low' },
  { id: '2', name: 'Soon', color: '#FFC107', value: 'medium' },
  { id: '3', name: 'ASAP', color: '#F44336', value: 'high' }
];

export default function CreateRequestScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Initial category if coming from specific service screen
  const initialCategory = route.params?.category || null;
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [location, setLocation] = useState('Soweto, Johannesburg'); // Default location
  const [budget, setBudget] = useState('');
  const [urgency, setUrgency] = useState('medium');
  const [availabilityDate, setAvailabilityDate] = useState('');
  const [availabilityTime, setAvailabilityTime] = useState('');
  
  // Mock images for attachment feature
  const [attachedImages, setAttachedImages] = useState([
    { id: '1', uri: 'https://api.a0.dev/assets/image?text=Tap%20Repair&aspect=16:9' }
  ]);
  
  const handleBackPress = () => {
    navigation.goBack();
  };
  
  const handleAddImage = () => {
    // In a real app, this would open the camera or image picker
    // Here we're just simulating by adding a placeholder image
    const newImage = { 
      id: String(attachedImages.length + 1), 
      uri: `https://api.a0.dev/assets/image?text=Attachment%20${attachedImages.length + 1}&aspect=16:9` 
    };
    setAttachedImages([...attachedImages, newImage]);
  };
  
  const handleRemoveImage = (id) => {
    setAttachedImages(attachedImages.filter(img => img.id !== id));
  };
  
  const validateForm = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title for your request');
      return false;
    }
    if (!category) {
      Alert.alert('Error', 'Please select a service category');
      return false;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return false;
    }
    return true;
  };
  
  const handleSubmit = () => {
    if (!validateForm()) return;
    
    // In a real app, this would submit the request to an API
    Alert.alert(
      'Request Submitted',
      'Your request has been posted successfully. Service providers in your area will be notified.',
      [
        { 
          text: 'OK', 
          onPress: () => navigation.navigate('Main')
        }
      ]
    );
  };
  
  const getCategoryByName = (categoryName) => {
    return serviceCategories.find(cat => cat.name === categoryName) || null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Request</Text>
        <View style={styles.headerRight} />
      </View>
      
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView style={styles.content}>
          {/* Title */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Title *</Text>
            <TextInput
              style={styles.input}
              placeholder="Briefly describe what you need"
              value={title}
              onChangeText={setTitle}
              maxLength={50}
            />
            <Text style={styles.characterCount}>{title.length}/50</Text>
          </View>
          
          {/* Service Category Selection */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Service Category *</Text>
            <View style={styles.categoriesContainer}>
              {serviceCategories.map((cat) => (
                <TouchableOpacity 
                  key={cat.id}
                  style={[
                    styles.categoryItem,
                    category === cat.name && styles.selectedCategoryItem
                  ]}
                  onPress={() => setCategory(cat.name)}
                >
                  <MaterialIcons 
                    name={cat.icon}
                    size={24}
                    color={category === cat.name ? '#FFFFFF' : '#666'}
                  />
                  <Text 
                    style={[
                      styles.categoryText,
                      category === cat.name && styles.selectedCategoryText
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Description */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Provide details about what you need help with"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
            <Text style={styles.characterCount}>{description.length}/500</Text>
          </View>
          
          {/* Image Attachments */}
          <View style={styles.formGroup}>
            <View style={styles.sectionHeader}>
              <Text style={styles.label}>Images</Text>
              <Text style={styles.optionalText}>(Optional)</Text>
            </View>
            <Text style={styles.helperText}>
              Add photos to help service providers understand your request better
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagesContainer}>
              {attachedImages.map((image) => (
                <View key={image.id} style={styles.imageWrapper}>
                  <Image source={{ uri: image.uri }} style={styles.attachedImage} />
                  <TouchableOpacity 
                    style={styles.removeImageButton}
                    onPress={() => handleRemoveImage(image.id)}
                  >
                    <Ionicons name="close-circle" size={24} color="#2196F3" />
                  </TouchableOpacity>
                </View>
              ))}
              
              <TouchableOpacity style={styles.addImageButton} onPress={handleAddImage}>
                <MaterialIcons name="add-a-photo" size={24} color="#666" />
                <Text style={styles.addImageText}>Add Photo</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          
          {/* Location */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Location *</Text>
            <TouchableOpacity style={styles.locationSelector}>
              <View style={styles.locationContainer}>
                <Ionicons name="location-outline" size={20} color="#2196F3" />
                <Text style={styles.locationText}>{location}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          </View>
          
          {/* Budget */}
          <View style={styles.formGroup}>
            <View style={styles.sectionHeader}>
              <Text style={styles.label}>Budget</Text>
              <Text style={styles.optionalText}>(Optional)</Text>
            </View>
            <View style={styles.budgetInputContainer}>
              <Text style={styles.currencySymbol}>R</Text>
              <TextInput
                style={styles.budgetInput}
                placeholder="Amount"
                value={budget}
                onChangeText={setBudget}
                keyboardType="number-pad"
              />
            </View>
          </View>
          
          {/* Availability */}
          <View style={styles.formGroup}>
            <View style={styles.sectionHeader}>
              <Text style={styles.label}>Availability</Text>
              <Text style={styles.optionalText}>(Optional)</Text>
            </View>
            <View style={styles.availabilityContainer}>
              <TouchableOpacity style={styles.dateInput}>
                <Ionicons name="calendar-outline" size={20} color="#666" />
                <TextInput
                  style={styles.availabilityInputText}
                  placeholder="Date (e.g., Today, Tomorrow, 15 Jun)"
                  value={availabilityDate}
                  onChangeText={setAvailabilityDate}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.timeInput}>
                <Ionicons name="time-outline" size={20} color="#666" />
                <TextInput
                  style={styles.availabilityInputText}
                  placeholder="Time (e.g., Morning, 2PM-5PM)"
                  value={availabilityTime}
                  onChangeText={setAvailabilityTime}
                />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Urgency */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Urgency Level</Text>
            <View style={styles.urgencyContainer}>
              {urgencyLevels.map((level) => (
                <TouchableOpacity 
                  key={level.id}
                  style={[
                    styles.urgencyOption,
                    urgency === level.value && styles.selectedUrgencyOption,
                    { borderColor: level.color }
                  ]}
                  onPress={() => setUrgency(level.value)}
                >
                  <View 
                    style={[
                      styles.urgencyDot,
                      { backgroundColor: level.color }
                    ]}
                  />
                  <Text 
                    style={[
                      styles.urgencyText,
                      urgency === level.value && { fontWeight: 'bold' }
                    ]}
                  >
                    {level.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Legal */}
          <View style={styles.legalContainer}>
            <Text style={styles.legalText}>
              By posting this request, you agree to our Terms of Service and Privacy Policy.
            </Text>
          </View>
          
          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Post Request</Text>
          </TouchableOpacity>
          
          {/* Spacing at bottom */}
          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0D47A1',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 32,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  characterCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 4,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  categoryItem: {
    width: '31%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    margin: '1%',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: '#FFFFFF',
  },
  selectedCategoryItem: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  categoryText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    height: 120,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionalText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 6,
  },
  helperText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  imagesContainer: {
    flexDirection: 'row',
    marginLeft: -4,
  },
  imageWrapper: {
    marginRight: 12,
    position: 'relative',
  },
  attachedImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  addImageButton: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderStyle: 'dashed',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addImageText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  locationSelector: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
  budgetInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  currencySymbol: {
    fontSize: 16,
    color: '#666',
    marginRight: 8,
  },
  budgetInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  availabilityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginRight: 8,
  },
  timeInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  availabilityInputText: {
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  urgencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  urgencyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '31%',
    paddingVertical: 10,
    borderWidth: 2,
    borderRadius: 8,
  },
  selectedUrgencyOption: {
    backgroundColor: '#F5F7FA',
  },
  urgencyDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  urgencyText: {
    fontSize: 14,
  },
  legalContainer: {
    marginBottom: 20,
  },
  legalText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});