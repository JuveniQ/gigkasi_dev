import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput, 
  ActivityIndicator, 
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  ScrollView
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useUser } from '../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import AuthHeader from '../components/AuthHeader';
import AuthButton from '../components/AuthButton';
import SocialAuth from '../components/SocialAuth';
import AuthSwitch from '../components/AuthSwitch';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const { login } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const handleRegister = async () => {
    const { name, email, password, confirmPassword } = formData;
    
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      login(email, password)
      await login(email, password)
      //@ts-ignore
      navigation.replace("MainTabs")
    } catch (error) {
      Alert.alert('Registration Error', error.message);
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <ImageBackground 
     // source={require('../assets/auth-bg.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView style={styles.container}>
          <View style={styles.content}>
            <AuthHeader 
              title="Create Account" 
           
            />

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Feather name="user" size={20} color={colors.headerColor} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#999"
                  value={formData.name}
                  onChangeText={(text) => setFormData({...formData, name: text})}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputContainer}>
                <Feather name="mail" size={20} color={colors.headerColor} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#999"
                  value={formData.email}
                  onChangeText={(text) => setFormData({...formData, email: text})}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputContainer}>
                <Feather name="lock" size={20} color={colors.headerColor} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#999"
                  value={formData.password}
                  onChangeText={(text) => setFormData({...formData, password: text})}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity 
                  style={styles.visibilityToggle}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Feather 
                    name={isPasswordVisible ? "eye-off" : "eye"} 
                    size={20} 
                    color={colors.headerColor} 
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Feather name="lock" size={20} color={colors.headerColor} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#999"
                  value={formData.confirmPassword}
                  onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
                  secureTextEntry={!isConfirmPasswordVisible}
                />
                <TouchableOpacity 
                  style={styles.visibilityToggle}
                  onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                >
                  <Feather 
                    name={isConfirmPasswordVisible ? "eye-off" : "eye"} 
                    size={20} 
                    color={colors.headerColor} 
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.passwordRequirements}>
                <Text style={styles.requirementText}>• At least 8 characters</Text>
                <Text style={styles.requirementText}>• One uppercase letter</Text>
                <Text style={styles.requirementText}>• One number</Text>
              </View>

              <AuthButton 
                title="Create Account" 
                onPress={handleRegister} 
                loading={loading} 
              />

              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  By registering, you agree to our 
                  <Text style={styles.linkText}> Terms of Service</Text> and 
                  <Text style={styles.linkText}> Privacy Policy</Text>
                </Text>
              </View>

              

              <SocialAuth />

              <AuthSwitch 
                text="Already have an account?"
                actionText="Login"
                //@ts-ignore
                onPress={() => navigation.navigate("Login")}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(245, 247, 250, 0.9)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 56,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#333',
    fontFamily: 'Inter-Regular',
  },
  visibilityToggle: {
    padding: 8,
    marginLeft: 10,
  },
  passwordRequirements: {
    marginBottom: 20,
    marginTop: -5,
  },
  requirementText: {
    color: '#6C757D',
    fontSize: 12,
    marginBottom: 2,
  },
  termsContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  termsText: {
    color: '#6C757D',
    fontSize: 12,
    textAlign: 'center',
  },
  linkText: {
    color: colors.headerColor,
    fontWeight: '500',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E9ECEF',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#6C757D',
    fontSize: 14,
    fontWeight: '500',
  },
});