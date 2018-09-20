import React from 'react';
import { Animated, StyleSheet, Text, TextInput, View, ScrollView, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, Alert, Platform, Image, Picker, Keyboard, Dimensions } from 'react-native';
import firebase from 'react-native-firebase';
import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import NavigationService from '../services/NavigationService.js';
import FitImage from 'react-native-fit-image';
import type { RemoteMessage } from 'react-native-firebase';

export default class RentableScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      opacity: 1,
      backgroundColor: '#6de3dc',
      rentButtonBackground: '#6de3dc'
      //condition: 'poor',
      //items: [{value: 'Poor', key: 'poor', label: 'Poor'}, {value: 'Fair', key: 'fair', label: 'Fair'}, {value: 'Good', key: 'good', label: 'Good'}, {value: 'New', key: 'new', label: 'New'}]
    };
    //this.ref = firebase.firestore().collection('items');
    //this.authSubscription = null;
  }

  static navigatorStyle = { navBarHidden: true };

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

    

    // The user is an Object, so they're logged in
    /*if (!this.state.user) {
      const { navigate } = this.props.navigation;

      navigate('LogIn');
    }*/

    /*this._sub = this.props.navigation.addListener(
      'didFocus',
      () => {
        if(this.props.navigation.state.params.mode == 'fromEditItem') {
          this.removeInitialItem = true;
        }
        else if(this.props.navigation.state.params.mode == 'fromPrice') {
          Animated.timing(this.state.fadeAnim, {
            toValue: 0.2,
            duration: 1,
          }).start(() => {
            Animated.timing(this.state.fadeAnim, {
              toValue: 1,
              duration: 500,
            }).start();
          });
        }
        else if(this.props.navigation.state.params.mode == 'fromPriceManualSale') {
          Animated.timing(this.state.fadeAnim, {
            toValue: 0.2,
            duration: 1,
          }).start();
        }
      }
    );*/
  //}

  componentDidMount() {

    firebase.messaging()
      .hasPermission()
      .then(enabled => {
        if (!enabled) {
          console.log('permissions disabled');
          this._getPermission();
        }

        console.log('permissions enabled');

        firebase.messaging().subscribeToTopic('all').catch((error) => {alert(error)});

        firebase.messaging().getToken()
          .then(fcmToken => {
            if (fcmToken) {
              //USE THIS FOR INDIVIDUAL DEVICE MESSAGES?
              console.log(fcmToken);
            } else {
              alert("User doesn't have a token yet");
            } 

          }).catch((error) => {
            alert(error);
          });

      }).then(() => {
        
      }).catch((error) => {alert(error)});
  }

  _getPermission = () => {
    firebase.messaging()
      .requestPermission()
      .catch(error => {
        // User has rejected permissions
        // this._getPermission();
        Alert.alert(
          'ERROR',
          "You must enable push notifications for the messaging system to work! If you don't you won't be able to use SnagIt! Please enable notificaitons in your phone - go to: Settings > Notifications > SnagIt.",
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      });
  };

  componentWillMount() {
    
    /*this.authSubscription = firebase.auth().onAuthStateChanged((user) => {

      if(user) {
        this.setState({
          loading: false,
          user,
        });
      }
    });*/
  }

  componentWillUnmount() {
    this.onTokenRefreshListener();
    this.messageListener();
    firebase.messaging().unsubscribeFromTopic('all');
    //this.authSubscription();
  }

  navigateToOtherUserProfile = () => {
    this.setState({opacity: 0.5});
    console.log('image being pressed');
    
    setTimeout(() => {
      this.setState({opacity: 1});

      this.props.navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'OtherUserProfile' })],
      }));
    }, 1)
  }

  render() {
    var base64Image = '';

    if(Platform.OS === 'ios') {
      base64Image = `data:image/png;base64,${this.props.navigation.getParam('base64orURI', '')}`
    }
    else {
      base64Image = this.props.navigation.getParam('base64orURI', '');
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between', /*alignItems: 'center'*/ paddingBottom: 10}}>
          <View style={{flex: 1, backgroundColor: '#e6fffe', position: 'absolute', right: Platform.OS === 'ios' ? -8 : 0, top: Platform.OS === 'ios' ? 0 : 10, justifyContent: 'center', alignItems: 'flex-end', zIndex: 5, borderRadius: 8, borderWidth: 0}}>
            <SimpleLineIcons
              name='close'
              color={this.state.backgroundColor}
              size={40}
              onPress={() => {
                this.setState({backgroundColor: '#94ebe6'});
                const param = this.props.navigation.getParam('param', '');

                setTimeout(() => {
                  this.setState({backgroundColor: '#6de3dc'});

                  //console.log(this.props.navigation.getParam('param', ''));

                  if(param == 'fromOtherUserProfile') {
                    console.log('in param is fromOtherUserProfile');
                    this.props.navigation.goBack();
                  }
                  else {
                    this.props.navigation.navigate('OpenCamera', { param: 'fromRentableScreen'});
                    NavigationService.navigate('Home');
                  }
                }, 1)
                
              }}
              style={{marginRight: 17, marginLeft: 10, marginBottom: 4, marginTop: 14}}
            />
          </View>
          <View style={{flex: 1, height: Dimensions.get('window').height/2, width: Dimensions.get('window').width, backgroundColor: '#e6fffe', justifyContent: 'center', alignItems: 'center', /*borderBottomColor: '#6de3dc', borderBottomWidth: 1,*/ marginTop: Platform.OS === 'ios' ? 10 : 5}}>
            <FitImage
              source={{uri: 'http://snag.eamondev.com/assets/rowboat.png'}}
              style={{height: Dimensions.get('window').height/2, width: Dimensions.get('window').width}}
            />
          </View>
          <TouchableOpacity
            activeOpacity={1}
            style = {{backgroundColor: this.state.rentButtonBackground,
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      //width: Dimensions.get('window').width,
                      height: 44 }}
            onPress={() => {
              this.setState({rentButtonBackground: '#94ebe6'});

              setTimeout(() => {
                this.setState({rentButtonBackground: '#6de3dc'});

                var timestamp = new Date().getTime().toString();

                // Add a new document with a generated id.                          //user-user                           //send generated ID and then change to message id in cloud
                var addChat = firebase.firestore().collection('chats').doc(timestamp);
                // Add a new document with a generated id.                          //user-user                           //send generated ID and then change to message id in cloud
                var addMessage = firebase.firestore().collection('messages').doc(timestamp);


                dataChat = {
                  "title": "Test Chat",
                  "lastMessage": "The relay seems to be malfunctioning.",
                  "timestamp": timestamp
                }

                dataMessage = {}
                dataMessage[timestamp] = {
                  "name": "eamon",
                  "message": "The relay seems to be malfunctioning.",
                  "timestamp": timestamp
                };

                // Set the 'capital' field of the city
                addChat.update(dataChat).then(() => {
                                // Set the 'capital' field of the city
                  addMessage.update(dataMessage).catch((error) => {
                    //alert(error);
                    addMessage.set(dataMessage).catch((error) => {
                      alert(error);
                    });
                  });
                }).catch((error) => {
                  //alert(error);
                  addChat.set(dataChat).catch((error) => {
                    alert(error);
                  }).then(() => {
                    addMessage.update(dataMessage).catch((error) => {
                      //alert(error);
                      addMessage.set(dataMessage).catch((error) => {
                        alert(error);
                      });
                    });
                  })
                });
                
                /*this.props.navigation.navigate('OpenCamera', { param: 'fromRentableScreen'});
              

                NavigationService.navigate('Home');*/
              }, 1)
            }}
          >
            <Text style = {{backgroundColor: this.state.rentButtonBackground, 
                            textAlign: 'center',
                            color: 'white',
                            fontWeight: '900',
                            fontSize: 18
                          }}>
              RENT
            </Text>
          </TouchableOpacity>
          <View style={{flex: 1, flexDirection: 'column', /*flex: 0.4,*/ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fffbf5'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
              <View style={styles.condition_container}>
                <View style={{paddingBottom: 1}, styles.small_container_left}>
                  <Text style={{marginBottom: 0}}>Condition:</Text>
                  <Text style={{color: '#6de3dc', fontWeight: '700', fontSize: 28}}>Fair</Text>
                </View>
                <View style={styles.small_container}>
                  <Text style={{marginBottom: 0}}>Price (per day):</Text>
                  <Text style={{color: '#6de3dc', fontWeight: '700', fontSize: 28}}>$25</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{backgroundColor: 'white'}, styles.description_container}>
            <View style={styles.small_container_description}>
              <Text style={{marginBottom: 5, marginLeft: 10, marginTop: 10, textDecorationLine: 'underline'}}>Description:</Text>
              <Text style={{marginBottom: 10, marginLeft: 10}}>This is a nice rowboat. It is worth $600. This is a long description. This is a nice rowboat. It is worth $600. This is a long description. This is a nice rowboat. It is worth $600. This is a long description. This is a nice rowboat. It is worth $600. This is a long description.</Text>
            </View>
          </View>
          <View style={{flex: 1, /*width: Dimensions.get('window').width,*//*flex: Platform.OS === 'ios' ? 0.68 : 0.58,*/ flexDirection: 'row', backgroundColor: '#e6fffe'}}>
            <View style={{flexDirection: 'column', justifyContent: 'space-between', flex: 1, alignItems: 'center'}}>
              <TouchableWithoutFeedback onPress={() => this.navigateToOtherUserProfile()}>
                <Image
                  source={{uri: 'http://snag.eamondev.com/assets/billythekid2.jpg'}}
                  style={{height: 70, width: 70, marginTop: Platform.OS === 'ios' ? 8 : 5, borderColor: '#6de3dc', borderWidth: 5, borderRadius: 35, marginBottom: 5}}
                  opacity={this.state.opacity}
                />
              </TouchableWithoutFeedback>
              <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, marginBottom: 4}}>
                <Text style={{fontWeight: '700'}}>Eamon White</Text>
              </View>
            </View>
            <View style={{flexDirection: 'column', justifyContent: 'space-between', flex: 1, alignItems: 'center', backgroundColor: '#d8fffd'}}>
              <SimpleLineIcons
                name='location-pin'
                size={70}
                style={{marginTop: Platform.OS === 'ios' ? 6 : 5, marginBottom: 5}}
                color='#6de3dc'
              />
              <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <Text style={{marginTop: Platform.OS === 'ios' ? -8 : 0, fontWeight: '700', marginBottom: 4}}>3.2 mi.</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'column',
      backgroundColor: '#e6fffe',
      paddingTop: 10,
      //flex: 1,
   },
   small_container_left: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      width: Dimensions.get('window').width * 0.5,
      borderRightColor: '#6de3dc',
      borderRightWidth: 1,
      padding: 10,
      backgroundColor: '#fffbf5'
   },
   small_container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      width: Dimensions.get('window').width * 0.5,
      backgroundColor: '#fffbf5'
   },
   small_container_description: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: '#fffbf5',
      flex: 1
   },
   condition_container: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      backgroundColor: '#fffbf5'
   },
   description_container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: '#fffbf5',
      width: Dimensions.get('window').width,
      borderWidth: 1,
      borderColor: '#6de3dc',
      flex: 1
   },
   submitText: {
    
   },
   submitTouch: {
    
   }

})
