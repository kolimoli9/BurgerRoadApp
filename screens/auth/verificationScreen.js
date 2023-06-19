import React, { createRef, useState } from "react";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Alert,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Sizes, Fonts } from "../../constants/styles";
import Dialog from "react-native-dialog";
import { Bounce } from 'react-native-animated-spinkit';
import axios from "axios";
import {storage} from "../utils";

const { width } = Dimensions.get('screen');

const VerificationScreen = ({ navigation }) => {



    const [state, setState] = useState({
        isLoading: false,
        firstDigit: '',
        secondDigit: '',
        thirdDigit: '',
        forthDigit: '',
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        isLoading,
        firstDigit,
        secondDigit,
        thirdDigit,
        forthDigit,
    } = state;

const validate=async()=>{
    storage.load({
        key: 'loginState',
    })
    .then(ret => {
        const uid = ret.userid;
    })
    

    let code = firstDigit+secondDigit+thirdDigit+forthDigit
    let data={'code':code}
    let config = {headers:{'Content-Type':'application/json'}}
    axios.post('http://censored/verify/',data,config).then((response)=>{
        if(response.status==200){
            navigation.navigate('BottomTabBar')
        }else{
            Alert.alert('Authintecation Faild','check phone number and try again')
            navigation.navigate('Signin')
        }
    })
}
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}
            >
                {backArrow()}
                {verificationInfo()}
                {otpFields()}
                {resendInfo()}
                {submitButton()}
            </ScrollView>
            {loading()}
        </SafeAreaView >
    )

    function backArrow() {
        return (
            <MaterialIcons
                name="arrow-back"
                size={24}
                color={Colors.blackColor}
                style={{
                    marginTop: Sizes.fixPadding * 2.0,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}
                onPress={() => navigation.pop()}
            />
        )
    }

    function loading() {
        return (
            <Dialog.Container
                visible={isLoading}
                contentStyle={styles.dialogContainerStyle}
                headerStyle={{ margin: 0.0 }}
            >
                <View style={{ marginTop: Sizes.fixPadding + 5.0, backgroundColor: 'white', alignItems: 'center', }}>
                    <Bounce size={50} color={Colors.primaryColor} />
                    <Text style={{
                        ...Fonts.grayColor16Medium,
                        marginTop: Sizes.fixPadding * 2.0
                    }}>
                        Please Wait..
                    </Text>
                </View>
            </Dialog.Container>
        );
    }

    function submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    validate();
                    updateState({ isLoading: true })
                    setTimeout(() => {
                        updateState({ isLoading: false })
                        // navigation.navigate('BottomTabBar');
                    }, 2000);
                }}
                style={styles.submitButtonStyle}>
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Submit
                </Text>
            </TouchableOpacity>
        )
    }

    function resendInfo() {
        return (
            <View style={styles.resendInfoWrapStyle}>
                <Text style={{ ...Fonts.grayColor15Medium }}>
                    Didn’t receive Code!
                </Text>
                <Text style={{ ...Fonts.blackColor16Medium, marginLeft: Sizes.fixPadding - 5.0 }}>
                    Resend
                </Text>
            </View>
        )
    }

    function otpFields() {
        const secondTextInput = createRef();
        const thirdTextInput = createRef();
        const forthTextInput = createRef();

        return (
            <View style={styles.otpFieldsContentStyle}>
                <View style={styles.textFieldContentStyle}>
                    <TextInput
                        value={firstDigit}
                        selectionColor={Colors.primaryColor}
                        style={{ ...Fonts.blackColor17Medium, paddingLeft: Sizes.fixPadding }}
                        onChangeText={(text) => {
                            updateState({ firstDigit: text })
                            secondTextInput.current.focus();
                        }}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.textFieldContentStyle}>
                    <TextInput
                        value={secondDigit}
                        selectionColor={Colors.primaryColor}
                        style={{ ...Fonts.blackColor17Medium, paddingLeft: Sizes.fixPadding }}
                        ref={secondTextInput}
                        keyboardType="numeric"
                        onChangeText={(text) => {
                            updateState({ secondDigit: text })
                            thirdTextInput.current.focus();
                        }}
                    />
                </View>

                <View style={styles.textFieldContentStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        style={{ ...Fonts.blackColor17Medium, paddingLeft: Sizes.fixPadding }}
                        keyboardType="numeric"
                        value={thirdDigit}
                        ref={thirdTextInput}
                        onChangeText={(text) => {
                            updateState({ thirdDigit: text })
                            forthTextInput.current.focus();
                        }}

                    />
                </View>

                <View style={styles.textFieldContentStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        style={{ ...Fonts.blackColor17Medium, paddingLeft: Sizes.fixPadding }}
                        keyboardType="numeric"
                        value={forthDigit}
                        ref={forthTextInput}
                        onChangeText={(text) => {
                            updateState({ forthDigit: text })
                            
                        }}
                    />
                </View>
            </View>
        )
    }

    function verificationInfo() {
        return (
            <View style={{
                marginTop: Sizes.fixPadding * 2.5,
                marginBottom: Sizes.fixPadding * 2.0,
                marginHorizontal: Sizes.fixPadding * 2.0,
            }}>
                <Text style={{ paddingBottom: Sizes.fixPadding, ...Fonts.blackColor22Medium }}>
                    Verification
                </Text>
                <Text style={{
                    ...Fonts.grayColor15Medium,
                    lineHeight: 22.0,
                }}>
                    Enter the code from the phone we just sent you.
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    otpFieldsContentStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    textFieldContentStyle: {
        height: 55.0,
        width: 55.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    submitButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginTop: Sizes.fixPadding * 3.0,
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 80,
        paddingBottom: Sizes.fixPadding * 3.0,
    },
    resendInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Sizes.fixPadding * 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    }
})

export default VerificationScreen;