import React, { useState } from "react";
import { SafeAreaView, View, Dimensions, StatusBar, StyleSheet, TouchableOpacity, FlatList, Image, Text } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import CollapsingToolbar from "../../components/sliverAppBar";
import { MaterialIcons } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import { BottomSheet } from "@rneui/themed";
import { storage } from "../utils";
import BottomTabBarScreen from "../../components/bottomTabBarScreen";
import Checkout from "../favourites/Checkout";
const offerBannersList = [
    {
        id: '1',
        image: require('../../assets/images/slider/slider_1.png'),
    },
    {
        id: '2',
        image: require('../../assets/images/slider/slider_2.png'),
    },
    {
        id: '3',
        image: require('../../assets/images/slider/slider_3.png'),
    },
    {
        id: '4',
        image: require('../../assets/images/slider/slider_4.png'),
    },
    {
        id: '5',
        image: require('../../assets/images/slider/slider_5.png'),
    },
    {
        id: '6',
        image: require('../../assets/images/slider/slider_6.png'),
    },
    {
        id: '7',
        image: require('../../assets/images/slider/slider_7.png'),
    }
];

const productsOrderedList = [
    {
        id: '1',
        image: require("../../assets/images/products/bb.png"),
        foodName: 'בא בקלאס',
        desc: '225 גרם עם חסה בצל חמוצים עגבניה',
        isFavourite: false,
    },
    {
        id: '2',
        image: require("../../assets/images/products/buenos.png"),
        foodName: 'בואנוס איירס',
        desc: '225 גרם,אסאדו מוקפץ,שום קונפי,צימיצורי חסה בצל וחמוצים',
        isFavourite: false,
    },
    {
        id: '3',
        image: require("../../assets/images/products/osaka.png"),
        foodName: 'אוסקה',
        desc: '225 גרם ,פטריות פורטבלו קראנץ,רוטב אסייתי חסה בצל וחמוצים',
        isFavourite: false,
    },
    {
        id: '4',
        image: require("../../assets/images/products/bb.png"),
        foodName: 'בא בקלאס',
        desc: '225 גרם עם חסה בצל חמוצים עגבניה',
        isFavourite: false,
    },
    {
        id: '5',
        image: require("../../assets/images/products/buenos.png"),
        foodName: 'בואנוס איירס',
        desc: '225 גרם,אסאדו מוקפץ,שום קונפי,צימיצורי חסה בצל וחמוצים',
        isFavourite: false,
    },
    {
        id: '6',
        image: require("../../assets/images/products/osaka.png"),
        foodName: 'אוסקה',
        desc: '225 גרם ,פטריות פורטבלו קראנץ,רוטב אסייתי חסה בצל וחמוצים',
        isFavourite: false,
    },
];

const favouriteRestaurantsList = [
    {
        id: '1',
        image: require('../../assets/images/restaurant/restaurant_5.png'),
        restaurentName: 'Bar 61 Restaurant',
        restaurentAddress: '76A England',
        isFavourite: false,
    },
    {
        id: '2',
        image: require('../../assets/images/restaurant/restaurant_4.png'),
        restaurentName: 'Core by Clare',
        restaurentAddress: '220 Opera Street',
        isFavourite: false,
    },
    {
        id: '3',
        image: require('../../assets/images/restaurant/restaurant_3.png'),
        restaurentName: 'Amrutha Lounge',
        restaurentAddress: '90B Silicon Velley',
        isFavourite: false,
    },
    {
        id: '4',
        image: require('../../assets/images/restaurant/restaurant_2.png'),
        restaurentName: 'The Barbary',
        restaurentAddress: '99C OBC Area',
        isFavourite: false,
    },
    {
        id: '5',
        image: require('../../assets/images/restaurant/restaurant_1.png'),
        restaurentName: 'The Palomor',
        restaurentAddress: '31A Om Colony',
        isFavourite: false,
    }
];

