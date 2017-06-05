var expenseSchema=
{
    name:'Expense',
    properties:{
        code:{type:'string',primaryKey:true},
        title:'string',
        price:'float',
        created_at:{type:'date',default:Date.now()}
    }
}
//export default subCategorySchema
export default expenseSchema