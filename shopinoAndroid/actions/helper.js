import C from './constants'
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