const hotSalesList = [
    {
        id: '1',
        image: require("../../assets/images/products/bb.png"),
        foodName: 'בא בקלאס',
        desc: '225 גרם עם חסה בצל חמוצים ועגבניה \n\n\n',
        ammount:59,
        isFavourite: false,
    },
    {
        id: '2',
        image: require("../../assets/images/products/buenos.png"),
        foodName: 'בואנוס איירס',
        ammount:68,
        desc: '225 גרם,אסאדו מוקפץ \n שום קונפי\n צימיצורי חסה בצל וחמוצים',
        isFavourite: false,
    },
    {
        id: '3',
        image: require("../../assets/images/products/osaka.png"),
        foodName: 'אוסקה',
        desc: '225 גרם ,פטריות פורטבלו קראנץ,רוטב אסייתי חסה בצל וחמוצים \n',
        ammount:68 ,
        isFavourite: false,
    },
    {
        id: '4',
        image: require("../../assets/images/products/normandi.png"),
        foodName: 'נורמנדי',
        desc: '225 גרם,ריבת בצל,שום קונפי,ביצת עין,חסה בצל חמוצים \n\n',
        ammount: 68,
        isFavourite: false,
    },
    {
        id: '5',
        image: require("../../assets/images/products/bb.png"),
        foodName: "סלופי ג'ו",
        desc: 'המורגר מפורק מוקפץ ברוטב ברביקיו ורוטב הבית,מוגש עם חסה ובצל\n',
        ammount: 62,
        isFavourite: false,
    },
    {
        id: '6',
        image: require("../../assets/images/products/bb.png"),
        foodName: 'בורגר ילדים',
        desc: '120 גרם מוגש עם חסה בצל עגניה \n\n\n',
        ammount: 40,
        isFavourite: false,
    }
];

const addressesList = [
    {
        id: '1',
        address: 'Zlafon'
    },
];

const appetizersList = [
    {
        id: '1',
        option: 'Add Lemon',
        isSelected: false,
    },
    {
        id: '2',
        option: 'Add Ice',
        isSelected: false,
    },
];

const { width } = Dimensions.get('screen');


