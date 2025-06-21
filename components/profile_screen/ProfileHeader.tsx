import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';


interface ProfileHeaderProps {
  user: {
    imageUrl: string;
    verified: boolean;
    displayName: string;
    location: string;
    rating: number;
    reviews: number;
  };
  onReviewsPress: () => void;
  styles: any;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, onReviewsPress, styles }) => (
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
      <Text style={styles.profileName}>{user.displayName}</Text>
      <Text style={styles.profileLocation}>
        <Feather name="map-pin" size={12} color="#666" /> {user.location}
      </Text>
      <TouchableOpacity onPress={onReviewsPress}>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>
            {user.rating} ({user.reviews} reviews)
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);