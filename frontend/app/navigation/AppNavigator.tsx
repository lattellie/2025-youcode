// app/navigation/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MainPage from '../pages/MainPage';
import Start from '../pages/Start';
import CamFeed from '../pages/CamFeed';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Feed from '../pages/Feed';
import Gallery from '../pages/Gallery';
import Camera from '../pages/Camera';
const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="CamFeed" component={CamFeed} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="Gallery" component={Gallery} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
