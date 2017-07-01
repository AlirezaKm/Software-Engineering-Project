import Realm from 'realm';
import schemas from './schemas';

//after = Date.now();
//console.log('sort algorithm:time ',after - before,'before: ',before,' after',after,' value:',max);
//console.log('compute Max');
//before = Date.now();

class shopinoDB{
  static realm = new Realm({schema: schemas,schemaVersion:0.01});
  static defaultPath(){
    return Realm.defaultPath;
  }
  getObjects(ObjectName){
    return shopinoDB.realm.objects(ObjectName);
  }
  max(ObjectName,field){
    const sorted = this.getObjects(ObjectName).sorted(field);
    return sorted.length > 0 ?
        sorted[sorted.length-1][field] : 0;
  }
  add(table,info){
    shopinoDB.realm.write(()=>{
      return shopinoDB.realm.create(table,info);
    })
  }
  addObject(ObjectName,primaryKey,info){
    const max = this.max(ObjectName,primaryKey);

    let args = {};
    args[primaryKey] = max + 1;

    return this.add('Category',Object.assign(args,info));
  }
  addCategory(info){
    return this.addObject('Category','id',info);
  }
  addProduct(){
    const maxCode = this.max(this.getProducts(),'code');
    const category =  {id:1,name:'cloth'};
    /*this.add('Product',{
        code:1,
        category:category,
        subCategory:{id:1,category:category,name:'pants'},
        count:1,
        sellPrice:2000,
        buyPrice:2000,
        properties:[],
    })*/
    
    console.log('max Sorted',sorted[sorted.length-1]);
  }
}
export default shopinoDB