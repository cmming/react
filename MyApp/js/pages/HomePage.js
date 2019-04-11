// // /**
// //  * Sample React Native App
// //  * https://github.com/facebook/react-native
// //  * @flow
// //  */
// //
// // import React, {Component} from 'react';
// // import {
// //     StyleSheet,
// //     Text,
// //     Navigator,
// //     Image,
// //     View
// // } from 'react-native';
// // import TabNavigator from 'react-native-tab-navigator';
// // import PopularPage from './PopularPage'
// //
// // export default class HomePage extends Component {
// //     constructor(props) {
// //         super(props);
// //         this.state = {
// //             selectedTab: 'tb_popular',
// //         }
// //     }
// //
// //     render() {
// //         return (
// //             <View style={styles.container}>
// //                 <TabNavigator>
// //                     <TabNavigator.Item
// //                         selected={this.state.selectedTab === 'tb_popular'}
// //                         selectedTitleStyle={{color:'red'}}
// //                         title="最热"
// //                         renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_polular.png')}/>}
// //                         renderSelectedIcon={() =><Image style={[styles.image,{tintColor:'red'}]} source={require('../../res/images/ic_polular.png')}/>}
// //                         onPress={() => this.setState({selectedTab: 'tb_popular'})}>
// //                         {/*<View style={{backgroundColor: 'red',flex:1}}></View>*/}
// //                         <PopularPage {...this.props}/>
// //                     </TabNavigator.Item>
// //                     <TabNavigator.Item
// //                         selected={this.state.selectedTab === 'tb_trending'}
// //                         title="趋势"
// //                         selectedTitleStyle={{color:'yellow'}}
// //                         renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')}/>}
// //                         renderSelectedIcon={() =><Image style={[styles.image,{tintColor:'yellow'}]} source={require('../../res/images/ic_trending.png')}/>}
// //                         onPress={() => this.setState({selectedTab: 'tb_trending'})}>
// //                         <View style={{backgroundColor: 'yellow',flex:1}}></View>
// //                     </TabNavigator.Item>
// //                     <TabNavigator.Item
// //                         selected={this.state.selectedTab === 'tb_favorite'}
// //                         title="收藏"
// //                         selectedTitleStyle={{color:'green'}}
// //                         renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_favorite.png')}/>}
// //                         renderSelectedIcon={() =><Image style={[styles.image,{tintColor:'green'}]} source={require('../../res/images/ic_favorite.png')}/>}
// //                         onPress={() => this.setState({selectedTab: 'tb_favorite'})}>
// //                         <View style={{backgroundColor: 'green',flex:1}}></View>
// //                     </TabNavigator.Item>
// //                     <TabNavigator.Item
// //                         selected={this.state.selectedTab === 'tb_my'}
// //                         title="我的"
// //                         selectedTitleStyle={{color:'blue'}}
// //                         renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_my.png')}/>}
// //                         renderSelectedIcon={() =><Image style={[styles.image,{tintColor:'blue'}]} source={require('../../res/images/ic_my.png')}/>}
// //                         onPress={() => this.setState({selectedTab: 'tb_my'})}>
// //                         <View style={{backgroundColor: 'blue',flex:1}}></View>
// //                     </TabNavigator.Item>
// //                 </TabNavigator>
// //             </View>
// //         );
// //     }
// // }
// //
// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //     },
// //     image: {
// //         height: 22,
// //         width: 22,
// //     }
// // });
// //
// //
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
//     View,
//     DeviceEventEmitter
// } from 'react-native';
// import TabNavigator from 'react-native-tab-navigator';
// import PopularPage from './PopularPage'
// import MyPage from './my/MyPage'
// import TrendingPage from './TrendingPage'
// import FavoritePage from './FavoritePage'
// import Toast,{DURATION} from 'react-native-easy-toast'
// import BaseComponent from './BaseComponent'
// import AsyncStorageTest from '../../AsyncStorageTest'
// import WebViewTest from '../../WebViewTest'
// export const ACTION_HOME={A_SHOW_TOAST:'showToast',A_RESTART:'restart',A_THEME:'theme'};
// export const FLAG_TAB={
//     flag_popularTab:'tb_popular',
//     flag_trendingTab:'tb_trending',
//     flag_favoriteTab:'tb_favorite',
//     flag_my:'tb_my'
// }
//
// export default class HomePage extends BaseComponent {
//     constructor(props) {
//         super(props);
//         let selectedTab=this.props.selectedTab?this.props.selectedTab:'tb_popular';
//         this.state = {
//             // selectedTab: 'tb_popular',
//             selectedTab: selectedTab,
//             theme:this.props.theme,
//         }
//     }
//     // componentDidMount(){
//     //     this.listener = DeviceEventEmitter.addListener('showToast', (text) => {
//     //         this.toast.show(text, DURATION.LENGTH_LONG);
//     //     });
//     // }
//
//     componentDidMount(){
//         super.componentDidMount();
//         this.listener = DeviceEventEmitter.addListener('ACTION_HOME',
//             (action,params) => this.onAction(action,params));
//     }
//
//     /**
//      * 通知回调事件处理
//      * @param action
//      * @param params
//      */
//     onAction(action,params){
//         if(ACTION_HOME.A_RESTART===action){
//             this.onRestart(params)
//         }else if(ACTION_HOME.A_SHOW_TOAST===action){
//             this.toast.show(params.text,DURATION.LENGTH_LONG);
//         }
//     }
//
//     componentWillUnmount(){
//         if (this.listener) {
//             this.listener.remove();
//         }
//     }
//
//     /**
//      * 重启首页
//      * @param jumpToTab 默认显示的页面
//      */
//     onRestart(jumpToTab){
//         this.props.navigator.resetTo({
//             component:HomePage,
//             params:{
//                 ...this.props,
//                 selectedTab:jumpToTab
//             }
//         })
//     }
//
//     _renderTab(Component, selectedTab, title, renderIcon) {
//         return (
//             <TabNavigator.Item
//                 selected={this.state.selectedTab === selectedTab}
//                 selectedTitleStyle={this.state.theme.styles.selectedTitleStyle}
//                 title={title}
//                 renderIcon={() => <Image style={styles.image}
//                                          source={renderIcon}/>}
//                 renderSelectedIcon={() =><Image style={[styles.image, this.state.theme.styles.tabBarSelectedIcon]}
//                                                 source={renderIcon}/>}
//                 onPress={() => this.setState({selectedTab: selectedTab})}>
//                 <Component {...this.props} theme={this.state.theme}/>
//             </TabNavigator.Item>
//         )
//     }
//
//     render() {
//         return (
//             <View style={styles.container}>
//                 <TabNavigator>
//                     {this._renderTab(PopularPage,'tb_popular','最热',require('../../res/images/ic_polular.png'))}
//                     {this._renderTab(TrendingPage,'tb_trending','趋势',require('../../res/images/ic_trending.png'))}
//                     {this._renderTab(FavoritePage,'tb_favorite','收藏',require('../../res/images/ic_favorite.png'))}
//                     {this._renderTab(MyPage,'tb_my','我的',require('../../res/images/ic_my.png'))}
//                     {/*<TabNavigator.Item*/}
//                         {/*selected={this.state.selectedTab === 'tb_popular'}*/}
//                         {/*selectedTitleStyle={{color: '#2196F3'}}*/}
//                         {/*title="最热"*/}
//                         {/*renderIcon={() => <Image style={styles.image}*/}
//                                                  {/*source={require('../../res/images/ic_polular.png')}/>}*/}
//                         {/*renderSelectedIcon={() =><Image style={[styles.image, {tintColor: '#2196F3'}]}*/}
//                                                         {/*source={require('../../res/images/ic_polular.png')}/>}*/}
//                         {/*onPress={() => this.setState({selectedTab: 'tb_popular'})}>*/}
//                         {/*<PopularPage {...this.props}/>*/}
//                     {/*</TabNavigator.Item>*/}
//                     {/*<TabNavigator.Item*/}
//                         {/*selected={this.state.selectedTab === 'tb_trending'}*/}
//                         {/*title="趋势"*/}
//                         {/*selectedTitleStyle={{color: '#2196F3'}}*/}
//                         {/*renderIcon={() => <Image style={styles.image}*/}
//                                                  {/*source={require('../../res/images/ic_trending.png')}/>}*/}
//                         {/*renderSelectedIcon={() =><Image style={[styles.image, {tintColor: '#2196F3'}]}*/}
//                                                         {/*source={require('../../res/images/ic_trending.png')}/>}*/}
//                         {/*onPress={() => this.setState({selectedTab: 'tb_trending'})}>*/}
//                         {/*/!*<AsyncStorageTest/>*!/*/}
//                         {/*<TrendingPage/>*/}
//                     {/*</TabNavigator.Item>*/}
//                     {/*<TabNavigator.Item*/}
//                         {/*selected={this.state.selectedTab === 'tb_favorite'}*/}
//                         {/*title="收藏"*/}
//                         {/*selectedTitleStyle={{color: '#2196F3'}}*/}
//                         {/*renderIcon={() => <Image style={styles.image}*/}
//                                                  {/*source={require('../../res/images/ic_favorite.png')}/>}*/}
//                         {/*renderSelectedIcon={() =><Image style={[styles.image, {tintColor: '#2196F3'}]}*/}
//                                                         {/*source={require('../../res/images/ic_favorite.png')}/>}*/}
//                         {/*onPress={() => this.setState({selectedTab: 'tb_favorite'})}>*/}
//                         {/*<WebViewTest/>*/}
//                     {/*</TabNavigator.Item>*/}
//                     {/*<TabNavigator.Item*/}
//                         {/*selected={this.state.selectedTab === 'tb_my'}*/}
//                         {/*title="我的"*/}
//                         {/*selectedTitleStyle={{color: '#2196F3'}}*/}
//                         {/*renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_my.png')}/>}*/}
//                         {/*renderSelectedIcon={() =><Image style={[styles.image, {tintColor: '#2196F3'}]}*/}
//                                                         {/*source={require('../../res/images/ic_my.png')}/>}*/}
//                         {/*onPress={() => this.setState({selectedTab: 'tb_my'})}>*/}
//                         {/*<MyPage {...this.props}/>*/}
//                     {/*</TabNavigator.Item>*/}
//                 </TabNavigator>
//                 <Toast ref={(toast)=>this.toast=toast}/>
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
//         height: 26,
//         width: 26,
//     }
// });
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
import TrendingPage from './TrendingPage'
import FavoritePage from './FavoritePage'
import MyPage from './my/MyPage'
import Toast,{DURATION} from 'react-native-easy-toast'
import BaseComponent from './BaseComponent'
export const ACTION_HOME={A_SHOW_TOAST:'showToast',A_RESTART:'restart',A_THEME:'theme'};
export const FLAG_TAB={
    flag_popularTab:'tb_popular',
    flag_trendingTab:'tb_trending',
    flag_favoriteTab:'tb_favorite',
    flag_my:'tb_my'
}
export default class HomePage extends BaseComponent {
    constructor(props) {
        super(props);
        let selectedTab=this.props.selectedTab?this.props.selectedTab:'tb_popular';
        this.state = {
            selectedTab: selectedTab,
            theme:this.props.theme,
        }
    }
    componentDidMount(){
        super.componentDidMount();
        this.listener = DeviceEventEmitter.addListener('ACTION_HOME',
            (action,params) => this.onAction(action,params));
    }

    /**
     * 通知回调事件处理
     * @param action
     * @param params
     */
    onAction(action,params){
        if(ACTION_HOME.A_RESTART===action){
            this.onRestart(params)
        }else if(ACTION_HOME.A_SHOW_TOAST===action){
            this.toast.show(params.text,DURATION.LENGTH_LONG);
        }
    }
    componentWillUnmount(){
        super.componentWillUnmount();
        if (this.listener) {
            this.listener.remove();
        }
    }

    /**
     * 重启首页
     * @param jumpToTab 默认显示的页面
     */
    onRestart(jumpToTab){
        this.props.navigator.resetTo({
            component:HomePage,
            params:{
                ...this.props,
                selectedTab:jumpToTab
            }
        })
    }
    _renderTab(Component, selectedTab, title, renderIcon) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                selectedTitleStyle={this.state.theme.styles.selectedTitleStyle}
                title={title}
                renderIcon={() => <Image style={styles.image}
                                         source={renderIcon}/>}
                renderSelectedIcon={() =><Image style={[styles.image, this.state.theme.styles.tabBarSelectedIcon]}
                                                source={renderIcon}/>}
                onPress={() => this.setState({selectedTab: selectedTab})}>
                <Component {...this.props} theme={this.state.theme}/>
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

