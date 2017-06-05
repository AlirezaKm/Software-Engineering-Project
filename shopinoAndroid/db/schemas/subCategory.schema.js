var subCategorySchema=
{
    name:'SubCategory',
    properties:{
        category:{type:'Category'},
        name:{type:'string',primaryKey:true}
    }
}
export default subCategorySchema