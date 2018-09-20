import React from 'react';
import { Easing, Animated, StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, Platform, FlatList, Image, Dimensions, ImageSource} from 'react-native';
import { SearchBar } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import FitImage from 'react-native-fit-image';
import autobind from 'autobind-decorator';
import RNPickerSelect from 'react-native-picker-select';
import type { RemoteMessage } from 'react-native-firebase';

export const toRentable = () => {
  const resetToRentable = NavigationActions.navigate({
      key: 'rentable',
      routeName: 'Rentable'
  });
  return resetToRentable;
}

export interface ISize {
  width: number;
  height: number;
}

export default class HomeScreen extends React.Component {

  constructor() {
    super();

    this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
        // Process your token as required
        
    });

    this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
        // Process your message as required
        Alert.alert(
          'NEW MESSAGE',
          message.data.message,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
    });
    //this.ref = firebase.firestore().collection('items');
    //this.authSubscription = null;
  }

  static navigatorStyle = { navBarHidden: true };

  state = {
    searchText: "",
    items: [{uri: 'http://snag.eamondev.com/assets/rowboat.png', key: 'item1', dist: '3.2 mi', condition: 'Fair', rate: '$250'},
            {uri: 'http://snag.eamondev.com/assets/rowboat.png', key: 'item2', dist: '50 mi', condition: 'Fair', rate: '$25'},
            {uri: 'http://snag.eamondev.com/assets/billythekid2.jpg', key: 'item3', dist: '3.2 mi', condition: 'Fair', rate: '$25'},
            {uri: 'http://snag.eamondev.com/assets/rowboat.png', key: 'item4', dist: '3.2 mi', condition: 'Fair', rate: '$25'},
            {uri: 'http://snag.eamondev.com/assets/billythekid2.jpg', key: 'item5', dist: '3.2 mi', condition: 'Fair', rate: '$25'},
            {uri: 'http://snag.eamondev.com/assets/rowboat.png', key: 'item6', dist: '3.2 mi', condition: 'Fair', rate: '$25'},
            {uri: 'http://snag.eamondev.com/assets/rowboat.png', key: 'item7', dist: '3.2 mi', condition: 'Fair', rate: '$25'},
            {uri: 'http://snag.eamondev.com/assets/billythekid2.jpg', key: 'item8', dist: '3.2 mi', condition: 'Fair', rate: '$25'}
           ],
    conditions: [{value: 'Poor', key: 'poor', label: 'Poor'}, {value: 'Fair', key: 'fair', label: 'Fair'}, {value: 'Good', key: 'good', label: 'Good'}, {value: 'New', key: 'new', label: 'New'}],
    backgroundColor: '#e6fffe',
    radius: '25',
    condition: null,
    highPrice: '',
    lowPrice: '',
    yPosition: new Animated.Value(0),
    showFilterArea: false
  };

  componentDidMount() {

    console.log('componentDidMount');

    firebase.messaging()
      .hasPermission()
      .then(enabled => {
        if (!enabled) {
          console.log('permissions disabled');
          this._getPermission();
        }

        console.log('permissions enabled');

        firebase.messaging().subscribeToTopic('all').catch((error) => {alert(error)});

        /*firebase.messaging().getToken()
          .then(fcmToken => {
            if (fcmToken) {
              console.log(fcmToken);
              // Add a new document with a generated id.
              const addMessage = firebase.firestore().collection('conversations').doc('1234567').collection('messages').doc('1234567');

              data = {
                  data: {
                    message: "You got a new new m2124asdf4339",
                  }
              }
              // Set the 'capital' field of the city
              const updateMessage = addMessage.update(data).catch((error) => {
                //alert(error);
                addMessage.set(data).catch((error) => {
                  alert(error);
                });
              });
            } else {
              alert("User doesn't have a token yet");
            } 

          }).catch((error) => {
            alert(error);
          });*/

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

  componentWillUnmount() {
    this.onTokenRefreshListener();
    this.messageListener();
    firebase.messaging().unsubscribeFromTopic('all');
    //this.authSubscription();
  
    /*this.authSubscription = firebase.auth().onAuthStateChanged((user) => {

      if(user) {
        this.setState({
          loading: false,
          user,
        });
      }
    });*/

  }

  animateHeightUp = (easing) => {
    console.log("animateHeight");
    this.setState({showFilterArea: true});

    Animated.timing(                    // Animate over time
      this.state.yPosition,             // The animated value to drive, this would be a new Animated.Value(0) object.
      {
        toValue: 64,                   // Animate the value
        duration: 300,                 // Make it take a while
        easing
      }
    ).start();
  }

  animateHeightDown = (easing) => {
    console.log("animateHeight");

    Animated.timing(                    // Animate over time
      this.state.yPosition,             // The animated value to drive, this would be a new Animated.Value(0) object.
      {
        toValue: 0,
        duration: 0,                   // Animate the value
        easing                        // Make it take a while
      }
    ).start(() => {
      this.setState({showFilterArea: false});
    });
  }

  onPressFunction = () => {
    if(this.state.showFilterArea) {
      this.animateHeightDown();
    }
    else {
      this.animateHeightUp();
    }
  }

  navigateToRentable = () => {
    console.log('in navigateToRentable');

    /*this.props
     .navigation
     .dispatch(
        NavigationActions.navigate({
          key: 'renttab',
          routeName: 'RentTab',
          action: toRentable
        })
     )*/

     this.setState({backgroundColor: '#d8fffd'});

     setTimeout(() => {
      this.props.navigation.dispatch(
        NavigationActions.navigate({
          routeName: 'Rent',
          params: { param: 'RentTab' },
        })
      );

      this.setState({backgroundColor: '#e6fffe'});
     }, 1)
     /*const { state } = this.props.navigation;
     console.log(state);
     const keyToGoTo = state.routes[2].key

     this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          key: keyToGoTo,
          actions: [
            NavigationActions.navigate({
              routeName: 'Rentable',
            })
          ]
        })
        
      );*/


    /*const navigateAction = NavigationActions.navigate({
      routeName: 'Rent',

      params: {},

      action: NavigationActions.navigate({ routeName: 'Rentable' }),
    });

    this.props.navigation.dispatch(navigateAction);*/
   
    /*this.props.navigation.dispatch(NavigationActions.navigate({
      routeName: 'Rent',
      action: NavigationActions.navigate({
        routeName: 'Rentable'
      })
    }));
    */
  }

  @autobind
  renderListItems({item, index}) {

    const uri = 'http://snag.eamondev.com/assets/rowboat.png';

    return (
      <TouchableOpacity onPress={this.navigateToRentable.bind(this)}>
        <View style={{
                    flexDirection: 'column',
                    backgroundColor: /*'#e6fffe'*/this.state.backgroundColor,
                    paddingBottom: 5,
                    marginTop: 5,
                    borderColor: '#6de3dc',
                    borderBottomWidth: 2,
                    borderStyle: 'solid',
                    /*marginHorizontal: 10,*/
                    borderRadius: 4,
                    overflow: 'hidden',
                    flex: 0.5,
                    marginLeft: 5
                  }}
        >
          <FitImage source={{uri: item.uri}} style={styles.fitImageWithSize} resizeMethod='resize'/>
          <View style={{flexDirection: 'row', /*flex: 0, justifyContent: 'center', alignItems: 'center',*/ marginTop: 5}}>
            <View style={{flexDirection: 'column', flex: 0.5, justifyContent: 'space-between'}}>
              <Text style={{textDecorationLine: 'underline', flex: 1, fontSize: 12, fontWeight: '700', marginLeft: 10, textAlign: 'center'}}
                  onPress={() => {}}
              >
                Dist.
              </Text>
              <Text style={{flex: 1, fontSize: 15, marginLeft: 10, textAlign: 'center', color: '#6de3dc', fontWeight: '900'}}
                    onPress={this.navigateToRentable}
              >
                {item.dist}
              </Text>
            </View>
            {/*<View style={{flexDirection: 'column', flex: 0.33, justifyContent: 'space-between'}}>
              <Text style={{textDecorationLine: 'underline', flex: 1, fontSize: 12, fontWeight: '700', textAlign: 'center'}}
                    onPress={this.navigateToRentable}
              >
                Cond.
              </Text>
              <Text style={{flex: 1, fontSize: 14, fontWeight: '900', textAlign: 'center', color: '#6de3dc'}}
                    onPress={this.navigateToRentable}
              >
                {item.condition}
              </Text>
            </View>*/}
            <View style={{flexDirection: 'column', flex: 0.5, justifyContent: 'space-between'}}>
              <Text style={{textDecorationLine: 'underline', flex: 1, fontSize: 12, fontWeight: '700', textAlign: 'center'}}
                    onPress={this.navigateToRentable}
              >
                Rate
              </Text>
              <Text style={{flex: 1, fontSize: 15, fontWeight: '900', textAlign: 'center', color: '#6de3dc'}}
                    onPress={this.navigateToRentable}
              >
                {item.rate}
              </Text>
            </View>
          </View>  
        </View> 
      </TouchableOpacity>
    );
  }

  renderHeader = () => {
    return (
      <View style={{flexDirection: 'column', justifyContent: 'space-between', flex: 0}}>
        <View style={{flexDirection: 'row', flex: 0.8, justifyContent: 'space-between'}}>
          <SearchBar
            onChangeText={(text) => this.setState({searchText: text})}
            //onClear={this.clear.bind(this)}
            //onSubmitEditing={this.search.bind(this)}
            placeholder='Search rentals...'
            containerStyle={{ 
                              //marginBottom: Platform.OS === 'android' ? 10 : 0,
                              height: Platform.OS === 'android' ? 58 : 48,
                              backgroundColor: '#ffe4c4',
                              borderWidth: 0,
                              borderColor: '#6de3dc',
                              borderTopWidth: 0,
                              borderBottomWidth: 0,
                              flex: 0.945,
                              borderRadius: 4,
                              marginHorizontal: 5
                            }}
            inputStyle={{backgroundColor: '#ffffff',
                         paddingTop: Platform.OS === 'android' ? 11 : 0,
                         paddingBottom: Platform.OS === 'android' ? 11 : 0,
                         paddingLeft: 35,
                         margin: 0,
                         height: Platform.OS === 'android' ? 58 : 46,
                       }}
            value={this.state.searchText}
            lightTheme={true}
            placeholderTextColor='#dddddd'
          />
          <View style={{borderRadius: 8,
                        borderWidth: 1,
                        borderColor: '#6de3dc',
                        backgroundColor: '#6de3dc',
                        flex: 0.2,
                        marginRight: 5
                      }}
          >
            <TouchableOpacity
              style = {styles.submitTouch}
              onPress={this.onPressFunction.bind(this, Easing.in)}
              easing='Linear'
            >
              <Text style = {styles.submitText}>FILTER</Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.showFilterArea &&
          <Animated.View style={{borderRadius: 4, borderWidth: 0, backgroundColor: '#fff2e2', flexDirection: 'row', justifyContent: 'space-between', height: this.state.yPosition, marginTop: 5, marginHorizontal: 5, paddingBottom: 5}}>
            <View style={{flexDirection: 'column', flex: 0.33, marginLeft: 5}}>
              <Text style={{marginBottom: 5, textAlign: 'center', fontWeight: '700', marginTop: 5}}>Radius:</Text>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 0, backgroundColor: '#fff', paddingLeft: 5, borderRadius: 4, flex: 1}}
                onChangeText={(text) => this.setState({radius: text})}
                value={this.state.radius}
                placeholder="ex. 25"
                //onFocus={this.animateUp}
              />
            </View>
            <View style={{flexDirection: 'column', flex: 0.33, marginLeft: 5}}>
              <Text style={{fontWeight: '700', marginBottom: 5, marginTop: 5, textAlign: 'center'}}>Condition:</Text>
              <RNPickerSelect
                placeholder={{
                    label: 'Select',
                    value: null,
                }}
                items={this.state.conditions}
                onValueChange={(value) => {
                    this.setState({
                        condition: value,
                    });
                }}
                style={{ ...pickerSelectStyles }}
                selectedValue={this.state.condition}
              />
            </View>
            <View style={{flexDirection: 'column', flex: 0.33, marginLeft: 5}}>
              <Text style={{marginBottom: 5, textAlign: 'center', fontWeight: '700', marginTop: 5}}>Price ($):</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                <TextInput
                  style={{height: 30, borderColor: 'gray', borderWidth: 0, backgroundColor: '#fff', paddingLeft: 5, borderRadius: 4, flex: 0.4}}
                  onChangeText={(text) => this.setState({lowPrice: text})}
                  value={this.state.lowPrice}
                  placeholder="0"
                  //onFocus={this.animateUp}
                />
                <Text style={{alignSelf: 'center'}}>to</Text>
                <TextInput
                  style={{height: 30, borderColor: 'gray', borderWidth: 0, backgroundColor: '#fff', paddingLeft: 5, borderRadius: 4, flex: 0.4, marginRight: 5}}
                  onChangeText={(text) => this.setState({highPrice: text})}
                  value={this.state.highPrice}
                  placeholder="50"
                  //onFocus={this.animateUp}
                />
              </View>
            </View>
          </Animated.View>
        }
      </View>
    )
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <MultiSelectList
            style={{backgroundColor: '#ffe4c4'}}
            data={this.state.items}
            renderItem={this.renderListItems}
            numColumns={2}
            contentContainerStyle={{}}
            onEndReachedThreshold={0.5}
            maxToRenderPerBatch={2}
            initialNumToRender={4}
            ListHeaderComponent={this.renderHeader}
            getItemLayout={(data, index) => (
              {length: Dimensions.get('window').height/2, offset: Dimensions.get('window').height/2 * index, index}
            )}
            backgroundColor={this.state.backgroundColor}
            //contentContainerStyle={{backgroundColor: '#1e4683'}}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

class MultiSelectList extends React.PureComponent {
  state = {selected: (new Map(): Map<string, boolean>)};

  _keyExtractor = (item, index) => item.key;

  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this.props.renderItem}
        numColumns={this.props.numColumns}
        contentContainerStyle={this.props.contentContainerStyle}
        ListHeaderComponent={this.props.ListHeaderComponent}
        //stickyHeaderIndices={[0]}
        getItemLayout={this.props.getItemLayout}
        onEndReachedThreshold={this.props.onEndReachedThreshold}
        removeClippedSubviews={false}
      />
    );
  }
}

const styles = StyleSheet.create ({
   container: {
      flexDirection: 'column',
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: '#ffe4c4',
      paddingTop: Platform.OS === 'android' ? 10 : 20,
   },
   fitImageWithSize: {
      width: Dimensions.get('window').width/2 - 7.5,
      height: Dimensions.get('window').height/3
   },
   submitText: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#6de3dc',
    color: 'white',
    fontWeight: '700',
    fontSize: 12
   },
   submitTouch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: 40
   }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 8,
        paddingBottom: 7,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
        height: 30,
        paddingLeft: 5
    },
});