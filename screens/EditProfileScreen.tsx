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
  Platform,
  ActivityIndicator
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../contexts/UserContext';
import colors from '../constants/colors';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const user = useUser();
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    uid: user.uid,
    displayName: user.displayName,
    phone: user.phone,
    image: {uid: user.uid ,name: user.image.name, size: user.image.size, uri: user.image.uri, type: user.image.type},
    email: user.email,
    location: user.location,
    bio: user.bio
  })
  

  // Handle image selection
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
     setFormData({...formData, image: {
      uid: user.uid,
      name: result.assets[0].fileName,
      size: result.assets[0].fileSize,
      type: result.assets[0].mimeType,
      uri: result.assets[0].uri,
     }}) 
    }
  };

  // Handle form submission
  const handleSave = () => {
    user.updateProfile(formData, setSaving)
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          { !saving ?
           <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity> :
           <ActivityIndicator size='small' color={colors.accentDark} />}
        </View>

        {/* Profile Picture */}
        <View style={styles.profilePictureContainer}>
          <Image source={{ uri: formData.image.uri, cache: 'reload' }} style={styles.profileImage} />
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
              value={formData.displayName}
              onChangeText={(text) => setFormData({...formData, displayName: text})}
              placeholder="Enter your full name"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => setFormData({...formData, email: text})}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={(text) => setFormData({...formData, phone: text})}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Location</Text>
            <TextInput
              style={styles.input}
              value={formData.location}
              onChangeText={(text) => setFormData({...formData, location: text})}
              placeholder="Enter your location"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Bio</Text>
            <TextInput
              style={[styles.input, styles.bioInput]}
              value={formData.bio}
              onChangeText={(text) => setFormData({...formData, bio: text})}
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