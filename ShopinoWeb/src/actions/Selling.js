import C from './constants'
import {createError,cleanError} from './index'
import {get,post} from '../api'
import {sendMessage} from './helper'
import urls from '../api/tables'

export const addOrderFactor = (status)=>(dispatch,getState)=>{
    let newOrderFactor = getState().newOrderFactor;
    if(newOrderFactor.count > 0 && newOrderFactor.sum > 0){  
        delete newOrderFactor.sum;
        delete newOrderFactor.count;
        const parameters = {
            ...newOrderFactor,
            status:status,
            orders:JSON.stringify(getState().newOrders.map(item=>({
                product:item.code,
                count:item.count
            })))
        }
        post(urls.orderFactors,parameters,dispatch,getState().config,(err,data)=>{
            dispatch(cleanNewOrderFactor());
            sendMessage('selling','سفارش ثبت شد',dispatch);
        })                   
    }
    else{
        dispatch(createError('selling','هنوز سفارشی ثبت نشده است'));
    }
}

const editNewOrderFactor = (info)=>({
    type:C.EDIT_NEW_ORDER_FACTOR,
    payload:info
});

export const cleanNewOrderFactor = ()=>(dispatch,getState)=>{
    dispatch({
        type:C.CLEAR_NEW_ORDER_FACTOR,
    });
    dispatch({
        type:C.CLEAR_NEW_ORDERS
    })
};

export const addNewOrder = (productCode)=>(dispatch,getState)=>{
    dispatch(cleanError('selling'));
    const add = (data)=>{
        dispatch(editNewOrderFactor({
            sum:data.sellPrice,
            count:1
        }));
        dispatch({
            type:C.ADD_NEW_ORDER,
            payload:data
        });
    }
    const exist = getState().newOrders.find(order=>order.code == productCode);
    if(exist){
        console.log('exist:',exist);
        add(exist);
    }
    else{
        get(urls.products,dispatch,(error,data)=>{
            if(error){
                dispatch(createError('selling','کد محصول درست وارد نشده است'));
                return console.log('addNewOrder:error',error);
            }        
            delete data.count;
            add(data);
        },"/"+productCode,getState().config,false);
    }
};

export const cleanNewOrders = ()=>({
    type:C.CLEAR_NEW_ORDERS
})