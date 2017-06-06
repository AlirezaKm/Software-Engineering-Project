import categorySchema from './category.schema'
import subCategorySchema from './subCategory.schema'
import propertySchema from './property.schema'
import productShcema from './product.schema'
import productProperty from './productProperty.schema'
import orderFactorSchema from './orderFactor.schema'
import factorSchema from './factor.schema'
import orderSchema from './order.schema'
import statusSchema from './status.schema'
import typeSchema from './type.schema'
import userSchema from './user.schema'
import expenseSchema from './expense.schema'

const schemas = {
    categorySchema,
    subCategorySchema,
    propertySchema ,
    productShcema ,
    productProperty ,
    orderFactorSchema ,
    factorSchema ,
    orderSchema ,
    statusSchema ,
    typeSchema ,
    userSchema ,
    expenseSchema 
}
var schemasArray =[];
    //console.log('schemas: ');
    //convert schemas Objects to Array of schemas
for(schemaName in schemas){
      //console.log('    '+schemaName);
    schemasArray.push(schemas[schemaName]);
}
export default schemasArray;