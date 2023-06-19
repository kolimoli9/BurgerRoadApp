import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const historyOrdersList = [
    {
        id: '1',
        image: require('../../assets/images/restaurant/restaurant_5.png'),
        name: 'Bar 61 Restaurant',
        date: 'Yesterday',
        itemCount: 6,
    },
    {
        id: '2',
        image: require('../../assets/images/restaurant/restaurant_4.png'),
        name: 'Core by Clare Smyth',
        date: 'June 09, 2020',
        itemCount: 2,
    },
    {
        id: '3',
        image: require('../../assets/images/restaurant/restaurant_3.png'),
        name: 'Amrutha Lounge',
        date: 'June 03, 2020',
        itemCount: 1,
    },
    {
        id: '4',
        image: require('../../assets/images/restaurant/restaurant_2.png'),
        name: 'The Barbary',
        date: 'June 03, 2020',
        itemCount: 2,
    },
    {
        id: '5',
        image: require('../../assets/images/restaurant/restaurant_1.png'),
        name: 'The Palomar',
        date: 'May 23, 2020',
        itemCount: 3,
    },
];

const HistoryOrders = ({ navigation }) => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingTop: Sizes.fixPadding,
                paddingBottom: Sizes.fixPadding * 7.0,
            }}
        >
            <Text>Patience is the key .... ;)</Text>
        </ScrollView >
    )
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
    }
})

export default HistoryOrders;