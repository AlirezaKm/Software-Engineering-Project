/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {Provider} from 'react-redux'
import {AppRegistry,I18nManager} from 'react-native';
import App from './components/App'
import store from './store'
import SQLite from 'react-native-sqlite-storage'
import shopinoDB from './db'

const mydb = new shopinoDB();
//mydb.addProduct();
const categories=mydb.getObjects('Category');
console.log(categories);
mydb.addCategory({name:'cloth'});
console.log(categories);
I18nManager.forceRTL(true);

const shopino = ()=>{  
    return (  
      <Provider store={store}>    
        <App/>      
      </Provider>
    );
}
export default shopino;

AppRegistry.registerComponent('shopino', () => shopino);
