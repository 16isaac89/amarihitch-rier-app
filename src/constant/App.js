import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';
import BottomTabBarScreen from "./components/bottomTabBarScreen";
import LoadingScreen from "./components/loadingScreen";
import SigninScreen from "./screens/auth/signinScreen";
import VerificationScreen from "./screens/auth/verificationScreen";
import EditProfileScreen from "./screens/editProfile/editProfileScreen";
import NotificationsScreen from "./screens/notifications/notificationsScreen";
import ShowMapScreen from "./screens/showMap/showMapScreen";
import SplashScreen from "./screens/splashScreen";
import InviteFriendsScreen from './screens/inviteFriend/inviteFriendsScreen';

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Signin" component={SigninScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="BottomTabBar" component={BottomTabBarScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="ShowMap" component={ShowMapScreen} />
        <Stack.Screen name="InviteFriends" component={InviteFriendsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;