/**
 * RepositoryDetail
 * @flow
 **/
'use strict'
import React, {Component} from 'react'
import {
    Image,
    ScrollView,
    StyleSheet,
    WebView,
    Platform,
    TouchableOpacity,
    Text,
    View,
} from 'react-native'
import NavigationBar from '../common/NavigationBar'
import ViewUtils from '../util/ViewUtils'
import FavoriteDao from '../expand/dao/FavoriteDao'
const TRENDING_URL = 'https://github.com/'
export default class RepositoryDetail extends Component {
    constructor(props) {
        super(props);
        // this.url = this.props.item.html_url;
        // var title = this.props.item.full_name;
        // this.url = this.props.item.html_url ? this.props.item.html_url
        //     : TRENDING_URL + this.props.item.fullName;
        // var title = this.props.item.full_name ? this.props.item.full_name
        //     : this.props.item.fullName;
        // this.state = {
        //     url: this.url,
        //     canGoBack: false,
        //     title: title,
        // }
        this.url = this.props.projectModel.item.html_url ? this.props.projectModel.item.html_url
            : TRENDING_URL + this.props.projectModel.item.fullName;
        var title = this.props.projectModel.item.full_name ? this.props.projectModel.item.full_name
            : this.props.projectModel.item.fullName;
        this.favoriteDao = new FavoriteDao(this.props.flag);
        this.state = {
            url: this.url,
            canGoBack: false,
            title: title,
            isFavorite: this.props.projectModel.isFavorite,
            favoriteIcon: this.props.projectModel.isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_star_navbar.png'),

        }
    }


    onBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            this.props.navigator.pop();
        }
    }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                    popEnabled={false}
                    title={this.state.title}
                    rightButton={null}
                />
                <WebView
                    ref={webView=>this.webView=webView}
                    startInLoadingState={true}
                    onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                    source={{uri: this.state.url}}/>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
})
