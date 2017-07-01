import C from './constants'
import {get,post,put,del} from '../api'
import urls from '../api/tables'
import {sendMessage} from './helper'
/*const navigateAction = NavigationActions.navigate({
  routeName: 'Profile'
});*/


export const setNavigate = (navigate) =>({
    type:C.SET_NAVIGATE,
    payload:navigate
});

export const login = (username,password)=> (dispatch,getState)=> {    
    dispatch({
        type:C.CHANGE_USER_INFO,
        payload:{
            username:username,
            password:password,
        }
    });
    setTimeout(()=>{
        dispatch({
            type:C.CLEAN_ERROR
        });
        console.log('login:actions:',username,password);
        post(urls.login,{
            username:username,
            password:password
        },dispatch,null,(error,data)=>{
            console.log('data:sent');
            dispatch({
                type:C.RECEIVE_RESPONE
            });
            if(error){
                dispatch(createError('login','اطلاعات وارد شده صحیح نمی باشد'));
                return;
            }
            console.log('login:data:',data);
            dispatch({
                type:C.CHANGE_USER_INFO,
                payload:{
                    type:data.type,
                    authorized:true,
                }
            });
            dispatch({
                type:C.CHANGE_CONFIG,
                payload:{
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization':'Bearer '+data.access_token
                }
            });
            sendMessage('login','کاربر با موفقیت وارد شد',dispatch);
            switch(data.type){
                case "admin":
                    getState().navigation.navigate('HomePage');
                    break;
                case "stockman":
                    getState().navigation.navigate('ProductList');
                    break;
                case "accountant":
                    getState().navigation.navigate('Accounting');
                    break;
                case "seller":
                    getState().navigation.navigate('Selling');
                    break;
            }
        });
    },0);
}

export const createError = (field,message)=>{
    let error={};
    error[field] = message;
    return {
        type:C.CHANGE_ERROR,
        payload:error
    }
};
export const cleanError = (field)=>
    createError(field,null);

export const cleanAllError = ()=>({
    type:C.CLEAN_ERROR
})

export const createMessage = (field,message)=>{
    let msg={};
    msg[field] = message;
    return {
        type:C.CHANGE_MESSAGE,
        payload:msg
    }
};
export const cleanMessage = (field)=>{
    return createMessage(field,null);
};

//   ------------------ factors ------------------
export const loadFactors = (page=1,sum=false)=>(dispatch,getState)=>{
    dispatch({
        type:C.SEND_REQUEST_FACTORS
    })
    const parameters = sum?"?sum=true":'';
    get(urls.factors,dispatch,()=>{
        dispatch({
            type:C.RECEIVE_RESPONE_FACTORS
        })
    },parameters,getState().config);
}

export const addFactor = () =>(dispatch,getState) =>{
    const newFactor = getState().newFactor;
    console.log('addFactor:newFactor:',newFactor);
    if(checkFactorInfo(newFactor,dispatch,true)){
        newFactor.seller = 2;
        post(urls.factors,newFactor,dispatch,getState().config,(err,data)=>{
            console.log('addFactor:callback:',data);
            dispatch(loadFactors());
            sendMessage('factors','فاکتور ایجاد شد',dispatch);
        })
    }
};

export const changeNewFactor = (factorInfo)=> (dispatch,getState)=>{
    dispatch({
        type:C.CHANGE_NEW_FACTOR,
        payload:{
            ...factorInfo
        }
    });
    checkFactorInfo(getState().newFactor,dispatch);
}


const checkFactorInfo = (info,dispatch,final = false)=>{
    let success = true;
    const {
        seller,
        date
    } = info;

    if(seller){
        if(seller.replace(" ","").length == 0){
            success = false;
            dispatch(createError('seller','فروشنده نمی تواند خالی باشد'));    
        }
        else{
            dispatch(cleanError('seller'));
        }
    }
    else if(final){
        success = false;
        dispatch(createError('seller','فروشنده نمی تواند خالی باشد'));    
    }
    
    if(date){
        if(date.replace(" ","").length == 0){
            success = false;
            dispatch(createError('date','تاریخ انتخاب نشده است'));    
        }
        else{
            dispatch(cleanError('date'));
        }
    }
    else if(final){
        success = false;
        dispatch(createError('date','تاریخ انتخاب نشده است')); 
    }

    return success;
}

