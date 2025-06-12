import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert,
    Platform,
    Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../constants/colors';

export default function CreateServiceScreen() {
    const navigation = useNavigation();

    // Service data state
    const [service, setService] = useState({
        title: '',
        category: '',
        description: '',
        price: '',
        images: [],
        availability: 'Flexible',
        experience: '2+ years'
    });

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Categories data
    const categories = [
        'Electrical', 'Plumbing', 'Cleaning',
        'Tutoring', 'Gardening', 'Moving',
        'Painting', 'Repairs', 'Other'
    ];

    // Handle image selection
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled && service.images.length < 5) {
            setService({
                ...service,
                images: [...service.images, result.assets[0].uri]
            });
        } else if (service.images.length >= 5) {
            Alert.alert('Limit reached', 'You can upload up to 5 images');
        }
    };

    // Remove selected image
    const removeImage = (index) => {
        const newImages = [...service.images];
        newImages.splice(index, 1);
        setService({ ...service, images: newImages });
    };

    // Handle form submission
    const handleSubmit = () => {
        if (!service.title || !selectedCategory || !service.description || !service.price) {
            Alert.alert('Missing Information', 'Please fill all required fields');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            Alert.alert('Success', 'Service added successfully');
            navigation.goBack();
        }, 1500);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Create Service</Text>
                    <View style={styles.headerRight} />
                </View>

                {/* Service Details Form */}
                <View style={styles.formContainer}>
                    {/* Service Title */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Service Title*</Text>
                        <TextInput
                            style={styles.input}
                            value={service.title}
                            onChangeText={(text) => setService({ ...service, title: text })}
                            placeholder="e.g. Professional Plumbing Services"
                            placeholderTextColor="#999"
                        />
                    </View>

                    {/* Category Selection */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Category*</Text>
                        <View style={styles.categoriesContainer}>
                            {categories.map((category) => (
                                <TouchableOpacity
                                    key={category}
                                    style={[
                                        styles.categoryButton,
                                        selectedCategory === category && styles.selectedCategory
                                    ]}
                                    onPress={() => {
                                        setSelectedCategory(category);
                                        setService({ ...service, category });
                                    }}
                                >
                                    <Text style={[
                                        styles.categoryText,
                                        selectedCategory === category && styles.selectedCategoryText
                                    ]}>
                                        {category}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    
                    {/* Service Images */}
                    <View style={styles.imagesContainer}>
                        <Text style={styles.sectionLabel}>Add Photos (Max 5)</Text>
                        <View style={styles.imagesRow}>
                            {service.images.map((uri, index) => (
                                <View key={index} style={styles.imageWrapper}>
                                    <Image source={{ uri }} style={styles.selectedImage} />
                                    <TouchableOpacity
                                        style={styles.removeImageButton}
                                        onPress={() => removeImage(index)}
                                    >
                                        <Feather name="x" size={16} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                            {service.images.length < 5 && (
                                <TouchableOpacity style={styles.addImageButton} onPress={pickImage}>
                                    <Feather name="plus" size={24} color="#666" />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    {/* Description */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Description*</Text>
                        <TextInput
                            style={[styles.input, styles.descriptionInput]}
                            value={service.description}
                            onChangeText={(text) => setService({ ...service, description: text })}
                            placeholder="Describe your service in detail..."
                            placeholderTextColor="#999"
                            multiline
                            numberOfLines={5}
                        />
                    </View>

                    {/* Pricing */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Price*</Text>
                        <View style={styles.priceInputContainer}>
                            <Text style={styles.currencySymbol}>R</Text>
                            <TextInput
                                style={[styles.input, styles.priceInput]}
                                value={service.price}
                                onChangeText={(text) => setService({ ...service, price: text })}
                                placeholder="0.00"
                                placeholderTextColor="#999"
                                keyboardType="numeric"
                            />
                            <View style={styles.priceTypeContainer}>
                                <Text style={styles.priceTypeText}>/ hour</Text>
                            </View>
                        </View>
                    </View>

                    {/* Availability */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Availability</Text>
                        <View style={styles.radioGroup}>
                            {['Flexible', 'Fixed Schedule', 'On Demand'].map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={styles.radioOption}
                                    onPress={() => setService({ ...service, availability: option })}
                                >
                                    <View style={styles.radioCircle}>
                                        {service.availability === option && (
                                            <View style={styles.radioInnerCircle} />
                                        )}
                                    </View>
                                    <Text style={styles.radioLabel}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Experience Level */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Experience Level</Text>
                        <View style={styles.dropdown}>
                            <Text style={styles.dropdownText}>{service.experience}</Text>
                            <MaterialIcons name="arrow-drop-down" size={24} color="#666" />
                        </View>
                    </View>
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                    disabled={isLoading}
                >
                    <Text style={styles.submitButtonText}>
                        {isLoading ? 'Posting Service...' : 'Post Service'}
                    </Text>
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
        backgroundColor: colors.headerColor,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerRight: {
        width: 32,
    },
    backButton: {
        padding: 4,
    },
    disabledButton: {
        color: '#aaa',
    },
    imagesContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
        marginBottom: 12,
    },
    imagesRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
    },
    addImageButton: {
        width: 80,
        height: 80,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        marginBottom: 12,
        backgroundColor: '#f9f9f9',
    },
    imageWrapper: {
        position: 'relative',
        marginRight: 12,
        marginBottom: 12,
    },
    selectedImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    removeImageButton: {
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    inputContainer: {
        marginBottom: 20,
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
        color: '#333',
    },
    descriptionInput: {
        height: 120,
        textAlignVertical: 'top',
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
    },
    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        marginRight: 8,
        marginBottom: 8,
        backgroundColor: '#f9f9f9',
    },
    selectedCategory: {
        backgroundColor: '#2196F3',
        borderColor: '#2196F3',
    },
    categoryText: {
        fontSize: 14,
        color: '#666',
    },
    selectedCategoryText: {
        color: '#fff',
    },
    priceInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    currencySymbol: {
        paddingHorizontal: 14,
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    priceInput: {
        flex: 1,
        borderWidth: 0,
        paddingLeft: 0,
    },
    priceTypeContainer: {
        paddingHorizontal: 14,
    },
    priceTypeText: {
        fontSize: 14,
        color: '#666',
    },
    radioGroup: {
        marginTop: 8,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    radioInnerCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#2196F3',
    },
    radioLabel: {
        fontSize: 15,
        color: '#333',
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 14,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    dropdownText: {
        fontSize: 16,
        color: '#333',
    },
    submitButton: {
        margin: 16,
        padding: 16,
        backgroundColor: '#2196F3',
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
});