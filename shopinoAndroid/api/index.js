import axios from '../axios'
import {createMessage,createError,cleanError} from '../actions'
import {createAction,sendRequest,responseRecieved} from '../actions/helper'
const delay = 0;
export const get = (table,dispatch,callback = null,parameters = null)=>{
    dispatch(cleanError(table));
    const type = "LOAD_"+table.toUpperCase();
    sendRequest(dispatch);
    console.log('sendRequest:get');
    let url = table;
    if(parameters){
        url += parameters;
    }
    setTimeout(()=>axios.get(url)
        .then(response => {
            //TODO:delete after adding real api           
            if (/*response.status == 200*/response.data.success) {
                dispatch(createAction(type, response.data.data));
                if(callback){
                    callback(null,response.data.data);
                }
            }
            else{
                dispatch(createError(table,response.data.message));
                if(callback){
                    callback(response.data.message);
                }
            }
            responseRecieved(dispatch);
        })
        .catch(error => {
            if(callback){
                callback(error.message);
            }
            console.log('Response Recieved:error:',error);
            responseRecieved(dispatch);
            dispatch(createError(table,error.message));
        }),delay);
}
export const post = (table,parameters,dispatch,mycallback=null)=>{
    //const type = 
    dispatch(cleanError(table));
    sendRequest(dispatch);
    console.log('sendRequest:post',parameters);
    setTimeout(()=>axios.post(table,parameters)
        .then(response=>{
            console.log('Response Recieved:post:',response.data);
            if (/*response.status == 201*/response.data.success) {
                console.log('Response Recieved:post:successful');
                dispatch(createMessage(table,'کاربر ایجاد شد'));
                if(mycallback){
                    console.log('Response Recieved:post:successful:callback',response.data);
                    mycallback(null,response.data);
                }
            }
            else{
                /*dispatch(createError(table,response.data.message));
                if(callback) callback(response.data.message);*/
            }
            responseRecieved(dispatch);
        })
        .catch(error => {
            console.log('Response Recieved:error:',error);
            responseRecieved(dispatch);
            dispatch(createError(table,error.message));
        }),delay);
}