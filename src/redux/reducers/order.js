
import {AppState} from 'react-native';
import {
    GET_NEW_ORDERS,
    GET_ACTIVE_ORDERS,
    GET_COMPLETED_ORDERS,
    ORDER_LOADER,
    ORDER_LOADER_OFF,
    SHOW_ORDER
 } from '../actions/types';
 
 const INITIAL_STATE = {
 neworders:[],
 activeorders:[],
 completedorders:[],
 loader:false,
 showorder:false,
 activeorder:''
 };

 
 export default function(state = INITIAL_STATE, action) {
   switch (action.type) {
    case GET_NEW_ORDERS:
        return{...state,neworders:action.payload,loader:false}
    case GET_ACTIVE_ORDERS:
        return{...state,activeorders:action.payload,loader:false}
    case GET_COMPLETED_ORDERS:
    return{...state,completedorders:action.payload,loader:false}
    case SHOW_ORDER:
        return{...state,activeorder:action.payload,showorder:true}
    case ORDER_LOADER:
        return{...state,loader:true}
    case ORDER_LOADER_OFF:
        return{...state,loader:false}
     default:
       return state;
   }
 }