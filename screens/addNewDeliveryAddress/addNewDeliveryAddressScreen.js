import React, { useState } from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.10;
const LONGITUDE_DELTA = 0.10;

const defaultMarker = {
    latitude: 37.78825,
    longitude: -122.4324,
};

const AddNewDeliveryAddressScreen = ({ navigation }) => {

    var onPoiClick = onPoiClick.bind(this);

    const [state, setState] = useState({
        region: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        },
        poi: null,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { region, poi } = state;

    function onPoiClick(e) {
        const poi = e.nativeEvent;
        updateState({ poi });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                {map()}
                {addressInfo()}
            </View>
        </SafeAreaView>
    )

    function addressInfo() {
        return (
            <View style={styles.addressInfoWrapStyle}>
                <View style={styles.sheetIndicatorStyle} />
                <Text style={{
                    marginVertical: Sizes.fixPadding * 2.0,
                    marginHorizontal: Sizes.fixPadding,
                    ...Fonts.blackColor19Medium
                }}>
                    Type your Address
                </Text>
                <View style={styles.addressTextFieldWrapStyle}>
                    <MaterialIcons name="location-on" size={24} color={Colors.primaryColor} />
                    <TextInput
                        placeholder="Type your address here"
                        style={{ ...Fonts.blackColor15Medium, flex: 1, marginLeft: Sizes.fixPadding }}
                        selectionColor={Colors.primaryColor}
                        placeholderTextColor={Colors.primaryColor}
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.pop()}
                    style={styles.addNewAddressButtonStyle}>
                    <Text style={{ ...Fonts.whiteColor16Medium }}>
                        Add new Address
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function map() {
        return (
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ width: '100%', height: '100%' }}
                initialRegion={region}
                onPoiClick={onPoiClick}
            >
                {
                    poi == null ?
                        <Marker coordinate={defaultMarker}>
                            <Image
                                source={require('../../assets/images/custom_marker.png')}
                                style={{ width: 30.0, height: 30.0 }}
                            />
                        </Marker>
                        :
                        null
                }
                {poi && (
                    <Marker coordinate={poi.coordinate}>
                        <Image
                            source={require('../../assets/images/custom_marker.png')}
                            style={{ width: 30.0, height: 30.0 }}
                        />
                    </Marker>
                )}
            </MapView>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor}
                    onPress={() => navigation.pop()}
                    style={{ position: 'absolute', left: 20.0 }}
                />
                <Text style={{ ...Fonts.blackColor19Medium, marginLeft: Sizes.fixPadding + 5.0, }}>
                    Add New Delivery Address
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.bodyBackColor,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
    },
    addNewAddressButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        margin: Sizes.fixPadding * 2.0,
    },
    addressTextFieldWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    sheetIndicatorStyle: {
        backgroundColor: '#9E9E9E',
        borderRadius: Sizes.fixPadding,
        width: 40.0,
        height: 4.0,
        alignSelf: 'center'
    },
    addressInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        paddingTop: Sizes.fixPadding,
        borderTopColor: '#EEEEEE',
        borderTopWidth: 1.0,
    }
})

export default AddNewDeliveryAddressScreen;