import React from 'react'
import {StackNavigator} from 'react-navigation'
import Login from './Login'
import HomePage from './HomePage'
import ProductList from './Products/ProductList'
import ProductCreate from './Products/ProductCreate'
import Accounting from './Accounting' 
import OrderFactorDetail from './Accounting/OrderFactorDetail'
import FactorDetail from './Accounting/FactorDetail'
import Selling from './Selling'
import Users from './Users'
import CreateUser from './Users/CreateUser'
import {colors} from './styles'


const App = StackNavigator({
    Login:{screen:Login,
        navigationOptions:{
            header:null
        }
    },
    HomePage:{screen:HomePage,
        navigationOptions:{
            title:'منو اصلی',
        }
    },
    ProductList:{screen:ProductList},
    ProductCreate:{screen:ProductCreate},
    Accounting:{screen:Accounting},
    OrderFactorDetail:{screen:OrderFactorDetail},
    FactorDetail:{screen:FactorDetail},
    Selling:{screen:Selling},
    Users:{screen:Users},
    CreateUser:{screen:CreateUser}
},{
    initialRouteName:'HomePage',
    initialRouteParams:{
        title:'فاکتورهای فروش',
        ExpenseModalVisible:false
    },
    navigationOptions:{
        headerStyle:{
                backgroundColor:colors.primary
        },
        headerTintColor:'white'
    }
});


export default App;