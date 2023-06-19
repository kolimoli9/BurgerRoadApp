import React, { useEffect } from "react";
import { View } from "react-native";
import * as Font from "expo-font";
import { Colors } from "../constants/styles";
import {storage} from '../screens/utils'
const LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                Roboto_Light: require("../assets/fonts/roboto/Roboto-Light.ttf"),
                Roboto_Regular: require("../assets/fonts/roboto/Roboto-Regular.ttf"),
                Roboto_Medium: require("../assets/fonts/roboto/Roboto-Medium.ttf"),
            });
        // Storage HERE
            storage.load({
                key: 'loginState',
            })
            .then(ret => {
                console.log(ret);
                if(ret.userid){
                    navigation.navigate('BottomTabBar');
                }
            }).catch((err)=>{
                console.log('First Entry Detected. routing for registration')
                navigation.navigate('Splash');
            })
            // storage.remove({
            //     key: 'loginState'
            //   });
            //   navigation.navigate('Splash');
        }
        loadFont();
    })

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }} />
    )
}

export default LoadingScreen;