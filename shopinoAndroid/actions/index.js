import C from './constants'
import {get,post} from '../api'
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
    //sendRequest(dispatch);
    dispatch({
        type:C.CHANGE_USER_INFO,
        payload:{
            username:username,
            password:password,
        }
    });
    /*const user = getState().users.find((user)=>{
        if(user.username === username && user.password === password){
            return true;
        }
    })*/
    setTimeout(()=>{
        dispatch({
            type:C.RECEIVE_RESPONE
        });
        /*if(user){*/
            dispatch({
                type:C.CLEAN_ERROR
            });
            dispatch({
                type:C.CHANGE_USER_INFO,
                payload:{
                    authorized:true,
                    /*role:user.role,*/
                    token:123
                }
            })
        /*}
        else{
            dispatch(createError('اطلاعات وارد شده صحیح نمی باشد'));
        }*/
        getState().navigation.navigate('HomePage');
    },
    1000);
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
export const loadFactors = (page=1)=>(dispatch)=>{
    dispatch({
        type:C.SEND_REQUEST_FACTORS
    })
    const parameters = "?page="+page;
    get(urls.factors,dispatch,()=>{
        dispatch({
            type:C.RECEIVE_RESPONE_FACTORS
        })
    },parameters);
}

export const addFactor = () =>(dispatch,getState) =>{
    const newFactor = getState().newFactor;
    if(checkFactorInfo(newFactor,dispatch,true)){
        post(urls.factors,newFactor,dispatch,()=>{
            sendMessage('factor','فاکتور ایجاد شد',dispatch);
            dispatch(loadFactors());
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
        if(seller.replace(" ","").length == 0){
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
    });
}
export const addCategory = ()=>(dispatch,getState) =>{
    const newCategory = getState().newCategory;
    if(checkCategoryInfo(newCategory,dispatch,true)){
        post(urls.categories,newCategory,dispatch,()=>{
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
export const loadSubCategories = (categoryId)=>(dispatch)=>{
    dispatch({
        type:C.SEND_REQUEST_SUBCATEGORIES
    });
    const url = urls.subcategories;
    const parameters = "?categoryId="+categoryId;
    get(url,dispatch,()=>{
        dispatch({
            type:C.RECEIVE_RESPONE_SUBCATEGORIES
        })
    },parameters);
}

export const addSubCategory = ()=>(dispatch,getState) =>{
    const newSubCategory = getState().newSubCategory;
    if(checkSubCategoryInfo(newSubCategory,dispatch,true)){
        const selectedCategory = getState().selectedCategory;
        post(urls.subcategories,{
            categoryId:selectedCategory,
            ...getState().newSubCategory
        },dispatch,()=>{
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
    dispatch(loadProperties(subCategoryId));
    if(subCategoryId >= 1){
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

//
export const changeSelectedOrderFactor = (orderFactorId)=>({
    type:C.CHANGE_SELECTED_ORDER_FACTOR,
    payload:orderFactorId
 });

export const changeSelectedProduct = (productCode)=>(dispatch,getState)=>{
    dispatch({
        type:C.CHANGE_SELECTED_PRODUCT,
        payload:productCode
    });
    const info ={
        code:productCode,
        ...getState().products.find((item)=> item.code === productCode)
    }
    console.log('newProduct Info',info);
    dispatch({
        type:C.CHANGE_NEW_PRODUCT,
        payload:info
    });
    getState().productProperty.forEach(item=>{
        if(item.productCode == productCode){
            console.log('add new Product property for selected product');
            dispatch(addNewProductProperty({
                productCode:productCode,
                propertyId:item.propertyId,
                value:item.value
            }));      
        }
    });
};
export const loadProducts = (page)=>(dispatch)=>{
    get(urls.products,dispatch);
}
export const addProduct = () =>(dispatch,getState) =>{
    const newProduct = getState().newProduct;
    if(checkProductInfo(newProduct,dispatch,true)){
        if(newProduct.code){//edit 
        }
        else{//add New
            const productCode = getState().products[getState().products.length-1].code;
            const date = new Date();
            const parameters ={
                code:productCode,
                newProduct,
                /*factor:getState().factors.find(item=>item.id == newProduct.factorId),
                name:newProduct.name,
                category:getState().categories.find(item=>item.id == newProduct.categoryId),
                subCategory:getState().subCategories.find(item=>item.id == newProduct.subCategoryId),
                count:newProduct.count,
                sellPrice: newProduct.sellPrice,
                buyPrice: newProduct.buyPrice,*/
                created_at:date.getDate()+'/'+date.getMonth()+1+'/'+date.getFullYear()
            };
            console.log('addProduct:parameters:',parameters);
            post(urls.products,parameters,dispatch,(err,data)=>{
                dispatch(loadProducts());
                sendMessage('products','محصول ایجاد شد',dispatch);
            });

            //add Product Properties
        }
    }
};

export const deleteProduct = (productCode)=>({
    type:C.REMOVE_PRODUCT,
    payload:productCode
});

export const cleanNewProduct = ()=>(dispatch,getState)=>{
    console.log('cleanNewProducr:start: newProduct: ',getState().newProduct);
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

    setTimeout(()=>console.log('cleanNewProducr:end: newProduct: ',getState().newProduct),3000);
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
        factorId,
        categoryId,
        subCategoryId,
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

    if(factorId){
        if(factorId < 0){
            err('factorId','فاکتور باید انتخاب شود');    
        }
        else{
            cleanErr('factorId');
        }
    }
    else if(final){
        err('factorId','فاکتور باید انتخاب شود');    
    }

    if(categoryId){
        if(categoryId < 0){            
            err('categoryId','دسته باید انتخاب شود');    
        }
        else{
            cleanErr('categoryId');
        }
    }
    else if(final){
        err('categoryId','دسته باید انتخاب شود');    
    }

    if(subCategoryId){
        if(subCategoryId < 0){
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



export const loadProperties = (subCategoryId)=>(dispatch)=>{
    dispatch({
        type:C.SEND_REQUEST_PROPERTY
    });
    const url = urls.properties;
    
    const parameters = "?subCategoryId="+subCategoryId;

    console.log('loadProperties:url:',url,parameters);
    get(url,dispatch,()=>{
        dispatch({
            type:C.RECEIVE_RESPONE_PROPERTY
        })
    },parameters);
}

export const addProperty = () =>(dispatch,getState) =>{
    const selectedSubCategory = getState().selectedSubCategory;
    const newProperty={
        ...getState().newProperty,
        subCategoryId:selectedSubCategory
    }
    if(checkPropertyInfo(newProperty,dispatch,true)){
        post(urls.properties,newProperty,dispatch,()=>{
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

export const changeSearch = (searchInfo)=>({
    type:C.CHANGE_SEARCH,
    payload:searchInfo
})
