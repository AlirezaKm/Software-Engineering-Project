import C from './constants'
import {createError,cleanError,createMessage} from './index'
import {get,post} from '../api'
import {sendMessage} from './helper'
import urls from '../api/tables'
export const addExpense = ()=>(dispatch,getState)=>{
    const newExpense = getState().newExpense;
    if(checkExpenseInfo(newExpense,dispatch,true)){
        post(urls.expenses,newExpense,dispatch,getState().config,()=>{
            dispatch(loadExpenses());
            sendMessage('expenses','خرج ایجاد شد',dispatch);
        });
    }
}
export const changeNewExpense = (info)=>(dispatch,getState)=>{
    dispatch({
        type:C.CHANGE_NEW_EXPENSE,
        payload:info
    });
    checkExpenseInfo(getState().newExpense,dispatch);
}

export const loadExpenses = ()=>(dispatch,getState)=>{
    get(urls.expenses,dispatch,null,null,getState().config);
};

const clean = type=>({
    type:type
});

const checkExpenseInfo = (info, dispatch, final = false)=>{    
    return validate(info,{
        title:{
            name:'عنوان',
            required:true,
        },
        price:{
            name:'قیمت',
            required:true,
            number:true
        }
    },dispatch,final);
}
const validate = (info , config, dispatch, required)=>{
    let success = true;
    const err =(field,error)=>{
        success=false;
        dispatch(createError(field,error));    
    }
    const cleanErr = (field)=>{
        console.log('clean err:  Information: ',field);
        dispatch(cleanError(field));
    }

    for(var prop in config){        
        if (config.hasOwnProperty(prop)){            
            const rules = config[prop];
            if(rules){
                const parse = parseInt(info[prop]);
                const f = rules.required;
                if(rules.required && ( !info[prop] || info[prop].replace(" ","").length == 0)){
                    if(required){
                        err(prop,rules.name+' '+'نمی تواند خالی باشد');
                    }
                }
                else if(rules.number && !parse){
                    err(prop,rules.name+' '+'فقط باید شامل اعداد باشد');
                }
                else{
                    cleanErr(prop);
                }
            }
        }
    }

    return success;
}

export const cleanNewExpense = ()=>({
    type:C.CLEAN_NEW_EXPENSE
})