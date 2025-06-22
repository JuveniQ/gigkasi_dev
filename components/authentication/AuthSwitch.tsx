import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export default function AuthSwitch({ text, actionText, onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text} </Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.actionText}>{actionText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  text: {
    color: colors.black,
  },
  actionText: {
    color: colors.main,
    fontWeight: 'bold',
  },
});