var factorSchema=
{
    name:'Factor',
    properties:{
        code:{type:'string',primaryKey:true},
        seller:'string',
        date:{ type:'date'},
        created_at:{type:'date',default:Date.now()},
        products:{type:'list',objectType:'Product'}
    }
}
export default factorSchema