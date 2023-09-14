import React, { useState,Component } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView, Image, TouchableOpacity, Dimensions, TextInput } from "react-native"
import { Colors, Sizes, Fonts } from "../../constant/styles";
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Dialog from "react-native-dialog";
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import { Circle } from 'react-native-animated-spinkit'

const { width, height } = Dimensions.get('screen');


class NewOrders extends Component{
componentDidMount(){
    this.props.neworders()
}
    // const [newOrdersList, setNewOrderList] = React.useState(newOrders);

    // const [showAcceptDialog, setShowAcceptDialog] = useState(false);

    // const [currentOrderId, setCurrentOrderId] = useState(null);

    // const [showRejectDialog, setShowRejectDialog] = useState(false);

    // const [resonField, setResonField] = useState(false);
render(){
    return (
        this.props.orders.length == 0
            ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4F4F4' }}>
                <MaterialCommunityIcons name="shopping" size={60}
                    color={Colors.grayColor}
                />
                <Text style={{ ...Fonts.grayColor17Medium, marginTop: Sizes.fixPadding }}>
                    No new orders.
                </Text>
            </View>
            :
            <View style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
                {this.orders()}
                {this.acceptDialog()}
                
            </View>
    )
}

 orders=()=> {

        const renderItem = ({ item }) => (
            <View style={styles.orderDetailWrapStyle}>
                <View style={styles.orderAndPaymentDetailWrapStyle}>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialIcons name="forward-to-inbox" size={29} color={Colors.primaryColor} />
                        <View style={{ marginLeft: Sizes.fixPadding }}>
                            <Text style={{ ...Fonts.blackColor18Medium }}>
                                {item.partner.name}
                            </Text>
                            <View style={{ marginTop: Sizes.fixPadding + 10.0 }}>
                                <Text style={{ ...Fonts.grayColor16Medium }}>
                                   Distance: {item.distance}Km
                                </Text>
                                <Text style={{ ...Fonts.blackColor18Medium }}>
                                    {item.paymentMethod}
                                </Text>
                            </View>

                        </View>
                    </View>

                    <View>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                              this.props.showorderdialog(item)
                            }}
                            style={styles.acceptButtonStyle}>
                            <Text style={{ ...Fonts.whiteColor18Medium }}>
                                Details
                            </Text>
                        </TouchableOpacity>
                        {/* <View style={{ marginTop: Sizes.fixPadding, marginBottom: Sizes.fixPadding - 9.0 }}>
                            <Text style={{ ...Fonts.grayColor16Medium }}>
                                Payment
                            </Text>
                            {/* <Text style={{ ...Fonts.blackColor18Medium }}>
                                {`$ ${item.payableAmount.toFixed(2)}`}
                            </Text> */}
                        {/* </View>  */}
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

    rejectDialog=() =>{
        return (
            <Dialog.Container visible={showRejectDialog}
                contentStyle={styles.dialogContainerStyle}
                headerStyle={{ margin: 0.0, padding: 0.0, }}
            >
                <View style={{ backgroundColor: 'white', borderRadius: Sizes.fixPadding }}>
                    {resonToReject()}
                    <Text style={{ ...Fonts.blackColor14Regular, textAlign: 'center', marginTop: Sizes.fixPadding }}>
                        Write a specific reason to reject order
                    </Text>
                    {rejectResonTextField()}
                    {cancelAndSendButton()}
                </View>
            </Dialog.Container>
        )
    }

    rejectResonTextField=()=>{
        return (
            <TextInput
                style={{
                    borderColor: resonField ? Colors.primaryColor : Colors.grayColor,
                    ...styles.rejectResonTextInputStyle,
                }}
                selectionColor={Colors.primaryColor}
                multiline={true}
                numberOfLines={4}
                placeholder="Enter Reason Here"
                onFocus={() => setResonField(true)}
                onBlur={() => setResonField(false)}
            />
        )
    }

    cancelAndSendButton=() =>{
        return (
            <View style={styles.cancelAndSendButtonWrapStyle}>
                
                
            </View>
        )
    }

