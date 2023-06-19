import React, { useEffect } from "react";
import { Image, SafeAreaView, StatusBar, View } from "react-native";
import { Bounce } from 'react-native-animated-spinkit';
import { Colors } from "../constants/styles";

const SplashScreen = ({ navigation }) => {

setTimeout(()=>navigation.push('Onboarding'),1000)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Image
                    // source={require('../assets/images/login-icon.png')}
                    style={{ width: 200.0, height: 150.0, alignSelf: 'center' }}
                    resizeMode="contain"
                />
                <Bounce size={40} color={Colors.primaryColor}
                    style={{ alignSelf: 'center', }}
                />
            </View>
        </SafeAreaView>
    )
}

export default SplashScreen;