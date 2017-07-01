import React from 'react'
import {Text} from 'native-base'
import {appNameStyle} from '../styles'
const MyH3 = ({children,style}) =>
        <Text style={Object.assign({},appNameStyle,style)}>
            {children}
        </Text>

export default MyH3