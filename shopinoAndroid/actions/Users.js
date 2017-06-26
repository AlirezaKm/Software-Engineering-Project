import C from './constants'
import {createMessage,createError,cleanError} from './index'
import axios from '../axios'
import {createAction,sendRequest,responseRecieved} from './helper'

export const loadUsers = ()=>(dispatch,getState)=>{
    sendRequest(dispatch);
    console.log('sendRequest');
    axios.get('users')
        .then(response => {
            responseRecieved(dispatch);
            console.log('responseRecieved',response);
            if (response.data.success) {
                dispatch(createAction(C.LOAD_USERS, response.data.data));
            }
            else
                dispatch(createError('users','failed to load users'));
        })
        .catch(error => {
            console.log('catch(error)',error);
            responseRecieved(dispatch);
            dispatch(createError('users',error.message));
        });
}

export const addUser = ()=>(dispatch,getState)=>{
    const newUser = getState().newUser;
    if(checkUserInfo(newUser,dispatch,true)){
        dispatch({
            type:C.ADD_USER,
            payload:newUser
        });
        dispatch(cleanNewUser());
        dispatch(createMessage('User','کاربر با موفقیت اضافه شد'));
        getState().navigate('Users');
    }    
}

export const changeNewUser = (info)=>(dispatch,getState)=>{
    dispatch({
        type:C.CHANGE_NEW_USER,
        payload:info
    });
    return checkUserInfo(getState().newUser,dispatch)
}

const cleanNewUser = ()=>({
    type:C.CLEAN_NEW_USER
})

const checkUserInfo = (info, dispatch, final = false)=>{
    let success = true;
    const err =(field,error)=>{
        success=false;
        dispatch(createError(field,error));    
    }
    const cleanErr = (field)=>{
        dispatch(cleanError(field));
    }
    const {
        fname,
        lname,
        email,
        password,
        repassword
    } = info;
    
    let {type} =info;
    
    if(fname){
        if(fname.replace(" ","").length == 0){
            err('fname','نام نمی تواند خالی باشد');    
        }
        else{
            cleanErr('fname');
        }
    }
    else if(final){
        err('fname','نام نمی تواند خالی باشد');    
    }

    if(lname){
        if(lname.replace(" ","").length == 0){
            err('lname','نام  خانوادگی نمی تواند خالی باشد');    
        }
        else{
            cleanErr('lname');
        }
    }
    else if(final){
        err('lname','نام نمی تواند خالی باشد');    
    }

    if(email){
        if(email.replace(" ","").length == 0){
            err('email','نام نمی تواند خالی باشد');    
        }
        else{
            cleanErr('email');
        }
    }
    else if(final){
        err('email','نام نمی تواند خالی باشد');    
    }
    
    if(type){
        type = String(type);

        if(type == 1 || type == 2 || type == 3 || type == 4){
            cleanErr('type');
        }
        else{
            err('type','نام نمی تواند خالی باشد');    
        }
    }
    else if(final){
        err('type','نام نمی تواند خالی باشد');    
    }
    
    if(password){
        if(password.replace(" ","").length == 0){
            err('password','رمز عبور نمی تواند خالی باشد');    
        }
        else{
            cleanErr('password');
        }
    }
    else if(final){
        err('password','رمز عبور نمی تواند خالی باشد');
    }

    if(repassword){
        if(repassword.replace(" ","").length == 0){
            err('repassword','تکرار رمز عبور نمی تواند خالی باشد');    
        }
        else if(repassword != password){
            err('repassword','با رمز عبور مطابقت ندارد');    
        }
        else{
            cleanErr('repassword');
        }
    }
    else if(final){
        err('repassword','تکرار رمز عبور نمی تواند خالی باشد');    
    }

    return success;
}