export const changeSelectedFactor = (factorId)=>({
    type:C.CHANGE_SELECTED_FACTOR,
    payload:factorId
 });

export const cleanNewFactor=()=>({
    type:C.CLEAN_NEW_FACTOR
})

//   ------------------ categories ------------------
export const loadCategories = ()=>(dispatch,getState)=>{
    dispatch({
        type:C.SEND_REQUEST_CATEGORIES
    })
    get(urls.categories,dispatch,()=>{
        console.log('categories loaded');
        dispatch({
            type:C.RECEIVE_RESPONE_CATEGORIES
        });
    },null,getState().config);
}
export const addCategory = ()=>(dispatch,getState) =>{
    const newCategory = getState().newCategory;
    if(checkCategoryInfo(newCategory,dispatch,true)){
        post(urls.categories,newCategory,dispatch,getState().config,()=>{
            sendMessage('category','دسته ایجاد شد',dispatch);
            dispatch(loadCategories());
        });
        
    }
};

export const editCategory = (id,name)=>({
    type:C.EDIT_CATEGORY,
    payload:{
        id:id,
        name:name
    }
});
export const changeSelectedCategory = (categoryId)=>(dispatch)=>{
    dispatch(loadSubCategories(categoryId));
    dispatch(changeSelectedSubCategory(-1));
    dispatch({
        type:C.CHANGE_SELECTED_CATEGORY,
        payload:categoryId
    });

};

export const changeNewCategory = (categoryInfo)=> (dispatch,getState)=>{
    dispatch({
        type:C.CHANGE_NEW_CATEGORY,
        payload:{
            ...categoryInfo
        }
    });
    checkCategoryInfo(getState().newCategory,dispatch);
}

const checkCategoryInfo = (info,dispatch,final = false)=>{
    let success = true;
    const {
        name,        
    } = info;

    if(name){
        if(name.replace(" ","").length == 0){
            success = false;
            dispatch(createError('categoryName','نام دسته نمی تواند خالی باشد'));    
        }
        else{
            dispatch(cleanError('categoryName'));
        }
    }
    else if(final){
        success = false;
        dispatch(createError('categoryName','نام دسته نمی تواند خالی باشد'));  
    }

    return success;  
}

export const cleanNewCatgory = ()=>({
    type:C.CLEAN_NEW_CATEGORY
});


//   ------------------- subcategories -------------------
export const loadSubCategories = (categoryId)=>(dispatch,getState)=>{
    dispatch({
        type:C.SEND_REQUEST_SUBCATEGORIES
    });
    const url = urls.subcategories;
    const parameters = "?category="+categoryId;
    get(url,dispatch,()=>{
        dispatch({
            type:C.RECEIVE_RESPONE_SUBCATEGORIES
        })
    },parameters,getState().config);
}

export const addSubCategory = ()=>(dispatch,getState) =>{
    const newSubCategory = getState().newSubCategory;
    if(checkSubCategoryInfo(newSubCategory,dispatch,true)){
        const selectedCategory = getState().selectedCategory;
        post(urls.subcategories,{
            category:selectedCategory,
            ...getState().newSubCategory
        },dispatch,getState().config,()=>{
            dispatch(loadSubCategories(selectedCategory));
            sendMessage('subCategory','زیر دسته ایجاد شد',dispatch);
        });
    }
};
export const editSubCategory = (id,categoryId,name)=>({
    type:C.EDIT_SUB_CATEGORY,
    payload:{
        id:id,
        categoryId:categoryId,
        name:name
    }
});
export const changeSelectedSubCategory = (subCategoryId)=>(dispatch,getState)=>{
    if(subCategoryId >= 1){
        dispatch(loadProperties(subCategoryId));
        checkPropertyInfo(getState().newProperty,dispatch);
    }
    dispatch({
        type:C.CHANGE_SELECTED_SUB_CATEGORY,
        payload:subCategoryId
    });
};

export const changeNewSubCategory = (subCategoryInfo)=> (dispatch,getState)=>{
    dispatch({
        type:C.CHANGE_NEW_SUB_CATEGORY,
        payload:{
            ...subCategoryInfo
        }
    });
    checkSubCategoryInfo(getState().newSubCategory,dispatch);
}