    resonToReject=() =>{
        return (
            <View style={styles.detailTitleWrapStyle}>
                <Text style={{ ...Fonts.whiteColor17Regular }}>
                    Reason to Reject
                </Text>
            </View>
        )
    }

    acceptDialog=()=> {
        return (
            <Dialog.Container visible={this.props.showorder}
                contentStyle={styles.dialogContainerStyle}
                headerStyle={{ margin: 0.0, padding: 0.0, }}
            >
                <View style={{ backgroundColor: 'white', height: height - 150, borderRadius: Sizes.fixPadding }}>
                <View style={styles.detailTitleWrapStyle}>
                <Text style={{ ...Fonts.whiteColor17Regular }}>
                    {this.props.activeorder.id}
                </Text>
            </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {this.orderDetail()}
                        {this.locationDetail()}
                        {this.customerDetail()}
                        {this.instructions()}
                        {this.rejectAndAcceptButton()}
                    </ScrollView>
                </View>
            </Dialog.Container>
        )
    }

     rejectAndAcceptButton=()=> {
        return (
            <View style={styles.rejectAndAcceptButtonWrapStyle}>
                {
                    this.props.loader === true ?
                    <View><Circle size={48} color="#FFF"/></View>
                    :
                    <View style={styles.rejectAndAcceptButtonWrapStyle}>
                        <TouchableOpacity activeOpacity={0.9}
                    onPress={() => {
                        this.props.rejectorder(this.props.activeorder.id)
                    }}
                    style={styles.modalAcceptButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor18Medium }}>Reject</Text>
                </TouchableOpacity>
<TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        this.props.acceptorder(this.props.activeorder.id)
                    
                }}
                    style={styles.rejectButtonStyle}
                >
                    <Text style={{ ...Fonts.blackColor18Medium }}>Accept</Text>
                </TouchableOpacity>
                
