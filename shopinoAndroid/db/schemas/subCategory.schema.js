var subCategorySchema=
{
    name:'SubCategory',
    properties:{
        id:{type:'int',primaryKey:true},
        category:{type:'Category'},
        name:{type:'string',primaryKey:true}
    }
}
export default subCategorySchema