/**
 * Created by penn on 2016/12/14.
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native'
import NavigationBar from '../common/NavigationBar'
import HomePage from './HomePage'
import ThemeDao from '../expand/dao/ThemeDao'
import SplashScreen from 'react-native-splash-screen'
export default class WelcomePage extends Component {
    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     this.timer=setTimeout(()=> {
    //         this.props.navigator.resetTo({
    //             component: HomePage,
    //         });
    //     }, 2000);
    // }

    componentDidMount() {
        new ThemeDao().getTheme().then((data)=>{
            this.theme=data;
        })
        this.timer=setTimeout(()=> {
            // SplashScreen.hide();
            this.props.navigator.resetTo({
                component: HomePage,
                params:{
                    theme:this.theme,
                }
            });
        }, 500);
    }
    componentWillUnmount(){
        this.timer&&clearTimeout(this.timer);
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title='欢迎'
                    style={{backgroundColor: '#6495ED'}}
                />
                <Text style={styles.tips}>欢迎</Text>
            </View>)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    tips: {
        fontSize: 29
    }
})