const DiscoverScreen = ({ navigation , ORDER }) => {

// Order VARS HERE 
const [burgerName, setburgerName] = useState('')
const [desc, setDesc] = useState('')
const [extras, setExtras] = useState(0)
const [img, setImg] = useState('')
const [total, setTotal] = useState(0)



    const [ITEM, setItem] = useState({})
const initialState = {}
// USER IMPLEMENTION HERE
    const [user, setUser] = useState('')
    storage.load({
        key: 'loginState',
    })
    .then(ret => {
        setUser(ret.userid)
    })
    const [state, setState] = useState({
        productsOrdereds: productsOrderedList,
        favouriteRestaurents: favouriteRestaurantsList,
        hotSales: hotSalesList,
        showSnackBar: false,
        isFavourite: false,
        showBottomSheet: false,
        showAddressSheet: false,
        currentAddress: addressesList[0].address,
        optionIndex: null,
        optionsIndexes:[],
        qty: 1,
        appetizers: appetizersList,
        showCustomizeBottomSheet: false,
        chosenItem:{},
        item:'',
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        productsOrdereds,
        favouriteRestaurents,
        hotSales,
        showSnackBar,
        isFavourite,
        showBottomSheet,
        showAddressSheet,
        currentAddress,
        optionIndex,
        optionsIndexes,
        appetizers,
        qty,
        showCustomizeBottomSheet,
        chosenItem,
        item
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <CollapsingToolbar
                leftItem={
                    <TouchableOpacity
                        activeOpacity={0.9}
                        // onPress={() => updateState({ showAddressSheet: true })}
                        style={{ marginLeft: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding }}>
                        <Text style={{ ...Fonts.darkPrimaryColor15Medium }}>
                            Version 1.0.0
                        </Text>
                        
                    </TouchableOpacity>
                }
                rightItem={
                    <MaterialIcons
                        name="notifications"
                        size={25}
                        color={Colors.whiteColor}
                        style={{ marginTop: Sizes.fixPadding + 5.0, }}
                        onPress={() => navigation.push('Notifications')}
                    />
                }
                element={
                    <TouchableOpacity
                        activeOpacity={0.9}
                        disabled={true}
                        onPress={() => navigation.push('Search')}
                        style={styles.searchInfoWrapStyle}>
                        <MaterialIcons name="search" size={22} color={Colors.whiteColor} />
                        <Text style={{ marginLeft:200, ...Fonts.lightPrimaryColor16Regular }}>
                            תרצה לחפש משהו ?
                        </Text>
                    </TouchableOpacity>
                }
                toolbarColor={Colors.primaryColor}
                toolbarMinHeight={60}
                toolbarMaxHeight={170}
                isImage={false}
            >
                <View style={{ flex: 1, backgroundColor: Colors.primaryColor, }}>
                    <View style={styles.pageStyle}>
                    {productsOrderedInfo()}
                        {offerBanners()}
                        {hotSalesInfo()}
                    </View>
                </View>
            </CollapsingToolbar>
            <Snackbar
                style={styles.snackBarStyle}
                visible={showSnackBar}
                onDismiss={() => updateState({ showSnackBar: false })}
            >
                {isFavourite ? 'Removed from Favourite' : 'Added to Favourite'}
            </Snackbar>
            {selectAddressSheet()}
        </SafeAreaView >
    )

    function hotSalesInfo() {
        return (
            <>
                {hotSaleInfo()}
                {custmizeBottomSheet()}
            </>
        )
    }

    function custmizeBottomSheet() {
        return (
            <BottomSheet
                isVisible={showCustomizeBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
                onBackdropPress={() => updateState({ showCustomizeBottomSheet: false })}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={{
                        backgroundColor: Colors.whiteColor,
                        borderTopRightRadius: Sizes.fixPadding * 2.0,
                        borderTopLeftRadius: Sizes.fixPadding * 2.0,
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => updateState({ showCustomizeBottomSheet: false })}
                    >
                        <View style={styles.bottomSheetOpenCloseDividerStyle} />
                        {addNewItemTitle()}
                        {CustmizeItemInfo()}
                    </TouchableOpacity>
                    {OptionsTitle()}
                    {OptionsInfo()}
                    {appetizerTitle()}
                    {appetizerInfo()}
                    {addToCartAndItemsInfo(ORDER)}
                </TouchableOpacity>
            </BottomSheet>
        )
    }

    function addToCartAndItemsInfo(ORDER) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    updateState({ showCustomizeBottomSheet: false });
                    let burger = {
                        "burgerName": burgerName,
                        "desc":desc,
                        "extras":extras,
                        "img":img,
                        "total":ITEM.ammount
                    }
                    ORDER.push(burger);
                    setItem(initialState)
                    storage.save({
                        key: 'order',
                        data: ORDER
                      }).then(()=>{
                        navigation.push('BottomTabBar')
                    })
                    
                }}
                style={styles.addToCartAndItemsInfoWrapStyle}>
                <View>
                    <Text style={{ ...Fonts.darkPrimaryColor16Medium }}>
                        {qty} ITEM
                    </Text>
                    <Text style={{ ...Fonts.whiteColor15Regular }}>
                        {(ITEM.ammount * qty)}₪
                    </Text>
                </View>
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Add to Cart
                </Text>
            </TouchableOpacity>
        )
    }

    function updateOptions({ id }) {
        const newList = appetizersList.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, isSelected: !item.isSelected };
                return updatedItem;
            }
            return item;
        });
        updateState({ appetizers: newList });
    }

    function appetizerInfo() {
        return (
            <View style={{ paddingTop: Sizes.fixPadding }}>
                {appetizers.map((item) => (
                    <View key={`${item.id}`}>
                        <View style={styles.optionWrapStyle}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => updateOptions({ id: item.id })}
                                style={{
                                    ...styles.radioButtonStyle,
                                    backgroundColor: item.isSelected ? Colors.primaryColor : Colors.whiteColor,
                                }}
                            >
                                {
                                    item.isSelected ?
                                        <MaterialIcons
                                            name="done"
                                            size={18}
                                            color={Colors.whiteColor}
                                        />
                                        :
                                        null
                                }
                            </TouchableOpacity>
                            <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor16Medium }}>
                                {item.option}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        )
    }

    function appetizerTitle() {
        return (
            <View style={{ backgroundColor: Colors.bodyBackColor, padding: Sizes.fixPadding,marginLeft:20 }}>
                <Text style={{ ...Fonts.grayColor16Medium,textAlign:'right' }}>
                    ראשונות
                </Text>
            </View>
        )
    }

    function OptionsInfo() {
        return (
            <View style={{
                backgroundColor: Colors.whiteColor,
                paddingHorizontal: Sizes.fixPadding,
                paddingTop: Sizes.fixPadding
            }}>
                {Options({ name: 'חסה', img: require("../../assets/images/options/lettuce.png"), price: 0, index: 1 })}
                {Options({ name: 'עגבניה',img: require("../../assets/images/options/tomato.png"), price: 0, index: 2 })}
                {Options({ name: 'חמוצים',img: require("../../assets/images/options/pickle.png"), price: 0, index: 3 })}
                {Options({ name: 'בצל',img: require("../../assets/images/options/onion.png"), price: 0, index: 4, })}
                <Text>____________________________________________________ </Text>
                {Options({ name: 'גוואקמולי',img: require("../../assets/images/options/avocado.png"), price: 3, index: 5, })}
                {Options({ name: 'ביצת עין',img: require("../../assets/images/options/egg.png"), price: 3, index: 6 })}
                {Options({ name: 'שום קונפי',img: require("../../assets/images/options/garlic.png"), price: 3, index: 7, })}
                {Options({ name: 'ריבת בצל',img: require("../../assets/images/options/onoin-jam.png"), price: 3, index: 8 })}
                {Options({ name: "צ'ימיצ'ורי",img: require("../../assets/images/options/chimichoory.png"), price: 3, index: 9 })}
                {Options({ name: "פורטאבלו קראנץ'",img: require("../../assets/images/options/mushroom.png"), price: 3, index: 10 })}

            </View>
        )
    }

    function Options({ name, img, price, index }) {
        const [pressed, setPressed] = useState(false)
        return (
            <View style={styles.sizesWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() =>{ 
                            if(pressed){
                                setPressed(false);
                                setDesc(desc-name-',')
                                if(price != 0){
                                    setExtras(extras-1)
                                    ITEM.ammount-=3
                                }
                            }else{
                                setPressed(true);
                                setDesc(desc+','+name);
                                if(price != 0){
                                    setExtras(extras+1)
                                    ITEM.ammount+=3
                                }

                            };
                        }}
                        style={{
                            ...styles.radioButtonStyle,
                            backgroundColor: pressed ? Colors.primaryColor : Colors.whiteColor,
                        }}
                    >
                        {
                            pressed ?
                                <MaterialIcons
                                    name="done"
                                    size={18}
                                    color={Colors.whiteColor}
                                />
                                :
                                null
                        }
                    </TouchableOpacity>
                    <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor16Medium }}>
                        {name}
                    </Text>
                    <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.grayColor14Medium }}>
                        (+{price}₪)
                    </Text>
                </View>
                <Image source={img} style={{height:30,width:30,borderRadius:15}}/>
            </View>
        )
    }

    function addNewItemTitle() {
        return (
            <Text style={{
                marginHorizontal: Sizes.fixPadding,
                marginBottom: Sizes.fixPadding + 5.0,
                // ...Fonts.blackColor19Medium,
                fontWeight:"600",
                fontSize:30,
                textAlign:'right'
            }}>
                הוסיפו לעגלה
            </Text>
            
        )
    }

    function OptionsTitle() {
        return (
            <View style={styles.sizeTitleStyle}>
                <Text style={{ ...Fonts.grayColor16Medium }}>
                {/* מחיר */}
                </Text>
                <Text style={{ ...Fonts.grayColor16Medium }}>
                    הרכבה
                </Text>
            </View>
        )
    }

    function CustmizeItemInfo() {

        return (
            <View style={styles.custmizeItemInfoWrapStyle}>
                <Image
                    source={ITEM.image}
                    style={{ width: 80.0, height: 80.0, borderRadius: Sizes.fixPadding - 5.0 }}
                />
                <View style={{
                    flex: 1,
                    marginVertical: Sizes.fixPadding - 7.0,
                    justifyContent: 'space-between',
                    marginLeft: Sizes.fixPadding
                }}>
                    <Text style={{ fontSize:30,fontWeight:'200',fontStyle:'italic' }}>
                        {ITEM.foodName}
                    </Text>
                    <View style={{ alignItems: 'flex-start', flexDirection: 'row', justifyContent: "space-between" }}>
                        <Text style={{ ...Fonts.primaryColor20MediumBold }} on>
                        {(ITEM.ammount * qty)}₪
                        </Text>
                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => { qty > 1 ? updateState({ qty: qty - 1 }) : null ;}}
                                style={{ backgroundColor: qty > 1 ? Colors.primaryColor : '#E0E0E0', ...styles.qtyAddRemoveButtonStyle }}>
                                <MaterialIcons
                                    name="remove"
                                    color={qty > 1 ? Colors.whiteColor : Colors.blackColor}
                                    size={18}
                                />
                            </TouchableOpacity>
                            <Text style={{ marginHorizontal: Sizes.fixPadding, ...Fonts.blackColor16Medium }}>
                                {qty}
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => updateState({ qty: qty + 1 })}
                                style={{ backgroundColor: Colors.primaryColor, ...styles.qtyAddRemoveButtonStyle }}>
                                <MaterialIcons
                                    name="add"
                                    color={Colors.whiteColor}
                                    size={18}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View >
        )
    }

    

    function hotSaleInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.hotSalesInfoWrapStyle}>
                <Image
                    source={item.image}
                    style={styles.hotSaleImageStyle}
                />
                
                <View style={{
                    paddingHorizontal: Sizes.fixPadding - 5.0,
                    paddingBottom: Sizes.fixPadding,
                    paddingTop: Sizes.fixPadding - 5.0
                }}>
                    <Text style={{ ...Fonts.blackColor15Medium ,marginLeft:30}}>
                        {item.foodName}
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium,textAlign:'right' }}>
                        {item.desc}
                    </Text>
                    <View style={{ marginTop: Sizes.fixPadding - 7.0, flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ ...Fonts.primaryColor20MediumBold }}>
                        {item.ammount}₪
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() =>{
                                setItem(item);
                                setburgerName(item.foodName);
                                setImg(item.image)
                                updateState({ showCustomizeBottomSheet: true});
                            }}
                            style={styles.addIconWrapStyle}
                        >
                            <MaterialIcons
                                name="add"
                                size={17}
                                color={Colors.whiteColor}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        )
        return (
            <View>
                <View style={{ marginHorizontal: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.blackColor19Medium }}>
                        {/* Hot Sale */}
                    </Text>
                    <Text style={{ ...Fonts.primaryColor16Medium,fontSize:25 }}>
                    הזמינו עכשיו!
                    </Text>
                </View>
                <FlatList
                    horizontal
                    data={hotSales}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        paddingLeft: Sizes.fixPadding,
                        paddingTop: Sizes.fixPadding,
                        paddingBottom: Sizes.fixPadding * 3.0,
                    }}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    }

    function selectAddressSheet() {
        return (
            <BottomSheet
                isVisible={showAddressSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
            >
                <View style={{ backgroundColor: 'white', paddingTop: Sizes.fixPadding + 5.0 }}>
                    <Text style={{ textAlign: 'center', ...Fonts.blackColor19Medium }}>
                        SELECT ADDRESS
                    </Text>
                    <View style={{ backgroundColor: Colors.grayColor, height: 0.30, marginHorizontal: Sizes.fixPadding, marginVertical: Sizes.fixPadding + 5.0 }} />
                    {addresses()}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            updateState({ showAddressSheet: false })
                            navigation.push('AddNewDeliveryAddress')
                        }}
                        style={{
                            marginTop: Sizes.fixPadding - 5.0,
                            marginHorizontal: Sizes.fixPadding + 3.0,
                            marginBottom: Sizes.fixPadding + 5.0,
                            flexDirection: 'row', alignItems: 'center',
                        }}>
                        <MaterialIcons
                            name="add"
                            color='#2196F3'
                            size={22}
                        />
                        <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blueColor15Medium }}>
                            Add New Address
                        </Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
        )
    }

    function addresses() {
        return (
            <>
                {
                    addressesList.map((item) => (
                        <View key={`${item.id}`}>
                            <View style={styles.addressWrapStyle}>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => updateState({ currentAddress: item.address, showAddressSheet: false })}
                                    style={{
                                        ...styles.radioButtonStyle,
                                        backgroundColor: currentAddress == item.address ? Colors.primaryColor : Colors.whiteColor,
                                    }}
                                >
                                    {
                                        currentAddress == item.address ?
                                            <MaterialIcons
                                                name="done"
                                                size={18}
                                                color={Colors.whiteColor}
                                            />
                                            :
                                            null
                                    }
                                </TouchableOpacity>
                                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor16Medium }}>
                                    {item.address}
                                </Text>
                            </View>
                        </View>
                    ))
                }
            </>
        )
    }


    

    

    function productsOrderedInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.productsOrderedInfoWrapStyle}>
                <Image
                    source={item.image}
                    style={styles.productsOrderedImageStyle}
                />
                
                <View style={{
                    paddingHorizontal: Sizes.fixPadding - 5.0,
                    paddingBottom: Sizes.fixPadding,
                    paddingTop: Sizes.fixPadding - 5.0
                }}>
                    <Text style={{ ...Fonts.blackColor15Medium }}>
                        {item.foodName}
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                        {item.desc}
                    </Text>
                </View>
            </View>
        )
        return (
            <View>
                <View style={{ marginHorizontal: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.blackColor19Medium }}>
                        {/* Product Ordered */}
                    </Text>
                    <Text style={{ ...Fonts.primaryColor16Medium,fontSize:24 }}>
                        ההזמנות שלי
                    </Text>
                </View>
                <FlatList
                    horizontal
                    data={productsOrdereds}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        paddingLeft: Sizes.fixPadding,
                        paddingTop: Sizes.fixPadding,
                        paddingBottom: Sizes.fixPadding * 3.0,
                    }}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    }

    
    function offerBanners() {
        const renderItem = ({ item }) => (
            <Image
                source={item.image}
                style={styles.offerBannersImageStyle}
            />
        )
        return (
            <View>
                <FlatList
                    horizontal
                    data={offerBannersList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingVertical: Sizes.fixPadding * 2.0,
                        paddingLeft: Sizes.fixPadding
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pageStyle: {
        borderTopLeftRadius: Sizes.fixPadding * 2.0,
        borderTopRightRadius: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.bodyBackColor,
        flex: 1,
        paddingBottom: Sizes.fixPadding * 7.0,
    },
    offerBannersImageStyle: {
        width: 170.0,
        height: 160.0,
        borderRadius: Sizes.fixPadding,
        marginRight: Sizes.fixPadding,
    },
    categoryImageWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60.0,
        height: 60.0,
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: 57.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
        elevation: 0.0,
    },
    searchInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.darkPrimaryColor,
        flex: 1,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
    },
    productsOrderedInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        width: 130.0,
        marginRight: Sizes.fixPadding + 2.0
    },
    productsOrderedImageStyle: {
        width: 130.0,
        height: 110.0,
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        borderTopRightRadius: Sizes.fixPadding - 5.0
    },
    favouriteRestaurentsInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        width: 130.0,
        marginRight: Sizes.fixPadding + 2.0
    },
    favouriteRestaurentImageStyle: {
        width: 130.0,
        height: 110.0,
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        borderTopRightRadius: Sizes.fixPadding - 5.0
    },
    hotSalesInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        width: 130.0,
        marginRight: Sizes.fixPadding + 2.0
    },
    hotSaleImageStyle: {
        width: 130.0,
        height: 110.0,
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        borderTopRightRadius: Sizes.fixPadding - 5.0
    },
    addIconWrapStyle: {
        width: 22.0,
        height: 22.0,
        borderRadius: 11.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
    },
    addToCartAndItemsInfoWrapStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding,
    },
    radioButtonStyle: {
        width: 27.0,
        height: 27.0,
        borderRadius: 13.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.grayColor,
        borderWidth: 1.0,
    },
    optionWrapStyle: {
        paddingBottom: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center'
    },
    sizesWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Sizes.fixPadding
    },
    sizeTitleStyle: {
        backgroundColor: Colors.bodyBackColor,
        padding: Sizes.fixPadding,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    custmizeItemInfoWrapStyle: {
        marginBottom: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        flex: 1,
        marginHorizontal: Sizes.fixPadding
    },
    qtyAddRemoveButtonStyle: {
        width: 27.0,
        height: 27.0,
        borderRadius: 13.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomSheetOpenCloseDividerStyle: {
        backgroundColor: Colors.grayColor,
        height: 4.0,
        borderRadius: Sizes.fixPadding,
        width: 40.0,
        alignSelf: 'center',
        marginTop: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0
    },
    addressWrapStyle: {
        paddingBottom: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center'
    },
})

export default DiscoverScreen;