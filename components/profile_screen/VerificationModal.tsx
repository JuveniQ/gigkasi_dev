import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Modal, 
  Alert 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import colors from '../../constants/colors';

export const VerificationModal = ({
  visible,
  onClose,
  onSubmit,
  verificationDocs,
  setVerificationDocs,
  styles
}) => {
  const [selfieImage, setSelfieImage] = useState<string | null>(null);
  const [governmentID, setGovernmentID] = useState<{name: string, uri: string} | null>(null);
  const [qualifications, setQualifications] = useState<any[]>([]);

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

  const removeQualification = (index: number) => {
    const newQualifications = [...qualifications];
    const removedDoc = newQualifications.splice(index, 1);
    setQualifications(newQualifications);
    setVerificationDocs(verificationDocs.filter(uri => uri !== removedDoc[0].uri));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <ScrollView style={styles.modalContent}>
          <Text style={styles.modalTitle}>Become a Service Provider</Text>
          <Text style={styles.modalSubtitle}>
            To offer services, please verify your identity and qualifications
          </Text>

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
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.saveButton, (!selfieImage || !governmentID) && styles.disabledButton]}
              onPress={onSubmit}
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