import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import WorkerDetails from './screens/WorkerDetails';
import PaymentScreen from './screens/PaymentScreen';
import CustomerHome from './screens/CustomerHome';
import WorkerHome from './screens/WorkerHome';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* First screen will be Login */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="WorkerDetails" component={WorkerDetails} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="CustomerHome" component={CustomerHome} />
        <Stack.Screen name="WorkerHome" component={WorkerHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
