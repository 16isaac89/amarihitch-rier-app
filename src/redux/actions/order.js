import {
    GET_NEW_ORDERS,
    GET_ACTIVE_ORDERS,
    GET_COMPLETED_ORDERS,
    ORDER_LOADER,
    ORDER_LOADER_OFF,
    SHOW_ORDER
 } from '../actions/types';
 import axios from "axios"
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import {commonurl,apikey} from '../../config/Utilities'
 import Geolocation from 'react-native-geolocation-service';
 import Geocoder from 'react-native-geocoding';


const ROOT_URL = commonurl;
Geocoder.init(apikey);

export const neworders = () =>{
    return async(dispatch)=>{
        let userdata = await AsyncStorage.getItem('userdata');
        let user = JSON.parse(userdata)
        if(userdata){
        dispatch({type:ORDER_LOADER})
                axios.post(ROOT_URL+"/driver/neworders", {
                   id:user.id
                })
                    .then( async(response)  => {
                        let orders = response.data.orders
                        console.log("orders")
                        console.log(orders)
                        dispatch({type:GET_NEW_ORDERS,payload:orders})
                       
                    })
                    .catch(function (error) {
                        dispatch({type:ORDER_LOADER_OFF})
                    })
                   
    }
}
}


export const activeorders = () =>{
    return async(dispatch)=>{
        let userdata = await AsyncStorage.getItem('userdata');
        let user = JSON.parse(userdata)
        if(userdata){
        dispatch({type:ORDER_LOADER})
                axios.post(ROOT_URL+"/driver/activeorders", {
                   id:user.id
                })
                    .then( async(response)  => {
                        let orders = response.data.orders
                        dispatch({type:GET_ACTIVE_ORDERS,payload:orders})
                       
                    })
                    .catch(function (error) {
                        dispatch({type:ORDER_LOADER_OFF})
                    })
                   
    }
}
}

export const historyorders = () =>{

    return async(dispatch)=>{
        let userdata = await AsyncStorage.getItem('userdata');
        let user = JSON.parse(userdata)
        if(userdata){
        dispatch({type:ORDER_LOADER})
                axios.post(ROOT_URL+"/driver/history", {
                   id:user.id
                })
                    .then( async(response)  => {
                        let orders = response.data.orders
                        dispatch({type:GET_COMPLETED_ORDERS,payload:orders})
                       
                    })
                    .catch(function (error) {
                        dispatch({type:ORDER_LOADER_OFF})
                    })
                   
    }
}
}


export const showorderdialog = (order) =>{
    return(dispatch)=>{
dispatch({type:SHOW_ORDER,payload:order})
    }
}


export const acceptorder = (order) =>{
    
    return async(dispatch)=>{
        let userdata = await AsyncStorage.getItem('userdata');
        let driver = JSON.parse(userdata)
        dispatch({type:ORDER_LOADER})
                axios.post(ROOT_URL+"/driver/order/accept", {
                   id:order,
                   driver:driver.id
                })
                    .then( async(response)  => {
                        let orders = response.data.orders
                        dispatch({type:GET_NEW_ORDERS,payload:orders})
                       
                    })
                    .catch(function (error) {
                        console.log(error.response)
                        dispatch({type:ORDER_LOADER_OFF})
                    })
                   
    
}
}
export const rejectorder = (order) =>{
    return async(dispatch)=>{
        dispatch({type:ORDER_LOADER})
        let userdata = await AsyncStorage.getItem('userdata');
        let driver = JSON.parse(userdata)
                axios.post(ROOT_URL+"/driver/order/reject", {
                   id:order,
                   driver:driver.id
                })
                    .then( async(response)  => {
                        let orders = response.data.orders
                        dispatch({type:GET_NEW_ORDERS,payload:orders})
                       
                    })
                    .catch(function (error) {
                        console.log(error.response)
                        dispatch({type:ORDER_LOADER_OFF})
                    })
                   
    
}
}