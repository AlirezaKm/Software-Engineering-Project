import Realm from 'realm';
import schemas from './schemas';

class shopinoDB{
  constructor(){
    var schemasArray =[];
    console.log('schemas: ');
    //convert schemas Objects to Array of schemas
    for(schemaName in schemas){
      console.log('    '+schemaName);
      schemasArray.push(schemas[schemaName]);
    }
    //Initialize a Realm with schemas
    this._realm = new Realm({schema: schemasArray,schemaVersion:0.01});
  }
  static defaultPath(){
    return Realm.defaultPath;
  }
  getProducts(){
    return this._realm.objects('Products');
  }
}
export default shopinoDB