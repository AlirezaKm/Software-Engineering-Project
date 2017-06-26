import React from 'react'
import {Text} from 'native-base'
import {textStyle,colors} from '../styles'

const MyText = ({children,style,active,white,secondary,small,big,error,center,padded,success,background}) =>{
    const extraStyle={};
    if(active){
        extraStyle.opacity=0.84;
    }
    else if(secondary){
        extraStyle.opacity=0.64;
    }
    if(white){
        extraStyle.color="white"
    }
    if(small){
        extraStyle.fontSize=14;
    }
    if(big){
        extraStyle.fontSize=18;
    }
    if(error){
        extraStyle.color=colors.negative;
    }
    if(success && background){
        extraStyle.color= "white";
        extraStyle.backgroundColor = colors.positive;
        extraStyle.padding=8;
        extraStyle.textAlign="center";
    }
    if(center){
        extraStyle.alignSelf="center";
    }
    if(padded){
        extraStyle.padding=4;
    }
    
    return(
        <Text style={Object.assign({},textStyle,style,extraStyle)}>
            {children}
        </Text>
    );
}

export default MyText