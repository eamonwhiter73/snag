import React from 'react';
import { Animated, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Alert, Platform, Image, Picker, Keyboard, Dimensions } from 'react-native';
import firebase from 'react-native-firebase';
import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import NavigationService from '../services/NavigationService';
import FitImage from 'react-native-fit-image';


export default class RentScreen extends React.Component {

  constructor() {
    super();
    //this.ref = firebase.firestore().collection('items');
    //this.authSubscription = null;
  }

  static navigatorStyle = { navBarHidden: true };

  state = {
    yPosition: new Animated.Value(0),  // Initial value for opacity: 0
    //fadeAnim: new Animated.Value(1),  // Initial value for opacity: 0
    backgroundColor: '#6de3dc',
    condition: 'poor',
    items: [{value: 'Poor', key: 'poor', label: 'Poor'}, {value: 'Fair', key: 'fair', label: 'Fair'}, {value: 'Good', key: 'good', label: 'Good'}, {value: 'New', key: 'new', label: 'New'}]
  };

  componentDidMount() {
    Keyboard.addListener('keyboardWillHide', () => {
      Animated.timing(this.state.yPosition, {
        toValue: 0,
        duration: 1,
      }).start();
    })
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
  }

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
    //this.authSubscription();
  }

  animateUp = () => {
    console.log("animateUp");

    Animated.timing(this.state.yPosition, {
        toValue: -120,
        duration: 300,
    }).start();

    /*Animated.timing(this.state.fadeAnim, {
        toValue: 0,
        duration: 1,
    }).start();*/
  }

  submitEdit = () => {
    //const { navigate } = this.props.navigation;

    /*Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1,
    }).start();*/

    Animated.timing(this.state.yPosition, {
      toValue: 0,
      duration: 1,
    }).start();

    /*if(this.state.email == "") {
      Alert.alert("Please enter a valid email address, if you do not have an account please select the 'Sign Up' link below");
    }
    else {
      firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password).then(() => {
        navigate('Inventory', { mode: 'fromLogIn' });
      }).catch(err => {
        Alert.alert(err.message);
      });
    }*/
  }

  onLayout = (e) => {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
      x: e.nativeEvent.layout.x,
      y: e.nativeEvent.layout.y
    })
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
        <ScrollView style={styles.container} contentContainerStyle={{justifyContent: 'space-between', alignItems: 'center',}}>
          <View style={{flex: 1, backgroundColor: '#e6fffe', position: 'absolute', right: Platform.OS === 'ios' ? -8 : 0, top: Platform.OS === 'ios' ? 10 : 10, justifyContent: 'center', alignItems: 'flex-end', zIndex: 5, borderRadius: 8, borderWidth: 0}}>
            <SimpleLineIcons
              name='close'
              color={this.state.backgroundColor}
              size={40}
              onPress={() => {
                this.setState({backgroundColor: '#94ebe6'});

                setTimeout(() => {
                  this.setState({backgroundColor: '#6de3dc'});
                  this.props.navigation.navigate('OpenCamera', { param: 'fromRentableScreen'});
                

                  NavigationService.navigate('Home');
                }, 1)
                
              }}
              style={{marginRight: 17, marginLeft: 10, marginBottom: 4, marginTop: 14}}
            />
          </View>
          <View style={{width: Dimensions.get('window').width, backgroundColor: '#e6fffe', justifyContent: 'center', alignItems: 'center', borderBottomColor: '#6de3dc', borderBottomWidth: 0}}>
            <FitImage
              source={{uri: base64Image}}
              style={{height: Dimensions.get('window').height/2, width: Dimensions.get('window').width, marginTop: Platform.OS === 'ios' ? 20 : 10, borderColor: '#6de3dc', borderWidth: 0, borderRadius: 4}}
            />
          </View>
          <Animated.View style={styles.small_container_top_animated, {marginTop: this.state.yPosition}}>
            <View style={styles.small_container_top}>
              <View style={styles.small_container_nowidth, {backgroundColor: '#d8fffd'}}>
                <Text style={{marginBottom: 5, textAlign: 'center', fontWeight: '700', backgroundColor: '#d8fffd'}}>Item Name:</Text>
                <TextInput
                  style={{height: 40, width: 180, borderColor: 'gray', borderWidth: 1, backgroundColor: '#fff', paddingLeft: 5, borderRadius: 4}}
                  onChangeText={(text) => this.setState({item_name: text})}
                  value={this.state.item_name}
                  placeholder="ex. rowboat"
                  onFocus={this.animateUp}
                />
              </View>
              <View style={styles.small_container, {backgroundColor: '#d8fffd'}}>
                <Text style={{marginBottom: 5, textAlign: 'center', fontWeight: '700'}}>Price (per day):</Text>
                <TextInput
                  style={{width: 120, height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: '#fff', paddingLeft: 5, borderRadius: 4}}
                  onChangeText={(text) => this.setState({price: text})}
                  value={this.state.price}
                  placeholder="ex. 20"
                  onFocus={this.animateUp}
                />
              </View>
            </View>
            <View style={{paddingBottom: 1}, styles.small_container_description}>
              <Text style={{marginBottom: 5, fontWeight: '700'}}>Item Description:</Text>
              <TextInput
                style={{width: Dimensions.get('window').width - 50, height: 60, borderColor: 'gray', borderWidth: 1, backgroundColor: '#ffffff', paddingLeft: 5, borderRadius: 4}}
                onChangeText={(text) => this.setState({item_description: text})}
                value={this.state.item_description}
                placeholder="ex. 10 feet long"
                multiline = {true}
                numberOfLines = {2}
                onFocus={this.animateUp}
              />
            </View>
            <View style={styles.small_container_condition}>
              <Text style={{fontWeight: '700', marginBottom: 5, /*textAlign: 'center'*/}}>Condition:</Text>
              <RNPickerSelect
                placeholder={{
                    label: 'Select',
                    value: null,
                }}
                items={this.state.items}
                onValueChange={(value) => {
                    this.setState({
                        condition: value,
                    });
                }}
                style={{ ...pickerSelectStyles }}
                selectedValue={this.state.condition}
              />
            </View>
          </Animated.View>
          {/*<View style={styles.small_container}>
            <Text style={{marginBottom: 5}}>Price (per day):</Text>
            <TextInput
              style={{width: 180, height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: '#ffffff', paddingLeft: 5, borderRadius: 4}}
              onChangeText={(text) => this.setState({price: text})}
              value={this.state.price}
              placeholder="ex. 20"
            />
          </View>*/}
          <View style={{borderRadius: 8,
                        borderWidth: 1,
                        borderColor: '#6de3dc',
                        backgroundColor: '#6de3dc',
                        marginBottom: 10
                      }}
          >
            <TouchableOpacity
              style = {styles.submitTouch}
              onPress={() => {}}
            >
              <Text style = {styles.submitText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create ({
   container: {
      flexDirection: 'column',
      backgroundColor: '#fffbf5',
      flexGrow: 1,
      paddingBottom: Platform.OS === 'ios' ? 15 : 6,
   },
   small_container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      width: 180,
      flex: 1
   },
   small_container_description: {
      flexDirection: 'column',
      justifyContent: 'center',
      /*alignItems: 'center',*/
      paddingHorizontal: 25,
      backgroundColor: '#d8fffd',
      flex: 0,
      width: Dimensions.get('window').width,
      paddingTop: 5,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#6de3dc'
   },
   small_container_nowidth: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      flex: 1
   },
   small_container_top: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#d8fffd',
      width: Dimensions.get('window').width,
      flex: 0,
      paddingHorizontal: 12.5,
      paddingVertical: 10,
      borderBottomWidth: 0,
      borderBottomColor: '#6de3dc'
   },
   small_container_top_animated: {
      flex: 1,
   },
   small_container_condition: {
      flexDirection: 'column',
      backgroundColor: '#fffbf5',
      width: Dimensions.get('window').width,
      paddingHorizontal: 25,
      paddingTop: 5,
      paddingBottom: 10
   },
   submitText: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#6de3dc',
    color: 'white',
    fontWeight: '700',
   },
   submitTouch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width - 50,
    height: 40,
   }

})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 9,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
        width: Dimensions.get('window').width - 50,
        paddingLeft: 5
    },
    icon: {
      top: 17.5
    }
});
