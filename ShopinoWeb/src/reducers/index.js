import C from '../actions/constants'
import {combineReducers} from 'redux'
const maxId =(state)=>{
    let maxId=1;
    if(state.length>0){
        state.forEach((item)=>{
            if(item.id>maxId)
                maxId=item.id;
        });
    }
    return maxId;
}
export const navigation= (state=null,action)=>{
    if(action.type === C.SET_NAVIGATE)
        return action.payload;
    else
        return state;
}
export const waitForResponse = (state=false,action)=>{
    console.log('reducers:waitForResponse');
    switch(action.type){
        case C.SEND_REQUEST:
            console.log('reducers:waitForResponse:',true);
            return true;        
        case C.RECEIVE_RESPONE:
            console.log('reducers:waitForResponse:',false);
            return false;
        default:
            return state;
    }
}

export const loadingCategories = (state=false,action)=>{
    switch(action.type){
        case C.SEND_REQUEST_CATEGORIES:            
            return true;        
        case C.RECEIVE_RESPONE_CATEGORIES:            
            return false;
        default:
            return state;
    }
}
export const loadingSubCategories = (state=false,action)=>{
    switch(action.type){
        case C.SEND_REQUEST_SUBCATEGORIES:            
            return true;        
        case C.RECEIVE_RESPONE_SUBCATEGORIES:            
            return false;
        default:
            return state;
    }
}

export const loadingFactors = (state=false,action)=>{
    switch(action.type){
        case C.SEND_REQUEST_FACTORS:            
            return true;        
        case C.RECEIVE_RESPONE_FACTORS:            
            return false;
        default:
            return state;
    }
}
export const loadingProperties = (state=false,action)=>{
    switch(action.type){
        case C.SEND_REQUEST_PROPERTY:            
            return true;        
        case C.RECEIVE_RESPONE_PROPERTY:            
            return false;
        default:
            return state;
    }
}
export const userInfo = (state={},action)=>{
    switch(action.type){
        case C.CHANGE_USER_INFO:
            return Object.assign({},state,action.payload);
        default:
            return state;
    }
}

export const error = (state={},action)=>{
    switch(action.type){
        case C.CHANGE_ERROR:
            return Object.assign({},state,action.payload);            
        case C.CLEAN_ERROR:
            return {};            
        default:
            return state;
    }
}

export const message = (state={},action)=>{
    switch(action.type){
        case C.CHANGE_MESSAGE:
            return Object.assign({},state,action.payload);
        case C.CLEAN_MESSAGE:
            return {};
        default:
            return state;
    }
}

export const newCategory=(state={},action)=>{
    switch(action.type){
        case C.CHANGE_NEW_CATEGORY:
            return Object.assign({},state,action.payload);
        case C.CLEAN_NEW_CATEGORY:
            return {};
        default:
            return state;
    }
}

export const newSubCategory=(state={},action)=>{
    switch(action.type){
        case C.CHANGE_NEW_SUB_CATEGORY:
            return Object.assign({},state,action.payload);
        case C.CLEAN_NEW_SUB_CATEGORY:
            return {};
        default:
            return state;
    }
}

export const categories = (state=[],action)=>{
    switch(action.type){
        case C.ADD_CATEGORY:
            let maxId=1;
            if(state.length>0){
                state.forEach((item)=>{
                    if(item.id>maxId)
                        maxID=item.id;
                });
            }
            let {name} = action.payload;
            return [
                ...state,
                {
                    id:maxId+1,
                    name:name
                }
            ];
        case C.EDIT_CATEGORY:
            const {id} = action.payload;
            name= {name} = action.payload;
            const newState = state.filter((item)=>{
                if(item.id !== id){
                    return true;                    
                }
            });
            return [
                ...newState,
                {
                    id:id,
                    name:name
                }
            ]
        case C.LOAD_CATEGORIES:
            return action.payload;
        default:
            return state;
    }
}

export const subCategories = (state=[],action)=>{
    switch(action.type){
        case C.ADD_SUB_CATEGORY:
            let maxId=1;
            if(state.length>0){
                state.forEach((item)=>{
                    if(item.id>maxId)
                        maxID=item.id;
                });
            }
            
            let {categoryId,name} = action.payload;
            return [
                ...state,
                {
                    id:maxId+1,
                    categoryId:categoryId,
                    name:name
                }
            ];

        case C.EDIT_SUB_CATEGORY:
            const {id} = action.payload;
            categoryId,name = {categoryId,name} = action.payload;
            const newState = state.filter((item)=>{
                if(item.id !== id){
                    return true;                    
                }
            });
            return [
                ...newState,
                {
                    id:id,
                    categoryId:categoryId,
                    name:name
                }
            ]
        case C.LOAD_SUBCATEGORIES:
            return action.payload;
        default:
            return state;
    }
}

