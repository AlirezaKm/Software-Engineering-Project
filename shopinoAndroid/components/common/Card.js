import React,{Component} from 'react'
import {View} from 'react-native'

class Card extends Component{
    render(){
        const {children,style,column} =  this.props;
        const extraStyle={};
        if(column){
            extraStyle.flexDirection='column';
        }
        else{
            extraStyle.flexDirection='row'
        }

        return(
            <View style={Object.assign({},extraStyle,
                        style)}>

                {children}
            </View>
        );
    }

    
}

export default Card