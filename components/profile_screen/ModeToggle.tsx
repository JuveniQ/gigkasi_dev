import React from 'react';
import { View, Text, Switch } from 'react-native';
import colors from '../../constants/colors';



export const ModeToggle = ({ 
  isProvider, 
  isRequested, 
  onToggle,
  styles 
}) => (
  <View style={styles.modeToggle}>
    <Text style={styles.modeText}>Seeker Mode</Text>
    <Switch
      value={isProvider || isRequested}
      onValueChange={onToggle}
      trackColor={{ false: '#767577', true: colors.support }}
      thumbColor={(isProvider || isRequested) ? '#fff' : '#f4f3f4'}
      disabled={isRequested && !isProvider}
    />
    <Text style={styles.modeText}>Provider Mode</Text>
    {isRequested && !isProvider && (
      <Text style={styles.verificationStatusText}>Verification pending</Text>
    )}
  </View>
);