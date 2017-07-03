import React,{Component} from 'react'
import {Image} from 'react-native'
import {Container,Spinner,Content,View} from 'native-base'
import {Text,H3} from './common'
import logo from '../assets/images/logo.png'
import {landingStyles} from './styles'

const styles = landingStyles;

const Landing = ({children,visible=true}) => {
    console.log('landing:visible:',visible);
    return (
        <Container style={styles.container}>
            {visible&&
            <View style={{flex:1}}>
                <Image source={logo} style={styles.logo}/>
                <Text style={styles.text}>سیستم مدیریت فروشگاه</Text>
                <H3 style={styles.appName}>شاپینو</H3>
            </View>
            }
        {children}        
        </Container>
    )
}   


export default Landing