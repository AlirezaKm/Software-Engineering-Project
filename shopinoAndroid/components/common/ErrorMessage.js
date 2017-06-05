import React from 'react'
import {View} from 'react-native'
import {Icon} from 'native-base'
import Text from './Text'
import {colors} from '../styles'

const ErrorMessage = ({message})=>    
    <View style={{flexDirection:'row',justifyContent:'center'}}>
        <Icon name="md-alert" style={{paddingTop:4,color:colors.negative,fontSize:22}}/>
        <Text error center padded small> {message} </Text>
    </View>

export default ErrorMessage