import React, { useState, useCallback, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, BackHandler } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from "../constants/styles";
import DiscoverScreen from "../screens/discover/discoverScreen";
import OrderScreen from "../screens/order/orderScreen";
import Checkout from "../screens/favourites/Checkout";
import ProfileScreen from "../screens/profile/profileScreen";
import { useFocusEffect } from "@react-navigation/native";
import { storage } from "../screens/utils";
import axios from 'axios'

const BottomTabBarScreen = ({ navigation }) => {
// User`s VARS
const [UserId, setUserId] = useState()
const config={'Content-Type':'application/json'}
// FETCH USER OBJECT
const getUserData=async()=>{
    storage.load({key: 'loginState',}).then(ret => {
        setUserId(ret.userid)
    });
    let value = parseInt(UserId.userid)
    axios.get(`http://10.0.0.12:8000/getUserData/${value}`,config).then((response)=>{
        let user = response.data
        console.log('all the user data',user)
        storage.save({
            key:'UserData',
            data:user
        })
    })
}


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
        currentIndex: 1,
        backClickCount: 0
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { currentIndex, backClickCount } = state;

const [ORDER,setORDER] = useState([])
const [cart, setCart] = useState(false)
const getORDERdata = async()=>{
    storage.load({key:'order'}).then((ret)=>{
       setORDER(ret)
       console.log('Ret',ret.length)
    }).catch((err)=>{
        setCart(0)
        console.log('bottomTabBar',err)
    })
}
useEffect(()=>{
    getORDERdata();
    setCart(ORDER.length)

},[ORDER])



    return (
        <View style={{ flex: 1 }}>
            {currentIndex == 1 ?
                <DiscoverScreen navigation={navigation} ORDER={ORDER} cartCounter={setCart} /> :
                currentIndex == 2 ?
                    <OrderScreen navigation={navigation} /> :
                    currentIndex == 3 ?
                        <Checkout navigation={navigation} /> :
                        <ProfileScreen navigation={navigation} />
        }
            <View style={styles.bottomTabBarStyle}>
                {bottomTabBarItem({
                    index: 1,
                    iconName: 'home',
                    tag: 'Home'
                })}
                {bottomTabBarItem({
                    index: 2,
                    iconName: 'not-listed-location',
                    tag: 'Status',
                })}
                {bottomTabBarItem({
                    index: 3,
                    iconName: 'shopping-cart',
                    tag: 'Chekout',
                    cart:cart
                })}
                {bottomTabBarItem({
                    index: 4,
                    iconName: 'person',
                    tag: 'Profile',
                })}
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
        </View>
    )

    function bottomTabBarItem({ index, iconName, tag ,cart=false}) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ currentIndex: index })}
            >
                {
                    currentIndex == index ?
                        <View style={styles.selectedTabStyle}>
                            <MaterialIcons name={iconName} size={25} color={Colors.primaryColor} />
                            <Text style={{ ...Fonts.grayColor14Medium, marginLeft: Sizes.fixPadding + 5.0, }}>
                                {tag}
                            </Text>
                        </View> :
                        <View style={{flex:1,flexDirection:"row",marginTop:15}}>
                        <Text style={styles.cart}>{cart}</Text>
                        <MaterialIcons name={iconName} size={25} color={Colors.grayColor}/>
                        </View>
                }
            </TouchableOpacity>
        )
    }
}

export default BottomTabBarScreen;

const styles = StyleSheet.create({
    bottomTabBarStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        height: 65.0,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        borderTopLeftRadius: Sizes.fixPadding + 5.0,
        borderTopRightRadius: Sizes.fixPadding + 5.0,
        elevation: 1.0,
        borderTopColor: 'gray',
        borderTopWidth: 0.20,
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
    selectedTabStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FCE0E5',
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding * 4.0,
    },
    cart:{
        textAlign:'left',
        color:Colors.darkPrimaryColor,
        fontWeight:'900'

    }
})



