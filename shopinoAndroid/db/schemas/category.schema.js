class Category{
    getName(){
        return this.name;
    }
}

var categorySchema=
{
    name:'Category',
    properties:{
        id:{type:'int',primaryKey:true},
        name:{type:'string'}
    } 
}
Category.schema = categorySchema;

export default Category