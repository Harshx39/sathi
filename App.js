import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import WorkerDetails from './screens/WorkerDetails';
import PaymentScreen from './screens/PaymentScreen';
import CustomerHome from './screens/customer/CustomerHome';
import WorkerHome from './screens/worker/WorkerHome';
import WorkerJobs from './screens/worker/WorkerJobs';
import WorkerWithdraw from './screens/worker/WorkerWithdraw';
import WorkerProfile from './screens/worker/WorkerProfile';
import BookService from './screens/customer/BookService';
import BookingHistory from './screens/customer/BookingHistory';
import CustomerProfile from './screens/customer/CustomerProfile';
import SettingScreen from './screens/SettingScreen';
import Profile from './screens/Profile';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="WorkerDetails" component={WorkerDetails} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="CustomerHome" component={CustomerHome} />
        <Stack.Screen name="WorkerHome" component={WorkerHome} />
        <Stack.Screen name="WorkerJobs" component={WorkerJobs} />
        <Stack.Screen name="WorkerWithdraw" component={WorkerWithdraw} />
        <Stack.Screen name="WorkerProfile" component={WorkerProfile} />
        <Stack.Screen name="BookService" component={BookService} />
        <Stack.Screen name="BookingHistory" component={BookingHistory} />
        <Stack.Screen name="CustomerProfile" component={CustomerProfile} />
        <Stack.Screen name="Settings" component={SettingScreen} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
