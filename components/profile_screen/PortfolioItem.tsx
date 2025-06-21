import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';


export const PortfolioItem = ({ 
  item, 
  onEdit, 
  onDelete,
  styles 
}) => (
  <View style={styles.portfolioItem}>
    <Image source={{ uri: item.imageUrl }} style={styles.portfolioImage} />
    <View style={styles.portfolioOverlay}>
      <Text style={styles.portfolioTitle}>{item.title}</Text>
      <View style={styles.portfolioActions}>
        <TouchableOpacity
          style={styles.portfolioActionButton}
          onPress={() => onEdit(item)}
        >
          <Feather name="edit-2" size={14} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.portfolioActionButton}
          onPress={() => onDelete(item.id)}
        >
          <Feather name="trash-2" size={14} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);