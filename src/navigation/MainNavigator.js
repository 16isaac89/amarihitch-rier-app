import React,{Component} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';

import BottomTabBarScreen from "../components/bottomTabBarScreen";
// import LoadingScreen from "../components/loadingScreen";
import SigninScreen from "../screens/auth/signinScreen";
import VerificationScreen from "../screens/auth/verificationScreen";
import EditProfileScreen from "../screens/editProfile/editProfileScreen";
import NotificationsScreen from "../screens/notifications/notificationsScreen";
import ShowMapScreen from "../screens/showMap/showMapScreen";
import SplashScreen from "../screens/splashScreen";
import InviteFriendsScreen from '../screens/inviteFriend/inviteFriendsScreen';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import RegisterScreen from '../screens/auth/RegisterScreen';



const Stack = createStackNavigator();

class MainNavigator extends Component {
  render(){
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
     
       {
           this.props.isloggedin == false ? (
            <>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Signin" component={SigninScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        </>
           )
        :(
        <>
        <Stack.Screen name="BottomTabBar" component={BottomTabBarScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="ShowMap" component={ShowMapScreen} />
        <Stack.Screen name="InviteFriends" component={InviteFriendsScreen} />
        </>
        )
  }
       
      </Stack.Navigator>
    </NavigationContainer>
  );
      }
}

function mapStateToProps( state ) {
  return { 
    regloader:state.auth.regloader,
    isloggedin:state.auth.loggedin,
    internetstate:state.auth.internetstate,
    oldversion:state.auth.oldversion,
    newversion:state.auth.newversion,
  };
}

export default connect(mapStateToProps, actions)(MainNavigator);
