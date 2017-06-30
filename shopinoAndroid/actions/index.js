import C from './constants'
import { NavigationActions } from 'react-navigation'
const navigateAction = NavigationActions.navigate({
  routeName: 'Profile'
});


export const setNavigate = (navigate) =>({
    type:C.SET_NAVIGATE,
    payload:navigate
})

const sendRequest = (dispatch)=> 
    dispatch({
        type:C.SEND_AUTH_REQUEST
    });

export const login = (username,password)=> (dispatch,getState)=> {
    sendRequest(dispatch);
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
        getState().navigate('HomePage');
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

export const cleanError = (field)=>{
    let error={};
    error[field] = null;
    return {
        type:C.CHANGE_ERROR,
        payload:error
    }
};

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

export const addCategory = ()=>(dispatch,getState) =>{
    if(checkCategoryInfo(getState().newCategory,dispatch,true)){
        dispatch({
            type:C.ADD_CATEGORY,
            payload:getState().newCategory
        })
        dispatch(createMessage('category','دسته ایجاد شد'));
        dispatch({
            type:C.CHANGE_NEW_CATEGORY,
            payload:{
                id:getState().categories[getState().categories.length-1].id
            }
        })
    }
};

export const editCategory = (id,name)=>({
    type:C.EDIT_CATEGORY,
    payload:{
        id:id,
        name:name
    }
});

export const addSubCategory = ()=>(dispatch,getState) =>{
    if(checkSubCategoryInfo(getState().newSubCategory,dispatch,true)){
        const selectedCategory = getState().selectedCategory;
        dispatch({
            type:C.ADD_SUB_CATEGORY,
            payload:{
                categoryId:selectedCategory,
                ...getState().newSubCategory
            }
        })
        dispatch(createMessage('subCategory','زیر دسته ایجاد شد'));
        dispatch({
            type:C.CHANGE_NEW_SUB_CATEGORY,
            payload:{
                id:getState().subCategories[getState().subCategories.length-1].id,
                categoryId:selectedCategory
            }
        })
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

export const changeSelectedCategory = (categoryId)=>({
    type:C.CHANGE_SELECTED_CATEGORY,
    payload:categoryId
});

export const changeSelectedSubCategory = (subCategoryId)=>({
    type:C.CHANGE_SELECTED_SUB_CATEGORY,
    payload:subCategoryId
});

export const changeSelectedOrderFactor = (orderFactorId)=>({
    type:C.CHANGE_SELECTED_ORDER_FACTOR,
    payload:orderFactorId
 });

export const changeSelectedFactor = (factorId)=>({
    type:C.CHANGE_SELECTED_FACTOR,
    payload:factorId
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


export const addProduct = () =>(dispatch,getState) =>{
    console.log('add Product');
    const newProduct = getState().newProduct;
    if(checkProductInfo(newProduct,dispatch,true)){
        
        console.log('add Product: passed');

        if(newProduct.code){
            console.log('edit Product: on');
            dispatch({
                type:C.EDIT_PRODUCT,
                payload:newProduct
            });

            dispatch({
                type:C.EDIT_PRODUCT_PROPERTY,
                payload:getState().newProductProperty
            });            
        }
        else{
            dispatch({
                type:C.ADD_PRODUCT,
                payload:newProduct
            });

            const productCode = getState().products[getState().products.length-1].code;

            dispatch({
                type:C.CHANGE_NEW_PRODUCT,
                payload:{
                    code:productCode
                }
            });

            dispatch({
                type:C.ADD_PRODUCT_PROPERTY,
                payload:getState().newProductProperty.map(item=>{
                    if(item.value){
                        return{
                        productCode:productCode,
                        ...item
                        }
                    }
                })
            });
        }
        console.log('add Product: dispatch');
        dispatch(createMessage('product','محصول ایجاد شد'));
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

export const addFactor = () =>(dispatch,getState) =>{
    if(checkFactorInfo(getState().newFactor,dispatch,true)){
        dispatch({
            type:C.ADD_FACTOR,
            payload:getState().newFactor
        })
        dispatch(createMessage('factor','فاکتور ایجاد شد'));
        dispatch({
            type:C.CHANGE_NEW_FACTOR,
            payload:{
                id:getState().factors[getState().factors.length-1].id
            }
        })
    }
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

export const addProperty = () =>(dispatch,getState) =>{
    console.log('addProperty:start');
    console.log('selected Sub Category: ',getState().selectedSubCategory);
    console.log(getState().properties.length);
    if(checkPropertyInfo(getState().newProperty,dispatch)){
        console.log('addProperty:passed');
        const newProp = {
            subCategoryId:getState().selectedSubCategory,
            ...getState().newProperty
        }
        dispatch({
            type:C.ADD_PROPERTY,
            payload:newProp
        })
        console.log('addProperty:added:');
        console.log(newProp.name);
        console.log(newProp.subCategoryId);

        dispatch(createMessage('property','ویژگی ایجاد شد'));
        dispatch({
            type:C.CHANGE_NEW_PROPERTY,
            payload:{
                id:getState().properties[getState().properties.length-1].id
            }
        })
    }
};

export const changeNewProperty = (propertyInfo)=>({
    type:C.CHANGE_NEW_PROPERTY,
    payload:{
        ...propertyInfo
    }
})

const checkPropertyInfo = (info,dispatch)=>{
    let success = true;
    const {
        name
    } = info;
    //console.log('propertyName: ',name);
    if(name){
        if(name.replace(" ","").length == 0){
            success = false;
            dispatch(createError('propertyName','نام ویژگی نمی تواند خالی باشد'));    
        }
        else{
            dispatch(cleanError('propertyName'));
        }
    }
    else{
        success = false;
        dispatch(createError('propertyName','نام ویژگی نمی تواند خالی باشد'));  
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
