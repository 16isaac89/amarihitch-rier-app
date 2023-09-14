import React,{Component} from "react";
import { SafeAreaView, StatusBar, StyleSheet, View, Text, FlatList,ActivityIndicator } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';


class WalletScreen extends Component {


async componentDidMount(){
await this.props.walletbalance()
}


    renderItem = ({ item }) => {
        return (
            <View style={styles.earningListItemWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* <MaterialIcons name="fastfood" size={29} color={Colors.primaryColor} /> */}
                    <Text style={{ ...Fonts.blackColor18Medium, marginLeft: Sizes.fixPadding }}>
                        Delivery
                    </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ ...Fonts.grayColor18Medium }}>
                        {item.money*this.props.percentageshare}
                    </Text>
                    <Text style={{ ...Fonts.darkPinkColor16Medium, }}>
                        Earning
                    </Text>
                </View>
            </View>
        )
    }
render(){
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar />
            <View style={{ flex: 1 }}>
                {this.props.loader === true ? 	<ActivityIndicator size="large" color="#00ff00" /> : this.earningInfo()}
                {this.props.loader === true && 	<ActivityIndicator size="large" color="#00ff00" />}
                <View style={styles.earningListWrapStyle}>
                {this.props.transactions.length > 0 ?
                    <FlatList
                        data={this.props.transactions}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={this.renderItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingTop: Sizes.fixPadding * 2.0,
                            paddingBottom: Sizes.fixPadding * 17.0
                        }}
                    />
                    :
                    <Text style={{ ...Fonts.grayColor17Medium, marginTop: Sizes.fixPadding }}>
                    You havent completed any orders.
                </Text>
                    }
                </View>
            </View>
        </SafeAreaView>
    )
                    }

    earningInfo=() =>{
        return (
            <View style={styles.totalEarningInfoWrapStyle}>
                <Text style={{ ...Fonts.whiteColor25Medium }}>
                    Earning
                </Text>
                <Text style={{ ...Fonts.whiteColor25Medium, paddingTop: Sizes.fixPadding - 3.0 }}>
                    UGX {this.props.balance}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    earningListWrapStyle: {
        top: -10.0,
        left: 0.0,
        right: 0.0,
        backgroundColor: '#F4F4F4',
        borderTopLeftRadius: Sizes.fixPadding + 3.0,
        borderTopRightRadius: Sizes.fixPadding + 3.0,
    },
    earningListItemWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
    },
    totalEarningInfoWrapStyle: {
        backgroundColor: Colors.primaryColor,
        height: 120.0,
        alignItems: 'center',
        justifyContent: 'center',
    }
})


function mapStateToProps( state ) {
    return { 
        balance:state.auth.walletbalance,
   transactions:state.auth.transactions,
   percentageshare:state.auth.percentageshare,
        loader:state.auth.regloader
    };
  }
  
  export default connect(mapStateToProps, actions)(WalletScreen);