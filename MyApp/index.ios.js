/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import setup from './js/pages/setup'

export default class MyApp extends Component {
  constructor(props){
    super(props);
    this.state ={
      selectedTab :'tb_popular'
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {/*<Text style={styles.welcome}>*/}
          {/*Welcome to React Native!*/}
        {/*</Text>*/}
        {/*<Text style={styles.instructions}>*/}
          {/*To get started, edit index.ios.js*/}
        {/*</Text>*/}
        {/*<Text style={styles.instructions}>*/}
          {/*Press Cmd+R to reload,{'\n'}*/}
          {/*Cmd+D or shake for dev menu*/}
        {/*</Text>*/}
        <TabNavigator>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'tb_popular'}
              title="最热"
              selectedTitleStyle={{color:'red'}}
              renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_polular.png')} />}
              renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'red'}]} source={require('./res/images/ic_polular.png')} />}
              badgeText="1"
              onPress={() => this.setState({ selectedTab: 'tb_popular' })}>
            {/*{homeView}*/}
            <View style={styles.page1}></View>
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'tb_trending'}
              title="趋势"
              selectedTitleStyle={{color:'yellow'}}
              renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_trending.png')} />}
              renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'yellow'}]} source={require('./res/images/ic_trending.png')} />}
              // renderBadge={() => <CustomBadgeView />}
              onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
            {/*{profileView}*/}
            <View style={styles.page2}></View>
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'tb_favorite'}
              title="收藏"
              selectedTitleStyle={{color:'red'}}
              renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_favorite.png')} />}
              renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'red'}]} source={require('./res/images/ic_favorite.png')} />}
              badgeText="1"
              onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>
            {/*{homeView}*/}
            <View style={styles.page1}></View>
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'tb_me'}
              title="我的"
              selectedTitleStyle={{color:'yellow'}}
              renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_my.png')} />}
              renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'yellow'}]} source={require('./res/images/ic_my.png')} />}
              // renderBadge={() => <CustomBadgeView />}
              onPress={() => this.setState({ selectedTab: 'tb_me' })}>
            {/*{profileView}*/}
            <View style={styles.page2}></View>
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  // welcome: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   margin: 10,
  // },
  // instructions: {
  //   textAlign: 'center',
  //   color: '#333333',
  //   marginBottom: 5,
  // },
  page1:{
    flex: 1,
    backgroundColor: 'red'
  },
  page2:{
    flex: 1,
    backgroundColor: 'yellow'
  },
  image:{
    width:22,
    height:22
  }
});

AppRegistry.registerComponent('MyApp', () => setup);
