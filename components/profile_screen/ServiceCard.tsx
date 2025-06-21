import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import colors from '../../constants/colors';



export const ServiceCard = ({ service, onEdit, styles }) => (
  <View style={styles.serviceCard}>
    <View style={styles.serviceHeader}>
      <MaterialIcons name={service.icon as any} size={20} color={colors.support} />
      <Text style={styles.serviceName}>{service.name}</Text>
    </View>
    <Text style={styles.serviceDescription}>{service.description}</Text>
    <View style={styles.serviceFooter}>
      <Text style={styles.servicePrice}>{service.price}</Text>
      <TouchableOpacity onPress={() => onEdit(service)}>
        <Feather name="edit-2" size={16} color="#666" />
      </TouchableOpacity>
    </View>
  </View>
);