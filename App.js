import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator, StackActions, NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';
import { YellowBox } from 'react-native';
import NavigationService from './services/NavigationService';
//import type { RemoteMessage } from 'react-native-firebase';

import HomeScreen from './pages/HomeScreen';
import ProfileScreen from './pages/ProfileScreen';
//import CameraScreen from './pages/CameraScreen';
import CameraScreenNavigator from './components/CameraScreenNavigator';
//import RentScreenNavigator from './components/RentScreenNavigator';
import { setCustomText } from 'react-native-global-props';

const customTextProps = { 
  style: { 
    fontFamily: 'OpenSans-Regular'
  }
}

setCustomText(customTextProps);

YellowBox.ignoreWarnings(['Class RCTCxxModule']);
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['You should only render one navigator explicitly in your app, and other navigators should by rendered by including them in that navigator.']);

const AppNavigator = createBottomTabNavigator(
  {
    Home: { key: 'home', screen: HomeScreen },
    Profile: { key: 'profile', screen: ProfileScreen },
    Rent: { key: 'renttab', screen: CameraScreenNavigator },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
        } else if (routeName === 'Profile') {
          iconName = 'user';
        } else if (routeName === 'Rent') {
          iconName = 'plus-square';
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <Icon
            name={iconName}
            color={tintColor}
            type='feather'
          />
        )
      }
    }),
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#c9fffd',
      activeBackgroundColor: '#6de3dc',
      inactiveBackgroundColor: '#6de3dc'
    },
  },
);

// gets the current screen from navigation state
function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

export default class App extends React.Component {
  
  /*componentDidMount() {
    firebase.messaging().hasPermission()
        .then(enabled => {
          if (enabled) {
            firebase.messaging().getToken()
              .then(fcmToken => {
                if (fcmToken) {
                  // user has a device token
                } else {
                  // user doesn't have a device token yet
                } 
              });

            firebase.messaging().subscribeToTopic('all');

            this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
                // Process your token as required
                
            });

            this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
                // Process your message as required
                alert(message);
            });
            // user has permissions
          } else {
            firebase.messaging().requestPermission()
              .then(() => {
                firebase.messaging().getToken()
                  .then(fcmToken => {
                    if (fcmToken) {
                      // user has a device token
                    } else {
                      // user doesn't have a device token yet
                    } 
                  });

                firebase.messaging().subscribeToTopic('all');

                this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
                    // Process your token as required
                    
                });

                this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
                  console.log("message received");
                    // Process your message as required
                    alert(message);
                });
              })
              .catch(error => {
                alert(error);
              });
          } 
        });
  }*/

  componentWillUnmount() {
    /*this.onTokenRefreshListener();
    this.messageListener();
    firebase.messaging().unsubscribeFromTopic('all');*/
    //this.authSubscription();
  }
  
  render() {
    return (
      <AppNavigator ref={navigatorRef => { NavigationService.setTopLevelNavigator(navigatorRef);}}/>
    )
  }
}