import C from './constants'
import {createMessage,cleanMessage} from './index'
export const createAction = (type, payload = null) =>
    ({
        type: type,
        payload: payload
    });

export const sendRequest = (dispatch)=> 
    dispatch({
        type:C.SEND_REQUEST
    });
export const responseRecieved = (dispatch)=> 
    dispatch({
        type:C.RECEIVE_RESPONE
    });

export const sendMessage=(field,message,dispatch)=>{
    dispatch(createMessage(field,message));
    setTimeout(()=>dispatch(cleanMessage(field)),1000);
}