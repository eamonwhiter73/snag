import React from 'react';
import { Animated, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions, Image, Alert, Platform } from 'react-native';
import firebase from 'react-native-firebase';
import { Icon } from 'react-native-elements';

export default class ProfileScreen extends React.Component {

  constructor() {
    super();
    //this.ref = firebase.firestore().collection('items');
    //this.authSubscription = null;
  }

  static navigatorStyle = { navBarHidden: true };

  state = {
    yPosition: new Animated.Value(0),  // Initial value for opacity: 0
  };

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

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container} contentContainerStyle={{justifyContent: 'space-between', flexGrow: 1, alignItems: 'center',}}
        >
          <Animated.View style={{marginTop: this.state.yPosition, alignItems: 'center', backgroundColor: '#fffbf5', flex: 1}}>
            <View style={{backgroundColor: '#e6fffe', position: 'absolute', right: Platform.OS === 'ios' ? 15 : 10, top: Platform.OS === 'ios' ? 25 : 10, justifyContent: 'center', alignItems: 'flex-end', zIndex: 5}}>
              <Icon
                name='mail'
                color='#6de3dc'
                type='feather'
                size={40}
              />
            </View>
            <View style={{paddingTop: 50, width: Dimensions.get('window').width, height: 160, backgroundColor: '#e6fffe', justifyContent: 'center', alignItems: 'center', paddingBottom: 10, borderBottomColor: '#6de3dc', borderBottomWidth: 0}}>
              <Image
                source={require('../assets/billythekid2.jpg')/*uri: base64Image*/}
                style={{height: 180, width: 180, marginTop: Platform.OS === 'ios' ? 30 : 10, borderColor: '#6de3dc', borderWidth: 1, borderRadius: 90, /*position: 'absolute', left: Dimensions.get('window').width /2 - 90*/}}
              />
            </View>
            <View style={styles.small_container_username}>
              <Text style={{marginBottom: 5, fontWeight: '900'}}>Username:</Text>
              <TextInput
                style={{height: 40, width: 180, borderColor: 'gray', borderWidth: 1, backgroundColor: '#ffffff', paddingLeft: 5, borderRadius: 4}}
                onChangeText={(text) => this.setState({username: text})}
                value={this.state.username}
                placeholder="ex. user123"
                textContentType='username'
              />
            </View>
            <View style={{paddingBottom: 1}, styles.small_container}>
              <Text style={{marginBottom: 5, fontWeight: '900'}}>Password:</Text>
              <TextInput
                style={{height: 40, width: 180, borderColor: 'gray', borderWidth: 1, backgroundColor: '#ffffff', paddingLeft: 5, borderRadius: 4}}
                onChangeText={(text) => this.setState({password: text})}
                value={this.state.password}
                placeholder="ex. 8xkjs98!"
                secureTextEntry={true}
                textContentType='password'
              />
            </View>
            <View style={styles.small_container}>
              <Text style={{marginBottom: 5, fontWeight: '900'}}>Email:</Text>
              <TextInput
                style={{height: 40, width: 180, borderColor: 'gray', borderWidth: 1, backgroundColor: '#ffffff', paddingLeft: 5, borderRadius: 4}}
                onChangeText={(text) => this.setState({email: text})}
                value={this.state.email}
                placeholder="ex. user@user.com"
                textContentType='emailAddress'
              />
            </View>
            <View style={styles.small_container}>
              <Text style={{marginBottom: 5, fontWeight: '900'}}>Bio:</Text>
              <TextInput
                style={{width: 180, height: 60, borderColor: 'gray', borderWidth: 1, backgroundColor: '#ffffff', paddingLeft: 5, borderRadius: 4}}
                onChangeText={(text) => this.setState({bio: text})}
                value={this.state.bio}
                placeholder="ex. I am a farmer."
                multiline = {true}
                numberOfLines = {2}
                onFocus={this.animateUp}
              />
            </View>
            <View style={{borderRadius: 8,
                          borderWidth: 1,
                          borderColor: '#6de3dc',
                          backgroundColor: '#6de3dc',
                          marginTop: 10,
                        }}
            >
              <TouchableOpacity
                style = {styles.submitTouch}
                onPress={() => {}}
              >
                <Text style = {styles.submitText}>SAVE</Text>
              </TouchableOpacity>
            </View>
            <View style={{borderRadius: 8,
                          borderWidth: 1,
                          borderColor: '#6de3dc',
                          backgroundColor: '#6de3dc',
                          marginTop: 10
                        }}
            >
              <TouchableOpacity
                style = {styles.submitTouch}
                onPress={() => {}}
              >
                <Text style = {styles.submitText}>LOGOUT</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create ({
   container: {
      flexDirection: 'column',
      backgroundColor: '#e6fffe',
      //flex: 1,
      //paddingBottom: Platform.OS === 'ios' ? 0 : 0,
   },
   small_container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fffbf5',
      width: Dimensions.get('window').width,
      marginTop: 5
   },
   small_container_username: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fffbf5',
      width: Dimensions.get('window').width,
      marginTop: 40,
      marginTop: 50
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
    width: 180,
    height: Platform.OS === 'ios' ? 40 : 27.5,
   }
})