# React Native 应用

> 学习记录 react native

## 环境安装

    brew install node
    brew install watchman
    ## 不要使用 cnpm！cnpm 安装的模块路径比较奇怪，packager 不能正常识别！
    npm config set registry https://registry.npm.taobao.org --global
    npm config set disturl https://npm.taobao.org/dist --global
    npm install -g yarn react-native-cli

    yarn config set registry https://registry.npm.taobao.org --global
    yarn config set disturl https://npm.taobao.org/dist --global
    ## 新版本 无法下载有些插件
    react-native init MyApp --version 0.44.3

    cd MyApp
    react-native run-ios 
    ##安卓环境配置 https://facebook.github.io/react-native/docs/getting-started.html 
    react-native run-android


### 常见安装错误

> Error: /Library/Developer/CommandLineTools/PackagesmacOS_SDK_headers_for_macOS_10.14

    ##解决方法
    sudo installer -pkg /Library/Developer/CommandLineTools/Packages/macOS_SDK_headers_for_macOS_10.14.pkg -target /

> xcode-select --install

    xcode-select --install
    
    
## 项目结构设计

    js          -----------项目核心
    res         ===========资源文件
    


## 项目插件

### react-native-tab-navigator
    
    npm install react-native-tab-navigator --save
    
    import TabNavigator from 'react-native-tab-navigator';
    
    
### react-native-scrollable-tab-view

    https://github.com/ptomasroos/react-native-scrollable-tab-view
    npm install react-native-scrollable-tab-view --save
    
### react-native-parallax-scroll-view

    https://github.com/i6mi6/react-native-parallax-scroll-view
    
    npm install react-native-parallax-scroll-view --save

    页面上拉动态显示title
    
    
### 
    
    
## 原生组件    

### NavigationBar

> 页面跳转，以及参数传递


    
    import NavigationBar from './NavigationBar' ## 新版本没有
    
    npm install react-native-deprecated-custom-components --save
    ## 引入方式
    import {Navigator} from 'react-native-deprecated-custom-components';
    
    
    但是现在推荐使用  react-navigation
    https://reactnavigation.org/docs/en/getting-started.html
    npm install --save react-navigation
    npm install --save react-native-gesture-handler
    react-native link react-native-gesture-handler
    
    
### ListView

> 渲染数据 

    1. 展示数据
    2. 下拉刷新
    3. 上拉加载
    
> 用新的FlatList或者SectionList组件替代  ListView 首次渲染缓慢或者由于列表很大导致滑动很慢


### fetch

> 请求网络数据

    ``` javascript
    fetch('https://mywebsite.com/endpoint/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      }),
    });
    ```
    
    
## 项目启动流程

### 启动页面
>播放一个
    
    

## 调试

### 热加载

    command+d 打开开发者菜单 点击 enabled hot reload 启用热加载
    
    command+m 打开开发者菜单  安卓模拟器中
    
    
###  No bundle URL present

    rm -rf ios/build/; kill $(lsof -t -i:8081); react-native run-ios、
    
    
    
    
## 项目打包

### 安卓项目打包
    https://reactnative.cn/docs/0.43/signed-apk-android.html
    1. Android studio build->generate signed apk
    或者 命令行工具打包
    keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
    2. 把my-release-key.keystore文件放到你工程中的android/app文件夹下。
    3. 编辑~/.gradle/gradle.properties
    
            ##~/.gradle/gradle.properties
            MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
            MYAPP_RELEASE_KEY_ALIAS=my-key-alias
            MYAPP_RELEASE_STORE_PASSWORD=123456
            MYAPP_RELEASE_KEY_PASSWORD=123456
    4. 添加签名到项目的gradle配置文件
        编辑你项目目录下的android/app/build.gradle，添加如下的签名配置：
    
    
    android {
        ...
        defaultConfig { ... }
        signingConfigs {
            release {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
        buildTypes {
            release {
                ...
                signingConfig signingConfigs.release
            }
        }
    }
    
    
    cd android && ./gradlew assembleRelease
    ## 文件位置
    /Users/chenming/Desktop/web/react/MyApp/android/app/build/outputs/apk/app-release.apk



### ios项目打包

    https://github.com/crazycodeboy/RNStudyNotes/tree/master/React%20Native%E6%89%93%E5%8C%85%E5%8F%91%E5%B8%83App/React%20Native%E5%8F%91%E5%B8%83APP%E4%B9%8B%E6%89%93%E5%8C%85iOS%E5%BA%94%E7%94%A8

    react-native bundle --entry-file index.ios.js --platform ios --dev false --bundle-output release_ios/main.jsbundle --assets-dest release_ios/
    
    然后，修改AppDelegate.m文件，添加如下代码：
    
    
    #ifdef DEBUG
        jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
    #else
        jsCodeLocation = [CodePush bundleURL];
    #endif
    
    
    选择完成团队后
    product->archive

    
    

