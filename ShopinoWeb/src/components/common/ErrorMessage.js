import React from 'react'
import {Message,Button,Icon} from 'semantic-ui-react'

const ErrorMessage = ({error,onError})=>    
    <Message negative>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
         <div style={{flex:1}}>{error}</div>
        <Button color="yellow" onClick={()=>onError()} > 
            <Icon name="repeat"/>
            <span>  بارگذاری مجدد </span>
        </Button>
        </div>
    </Message>

export default ErrorMessage