import React from 'react';
import { Animated, StyleSheet, FlatList, Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Alert, Platform, Image, Picker, Keyboard, Dimensions } from 'react-native';
import firebase from 'react-native-firebase';
import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import autobind from 'autobind-decorator';
import FitImage from 'react-native-fit-image';

import NavigationService from '../services/NavigationService.js';

export default class RentableScreen extends React.Component {

  constructor() {
    super();
    //this.ref = firebase.firestore().collection('items');
    //this.authSubscription = null;
  }

  static navigatorStyle = { navBarHidden: true };

  state = {
    items: [{uri: 'http://snag.eamondev.com/assets/rowboat.png', key: 'item1', dist: '3.2 mi', condition: 'Fair', rate: '$250'},
            {uri: 'http://snag.eamondev.com/assets/rowboat.png', key: 'item2', dist: '50 mi', condition: 'Fair', rate: '$25'},
            {uri: 'http://snag.eamondev.com/assets/billythekid2.jpg', key: 'item3', dist: '3.2 mi', condition: 'Fair', rate: '$25'},
            {uri: 'http://snag.eamondev.com/assets/rowboat.png', key: 'item4', dist: '3.2 mi', condition: 'Fair', rate: '$25'},
            {uri: 'http://snag.eamondev.com/assets/billythekid2.jpg', key: 'item5', dist: '3.2 mi', condition: 'Fair', rate: '$25'},
            {uri: 'http://snag.eamondev.com/assets/rowboat.png', key: 'item6', dist: '3.2 mi', condition: 'Fair', rate: '$25'},
            {uri: 'http://snag.eamondev.com/assets/rowboat.png', key: 'item7', dist: '3.2 mi', condition: 'Fair', rate: '$25'},
            {uri: 'http://snag.eamondev.com/assets/billythekid2.jpg', key: 'item8', dist: '3.2 mi', condition: 'Fair', rate: '$25'}
           ],
    backgroundColor: '#e6fffe',
  };

