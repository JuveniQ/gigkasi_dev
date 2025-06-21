import React from 'react';
import { View, Text } from 'react-native';


export const StatsSection= ({ stats, styles }) => (
  <View style={styles.statsContainer}>
    {stats.map((stat, index) => (
      <React.Fragment key={stat.label}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stat.value}</Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
        {index < stats.length - 1 && <View style={styles.statDivider} />}
      </React.Fragment>
    ))}
  </View>
);