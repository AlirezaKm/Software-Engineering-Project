import C from './constants'
import {createError} from './index'

export const addOrderFactor = (status)=>(dispatch,getState)=>{
    const newOrderFactor = getState().newOrderFactor;
    if(newOrderFactor.count > 0 && newOrderFactor.sum > 0){
        dispatch({
            type:C.ADD_ORDER_FACTOR,
            payload:{
                ...newOrderFactor,
                status:status
            }
        });
        dispatch({
            type:C.ADD_ORDERS,
            payload:getState().newOrders
        });
        dispatch(cleanNewOrderFactor());
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
    let maxCode=1;
    const orderFactors = getState().orderFactors;
    if(orderFactors.length>0){
        orderFactors.forEach((item)=>{
            if(item.code>maxCode)
                maxCode=item.code;
        });
    }
    dispatch({
        type:C.CLEAR_NEW_ORDER_FACTOR,
        payload:{
            code:maxCode+1
        }
    });
    dispatch({
        type:C.CLEAR_NEW_ORDERS
    })
};

export const addNewOrder = (productCode)=>(dispatch,getState)=>{
    const orderFactorCode = getState().newOrderFactor.code;
    const toBeAdded = getState().products.find(product=>product.code == productCode);
    if(toBeAdded){
        dispatch(editNewOrderFactor({
            sum:toBeAdded.buyPrice,
            count:1
        }));
        dispatch({
            type:C.ADD_NEW_ORDER,
            payload:{
                productCode:productCode,
                orderFactorCode:orderFactorCode
            }
        });
    }
    else{
        dispatch(createError('selling','کد محصول درست وارد نشده است'));
    }
};

export const cleanNewOrders = ()=>({
    type:C.CLEAR_NEW_ORDERS
})