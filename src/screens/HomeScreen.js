import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Placeholder screen for stack inside HomeScreen tab
const HomeStackScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Stack Screen</Text>
    </View>
  );
};

// Stack Navigator placeholder inside HomeScreen tab
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeStack" 
        component={HomeStackScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// Tab Navigator container
const HomeScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStackNavigator}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

