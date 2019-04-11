/**
 * Created by penn on 2016/12/14.
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    TouchableHighlight
} from 'react-native'
import CustomKeyPage from './CustomKeyPage'
import SortKeyPagePage from './SortKeyPagePage'
import {FLAG_LANGUAGE} from "../../expand/dao/LanguageDao";
import NavigationBar from '../../../js/common/NavigationBar'
import {MORE_MENU} from "../../common/MoreMenu";
import GlobalStyles from '../../../res/styles/GlobalStyles'
import ViewUtils from '../../util/ViewUtils'
import AboutPage from '../about/AboutPage'
import AboutMePage from '../about/AboutMePage'
import CustomThemePage from './CustomTheme'
export default class MyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customThemeViewVisible:false,
            theme:this.props.theme
        }
    }

    getItem(tag, icon, text) {
        return ViewUtils.getSettingItem(()=>this.onClick(tag), icon, text,{tintColor:'#2196F3'},null);
    }

    renderCustomThemeView(){
        return (<CustomThemePage
            visible={this.state.customThemeViewVisible}
            {...this.props}
            onClose={()=>this.setState({customThemeViewVisible:false})}
        />)
    }

    onClick(tab) {
        let TargetComponent, params = {...this.props,menuType: tab};
        switch (tab) {
            case MORE_MENU.Custom_Language:
                TargetComponent = CustomKeyPage;
                params.flag = FLAG_LANGUAGE.flag_language;
                break;
            case MORE_MENU.Custom_Key:
                TargetComponent = CustomKeyPage;
                params.flag = FLAG_LANGUAGE.flag_key;
                break;
            case MORE_MENU.Remove_Key:
                TargetComponent = CustomKeyPage;
                params.flag = FLAG_LANGUAGE.flag_key;
                break;
            case MORE_MENU.Sort_Language:
                TargetComponent = SortKeyPagePage;
                params.flag = FLAG_LANGUAGE.flag_language;
                break;
            case MORE_MENU.Sort_Key:
                TargetComponent = SortKeyPagePage;
                params.flag = FLAG_LANGUAGE.flag_key;
                break;
            case MORE_MENU.Custom_Theme:
                this.setState({customThemeViewVisible:true})
                break;
            case MORE_MENU.About_Author:
                TargetComponent=AboutMePage;
                break;
            case MORE_MENU.About:
                TargetComponent=AboutPage;
                break;

        }
        if (TargetComponent) {
            this.props.navigator.push({
                component: TargetComponent,
                params: params,
            });
        }
    }

    render() {
        return (
            <View style={GlobalStyles.root_container}>
                <ScrollView >
                    <NavigationBar
                        title='我的'

                    />
                    <TouchableHighlight
                        onPress={()=>this.onClick(MORE_MENU.About)}>
                        <View style={[styles.item, {height: 90}]}>
                            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                <Image source={require('../../../res/images/ic_trending.png')}
                                       style={[{width: 40, height: 40, marginRight: 10},{tintColor:'#2196F3'}]}/>
                                <Text>GitHub Popular</Text>
                            </View>
                            <Image source={require('../../../res/images/ic_tiaozhuan.png')}
                                   style={[{
                                       opacity: 1,
                                       marginRight: 10,
                                       height: 22,
                                       width: 22,
                                       alignSelf: 'center',
                                   }, {tintColor:'#2196F3'}]}/>
                        </View>
                    </TouchableHighlight>

                    <View style={GlobalStyles.line}/>

                    {/*趋势管理*/}
                    <Text style={styles.groupTitle}>趋势管理</Text>
                    {/*自定义语言*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Custom_Language, require('./img/ic_custom_language.png'), '自定义语言')}
                    {/*语言排序*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Sort_Language, require('./img/ic_swap_vert.png'), '语言排序')}

                    {/*最热管理*/}
                    <Text style={styles.groupTitle}>最热管理</Text>
                    {/*自定义标签*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Custom_Key, require('./img/ic_custom_language.png'), '自定义标签')}
                    {/*标签排序*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Sort_Key, require('./img/ic_swap_vert.png'), '标签排序')}
                    {/*标签移除*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Remove_Key, require('./img/ic_remove.png'), '标签移除')}

                    {/*设置*/}
                    <Text style={styles.groupTitle}>设置</Text>
                    {/*自定义主题*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Custom_Theme, require('./img/ic_view_quilt.png'), '自定义主题')}
                    {/*关于作者*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.About_Author, require('./img/ic_insert_emoticon.png'), '关于作者')}
                    <View style={[{marginBottom: 60}]}/>
                    {/*<Text*/}
                        {/*style={styles.tips}*/}
                        {/*onPress={()=>{*/}
                            {/*this.props.navigator.push({*/}
                                {/*component:CustomKeyPage,*/}
                                {/*params:{*/}
                                    {/*...this.props,*/}
                                    {/*flag:FLAG_LANGUAGE.flag_key,*/}
                                {/*}*/}
                            {/*})*/}
                        {/*}}*/}
                    {/*>*/}
                        {/*自定义标签*/}
                    {/*</Text>*/}
                    {/*<Text*/}
                        {/*style={styles.tips}*/}
                        {/*onPress={()=>{*/}
                            {/*this.props.navigator.push({*/}
                                {/*component:CustomKeyPage,*/}
                                {/*params:{*/}
                                    {/*...this.props,*/}
                                    {/*flag:FLAG_LANGUAGE.flag_language,*/}
                                {/*}*/}
                            {/*})*/}
                        {/*}}*/}
                    {/*>*/}
                        {/*自定义语言*/}
                    {/*</Text>*/}
                    {/*<Text*/}
                        {/*style={styles.tips}*/}
                        {/*onPress={()=>{*/}
                            {/*this.props.navigator.push({*/}
                                {/*component:SortKeyPagePage,*/}
                                {/*params: {*/}
                                    {/*...this.props,*/}
                                    {/*flag: FLAG_LANGUAGE.flag_key,*/}
                                {/*}*/}
                            {/*})*/}
                        {/*}}*/}
                    {/*>*/}
                        {/*标签排序*/}
                    {/*</Text>*/}
                    {/*<Text*/}
                        {/*style={styles.tips}*/}
                        {/*onPress={()=>{*/}
                            {/*this.props.navigator.push({*/}
                                {/*component:SortKeyPagePage,*/}
                                {/*params:{*/}
                                    {/*...this.props,*/}
                                    {/*flag:FLAG_LANGUAGE.flag_language,*/}
                                {/*}*/}
                            {/*})*/}
                        {/*}}*/}
                    {/*>*/}
                        {/*语言排序*/}
                    {/*</Text>*/}
                    {/*<Text*/}
                        {/*style={styles.tips}*/}
                        {/*onPress={()=>{*/}
                            {/*this.props.navigator.push({*/}
                                {/*component:CustomKeyPage,*/}
                                {/*params:{*/}
                                    {/*...this.props,*/}
                                    {/*isRemoveKey:true,*/}
                                    {/*flag:FLAG_LANGUAGE.flag_key,*/}
                                {/*}*/}
                            {/*})*/}
                        {/*}}*/}
                    {/*>*/}
                        {/*标签移除*/}
                    {/*</Text>*/}
                </ScrollView>
                {this.renderCustomThemeView()}
            </View>)
    }
}
const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        padding: 10, height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    groupTitle: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray'

    },
})
