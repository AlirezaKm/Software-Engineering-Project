import C from './constants'
import {createError,cleanError,createMessage} from './index'

export const addExpense = ()=>(dispatch,getState)=>{
    const newExpense = getState().newExpense;
    if(checkExpenseInfo(newExpense,dispatch,true)){
        dispatch({
            type:C.ADD_EXPENSE,
            payload:newExpense
        });
        dispatch(clean(C.CLEAN_NEW_EXPENSE));
    }
}
export const changeNewExpense = (info)=>(dispatch,getState)=>{
    dispatch({
        type:C.CHANGE_NEW_EXPENSE,
        payload:info
    });
    checkExpenseInfo(getState().newExpense,dispatch);
}

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
    console.log('validate Information: ',info);

    for(var prop in info){        
        if (info.hasOwnProperty(prop)){            
            const rules = config[prop];
            if(rules){
                const parse = parseInt(info[prop]);

                if(rules.required && (!info[prop] || info[prop].replace(" ","").length == 0)){
                    if(required)
                        err(prop,rules.name+' '+'نمی تواند خالی باشد');
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
