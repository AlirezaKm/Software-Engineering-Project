var productSchema=
{
    name:'Product',
    properties:{
        code:{type:'string',primaryKey:true},
        category:{type:'Category'},
        subCategory:{type:'SubCategory'},
        count:'int',
        sellPrice:'float',
        buyPrice:'float',
        properties:{type:'list',objectType:'ProductProperty'},
        created_at:{type:'date',default:Date.now()}
    }
}

export default productSchema