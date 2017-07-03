import React,{Component} from 'react'
import {TouchableNativeFeedback,View} from 'react-native'
import {colors} from '../styles'
class CardItem extends Component{
    render(){
        const {
            children,
            parentStyle,
            style,
            onPress,
            onLongPress
        } =  this.props;
        return(
            <View style={Object.assign({},{
                margin:8,
                backgroundColor:'white',
                padding:8,
                elevation:2,
                borderRadius:16},parentStyle)}>
                <TouchableNativeFeedback
                style={{
                    borderRadius:16
                }}
                onPress={onPress}
                onLongPress={onLongPress}>

                    <View style={style}>
                    {children}
                    </View>

                </TouchableNativeFeedback>
            </View>
        )
    }
}

export default CardItem