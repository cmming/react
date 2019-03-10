// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */
//
// import React, {Component} from 'react';
// import {
//     StyleSheet,
//     Text,
//     Navigator,
//     Image,
//     View
// } from 'react-native';
// import TabNavigator from 'react-native-tab-navigator';
// import PopularPage from './PopularPage'
//
// export default class HomePage extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             selectedTab: 'tb_popular',
//         }
//     }
//
//     render() {
//         return (
//             <View style={styles.container}>
//                 <TabNavigator>
//                     <TabNavigator.Item
//                         selected={this.state.selectedTab === 'tb_popular'}
//                         selectedTitleStyle={{color:'red'}}
//                         title="最热"
//                         renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_polular.png')}/>}
//                         renderSelectedIcon={() =><Image style={[styles.image,{tintColor:'red'}]} source={require('../../res/images/ic_polular.png')}/>}
//                         onPress={() => this.setState({selectedTab: 'tb_popular'})}>
//                         {/*<View style={{backgroundColor: 'red',flex:1}}></View>*/}
//                         <PopularPage {...this.props}/>
//                     </TabNavigator.Item>
//                     <TabNavigator.Item
//                         selected={this.state.selectedTab === 'tb_trending'}
//                         title="趋势"
//                         selectedTitleStyle={{color:'yellow'}}
//                         renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')}/>}
//                         renderSelectedIcon={() =><Image style={[styles.image,{tintColor:'yellow'}]} source={require('../../res/images/ic_trending.png')}/>}
//                         onPress={() => this.setState({selectedTab: 'tb_trending'})}>
//                         <View style={{backgroundColor: 'yellow',flex:1}}></View>
//                     </TabNavigator.Item>
//                     <TabNavigator.Item
//                         selected={this.state.selectedTab === 'tb_favorite'}
//                         title="收藏"
//                         selectedTitleStyle={{color:'green'}}
//                         renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_favorite.png')}/>}
//                         renderSelectedIcon={() =><Image style={[styles.image,{tintColor:'green'}]} source={require('../../res/images/ic_favorite.png')}/>}
//                         onPress={() => this.setState({selectedTab: 'tb_favorite'})}>
//                         <View style={{backgroundColor: 'green',flex:1}}></View>
//                     </TabNavigator.Item>
//                     <TabNavigator.Item
//                         selected={this.state.selectedTab === 'tb_my'}
//                         title="我的"
//                         selectedTitleStyle={{color:'blue'}}
//                         renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_my.png')}/>}
//                         renderSelectedIcon={() =><Image style={[styles.image,{tintColor:'blue'}]} source={require('../../res/images/ic_my.png')}/>}
//                         onPress={() => this.setState({selectedTab: 'tb_my'})}>
//                         <View style={{backgroundColor: 'blue',flex:1}}></View>
//                     </TabNavigator.Item>
//                 </TabNavigator>
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     image: {
//         height: 22,
//         width: 22,
//     }
// });
//
//
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    DeviceEventEmitter
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage'
import MyPage from './my/MyPage'
import TrendingPage from './TrendingPage'
import FavoritePage from './FavoritePage'
import Toast,{DURATION} from 'react-native-easy-toast'
import AsyncStorageTest from '../../AsyncStorageTest'
import WebViewTest from '../../WebViewTest'
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'tb_popular',
        }
    }
    componentDidMount(){
        this.listener = DeviceEventEmitter.addListener('showToast', (text) => {
            this.toast.show(text, DURATION.LENGTH_LONG);
        });
    }
    componentWillUnmount(){
        if (this.listener) {
            this.listener.remove();
        }
    }
    _renderTab(Component, selectedTab, title, renderIcon) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                selectedTitleStyle={{color: '#2196F3'}}
                title={title}
                renderIcon={() => <Image style={styles.image}
                                         source={renderIcon}/>}
                renderSelectedIcon={() =><Image style={[styles.image, {tintColor: '#2196F3'}]}
                                                source={renderIcon}/>}
                onPress={() => this.setState({selectedTab: selectedTab})}>
                <Component {...this.props}/>
            </TabNavigator.Item>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    {this._renderTab(PopularPage,'tb_popular','最热',require('../../res/images/ic_polular.png'))}
                    {this._renderTab(TrendingPage,'tb_trending','趋势',require('../../res/images/ic_trending.png'))}
                    {this._renderTab(FavoritePage,'tb_favorite','收藏',require('../../res/images/ic_favorite.png'))}
                    {this._renderTab(MyPage,'tb_my','我的',require('../../res/images/ic_my.png'))}
                    {/*<TabNavigator.Item*/}
                        {/*selected={this.state.selectedTab === 'tb_popular'}*/}
                        {/*selectedTitleStyle={{color: '#2196F3'}}*/}
                        {/*title="最热"*/}
                        {/*renderIcon={() => <Image style={styles.image}*/}
                                                 {/*source={require('../../res/images/ic_polular.png')}/>}*/}
                        {/*renderSelectedIcon={() =><Image style={[styles.image, {tintColor: '#2196F3'}]}*/}
                                                        {/*source={require('../../res/images/ic_polular.png')}/>}*/}
                        {/*onPress={() => this.setState({selectedTab: 'tb_popular'})}>*/}
                        {/*<PopularPage {...this.props}/>*/}
                    {/*</TabNavigator.Item>*/}
                    {/*<TabNavigator.Item*/}
                        {/*selected={this.state.selectedTab === 'tb_trending'}*/}
                        {/*title="趋势"*/}
                        {/*selectedTitleStyle={{color: '#2196F3'}}*/}
                        {/*renderIcon={() => <Image style={styles.image}*/}
                                                 {/*source={require('../../res/images/ic_trending.png')}/>}*/}
                        {/*renderSelectedIcon={() =><Image style={[styles.image, {tintColor: '#2196F3'}]}*/}
                                                        {/*source={require('../../res/images/ic_trending.png')}/>}*/}
                        {/*onPress={() => this.setState({selectedTab: 'tb_trending'})}>*/}
                        {/*/!*<AsyncStorageTest/>*!/*/}
                        {/*<TrendingPage/>*/}
                    {/*</TabNavigator.Item>*/}
                    {/*<TabNavigator.Item*/}
                        {/*selected={this.state.selectedTab === 'tb_favorite'}*/}
                        {/*title="收藏"*/}
                        {/*selectedTitleStyle={{color: '#2196F3'}}*/}
                        {/*renderIcon={() => <Image style={styles.image}*/}
                                                 {/*source={require('../../res/images/ic_favorite.png')}/>}*/}
                        {/*renderSelectedIcon={() =><Image style={[styles.image, {tintColor: '#2196F3'}]}*/}
                                                        {/*source={require('../../res/images/ic_favorite.png')}/>}*/}
                        {/*onPress={() => this.setState({selectedTab: 'tb_favorite'})}>*/}
                        {/*<WebViewTest/>*/}
                    {/*</TabNavigator.Item>*/}
                    {/*<TabNavigator.Item*/}
                        {/*selected={this.state.selectedTab === 'tb_my'}*/}
                        {/*title="我的"*/}
                        {/*selectedTitleStyle={{color: '#2196F3'}}*/}
                        {/*renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_my.png')}/>}*/}
                        {/*renderSelectedIcon={() =><Image style={[styles.image, {tintColor: '#2196F3'}]}*/}
                                                        {/*source={require('../../res/images/ic_my.png')}/>}*/}
                        {/*onPress={() => this.setState({selectedTab: 'tb_my'})}>*/}
                        {/*<MyPage {...this.props}/>*/}
                    {/*</TabNavigator.Item>*/}
                </TabNavigator>
                <Toast ref={(toast)=>this.toast=toast}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: 26,
        width: 26,
    }
});

