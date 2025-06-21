import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput, 
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ImageBackground
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '../constants/colors';
import { useUser } from '../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import AuthHeader from '../components/authentication/AuthHeader';
import AuthButton from '../components/authentication/AuthButton';
import SocialAuth from '../components/authentication/SocialAuth';
import AuthSwitch from '../components/authentication/AuthSwitch';
import { toast } from 'sonner-native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const { login, loading } = useUser();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async () => {
    const { email, password } = credentials;
    if (!email || !password) {
      toast.error('Please fill all fields');
      return;
    }

    login(email, password)
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
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <AuthHeader title="Welcome Back" />

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Feather name="mail" size={20} color={colors.main} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#999"
                  value={credentials.email}
                  onChangeText={(text) => setCredentials({...credentials, email: text})}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputContainer}>
                <Feather name="lock" size={20} color={colors.main} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#999"
                  value={credentials.password}
                  onChangeText={(text) => setCredentials({...credentials, password: text})}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity 
                  style={styles.visibilityToggle}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Feather 
                    name={isPasswordVisible ? "eye-off" : "eye"} 
                    size={20} 
                    color={colors.main} 
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <AuthButton 
                title="Login" 
                onPress={handleLogin} 
                loading={loading} 
              />


              <SocialAuth />

              <AuthSwitch 
                text="Don't have an account?"
                actionText="Register"
                //@ts-ignore
                onPress={() => navigation.navigate("Register")}
              />
            </View>
          </View>
        </SafeAreaView>
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
    marginBottom: 20,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 25,
  },
  forgotPasswordText: {
    color: colors.main,
    fontSize: 14,
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