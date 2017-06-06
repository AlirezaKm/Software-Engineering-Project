var orderFactorSchema=
{
    name:'OrderFactor',
    properties:{
        code:{type:'int',primaryKey:true},
        status:{type:'Status'},
        orders:{type:'list',objectType:'Order'},
        created_at:{type:'date',default:Date.now()}
    }
}

export default orderFactorSchema