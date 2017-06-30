var propertySchema=
{
    name:'Property',
    properties:{
        id:{type:'int',primaryKey:true},
        SubCategory:{type:'SubCategory'},
        name:{type:'string'},
    }
}
export default propertySchema