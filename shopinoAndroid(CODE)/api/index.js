import axios from './axios'
import {createMessage,createError,cleanError} from '../actions'
import {createAction,sendRequest,responseRecieved} from '../actions/helper'
const delay = 0;
export const get = (table,dispatch,callback = null,parameters = null,config={},load=true)=>{
    dispatch(cleanError(table));
    const type = "LOAD_"+table.toUpperCase();
    sendRequest(dispatch);
    console.log('sendRequest:get');
    let url = table;
    if(parameters){
        url += parameters;
    }
    setTimeout(()=>axios.get(url,{'headers':{...config}})
        .then(response => {
            console.log('Response:get:',response.data);
            //TODO:delete after adding real api           
            if (/*response.status == 200*/response.data.success) {
                if(load){
                    dispatch(createAction(type, response.data.data));
                }
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
export const post = (table,parameters,dispatch,config={},mycallback=null)=>{
    //const type = 
    dispatch(cleanError(table));
    sendRequest(dispatch);
    console.log('sendRequest:post',parameters,config);
    setTimeout(()=>axios.post(table,parameters,{'headers':{...config}})
        .then(response=>{
            console.log('Response Recieved:post:',response.data);
            if (/*response.status == 201*/response.data.success) {
                console.log('Response Recieved:post:successful');
                if(mycallback){
                    console.log('Response Recieved:post:successful:callback',response.data);
                    mycallback(null,response.data.data);
                }
            }
            else{
                if(mycallback) 
                    mycallback(response.data.message);
            }
            responseRecieved(dispatch);
        })
        .catch(error => {
            console.log('Response Recieved:error:',error);
            responseRecieved(dispatch);
            dispatch(createError(table,error.message));
        }),delay);
}

export const put = (table,id,parameters,dispatch,config={},mycallback=null)=>{
    //const type = 
    dispatch(cleanError(table));
    sendRequest(dispatch);
    console.log('sendRequest:put',parameters);
    setTimeout(()=>axios.put(table+'/'+id,parameters,{'headers':{...config}})
        .then(response=>{
            console.log('Response Recieved:put:',response.data);
            if (/*response.status == 201*/response.data.success) {
                console.log('Response Recieved:put:successful');
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

export const del = (table,id,dispatch,config={},mycallback=null)=>{
    //const type = 
    dispatch(cleanError(table));
    sendRequest(dispatch);
    setTimeout(()=>axios.delete(table+'/'+id,{'headers':{...config}})
        .then(response=>{
            console.log('Response Recieved:delete:',response.data);
            if (/*response.status == 201*/response.data.success) {
                console.log('Response Recieved:delete:successful');
                if(mycallback){
                    console.log('Response Recieved:delete:successful:callback',response.data);
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
            console.log('Response Recieved:delete:error:',error);
            responseRecieved(dispatch);
            dispatch(createError(table,error.message));
        }),delay);
}