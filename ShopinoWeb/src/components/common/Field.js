import React from 'react'
import {Icon,Label,Input,Item,Spinner} from 'native-base'
import Row from './Row'
import CardItem from './CardItem'
import ErrorMessage from './ErrorMessage'
import {colors} from '../styles'

const Field = ({children,style,icon,label,password,placeholder,error,value,onChange,labelEnd,load})=> {
    const iconView = <Icon name={icon} style={{color:colors.primary,marginHorizontal:4}}/>;
    const labelView = <Label style={{fontFamily:'iransans',fontSize:15}}>{label}</Label>;
    return (
        load?<Spinner size="small" color={colors.accent}/>:
        <CardItem style={style}>
                <Item error={error&&true}>
                {labelEnd &&iconView}

                {!labelEnd &&<Row>
                    {iconView}
                    {labelView}
                </Row>}

                {(placeholder || !children)&&<Input secureTextEntry={password&&true} style={{paddingTop:12}} onChange={onChange} value={value}
                    placeholder={placeholder}/>}
                
                {children}
                
                {labelEnd &&labelView}

                </Item>
            {error && <ErrorMessage message={error}/>}
        </CardItem>                     
    );
}

export default Field