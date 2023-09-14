import React, { Component, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, Dimensions,Linking,ActivityIndicator } from "react-native";
import { Colors, Sizes, Fonts } from "../../constant/styles";
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Dialog from "react-native-dialog";
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

const { width, height } = Dimensions.get('screen');


class ActiveOrders extends Component {


async componentDidMount(){
    await this.props.activeorders()
}
completeorder = (item) =>{
    let order = item.id
    this.props.completeorder(order)
//console.log(item)
}
   
render(){
    return (
        this.props.orders.length == 0
            ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4F4F4' }}>
                <MaterialCommunityIcons name="shopping" size={60}
                    color={Colors.grayColor}
                />
                <Text style={{ ...Fonts.grayColor17Medium, marginTop: Sizes.fixPadding }}>
                    No Active orders.
                </Text>
            </View>
            :
        <View style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
            {this.orders()}
            {this.activeDialog()}
        </View>
    )
}

     activeDialog=()=> {
        return (
            <Dialog.Container visible={this.props.showorder}
                contentStyle={styles.dialogContainerStyle}
                headerStyle={{ margin: 0.0, padding: 0.0, }}
            >
                <View style={{
                    backgroundColor: 'white',
                    height: height - 150,
                    borderRadius: Sizes.fixPadding
                }}>
                    {this.orderId()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {this.orderDetail()}
                      
                        {this.startButton()}

                    </ScrollView>

                </View>
            </Dialog.Container>
        )
    }

   startButton=() =>{
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    this.props.closeorderdialog()
                    //this.props.navigation.navigate('ShowMap')
                }}
                style={styles.startButtonStyle}>
                <Text style={{ ...Fonts.whiteColor18Medium }}>
            Close
                </Text>
            </TouchableOpacity>
        )
    }

 

   orderDetail=()=> {
        return (
            <View style={styles.detailWrapStyle}>
                <View style={styles.detailHeaderWrapStyle}>
                    <Text style={{ ...Fonts.blackColor17Medium }}>
                        Order Details
                    </Text>
                </View>
                <View style={styles.detailDescriptionWrapStyle}>
                    <View style={styles.detailSpecificWrapStyle}>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                            {this.props.activeorder.details}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

   orderId=()=> {
        return (
            <View style={styles.detailTitleWrapStyle}>
                <Text style={{ ...Fonts.whiteColor17Regular }}>
                    {this.props.activeorder.id}
                </Text>
            </View>
        )
    }

    orders=()=> {

        const renderItem = ({ item }) => (
            <View
                activeOpacity={0.9}
               
                style={styles.orderDetailWrapStyle}>
                <View style={styles.orderAndPaymentDetailWrapStyle}>
                    <View style={{ flexDirection: 'row' }}>
                        {/* <MaterialIcons name="fastfood" size={29} color={Colors.primaryColor} /> */}
                        <View style={{ marginLeft: Sizes.fixPadding }}>
                            <Text style={{ ...Fonts.blackColor18Medium }}>
                                {item.orderId}
                            </Text>
                            <View style={{ marginTop: Sizes.fixPadding + 2.0,flexDirection:'row' }}>
                            <TouchableOpacity style={styles.buttons} onPress={()=>Linking.openURL(`tel:${this.props.activeorder.recipient_phone}`)}>
                            <MaterialIcons name="add-call" size={29} color={Colors.primaryColor} /></TouchableOpacity>
                            <TouchableOpacity style={styles.buttons}  onPress={() => this.props.showorderdialog(item)}>
                            <MaterialCommunityIcons  name="clipboard-text" size={27} color={Colors.primaryColor} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttons} onPress={()=>Linking.openURL(`tel:${this.props.activeorder.partner?.phone}`)}>
                            <MaterialIcons name="add-call" size={29} color={Colors.primaryColor} /></TouchableOpacity>

                            <TouchableOpacity style={styles.buttons} onPress={()=>this.completeorder(item)}>
                            {this.props.loader === true ? <ActivityIndicator size="large" color="#00ff00" /> : <MaterialIcons name="check" size={29} color={Colors.primaryColor} />}
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginBottom: Sizes.fixPadding - 9.0,right:'60%' }}>
                        <Text style={{ ...Fonts.grayColor16Medium }}>
                           Del OTP: {item.del_otp}
                        </Text>
                        {/* <Text style={{ ...Fonts.blackColor18Medium }}>
                            {`$ ${item.money}`}
                        </Text> */}
                    </View>

                </View>

                <View style={styles.deliveryAndPickupAddressWrapStyle}>
                    <Text style={{
                        ...Fonts.blackColor16Medium,
                        flex: 0.31,
                    }}>
                        {item.from}
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 0.31,
                    }}>
                        <MaterialIcons name="location-on" size={20} color={Colors.primaryColor} />
                        <View style={styles.dotStyle} />
                        <View style={styles.dotStyle} />
                        <View style={styles.dotStyle} />
                        <View style={styles.dotStyle} />
                        <View style={styles.dotStyle} />
                        <Image
                            source={require('../../assets/images/direaction.png')}
                            style={{ width: 16.0, height: 16.0, }}
                            resizeMode="cover"
                        />
                    </View>
                    <Text style={{
                        ...Fonts.blackColor16Medium,
                        flex: 0.31,
                    }}>
                        {item.to}
                    </Text>
                </View>
            </View>
        )

        return (
            <FlatList
                data={this.props.orders}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: Sizes.fixPadding,
                    paddingBottom: Sizes.fixPadding * 6.0,
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    buttons:{
        margin:15,

    },
    dotStyle: {
        height: 5.0, width: 5.0,
        borderRadius: 2.5,
        backgroundColor: Colors.primaryColor,
        marginHorizontal: Sizes.fixPadding - 7.0
    },
    deliveryAndPickupAddressWrapStyle: {
        backgroundColor: Colors.lightGrayColor,
        flexDirection: 'row',
        borderBottomLeftRadius: Sizes.fixPadding - 5.0,
        borderBottomRightRadius: Sizes.fixPadding - 5.0,
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.fixPadding + 3.0,
        paddingVertical: Sizes.fixPadding,
    },
    orderAndPaymentDetailWrapStyle: {
        flexDirection: 'row',
        paddingHorizontal: Sizes.fixPadding + 3.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: 'space-between'
    },
    orderDetailWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 70,
        alignSelf: 'center',
        margin: 0, padding: 0
    },
    detailWrapStyle: {
        marginHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        marginVertical: Sizes.fixPadding,
    },
    detailHeaderWrapStyle: {
        backgroundColor: Colors.lightGrayColor,
        paddingVertical: Sizes.fixPadding - 2.0,
        alignItems: 'center',
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        borderTopRightRadius: Sizes.fixPadding - 5.0
    },
    detailDescriptionWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: '#F6F6F6',
        borderWidth: 1.0,
        elevation: 0.70,
        padding: Sizes.fixPadding,
        borderBottomLeftRadius: Sizes.fixPadding - 5.0,
        borderBottomRightRadius: Sizes.fixPadding - 5.0,
    },
    detailSpecificWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Sizes.fixPadding - 5.0
    },
    detailTitleWrapStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        borderTopLeftRadius: Sizes.fixPadding,
        borderTopRightRadius: Sizes.fixPadding,
    },
    startButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding - 2.0,
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding,
    }
})

function mapStateToProps( state ) {
    return { 
        orders:state.order.activeorders || [],
        showorder:state.order.showorder,
        activeorder:state.order.activeorder,
        loader:state.order.loader,
        orderdetails:state.order.orderdetails
    };
  }
  
  export default connect(mapStateToProps, actions)(ActiveOrders);