  componentDidMount() {
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

  @autobind
  navigateToRentable() {
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
          routeName: 'Rentable',
          params: { param: 'fromOtherUserProfile' },
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
    return (
      <TouchableOpacity onPress={this.navigateToRentable}>
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
          <FitImage
            source={{uri: item.uri}}
            style={styles.fitImageWithSize}
            resizeMethod='resize'
          />
          <View style={{flexDirection: 'row', /*flex: 0, justifyContent: 'center', alignItems: 'center',*/ marginTop: 5}}>
            <View style={{flexDirection: 'column', flex: 0.5, justifyContent: 'space-between'}}>
              <Text style={{textDecorationLine: 'underline', flex: 1, fontSize: 9, fontWeight: '700', marginLeft: 10, textAlign: 'center'}}
                  onPress={() => {}}
              >
                Dist.
              </Text>
              <Text style={{flex: 1, fontSize: 10, fontWeight: '900', marginLeft: 10, textAlign: 'center', color: '#6de3dc'}}
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
              <Text style={{textDecorationLine: 'underline', flex: 1, fontSize: 9, fontWeight: '700', textAlign: 'center'}}
                    onPress={this.navigateToRentable}
              >
                Rate
              </Text>
              <Text style={{flex: 1, fontSize: 10, fontWeight: '900', textAlign: 'center', color: '#6de3dc'}}
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
        <View style={styles.container}>
          <View style={{backgroundColor: '#e6fffe', position: 'absolute', right: Platform.OS === 'ios' ? 15 : 10, top: Platform.OS === 'ios' ? 25 : 10, justifyContent: 'center', alignItems: 'flex-end', zIndex: 5}}>
            <SimpleLineIcons
              name='close'
              color='#6de3dc'
              size={40}
              onPress={() => {
                this.props.navigation.dispatch(StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: 'Rentable' })],
                }));
              }}
            />
          </View>
          <View style={{width: Dimensions.get('window').width, backgroundColor: '#e6fffe', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 10, borderBottomColor: '#6de3dc', borderBottomWidth: 0}}>
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 0.33}}>
              <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                <Image
                  source={require('../assets/billythekid2.jpg')}
                  style={{height: 90, width: 90, marginTop: Platform.OS === 'ios' ? 30 : 10, borderColor: '#6de3dc', borderWidth: 2, borderRadius: 45}}
                />
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5}}>
                  <Ionicons
                    name='ios-star'
                    color='#eec400'
                    size={16}
                  />
                  <Ionicons
                    name='ios-star'
                    color='#eec400'
                    size={16}
                  />
                  <Ionicons
                    name='ios-star'
                    color='#eec400'
                    size={16}
                  />
                  <Ionicons
                    name='ios-star'
                    color='#eec400'
                    size={16}
                  />
                  <Ionicons
                    name='ios-star'
                    color='#eec400'
                    size={16}
                  />
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'column', backgroundColor: '#e6fffe', marginTop: Platform.OS === 'ios' ? 30 : 10, flex: 0.55}}>
              <View style={{flexDirection: 'row', flex: 0.5}}>
                <View style={{flex: 0}}>
                  <Text style={{fontSize: 16, fontWeight: '700'}}>
                    eamon.white
                  </Text>
                  <TouchableOpacity
                    style = {styles.submitTouchHeader}
                    onPress={() => {}}
                  >
                    <Text style = {styles.submitText}>CONTACT</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={{backgroundColor: '#fffbf5'}, styles.bio_container}>
            <View style={styles.small_container_description}>
              <Text style={{marginBottom: 5, marginLeft: 10, marginTop: 10, fontWeight: '900'}}>Bio:</Text>
              <Text style={{marginBottom: 10, marginLeft: 10}}>Hi, I like to rent things to make money, hit me up for stuff!</Text>
            </View>
          </View>
          <View style={{/*width: Dimensions.get('window').width,*/flex: 0.53, flexDirection: 'row', backgroundColor: '#fffbf5'}}>
            <View style={styles.small_container_description}>
              <Text style={{marginBottom: 5, marginLeft: 10, marginTop: 10, fontWeight: '900'}}>Renting:</Text>
              <MultiSelectList
                style={{backgroundColor: '#ffe4c4'}}
                data={this.state.items}
                renderItem={this.renderListItems}
                numColumns={4}
                contentContainerStyle={{}}
                onEndReachedThreshold={0.5}
                maxToRenderPerBatch={4}
                initialNumToRender={4}
                ListHeaderComponent={this.renderHeader}
                getItemLayout={(data, index) => (
                  {length: Dimensions.get('window').height/4, offset: Dimensions.get('window').height/4 * index, index}
                )}
                backgroundColor={this.state.backgroundColor}
                //contentContainerStyle={{backgroundColor: '#1e4683'}}
              />
            </View>
          </View>
          <View style={{backgroundColor: '#fffbf5'}, styles.description_container}>
            <View style={styles.small_container_description}>
              <Text style={{marginBottom: 5, marginLeft: 10, marginTop: 10, fontWeight: '900'}}>Past Rentals:</Text>
              <MultiSelectList
                style={{backgroundColor: '#ffe4c4'}}
                data={this.state.items}
                renderItem={this.renderListItems}
                numColumns={4}
                contentContainerStyle={{}}
                onEndReachedThreshold={0.5}
                maxToRenderPerBatch={4}
                initialNumToRender={4}
                ListHeaderComponent={this.renderHeader}
                getItemLayout={(data, index) => (
                  {length: Dimensions.get('window').height/4, offset: Dimensions.get('window').height/4 * index, index}
                )}
                backgroundColor={this.state.backgroundColor}
                //contentContainerStyle={{backgroundColor: '#1e4683'}}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create ({
   container: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      flex: 1,
   },
   small_container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      width: Dimensions.get('window').width * 0.5
   },
   small_container_header: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      flexDirection: 'row',
      flex: 0.75,
      backgroundColor: 'orange'
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
      /*flex: 1,*/
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
   },
   description_container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: 'white',
      width: Dimensions.get('window').width,
      flex: 0.5
   },
   bio_container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: 'white',
      width: Dimensions.get('window').width,
      flex: 0
   },
   submitText: {
    textAlign: 'center',
    backgroundColor: '#6de3dc',
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
    //paddingHorizontal: 5,
    borderRadius: 4,
    borderWidth: 0,
   },
   submitTouch: {
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    backgroundColor: '#6de3dc'
   },
   submitTouchHeader: {
    flex:1,
    borderRadius: 4,
    borderWidth: 0,
    backgroundColor: '#6de3dc',
    justifyContent: 'center',
    alignItems: 'center'
   },
   fitImageWithSize: {
      width: Dimensions.get('window').width/4 - 6.25,
      height: Dimensions.get('window').height/8
   },
})

//DUBLICATE CODE!!!!!
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
