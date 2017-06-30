import React,{Component} from 'react'
import {Text,Icon} from 'native-base'

export default class ProductFilter extends Component{
    static navigationOptions={
        tabBar:{
            label:'محصولات',
            icon:()=>(
                <Icon name="pricetags"/>
            )
        }
    }
    render(){
        return(
            <Text> Product Filter </Text>
        );
    }
}