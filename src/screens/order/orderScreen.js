import React, { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View, Text, Dimensions } from "react-native";
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { TabView, TabBar } from 'react-native-tab-view';
import NewOrders from "../newOrders/newOrders";
import ActiveOrders from "../activeOrders/activeOrders";
import HistoryOrders from "../historyOrders/historyOrders";

const { width } = Dimensions.get('screen');

const OrdersScreen = ({ navigation }) => {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'New' },
        { key: 'second', title: 'Active' },
        { key: 'third', title: 'History' },
    ]);

    const renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'first':
                return <NewOrders navigation={navigation} />;
            case 'second':
                return <ActiveOrders navigation={navigation} />;
            case 'third':
                return <HistoryOrders navigation={navigation} />;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar translucent={false} />
            <View style={{ flex: 1, }}>
                {header()}
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    renderTabBar={props => (
                        <TabBar
                            {...props}
                            indicatorStyle={{ backgroundColor: Colors.primaryColor, height: 3.0, }}
                            tabStyle={{
                                width: width / 3.0,
                            }}
                            scrollEnabled={true}
                            style={{ backgroundColor: 'white', }}
                            renderLabel={({ route, focused, color }) => (
                                <Text
                                    style={
                                        focused ?
                                            {
                                                ...Fonts.primaryColor16Medium,
                                            } :
                                            {
                                                ...Fonts.lightGrayColor16Medium
                                            }
                                    }
                                >
                                    {route.title}
                                </Text>
                            )}
                        />
                    )}
                />
            </View>
        </SafeAreaView>
    )

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor22Medium }}>
                    Orders
                </Text>
                <MaterialIcons
                    name="notifications"
                    size={24}
                    color={Colors.blackColor}
                    onPress={() => navigation.navigate('Notifications')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding + 5.0
    }
})

export default OrdersScreen;
