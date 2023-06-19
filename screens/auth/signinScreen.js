import React, { useState, useCallback } from "react";
import { SafeAreaView, View, StatusBar, BackHandler, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import IntlPhoneInput from 'react-native-intl-phone-input';
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import {storage} from '../utils'
const SigninScreen = ({ navigation }) => {
    const [Phone, setPhone] = useState('')

    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        updateState({ backClickCount: 1 });
        setTimeout(() => {
            updateState({ backClickCount: 0 })
        }, 1000)
    }

    const [state, setState] = useState({
        phoneNumber: 0,
        backClickCount: 0
    });
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { phoneNumber, backClickCount } = state;

const [userID, setuserID] = useState('')

const sendPhone=async()=>{
    storage.load({
        key: 'loginState',
    })
    .then(ret => {
        setuserID(ret.userid)
    })

    let config = {headers:{'Content-Type':'application/json'}}
    let data={
        'phone':phoneNumber,
    }
    console.log(userID)
    let id = parseInt(userID.userid)
    axios.post(`http://10.0.0.12:8000/verifyPhone/${id}`,data,config).then((response)=>{
        if(response.status==200){
            navigation.push('Verification')
        }else{
            console.log('Error?!')
        }})
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}>
                    {appLogo()}
                    {signinText()}
                    {mobileNumberTextField()}
                    {continueButton()}
                    {otpInfo()}
                </ScrollView>
            </View>
            {
                backClickCount == 1
                    ?
                    <View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.whiteColor16Regular }}>
                            Press Back Once Again to Exit.
                        </Text>
                    </View>
                    :
                    null
            }
        </SafeAreaView>
    )

    function otpInfo() {
        return (
            <Text style={{
                ...Fonts.grayColor15Medium,
                textAlign: 'center',
                marginBottom: Sizes.fixPadding * 5.0,
            }}>
                We’ll send a code for verification
            </Text>
        )
    }

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>{
                    sendPhone();
                    }}
                style={styles.continueButtonStyle}>
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    function mobileNumberTextField() {
        return (
            <IntlPhoneInput
                onChangeText={({ phoneNumber }) => updateState({ phoneNumber: phoneNumber })}
                defaultCountry="IL"
                containerStyle={styles.phoneNumberWrapStyle}
                dialCodeTextStyle={{ ...Fonts.blackColor16Medium }}
                phoneInputStyle={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, ...Fonts.blackColor16Medium }}
                placeholder="Phone Number"
            />
        )
    }

    

    function signinText() {
        return (
            <Text style={{
                textAlign: 'center',
                ...Fonts.grayColor17Medium
            }}>
                Signin with Phone Number
            </Text>
        )
    }

    function appLogo() {
        return (
            <Image
                source={require('../../assets/images/login-icon.png')}
                style={styles.appLogoStyle}
                resizeMode="contain"
            />
        )
    }
}

const styles = StyleSheet.create({
    loginWithGoogleButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 2.0
    },
    loginWithFacebookButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3B5998',
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 2.0,
        marginBottom: Sizes.fixPadding * 2.5,
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding - 5.0
    },
    phoneNumberWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 5.0,
        marginTop: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 4.0,
    },
    appLogoStyle: {
        width: 200.0,
        height: 200.0,
        alignSelf: 'center',
        marginTop: Sizes.fixPadding * 4.0,
        borderRadius: 100,
    },
    animatedView: {
        backgroundColor: Colors.blackColor,
        position: "absolute",
        bottom: 0,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 3.0,
        justifyContent: "center",
        alignItems: "center",
    },

})

export default SigninScreen;