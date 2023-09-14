
import {AppState} from 'react-native';
import {
    GET_NEW_ORDERS,
    GET_ACTIVE_ORDERS,
    GET_COMPLETED_ORDERS,
    ORDER_LOADER,
    ORDER_LOADER_OFF,
    SHOW_ORDER,
    CLOSE_ORDER_DIALOG,
    ORDER_COMPLETED
 } from '../actions/types';
 
 const INITIAL_STATE = {
 neworders:[],
 activeorders:[],
 completedorders:[],
 loader:false,
 showorder:false,
 activeorder:'',
 orderdetails:false
 };

 
 export default function(state = INITIAL_STATE, action) {
   switch (action.type) {
    case GET_NEW_ORDERS:
        return{...state,neworders:action.payload.orders,activeorders:action.payload.activeorders,loader:false,showorder:false}
    case GET_ACTIVE_ORDERS:
        return{...state,activeorders:action.payload,loader:false,showorder:false}
    case ORDER_COMPLETED:
        return{...state,activeorders:action.payload.orders,completedorders:action.payload.history,loader:false,showorder:false}
    case GET_COMPLETED_ORDERS:
    return{...state,completedorders:action.payload,loader:false,showorder:false}
    case SHOW_ORDER:
        return{...state,activeorder:action.payload,showorder:true}
    case ORDER_LOADER:
        return{...state,loader:true}
    case ORDER_LOADER_OFF:
        return{...state,loader:false}
    case CLOSE_ORDER_DIALOG:
        return{...state,showorder:false}
     default:
       return state;
   }
 }