export const properties = (state=[],action)=>{
    switch(action.type){
        case C.ADD_PROPERTY:
            let maxId=1;
            if(state.length>0){
                state.forEach((item)=>{
                    if(item.id>maxId)
                        maxId=item.id;
                });
            }
            
            const {subCategoryId,name} =action.payload;

            return [
                ...state,
                {
                    id:maxId+1,
                    subCategoryId:subCategoryId,
                    name:name
                }
            ];            
        case C.LOAD_PROPERTIES:
            return action.payload;
        default:
            return state;
    }
}

export const products = (state=[],action)=>{
    switch(action.type){
        case C.ADD_PRODUCT:
            let maxCode=1;
            if(state.length>0){
                state.forEach((item)=>{
                    if(item.code>maxCode)
                        maxCode=item.code;
                });
            }
            
            const {name,categoryId,subCategoryId,count,sellPrice,buyPrice} = action.payload;
            const create_date_time = Date.now();
            if(name&&categoryId&&subCategoryId&&count&&sellPrice&&buyPrice){

                console.log('product Info valid');

                return [
                    ...state,
                    {
                        code:parseInt(maxCode)+1,
                        name:name,
                        categoryId:categoryId,
                        subCategoryId:subCategoryId,
                        count:count,
                        sellPrice:sellPrice,
                        buyPrice:buyPrice,
                        create_date_time:create_date_time
                    }
                ];
            }
            else{
                console.log('product Info undefined'); // WHY ?
                return state;
            }

        case C.EDIT_PRODUCT:
            const {code} = action.payload;
            const newState = state.filter((item)=>{
                if(item.code !== code){
                    return true;                    
                }
            });
            return [
                ...newState,
                action.payload
            ]            
        case C.REMOVE_PRODUCT:
            return state.filter(item=> item.code !== action.payload);
        case C.LOAD_PRODUCTS:
            return action.payload;
        default:
            return state;
    }
}

export const factors = (state=[],action)=>{
    switch(action.type){
        case C.ADD_FACTOR:
            let maxId=1;
            if(state.length>0){
                state.forEach((item)=>{
                    if(item.id>maxId)
                        maxId=item.id;
                });
            }
            
            const {seller,date} =action.payload;
            const create_date_time = Date.now();

            return [
                ...state,
                {
                    id:maxId+1,
                    seller:seller,
                    date:date,
                    create_date_time:create_date_time
                }
            ];
        case C.LOAD_FACTORS:
            return action.payload;
        default:
            return state;
    }
}

export const newProduct=(state={},action)=>{
    if(action.type === C.CHANGE_NEW_PRODUCT){
        return Object.assign({},state,action.payload);
    }
    else if(action.type === C.CLEAN_NEW_PRODUCT){
        return {};
    }
    else
        return state;
}

export const selectedCategory = (state=0,action)=>{
    if(action.type === C.CHANGE_SELECTED_CATEGORY){
        return action.payload;
    }
    else{
        return state;
    }
}

export const selectedSubCategory = (state=0, action)=>{
    if(action.type === C.CHANGE_SELECTED_SUB_CATEGORY){
        return action.payload;
    }
    else{
        return state;
    }
}

export const selectedProduct = (state = 0, action)=>{
    if(action.type === C.CHANGE_SELECTED_PRODUCT){
        return action.payload;
    }
    else{
        return state;
    }
}

export const selectedOrderFactor = (state=0,action)=>{
    if(action.type === C.CHANGE_SELECTED_ORDER_FACTOR){
        console.log('reducer:selectedOrderFactor:',action.payload);
        return action.payload;
    }
    else{
        return state;
    }
}

export const selectedFactor = (state=0,action)=>{
    if(action.type === C.CHANGE_SELECTED_FACTOR){
        return action.payload;
    }
    else{
        return state;
    }
}

export const users = (state=[],action)=>{
    switch(action.type){
        case C.ADD_USER:
            const id = maxId(state);
            const date = new Date();
            return [
                ...state,{
                    id:id+1,
                    ...action.payload,
                    create_date_time:date.getDate()+'/'+date.getMonth()+1+'/'+date.getFullYear()
                }                
            ]
        case C.LOAD_USERS:
            return action.payload;
        default:
            return state;
    }
}

export const newUser = (state={},action)=>{
    switch(action.type){
        case C.CHANGE_NEW_USER:
            return Object.assign({},state,action.payload);
        case C.CLEAN_NEW_USER:
            return {}
        default:
            return state;
    }
}

export const newFactor=(state={},action)=>{
    switch(action.type){
        case C.CHANGE_NEW_FACTOR:
            return Object.assign({},state,action.payload);
        case C.CLEAN_NEW_FACTOR:
            return {};
        default:
            return state;
    }
}

export const newProperty=(state={},action)=>{
    if(action.type === C.CHANGE_NEW_PROPERTY){
        return Object.assign({},state,action.payload);
    }
    else
        return state;
}

