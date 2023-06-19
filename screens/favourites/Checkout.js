import React, { useEffect, useState } from "react";
import { View, Text, Image, Animated, TouchableHighlight, StyleSheet, Dimensions, TouchableOpacity, _View, Button, Alert } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import {storage} from '../utils'
import { ScrollView } from "react-native-gesture-handler";
import SelectDropdown from 'react-native-select-dropdown'
import axios from "axios";
const { width } = Dimensions.get('screen');

const Loacations = [
  'צלפון',
   'תעוז',
   'בקוע',
   'כרמי-יוסף',
   'טל-שחר',
   'חולדה',
   'משמר-דוד',
   'כפר-אוריה',
   'תרום',
    'גיזו',
    'הראל'
]





const Checkout = ({ navigation }) => {
    const [address, setAddress] = useState(null);
    const [listData, setListData] = useState([]);
    const [paymentMethod,setPaymentMethod] = useState('');
    const [background, setBackground] = useState({"cash":"white","paybox":"white"})
// Later "total" is going to be a part of "bill" object.
    const [total, setTotal] = useState(0)

const [user, setUser] = useState('')
storage.load({
    key: 'loginState',
})
.then(ret => {
    setUser(ret.userid);
})

const ComputeTotal=(array)=>{
    var temp = 0
    array.forEach((item,index)=>{
        temp+=item.total
    })
    return temp
}

useEffect(()=>{
async function getData(){
    await storage.load({
        key:'order'
    }).then((res)=>{
        if(res){
        setListData(res)
    }
    }).catch((err)=>console.log(err));
    let total = ComputeTotal(listData);
    setTotal(total);
};
getData();

},[listData])



const removeItem=async(chosenItem)=>{
    const newlist =[]
    listData.forEach((item)=>{
        if(item!=chosenItem){
            newlist.push(item)
        }})
   await storage.save({
        key:'order',
        data:newlist,
    }).then(()=>{
        setListData(newlist)
        navigation.push('BottomTabBar')
    })
}

const finishUp = async()=>{
    if(total!=0){
        let data = {
            user : user.userid,
            location : address,
            burgers : listData,
            payment : paymentMethod,
            total : total
        }
        let config = {headers:{'Content-Type':'application/json'}}
       await axios.post('http://censored/order/',data,config).then((response)=>{
        if(response.status==200){
            Alert.alert('Your Order Has Been Placed !','It would take a couple of minutes...')
            storage.remove({key:'order'})
            navigation.push('DiscoverScreen')
        }
       })
    }else{
        Alert.alert('Error!','Your cart is empty!')
    }
}




    return (
        <View style={{flex:1}}>
        <ScrollView style={{ flex: 1  , marginTop:50}}>
            <Text style={{ ...Fonts.primaryColor16Medium,fontSize:25,padding:10,textAlign:'right'}}>ההזמנה שלי :</Text>
            {
                listData.length == 0 ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialIcons name="shopping-cart" size={60} color={Colors.grayColor} />
                        <Text style={{ ...Fonts.grayColor17Medium, marginTop: Sizes.fixPadding * 2.0 }}>
                            אין פריטים בעגלה
                        </Text>
                    </View>
                    :
    listData.map((item,index)=>{
                    return(
                     <TouchableHighlight key={index}
                    style={{ backgroundColor: Colors.bodyBackColor, }}
                    activeOpacity={0.9}
                         >
                    <View style={styles.orderWrapStyle}>
                        <Image
                            source={item.img}               
                            style={styles.restaurantImageStyle}
                        />
                        <View style={{ marginHorizontal: Sizes.fixPadding, flex: 1, paddingVertical: Sizes.fixPadding, justifyContent: 'space-between' }}>
                            <Text numberOfLines={1} style={{ maxWidth: width / 1.8, ...Fonts.blackColor16Medium }}>
                                {item.burgerName}
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text numberOfLines={1} style={{ maxWidth: width / 1.8, marginLeft: Sizes.fixPadding - 8.0, ...Fonts.grayColor14Medium }}>
                                    {item.desc}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.grayColor14Medium }}>
                                       תוספות בתשלום:  {item.extras}
                                    </Text>
                                </View>
                                <Text style={{ ...Fonts.primaryColor20MediumBold }}>
                                    {item.total}₪
                                </Text>
                                <Text style={{fontSize:5}}>TEST@1</Text>
                            </View>
                            <Text style={{fontSize:5}}>TEST@2</Text>
                        </View>
                        <TouchableOpacity style={{fontSize:10}} onPress={()=>removeItem(item)}>
                            <MaterialIcons name="remove" size={20} style={{padding:3,backgroundColor:'red',color:'white'}}/>
                        </TouchableOpacity>
                    </View>
                </TouchableHighlight>
                    )
                })

              }

            <View style={styles.conclusion}>
            <Text style={{color:'grey',fontSize:30}}>בחר ישוב למשלוח:</Text>
            <SelectDropdown
                defaultValue={Loacations[0]}
                buttonStyle={styles.buttonStyle}
                rowTextStyle={styles.rowStyle}
                dropdownStyle={styles.selectMenue}
                buttonTextStyle={{color:'#d4334e'}}
                data={Loacations}
                onSelect={(selectedItem,index)=>{setAddress(selectedItem)}}
	            buttonTextAfterSelection={(selectedItem,index)=>{return selectedItem}}
	            rowTextForSelection={(item, index) => {return item}}
               />
            </View>
                    <View style={styles.conclusion}>
                        <Text style={{color:'grey',fontSize:30,marginBottom:20}}>בחר אמצעי תשלום</Text>
                        <View style={{
                            flex:1,
                            flexDirection:'row',
                            justifyContent:'space-between',
                            
                        }}>
                <TouchableOpacity style={{marginRight:100,padding:10, backgroundColor:background.cash}} onPress={()=>{setBackground({paybox:"grey",cash:"green"});setPaymentMethod('cash')}}><MaterialIcons size={25} name="attach-money"/></TouchableOpacity>
                <TouchableOpacity style={{marginLeft:100,padding:10, backgroundColor:background.paybox}} onPress={()=>{setBackground({paybox:"green",cash:"grey"});setPaymentMethod('paybox') }}>
                    <Image source={require('../../assets/images/paybox.png')} style={{
                        height:25,
                        width:25,
                    }}/>
                    </TouchableOpacity>
                        </View>
                    </View>
        </ScrollView>
            <View style={styles.stickyTotal}>
                <Text style={{color:'#d4334e',marginLeft:15,fontSize:25}}>{total}₪</Text>
                <TouchableOpacity activeOpacity={0.5} style={{borderColor:'green',borderWidth:3,borderRadius:5,backgroundColor:'green',padding:5}} onPress={()=>finishUp()}>
                    <MaterialIcons  name="payment" size={50} color={'#d4334e'} style={{backgroundColor:'black'}}/>
                    </TouchableOpacity>
                <Text style={{color:'#d4334e',marginRight:5}}>סיום הזמנה</Text>
                
            </View>
            
       
        </View>
    );
}

const styles = StyleSheet.create({
    orderWrapStyle: {
        flexDirection: 'row',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
        
    },
    restaurantImageStyle: {
        width: 90.0,
        height: 100.0,
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        borderBottomLeftRadius: Sizes.fixPadding - 5.0,
    },
    orderIdIndicatorStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        width: 11.0,
        height: 11.0,
        borderRadius: 5.5,
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: 58.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
        elevation: 0.0,
    },
    backDeleteContinerStyle: {
        alignItems: 'center',
        bottom: 10.0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 100,
        backgroundColor: Colors.redColor,
        right: 0,
    },
    conclusion:{
        margin:5,
        marginTop:10,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonStyle:{
        backgroundColor:'black',
        borderRadius:30,
        marginTop:10,   
    },
    rowStyle:{
        color:'#d4334e'
    },
    selectMenue:{
        borderRadius:10,
    },
    stickyTotal:{
        backgroundColor:"black",
        flexWrap:'nowrap',
        flex:1,
        flexGrow: 0.1,
        marginBottom:100,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        shadowOpacity:0.4
        },


})


export default Checkout;