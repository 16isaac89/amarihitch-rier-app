import React, { useState, useCallback } from "react";
import { View, TouchableOpacity, StyleSheet, Text, BackHandler, SafeAreaView, StatusBar } from "react-native";
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Colors, Fonts, Sizes } from "../constant/styles";
import ProfileScreen from "../screens/profile/profileScreen";
import WalletScreen from "../screens/wallet/walletScreen";
import OrderScreen from "../screens/order/orderScreen";
import { useFocusEffect } from "@react-navigation/native";

const BottomTabBarScreen = ({ navigation }) => {

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

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar
                    translucent={false}
                    backgroundColor={Colors.primaryColor}
                />
                {currentIndex == 1 ?
                    <OrderScreen navigation={navigation} />
                    :
                    currentIndex == 2 ?
                        <WalletScreen navigation={navigation} />
                        :
                        <ProfileScreen navigation={navigation} />
                }
                <View style={styles.bottomTabBarStyle}>
                    {bottomTabBarItem({
                        index: 1,
                        title: 'Order'
                    })}
                    {bottomTabBarItem({
                        index: 2,
                        title: 'Wallet'
                    })}
                    {bottomTabBarItem({
                        index: 3,
                        title: 'Profile'
                    })}
                </View>
            </View>
            {
                backClickCount == 1
                    ?
                    <View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.whiteColor16Regular }}>
                            Press Back Once Again to Exit
                        </Text>
                    </View>
                    :
                    null
            }
        </SafeAreaView>
    )

    function bottomTabBarItem({ index, title }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={{ alignItems: 'center' }}
                onPress={() => updateState({ currentIndex: index })}
            >
                {index == 1 ?
                    <MaterialCommunityIcons name="shopping" size={24}
                        color={index == currentIndex ? Colors.primaryColor : Colors.grayColor}
                    />
                    :
                    index == 2 ?
                        <MaterialIcons name="account-balance-wallet" size={24}
                            color={index == currentIndex ? Colors.primaryColor : Colors.grayColor}
                        />
                        :
                        <MaterialIcons name="person" size={24}
                            color={index == currentIndex ? Colors.primaryColor : Colors.grayColor}
                        />
                }
                <Text style={
                    index == currentIndex ?
                        { ...Fonts.primaryColor14Medium }
                        :
                        { ...Fonts.grayColor14Medium }
                }>
                    {title}
                </Text>
            </TouchableOpacity>
        )
    }
}

export default BottomTabBarScreen;

const styles = StyleSheet.create({
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 40,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
    bottomTabBarStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        height: 60.0,
        borderTopLeftRadius: Sizes.fixPadding * 2.0,
        borderTopRightRadius: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        borderTopColor: 'rgba(128, 128, 128, 0.1)',
        borderTopWidth: 1.0,
        elevation: 2.0
    },
})



