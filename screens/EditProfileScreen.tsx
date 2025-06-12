import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
  Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  
  // User data state
  const [profile, setProfile] = useState({
    name: 'Thabo Mokoena',
    email: 'thabo.mokoena@example.com',
    phone: '+27 72 123 4567',
    location: 'Soweto, Johannesburg',
    bio: 'Professional electrician and plumber with 5+ years experience',
    imageUrl: 'https://api.a0.dev/assets/image?text=TM&aspect=1:1'
  });

  // Handle image selection
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfile({...profile, imageUrl: result.assets[0].uri});
    }
  };

  // Handle form submission
  const handleSave = () => {
    // Here you would typically send the updated profile to your backend
    Alert.alert('Success', 'Profile updated successfully');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Picture */}
        <View style={styles.profilePictureContainer}>
          <Image source={{ uri: profile.imageUrl }} style={styles.profileImage} />
          <TouchableOpacity style={styles.editPhotoButton} onPress={pickImage}>
            <Feather name="camera" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={profile.name}
              onChangeText={(text) => setProfile({...profile, name: text})}
              placeholder="Enter your full name"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={profile.email}
              onChangeText={(text) => setProfile({...profile, email: text})}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={profile.phone}
              onChangeText={(text) => setProfile({...profile, phone: text})}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Location</Text>
            <TextInput
              style={styles.input}
              value={profile.location}
              onChangeText={(text) => setProfile({...profile, location: text})}
              placeholder="Enter your location"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Bio</Text>
            <TextInput
              style={[styles.input, styles.bioInput]}
              value={profile.bio}
              onChangeText={(text) => setProfile({...profile, bio: text})}
              placeholder="Tell us about yourself"
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Change Password */}
        <TouchableOpacity 
          style={styles.changePasswordButton}
          //@ts-ignore
          onPress={() => navigation.navigate('ChangePassword')}
        >
          <Feather name="lock" size={18} color="#333" />
          <Text style={styles.changePasswordText}>Change Password</Text>
          <Feather name="chevron-right" size={18} color="#999" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2196F3',
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: '#eee',
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: '40%',
    backgroundColor: '#2196F3',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  formContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: Platform.OS === 'ios' ? 14 : 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  changePasswordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginBottom: 20,
  },
  changePasswordText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
});