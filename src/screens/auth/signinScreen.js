import React, { useState, useCallback, Component } from "react";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    BackHandler,

} from "react-native";
import { Colors, Sizes, Fonts } from "../../constant/styles";
import IntlPhoneInput from 'react-native-intl-phone-input';
import { useFocusEffect } from "@react-navigation/native";
import InputField from '../../components/InputField';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Circle } from 'react-native-animated-spinkit'


class SigninScreen extends Component {
    loginuser = () => {
       
        let phone = this.props.phonenumber
        let phonenumber2 = this.props.phonenumbercode.replace("+", "")+phone
        let phone2 = phonenumber2.replace(" ", "")
        let password = this.props.password
    
        if(password === ""){
          alert('Please input password.')
        }else if(this.props.phonenumber === ''){
    alert('Add your phone number.')
        }else{
         // console.log(phone2,password)
        this.props.loginuser(phone2,password)
        }
      };
render(){
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {this.deliveryBoyImage()}
                    {this.signinInfo()}
                    {this.mobileNumberInfo()}
                    {this.continueButton()}
                    <TouchableOpacity style={{ margin:20 }} onPress={()=>this.props.navigation.navigate('RegisterScreen')}>
                        <Text>Don't Have an Account Click here to register</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            
        </SafeAreaView>
    )
        }

loginWithGoogleButton=() =>{
        return (
            <View style={styles.loginWithGoogleButtonStyle}>
                <Image
                    source={require('../../assets/images/google.png')}
                    style={{ width: 28.0, height: 28.0, marginRight: Sizes.fixPadding + 5.0 }}
                    resizeMode="cover"
                />
                <Text style={{ ...Fonts.blackColor18Medium }}>
                    Log in with Google
                </Text>
            </View>
        )
    }

   

    continueButton=()=> {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.loginuser()}
                style={styles.continueButtonStyle}>
                    { this.props.regloader === true ?
                    <Circle size={48} color="#FFF"></Circle>
                        :
                        <Text style={{ ...Fonts.whiteColor18Medium }}>
                        Continue
                    </Text>
                    }
               
            </TouchableOpacity>
        )
    }

    signinInfo=()=> {
        return (
            <Text style={{
                ...Fonts.grayColor17Medium, textAlign: 'center',
                marginBottom: Sizes.fixPadding,
            }}>
                Signin with Phone Number
            </Text>
        )
    }

    deliveryBoyImage=() =>{
        return (
            <Image
                source={require('../../assets/images/delivery.png')}
                style={styles.deliveryBoyImageStyle}
                resizeMode="cover"
            />
        )
    }

    mobileNumberInfo=() =>{
        return (
            <View>
            <IntlPhoneInput
                     onChangeText={({unmaskedPhoneNumber,phoneNumber,dialCode }) =>{
                       // console.log(phoneNumber,dialCode)
                        this.props.phonenumberchanged(phoneNumber,dialCode)
                    }}
                    defaultCountry="UG"
                    containerStyle={styles.mobileNumberWrapStyle}
                    dialCodeTextStyle={{ ...Fonts.blackColor17Medium, marginLeft: Sizes.fixPadding - 5.0 }}
                    placeholder="Mobile Number"
                    phoneInputStyle={styles.mobileNumberFieldStyle}
                />
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 4.0 }}>
                <Text style={{ ...Fonts.grayColor17Medium }}>
                    Password
                </Text>
            <InputField
            label={'Password'}
            icon={
              <Ionicons
              name="lock-open"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
            }
            inputType="password"
            fieldButtonLabel={"Forgot?"}
            fieldButtonFunction={() => {}}
            value={this.props.password}
            onChangeText={(text) => this.props.passwordChanged(text)}
          />
          </View>
          </View>
        )
    }
}

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
    mobileNumberWrapStyle: {
        height: 55.0,
        marginTop: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
    },
    loginWithGoogleButtonStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        height: 55.0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding * 2.0,
    },
    loginWithFacebookButtonStyle: {
        backgroundColor: '#3B5998',
        borderRadius: Sizes.fixPadding - 5.0,
        height: 55.0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 5.0,
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        height: 55.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 4.0,
    },
    deliveryBoyImageStyle: {
        height: 150.0,
        width: 220.0,
        alignSelf: 'center',
        marginTop: Sizes.fixPadding * 6.0,
        marginBottom: Sizes.fixPadding * 3.0
    }
})


function mapStateToProps( state ) {
    return { 
        businessname:state.auth.businessname,
        confirmpwd:state.auth.confirmpwd,
        email:state.auth.email,
        password:state.auth.password,
        phonenumber:state.auth.phonenumber,
        phonenumbercode:state.auth.phonenumbercode,
        regloader:state.auth.regloader
    };
  }
  
  export default connect(mapStateToProps, actions)(SigninScreen);