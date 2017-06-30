import React,{Component} from 'react'
import {View} from 'react-native'

class Row extends Component{
    render(){
        const {children,style,spaceAround} =  this.props;
        const extraStyle={};
        extraStyle.flexDirection='row'; 
        if(spaceAround)[
            extraStyle.justifyContent='space-around'
        ]   

        return(
            <View style={Object.assign({},extraStyle,
                        style)}>
                {children}
            </View>
        );
    }

    
}

export default Row