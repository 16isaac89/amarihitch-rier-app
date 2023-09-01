/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import store from "./src/redux/store"
import {checklogin,sendfcmtoken,neworders} from "./src/redux/actions"
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

store.dispatch(checklogin())

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
 
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    store.dispatch(sendfcmtoken())
  }
}
requestUserPermission()   

async function onMessageReceived(message) {
  await notifee.requestPermission()

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.displayNotification({
    title: message.data.title,
    body: message.data.message,
    android: {
      channelId,
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
  if(message.data.msgtype === 1 || message.data.msgtype === "1"){
    store.dispatch(neworders())
  }


}

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);
AppRegistry.registerComponent(appName, () => App);