const checkSubCategoryInfo = (info,dispatch,final = false)=>{
    let success = true;
    const {
        name,        
    } = info;

    if(name){
        if(name.replace(" ","").length == 0){
            success = false;
            dispatch(createError('subCategoryName','نام زیر دسته نمی تواند خالی باشد'));    
        }
        else{
            dispatch(cleanError('subCategoryName'));
        }
    }
    else if(final){
        success = false;
        dispatch(createError('subCategoryName','نام زیر دسته نمی تواند خالی باشد'));  
    }

    return success;  
}

export const cleanNewSubCategory = ()=>({
    type:C.CLEAN_NEW_SUB_CATEGORY
});

//  OrderFactors
export const changeSelectedOrderFactor = (orderFactorId)=>({
    type:C.CHANGE_SELECTED_ORDER_FACTOR,
    payload:orderFactorId
 });

export const loadOrderFactors = ()=>(dispatch,getState)=>{
     get(urls.orderFactors,dispatch,null,null,getState().config);
 }
export const loadOrders = (orderFactorId)=>(dispatch,getState)=>{
    get(urls.orders,dispatch,null,"?orderFactor="+orderFactorId,getState().config);
}
export const changeSelectedProduct = (productCode)=>(dispatch,getState)=>{
    dispatch({
        type:C.CHANGE_SELECTED_PRODUCT,
        payload:productCode
    });
    get(urls.productProperties,dispatch,null,"?product="+productCode,getState().config);

    let product = getState().products.find((item)=> item.code == productCode);
    
    dispatch({
        type:C.CHANGE_NEW_PRODUCT,
        payload:product
    })
};
export const loadProducts = (page)=>(dispatch,getState)=>{
    const factorId = getState().selectedFactor;
    const searchInfo =getState().search;
    let params='';
    if(factorId || searchInfo.name){
        params+=factorId?'factor='+factorId:'';
        if(params.length!=0){
            params+='&';
        }
        params+=searchInfo.name?'name='+searchInfo.name:'';
    }
    const p = params=params.length!=0?'?'+params:'';
    console.log('loadProducts:params: ',p);
    get(urls.products,dispatch,null,p,getState().config);
}
export const addProduct = () =>(dispatch,getState) =>{
    let newProduct = getState().newProduct;
    if(checkProductInfo(newProduct,dispatch,true)){
        newProduct = {
            ...newProduct,
            productProperties:JSON.stringify(getState().newProductProperty)
        }
        if(newProduct.code){//edit 
            put(urls.products,newProduct.code,newProduct,dispatch,getState().config,()=>{
                dispatch(loadProducts());
                sendMessage('products','محصول ویرایش شد',dispatch);
            })
        }
        else{//add New
            post(urls.products,newProduct,dispatch,getState().config,(err,data)=>{
                dispatch(loadProducts());
                sendMessage('products','محصول ایجاد شد',dispatch);
            });
        }
    }
};

export const deleteProduct = (productCode)=>(dispatch,getState)=>{
    del(urls.products,productCode,dispatch,getState().config,(err,data)=>{
        dispatch(loadProducts());
        sendMessage('products','محصول حذف شد',dispatch);
    })
};

export const cleanNewProduct = ()=>(dispatch,getState)=>{
    dispatch({
        type:C.CLEAN_NEW_PRODUCT,
        payload:{}
    });
    /*dispatch({
        type:C.CHANGE_NEW_CATEGORY,
        payload:{}
    });
    dispatch({
        type:C.CHANGE_NEW_SUB_CATEGORY,
        payload:{}
    })
    dispatch({
        type:C.CHANGE_NEW_PROPERTY,
        payload:{}
    })*/
    dispatch({
        type:C.CLEAN_NEW_PRODUCT_PROPERTY
    });
}

export const changeNewProduct = (productInfo) => (dispatch,getState)=>{
    dispatch({
        type:C.CHANGE_NEW_PRODUCT,
        payload:{
            ...productInfo
        }
    });
    checkProductInfo(getState().newProduct,dispatch);
}


