import React from 'react'
import {Content,Spinner,Button,Icon,View} from 'native-base'
import Text from './Text'
import {colors} from '../styles'

const SimpleLoad=({wait,children})=>(
    <View style={{alignItems:'center'}}>
        {wait?<Spinner size="large" color={colors.accent}/>:children}
    </View>
    );

export default SimpleLoad