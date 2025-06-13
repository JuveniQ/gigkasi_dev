import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../constants/firebase.config';
import  { useUser } from '../contexts/UserContext';

export default function AuthScreen() {
  const { login } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAuth = async () => {
    const { email, password, name } = formData;
    
    if (!email || !password || (!isLogin && !name)) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        handleSuccessfulAuth(userCredential.user);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        handleSuccessfulAuth(userCredential.user, name);
      }
    } catch (error) {
      Alert.alert('Authentication Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessfulAuth = (firebaseUser, name = '') => {
    // Map Firebase user to your UserContext structure
    login({
      id: firebaseUser.uid,
      name: name || firebaseUser.displayName || 'New User',
      email: firebaseUser.email,
      imageUrl: firebaseUser.photoURL || 'https://api.a0.dev/assets/image?text=TM&aspect=1:1',
      loggedIn: true,
      // Default values matching your User type
      rating: 0,
      verified: false,
      joinDate: new Date().toLocaleDateString(),
      completedJobs: 0,
      requestsMade: 0,
      services: [],
      requests: [],
      portfolio: [],
      qualifications: [],
      status: 'active'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{isLogin ? 'Welcome Back' : 'Create Account'}</Text>
        </View>

        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: 'https://api.a0.dev/assets/image?text=GIG&aspect=1:1' }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {!isLogin && (
          <View style={styles.inputContainer}>
            <Feather name="user" size={20} color={colors.categoryColor} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
              autoCapitalize="words"
            />
          </View>
        )}

        <View style={styles.inputContainer}>
          <Feather name="mail" size={20} color={colors.categoryColor} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color={colors.categoryColor} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
            secureTextEntry
          />
        </View>

        <TouchableOpacity 
          style={[styles.authButton, loading && styles.disabledButton]} 
          onPress={handleAuth}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.authButtonText}>
              {isLogin ? 'Login' : 'Register'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.switchAuthContainer}
          onPress={() => setIsLogin(!isLogin)}
        >
          <Text style={styles.switchAuthText}>
            {isLogin 
              ? "Don't have an account? Register" 
              : "Already have an account? Login"}
          </Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialAuthContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={24} color="#DB4437" />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    paddingVertical: 25,
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.headerColor,
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  authButton: {
    backgroundColor: colors.categoryColor,
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  disabledButton: {
    opacity: 0.7,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchAuthContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchAuthText: {
    color: colors.categoryColor,
    fontSize: 14,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#666',
  },
  socialAuthContainer: {
    marginHorizontal: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  socialButtonText: {
    marginLeft: 10,
    fontSize: 16,
  },
});