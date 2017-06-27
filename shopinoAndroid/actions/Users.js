import C from './constants'
import {createMessage,createError,cleanError,cleanAllError} from './index'
import {sendMessage} from './helper'
import urls from '../api/tables'
import {get,post} from '../api'

export const loadUsers = ()=>(dispatch)=>{
    get(urls.users,dispatch);
}

export const addUser = ()=>(dispatch,getState)=>{
    const newUser = getState().newUser;
    if(checkUserInfo(newUser,dispatch,true)){
        delete newUser.repassword;
        console.log('addUser:valid');
        const date = new Date();
        const parameters = {
            ...newUser,
            created_at:date.getDate()+'/'+date.getMonth()+1+'/'+date.getFullYear()
        };
        post(urls.users,parameters,dispatch,
        (err,data)=>{
            if(err){
                return console.log('addUser:post:callback:err:',err,data);
            }
            console.log('addUser:post:callback:',err,':',data);
            //getState().navigation.goBack('CreateUser');
            dispatch(loadUsers());
            sendMessage(urls.users,'کاربر با موفقیت اضافه شد',dispatch);
        });
        dispatch(cleanNewUser());
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
            err('email','ایمیل نمی تواند خالی باشد');    
        }
        else{
            cleanErr('email');
        }
    }
    else if(final){
        err('email','نام نمی تواند خالی باشد');    
    }
    
    if(type){
        type = parseInt(type);
        console.log('checkUserInfo:type:',type);
        if(type == 1 || type == 2 || type == 3 || type == 4){
            console.log('checkUserInfo:type:','passed');
            cleanErr('type');
        }
        else{
            console.log('checkUserInfo:type:','notpassed');
            err('type','نوع کاربر باید انتخاب شود');
        }
    }
    else if(final){
        err('type','نوع کاربر باید انتخاب شود');  
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