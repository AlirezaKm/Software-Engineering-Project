import React from 'react'
import {Container,Content} from 'native-base'

const Tab = ({children})=>
    <Container style={{backgroundColor:'white'}}>
        <Content>
            {children}
        </Content>
    </Container>

export default Tab;