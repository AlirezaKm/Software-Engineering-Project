var expenseSchema=
{
    name:'Expense',
    properties:{
        id:{type:'int',primaryKey:true},
        title:'string',
        price:'float',
        created_at:{type:'date',default:Date.now()}
    }
}
//export default subCategorySchema
export default expenseSchema