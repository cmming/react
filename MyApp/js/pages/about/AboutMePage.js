/**
 * AboutMePage
 * 关于
 * @flow
 */
'use strict';


import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    Linking,
    Clipboard,
} from 'react-native';

import WebViewPage from '../../pages/WebViewPage';
import ViewUtils from '../../util/ViewUtils'
import GlobalStyles from '../../../res/styles/GlobalStyles'
import AboutCommon,{FLAG_ABOUT} from './AboutCommon'
import config from '../../../res/data/config.json'
import Toast from 'react-native-easy-toast'
const FLAG = {
    REPOSITORY: '开源项目',
    BLOG: {
        name: '技术博客',
        items: {
            PERSONAL_BLOG: {
                title: '个人博客',
                url: 'https://jiapenghui.com',
            },
            CSDN: {
                title: 'CSDN',
                url: 'https://blog.csdn.net/fengyuzhengfan',
            },
            JIANSHU: {
                title: '简书',
                url: 'https://www.jianshu.com/users/ca3943a4172a/latest_articles',
            },
            GITHUB: {
                title: 'GitHub',
                url: 'https://github.com/crazycodeboy',
            },
        }
    },
    CONTACT: {
        name: '联系方式',
        items: {
            QQ: {
                title: 'QQ',
                account: '1586866509',
            },
            Email: {
                title: 'Email',
                account: 'crazycodeboy@gmail.com',
            },
        }
    },
    QQ: {
        name: '技术交流群',
        items: {
            MD: {
                title: '移动开发者技术分享群',
                account: '335939197',
            },
            RN: {
                title: 'React Native学习交流群',
                account: '165774887',
            }
        },
    },

};

export default class AboutMePage extends Component {
    constructor(props) {
        super(props);
        this.aboutCommon = new AboutCommon(props, (dic)=>this.updateState(dic),FLAG_ABOUT.flag_about_me,config);
        this.state = {
            projectModels: null,
            author: config.author,
            showRepository: false,
            showBlog: false,
            showQQ: false,
            showContact: false,

        }
    }

    componentDidMount() {
        this.aboutCommon.componentDidMount();
    }
    updateState(dic) {
        this.setState(dic);
    }

    onClick(tab) {
        let TargetComponent, params = {...this.props, menuType: tab};
        switch (tab) {
            case FLAG.CONTACT.items.Email:
                Linking.openURL('mailto:'+tab.account);
                break;
            case FLAG.CONTACT.items.QQ:
                this.toast.show('QQ:' + tab.account + '已复制到剪切板。');
                Clipboard.setString(tab.account);
                break;
            case FLAG.QQ.items.MD:
            case FLAG.QQ.items.RN:
                this.toast.show('群号:' + tab.account + '已复制到剪切板。');
                Clipboard.setString(tab.account);
                break;
            case FLAG.BLOG.items.CSDN:
            case FLAG.BLOG.items.GITHUB:
            case FLAG.BLOG.items.JIANSHU:
            case FLAG.BLOG.items.PERSONAL_BLOG:
                TargetComponent = WebViewPage;
                params.title = tab.title;
                params.url = tab.url;
                break;
            case FLAG.REPOSITORY:
                this.updateState({showRepository: !this.state.showRepository});
                break;
            case FLAG.BLOG:
                this.updateState({showBlog: !this.state.showBlog});
                break;
            case FLAG.QQ:
                this.updateState({showQQ: !this.state.showQQ});
                break;
            case FLAG.CONTACT:
                this.updateState({showContact: !this.state.showContact});
                break;

        }
        if (TargetComponent) {
            this.props.navigator.push({
                component: TargetComponent,
                params: params,
            });
        }
    }

    /**
     * 显示列表数据
     * @param dic
     * @param isShowAccount
     * @return {*}
     */
    renderItems(dic, isShowAccount) {
        if (!dic)return null;
        let views = [];
        for (let i in dic) {
            let title = isShowAccount ? dic[i].title + ':' + dic[i].account : dic[i].title;
            views.push(
                <View key={i}>
                    {ViewUtils.getSettingItem(()=>this.onClick(dic[i]), '', title, {tintColor:'#2196F3'})}
                    <View style={GlobalStyles.line}/>
                </View>
            );
        }
        return views;
    }

    /**
     * 获取item右侧图标
     * @param isShow
     * @return {*}
     */
    getClickIcon(isShow) {
        return isShow ? require('../../../res/images/ic_tiaozhuan_up.png') : require('../../../res/images/ic_tiaozhuan_down.png');
    }

    render() {
        let content = <View>
            {ViewUtils.getSettingItem(()=>this.onClick(FLAG.BLOG), require('../../../res/images/ic_computer.png'),
                FLAG.BLOG.name, {tintColor:'#2196F3'}, this.getClickIcon(this.state.showBlog))}
            <View style={GlobalStyles.line}/>
            {this.state.showBlog ? this.renderItems(FLAG.BLOG.items) : null}

            {ViewUtils.getSettingItem(()=>this.onClick(FLAG.REPOSITORY), require('../../../res/images/ic_code.png'),
                FLAG.REPOSITORY, {tintColor:'#2196F3'}, this.getClickIcon(this.state.showRepository))}
            <View style={GlobalStyles.line}/>
            {this.state.showRepository ? this.aboutCommon.renderRepository(this.state.projectModels) : null}

            {ViewUtils.getSettingItem(()=>this.onClick(FLAG.QQ), require('../../../res/images/ic_computer.png'),
                FLAG.QQ.name, {tintColor:'#2196F3'}, this.getClickIcon(this.state.showQQ))}
            <View style={GlobalStyles.line}/>
            {this.state.showQQ ? this.renderItems(FLAG.QQ.items, true) : null}

            {ViewUtils.getSettingItem(()=>this.onClick(FLAG.CONTACT), require('../../../res/images/ic_contacts.png'),
                FLAG.CONTACT.name, {tintColor:'#2196F3'}, this.getClickIcon(this.state.showContact))}
            <View style={GlobalStyles.line}/>
            {this.state.showContact ? this.renderItems(FLAG.CONTACT.items, true) : null}
        </View>
        return (
            <View style={styles.container}>
                {this.aboutCommon.render(content, this.state.author)}
                <Toast ref={e=>this.toast = e}/>
            </View>);
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
