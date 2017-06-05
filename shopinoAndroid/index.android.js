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
import db from './db'

console.log('Realm Path: ',db.defaultPath());

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