export const search=(state={},action)=>{
    if(action.type === C.CHANGE_SEARCH){
        return Object.assign({},state,action.payload);
    }
    else
        return state;
}

export const productProperty = (state=[],action)=>{
    switch(action.type){
        case C.ADD_PRODUCT_PROPERTY:
            return [
                ...action.payload,
                ...state
            ]            
        case C.EDIT_PRODUCT_PROPERTY:
            const {productCode} = action.payload;
            const newState = state.filter((item)=>{
                if(item.productCode !== productCode){
                    return true;                    
                }
            });
            return [
                ...newState,
                ...action.payload                    
            ]
        default:
            return state;
    }
}

export const newProductProperty = (state=[],action)=>{
    switch(action.type){
        case C.ADD_NEW_PRODUCT_PROPERTY:
            console.log('newProdcutProperty:',state);
            console.log('newProdcutProperty:payload: ',action.payload);
            const exist = state.find(item=> item.property === action.payload.property);
            if(exist){
                return [
                    Object.assign({},exist,action.payload),
                    ...state.filter(item=>(item.property !== action.payload.property))
                ];
            }
            else{
                return [
                    action.payload,
                    ...state
                ]
            }
            
        case C.CLEAN_NEW_PRODUCT_PROPERTY:
            return [];
        default:
            return state;
    }
}
export const orderFactors= (state=[],action)=>{
    switch(action.type){
        case C.ADD_ORDER_FACTOR:
            const {code,status,count,sum,create_date_time} = action.payload;
            if(status){
                return [
                    ...state,
                    {
                        code:code,
                        status:status,
                        count:count,
                        sum:sum,
                        create_date_time:create_date_time
                    }
                ];
            }
            else{
                console.log('orderFactor Info undefined'); // WHY ?
                return state;
            }
        case C.LOAD_ORDERFACTORS:
            return action.payload;
        default:
            return state;
    }
}
export const orders= (state=[],action)=>{
    switch(action.type){
        case C.ADD_ORDERS:
            const newOrders = action.payload;            
            return [
                ...state,
                ...newOrders
            ];
        case C.LOAD_ORDERS:
            return action.payload;
        default:
            return state;
    }
}
const expenses = (state=[],action)=>{    
    switch(action.type){
        case C.ADD_EXPENSE:
            const id = maxId(state);

            console.log('expenses:maxId:',id);
            console.log('expenses:payload:',action.payload);
            console.log('expenses: ',state);

            const date = new Date();
            return [
                ...state,{
                    id:id+1,
                    ...action.payload,
                    create_date_time:date.getDate()+'/'+date.getMonth()+1+'/'+date.getFullYear()
                }                
            ]
        case C.LOAD_EXPENSES:
            return action.payload;
        default:
            return state;
    }
}
export const newExpense = (state={},action)=>{
    switch(action.type){
        case C.CHANGE_NEW_EXPENSE:
            return Object.assign({},state,action.payload);
        case C.CLEAN_NEW_EXPENSE:
            return {};
        default:
            return state;
    }
}
const newOrderFactor = (state={},action)=>{
    switch(action.type){
        case C.EDIT_NEW_ORDER_FACTOR:
            const info = action.payload;
            return Object.assign({},state,{
                count:state.count + info.count,
                sum:state.sum + info.sum,
                status:info.status
            });
        case C.CLEAR_NEW_ORDER_FACTOR:
            const date = new Date();
            return {
                "count":0,
                "sum":0,
                "create_date_time":date.getDay()+'-'+date.getMonth()+1+'-'+date.getFullYear()
            }
        default:
            return state;
    }
}
const newOrders = (state = [],action)=>{
    switch(action.type){
        case C.ADD_NEW_ORDER:
            const newOrder= action.payload;
            let count = 0;
            const exist = state.find(order=>
                order.code == newOrder.code);
            
            if (exist){
                count = exist.count +1;
                return [
                    ...state.filter(order=> order.code != newOrder.code),
                    Object.assign({},exist,{count:count})
                ]
            }
            else{
                count = 1;
                return [
                    ...state,
                    {
                        ...newOrder,
                        count:count
                    }
                ]
            }
        case C.CLEAR_NEW_ORDERS:
            return [];
        default:
            return state;
    }
}
export default combineReducers({
    navigation,
    waitForResponse,
    loadingCategories,
    loadingSubCategories,
    loadingFactors,
    loadingProperties,
    userInfo,
    error,
    newCategory,
    newSubCategory,
    categories,
    subCategories,
    properties,
    newProperty,
    products,
    newProduct,
    users,
    selectedCategory,
    selectedSubCategory,
    selectedProduct,
    selectedOrderFactor,
    selectedFactor,
    factors,
    newFactor,
    newOrderFactor,
    newOrders,
    message,
    productProperty,
    newProductProperty,
    search,
    orderFactors,
    orders,
    expenses,
    newUser,
    newExpense
});