const checkProductInfo = (info,dispatch, final = false)=>{
    let success = true;
    const err =(field,error)=>{
        success=false;
        dispatch(createError(field,error));    
    }
    const cleanErr = (field)=>{
        dispatch(cleanError(field));
    }
    const {
        name,
        factor,
        category,
        subcategory,
        count,
        buyPrice,
        sellPrice
    } = info;
    
    if(name){
        if(name.replace(" ","").length == 0){
            err('name','نام نمی تواند خالی باشد');    
        }
        else{
            cleanErr('name');
        }
    }
    else if(final){
        console.log('add Product:final: name doesnt\' exist');
        err('name','نام نمی تواند خالی باشد');    
    }

    if(factor){
        if(factor < 0){
            err('factorId','فاکتور باید انتخاب شود');    
        }
        else{
            cleanErr('factorId');
        }
    }
    else if(final){
        err('factorId','فاکتور باید انتخاب شود');    
    }

    if(category){
        if(category < 0){            
            err('categoryId','دسته باید انتخاب شود');    
        }
        else{
            cleanErr('categoryId');
        }
    }
    else if(final){
        err('categoryId','دسته باید انتخاب شود');    
    }

    if(subcategory){
        if(subcategory < 0){
            err('subCategoryId','زیر دسته باید انتخاب شود');    
        }
        else{
            cleanErr('subCategoryId');
        }
    }
    else if(final){
        err('subCategoryId','زیر دسته باید انتخاب شود');   
    }

    if(count){    
        const parse = parseInt(count);
        if(parse){
            cleanErr('count');
        }
        else{
            err('count','تعداد فقط باید شامل اعداد باشد');            
        }
    }
    else if(final){
        err('count','تعداد باید وارد شود');   
    }

    if(buyPrice){    
        const parse = parseFloat(buyPrice);
        if(parse){
            cleanErr('buyPrice');
        }
        else{
            err('buyPrice','قیمت خرید فقط باید شامل اعداد باشد');
        }
    }
    else if(final){
        err('buyPrice','قیمت خرید باید وارد شود');   
    }

    if(sellPrice){    
        const parse = parseFloat(sellPrice);
        if(parse){
            cleanErr('sellPrice');
        }
        else{
            err('sellPrice','قیمت فروش فقط باید شامل اعداد باشد');
        }
    }
    else if(final){
        err('sellPrice', 'قیمت فروش باید وارد شود ');   
    }

    return success;
}



export const loadProperties = (subCategoryId)=>(dispatch,getState)=>{
    dispatch({
        type:C.SEND_REQUEST_PROPERTY
    });
    const url = urls.properties;
    
    const parameters = "?subCategory="+subCategoryId;

    console.log('loadProperties:url:',url,parameters);
    get(url,dispatch,()=>{
        dispatch({
            type:C.RECEIVE_RESPONE_PROPERTY
        })
    },parameters,getState().config);
}

export const addProperty = () =>(dispatch,getState) =>{
    const selectedSubCategory = getState().selectedSubCategory;
    const newProperty={
        ...getState().newProperty,
        subcategory:selectedSubCategory
    }
    if(checkPropertyInfo(newProperty,dispatch,true)){
        post(urls.properties,newProperty,dispatch,getState().config,()=>{
            dispatch(loadProperties(selectedSubCategory));
            sendMessage('property','ویژگی ایجاد شد',dispatch);
        });
    }
};

export const changeNewProperty = (propertyInfo)=>(dispatch,getState)=>{
    dispatch({
        type:C.CHANGE_NEW_PROPERTY,
        payload:{
            ...propertyInfo
        }
    });
    checkPropertyInfo(getState().newProperty,dispatch);
};

const checkPropertyInfo = (info,dispatch,final=false)=>{
    let success = true;
    const {
        name,
        subCategoryId
    } = info;
    //console.log('propertyName: ',name);
    if(final && subCategoryId<1){
        success = false;
        dispatch(createError('propertyName','زیر دسته انتخاب نشده است'));    
    }
    else if(name){
        if(name.replace(" ","").length == 0){
            success = false;
            dispatch(createError('propertyName','نام ویژگی نمی تواند خالی باشد'));    
        }
        else{
            dispatch(cleanError('propertyName'));
        }
    }
    else if(final){
        success = false;
        dispatch(createError('propertyName','نام ویژگی نمی تواند خالی باشد'));  
    }
    else{
        dispatch(cleanError('propertyName'));
    }

    return success;  
}

export const addNewProductProperty = (productProperty)=>({
    type:C.ADD_NEW_PRODUCT_PROPERTY,
    payload:productProperty
})

export const changeSearch = (searchInfo)=>(dispatch)=>{
    dispatch({
        type:C.CHANGE_SEARCH,
        payload:searchInfo
    });
    dispatch(loadProducts());
}