import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Easing,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

const { width } = Dimensions.get('window');

const GuideScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const fadeAnim = useState(new Animated.Value(1))[0];
  const slideAnim = useState(new Animated.Value(0))[0];

  const guideSteps = [
    {
      title: "Find Local Service Providers",
      description: "Browse hundreds of skilled professionals in your area for any service you need.",
      image: "https://api.a0.dev/assets/image?text=Find%20Services&aspect=16:9",
      icon: "search"
    },
    {
      title: "Book Services Instantly",
      description: "Schedule appointments with verified providers at your convenience.",
      image: "https://api.a0.dev/assets/image?text=Book%20Services&aspect=16:9",
      icon: "calendar"
    },
    {
      title: "Secure In-App Payments",
      description: "Pay safely through our protected payment system with multiple options.",
      image: "https://api.a0.dev/assets/image?text=Secure%20Payments&aspect=16:9",
      icon: "card"
    },
    {
      title: "Real-Time Tracking",
      description: "Get updates and track your service provider's arrival in real-time.",
      image: "https://api.a0.dev/assets/image?text=Real-Time%20Tracking&aspect=16:9",
      icon: "location"
    },
    {
      title: "Rate Your Experience",
      description: "Help maintain quality by rating and reviewing your service providers.",
      image: "https://api.a0.dev/assets/image?text=Rate%20Experience&aspect=16:9",
      icon: "star"
    }
  ];

  const animateTransition = (direction) => {
    // Fade out current content
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.ease
    }).start(() => {
      // Update step
      const newStep = direction === 'next' 
        ? Math.min(currentStep + 1, guideSteps.length - 1)
        : Math.max(currentStep - 1, 0);
      
      setCurrentStep(newStep);
      
      // Slide animation
      slideAnim.setValue(direction === 'next' ? 50 : -50);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad)
      }).start();
      
      // Fade in new content
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.ease
      }).start();
    });
  };

  const handleNext = () => {
    if (currentStep < guideSteps.length - 1) {
      animateTransition('next');
    } else {
      navigation.navigate('Register');
    }
  };

  const handlePrev = () => {
    animateTransition('prev');
  };

  const handleSkip = () => {
    navigation.navigate('Register');
  };

  const renderStepIndicator = () => {
    return (
      <View style={styles.stepIndicatorContainer}>
        {guideSteps.map((_, index) => (
          <View 
            key={index}
            style={[
              styles.stepIndicator,
              index === currentStep && styles.activeStepIndicator
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      
      {/* Main Content */}
      <View style={styles.contentContainer}>
        <Animated.View 
          style={[
            styles.animatedContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }]
            }
          ]}
        >
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: guideSteps[currentStep].image }} 
              style={styles.guideImage}
              resizeMode="contain"
            />
            <View style={styles.iconCircle}>
              <Ionicons 
                name={guideSteps[currentStep].icon as any} 
                size={32} 
                color="#2196F3" 
              />
            </View>
          </View>
          
          <Text style={styles.title}>{guideSteps[currentStep].title}</Text>
          <Text style={styles.description}>{guideSteps[currentStep].description}</Text>
        </Animated.View>
      </View>
      
      {/* Step Indicator */}
      {renderStepIndicator()}
      
      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.navButton, 
            styles.prevButton,
            currentStep === 0 && styles.disabledButton
          ]}
          onPress={handlePrev}
          disabled={currentStep === 0}
        >
          <Ionicons name="arrow-back" size={20} color={colors.support} />
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navButton, styles.nextButton]}
          onPress={handleNext}
        >
          <Text style={[styles.buttonText, {color: 'white'}]}>
            {currentStep === guideSteps.length - 1 ? "Get Started" : "Next"}
          </Text>
          <Ionicons 
            name={currentStep === guideSteps.length - 1 ? "checkmark" : "arrow-forward"} 
            size={20} 
            color="#fff" 
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  skipButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    padding: 8,

  },
  skipText: {
    color: colors.support,
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  animatedContainer: {
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    width: width * 0.8,
    height: width * 0.5,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  guideImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  iconCircle: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 24,
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  stepIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
    marginHorizontal: 4,
  },
  activeStepIndicator: {
    width: 24,
    backgroundColor:  colors.support,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  prevButton: {
    borderWidth: 1,
    borderColor: colors.support,
  },
  nextButton: {
    backgroundColor: colors.support,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default GuideScreen;