                    </View>
                }
                
            </View>
        )
    }

  

    customerDetail=()=> {
        return (
            <View>
            <View style={styles.detailWrapStyle}>
                <View style={styles.detailHeaderWrapStyle}>
                    <Text style={{ ...Fonts.blackColor17Medium }}>
                        Sender
                    </Text>
                </View>
                <View style={styles.detailDescriptionWrapStyle}>
                    <View style={{ ...styles.detailSpecificWrapStyle }}>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                            Name
                        </Text>
                        <Text style={{ ...Fonts.blackColor15Medium, }}>
                            {this.props.activeorder.partner?.name ?? ''}
                        </Text>
                    </View>
                    <View style={{ ...styles.detailSpecificWrapStyle }}>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                            Phone
                        </Text>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                        {this.props.activeorder.partner?.phone ?? ''}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.detailWrapStyle}>
            <View style={styles.detailHeaderWrapStyle}>
                <Text style={{ ...Fonts.blackColor17Medium }}>
                    Recipient
                </Text>
            </View>
            <View style={styles.detailDescriptionWrapStyle}>
                <View style={{ ...styles.detailSpecificWrapStyle }}>
                    <Text style={{ ...Fonts.blackColor15Medium }}>
                        Name
                    </Text>
                    <Text style={{ ...Fonts.blackColor15Medium, }}>
                    {this.props.activeorder.recipient_name ?? ''}
                    </Text>
                </View>
                <View style={{ ...styles.detailSpecificWrapStyle }}>
                    <Text style={{ ...Fonts.blackColor15Medium }}>
                        Phone
                    </Text>
                    <Text style={{ ...Fonts.blackColor15Medium }}>
                    {this.props.activeorder.recipient_phone ?? ''}
                    </Text>
                </View>
            </View>
        </View>
        </View>
        )
    }

    locationDetail=()=> {
        return (
            <View style={styles.detailWrapStyle}>
                <View style={styles.detailHeaderWrapStyle}>
                    <Text style={{ ...Fonts.blackColor17Medium }}>
                        Location
                    </Text>
                </View>
                <View style={styles.detailDescriptionWrapStyle}>
                    <View style={{ ...styles.detailSpecificWrapStyle, justifyContent: 'flex-start' }}>
                        <Text style={{ ...Fonts.blackColor15Medium, }}>
                            {this.props.activeorder.from}
                        </Text>
                    </View>
                    <View style={{ ...styles.detailSpecificWrapStyle, justifyContent: 'flex-start' }}>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                        <MaterialCommunityIcons name="location-enter" size={30}
                    color={Colors.grayColor}
                />
                        </Text>
                    </View>
                    <View style={{ ...styles.detailSpecificWrapStyle, justifyContent: 'flex-start' }}>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                        {this.props.activeorder.to}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
    instructions=()=> {
        return (
            <View style={styles.detailWrapStyle}>
                <View style={styles.detailHeaderWrapStyle}>
                    <Text style={{ ...Fonts.blackColor17Medium }}>
                        Instructions
                    </Text>
                </View>
                <View style={styles.detailDescriptionWrapStyle}>
                    <View style={{ ...styles.detailSpecificWrapStyle, justifyContent: 'flex-start' }}>
                        <Text style={{ ...Fonts.blackColor15Medium, }}>
                            {this.props.activeorder.pickup_inst}
                        </Text>
                    </View>
                    <View style={{ ...styles.detailSpecificWrapStyle, justifyContent: 'flex-start' }}>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                        <MaterialCommunityIcons name="information" size={30}
                    color={Colors.grayColor}
                />
                        </Text>
                    </View>
                    <View style={{ ...styles.detailSpecificWrapStyle, justifyContent: 'flex-start' }}>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                        {this.props.activeorder.dropoff_inst}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    orderDetail=()=> {
        return (
            <View style={styles.detailWrapStyle}>
                <View style={styles.detailHeaderWrapStyle}>
                    <Text style={{ ...Fonts.blackColor17Medium }}>
                        Order
                    </Text>
                </View>
                <View style={styles.detailDescriptionWrapStyle}>
                    <View style={styles.detailSpecificWrapStyle}>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                            {this.props.activeorder.details}
                        </Text>
                        
                    </View>
                    
                    <View style={{
                        height: 0.50,
                        backgroundColor: Colors.lightGrayColor,
                        marginBottom: Sizes.fixPadding - 5.0
                    }} />
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        {/* <Text style={{ ...Fonts.blackColor18Medium }}>
                            Total
                        </Text>
                        <Text style={{ ...Fonts.primaryColor18Bold }}>
                            $520
                        </Text> */}
                    </View>
                </View>
            </View>
        )
    }

  
}

const styles = StyleSheet.create({
    dotStyle: {
        height: 5.0, width: 5.0,
        borderRadius: 2.5,
        backgroundColor: Colors.primaryColor,
        marginHorizontal: Sizes.fixPadding - 7.0
    },
    acceptButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingVertical: Sizes.fixPadding,
    },
    deliveryAndPickupAddressWrapStyle: {
        backgroundColor: Colors.lightGrayColor,
        flexDirection: 'row',
        borderBottomLeftRadius: Sizes.fixPadding - 5.0,
        borderBottomRightRadius: Sizes.fixPadding - 5.0,
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.fixPadding + 3.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
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
    rejectButtonStyle: {
        flex: 0.50,
        backgroundColor: '#E0E0E0',
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 5.0,
    },
    modalAcceptButtonStyle: {
        flex: 0.50,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    },
    rejectAndAcceptButtonWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 3.0,
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
    rejectResonTextInputStyle: {
        borderWidth: 1.5,
        marginHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        ...Fonts.blackColor16Medium,
        marginVertical: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding,
        backgroundColor: '#F5F5F5',
    },
    cancelAndSendButtonWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 3.0,
        marginBottom: Sizes.fixPadding,
    },
    cancelButtonStyle: {
        flex: 0.50,
        backgroundColor: '#E0E0E0',
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 5.0,
    },
    sendButtonStyle: {
        flex: 0.50,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    },
})

function mapStateToProps( state ) {
    return { 
        orders:state.order.neworders || [],
        showorder:state.order.showorder,
        activeorder:state.order.activeorder,
        loader:state.order.loader
    };
  }
  
  export default connect(mapStateToProps, actions)(NewOrders);