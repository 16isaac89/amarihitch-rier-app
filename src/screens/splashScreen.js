import React, { useCallback } from "react";
import { View, SafeAreaView, StatusBar, Image, BackHandler } from "react-native";
import { Colors, Sizes } from "../constant/styles";
import { Bounce } from 'react-native-animated-spinkit';
import { useFocusEffect } from '@react-navigation/native'

const SplashScreen = ({ navigation }) => {

    const backAction = () => {
        BackHandler.exitApp();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    setTimeout(() => {
        navigation.navigate('Signin')
    }, 3000)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require('../assets/images/delivery.png')}
                    style={{
                        height: 150.0,
                        width: 220.0,
                        marginBottom: Sizes.fixPadding * 5.0
                    }}
                    resizeMode="contain"
                />
                <Bounce size={50} color={Colors.primaryColor} />
            </View>
        </SafeAreaView>
    )
}

export default SplashScreen;