import React from 'react'
import {Label} from 'native-base'
import Text from './Text'
import {textStyle} from '../styles'

const MyLabel = ({children,style}) =>
            <Label>
                <Text style={style} secondary>
                {children}
                </Text>
            </Label>

export default MyLabel