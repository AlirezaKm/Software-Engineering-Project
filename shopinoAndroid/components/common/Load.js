import React from 'react'
import {Content,Spinner,Button,Icon} from 'native-base'
import Text from './Text'
import {colors} from '../styles'

const Load=({wait,children,message,error,onError})=>(
    <Content>
        <Text center>{message?message:""}</Text>
        <Text error center>{error?error:""}</Text>
        {error&&
            <Button transparent style={{alignSelf:'center'}} onPress={onError}>
                <Text style={{color:colors.primary}}>سعی مجدد</Text>
                <Icon name="refresh" style={{fontSize:42,color:colors.accent}}/>
            </Button>
        }
        {wait?<Spinner size="large" color={colors.accent}/>:children}
    </Content>
    );

export default Load