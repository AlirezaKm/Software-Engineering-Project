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
