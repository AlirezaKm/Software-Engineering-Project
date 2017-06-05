import React,{Component} from 'react'
import {Image} from 'react-native'
import {Container,Spinner} from 'native-base'
import {Text,H3} from './common'
import logo from '../assets/images/logo.png'
import {landingStyles} from './styles'

const styles = landingStyles;

const Landing = ({children}) =>    
    <Container style={styles.container}>
        <Image source={logo} style={styles.logo}/>
        <Text style={styles.text}>سیستم مدیریت فروشگاه</Text>
        <H3 style={styles.appName}>پویان</H3>
        {children}        
    </Container>


export default Landing