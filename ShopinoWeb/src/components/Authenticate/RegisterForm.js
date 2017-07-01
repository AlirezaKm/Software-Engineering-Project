import React from 'react'
import {Grid,Icon, Menu,Popup, Checkbox, Segment, Form, Image, Button, Divider } from 'semantic-ui-react'

const inputStyle={
    margin:'8% 0 4%',
}
const Input =({icon,placeholder})=>{    
        return (
        <Form.Input 
            style={inputStyle}
            icon={icon}
            placeholder={placeholder}
         />
   );
}

const LoginForm = () => {

        const LoginFormStyle={            
            padding:'4% 8% 8%',
            background:'rgba(255,255,255,0.96)'
        }

        const menuItemStyle={
            width:'49%',
            textAlign:'center'
        }

        return (
        <Segment style={LoginFormStyle}>
            <Menu pointing secondary color="purple" size="massive">
                <Menu.Item style={menuItemStyle} active> ورود
                </Menu.Item>
                <Menu.Item style={menuItemStyle}>
                    ثبت نام
                </Menu.Item>
            </Menu>
            <Form>
                <Input icon="mail" placeholder="پست الکترونیک"/>
                <Input icon="lock" placeholder="رمز عبور"/>

                <Segment basic textAlign="center">
                    <a href="#"> رمز عبور خود را فراموش کرده اید؟ </a> 
                </Segment>
                <div style={inputStyle}>
                <Popup 
                    trigger={<Checkbox style={{width:'8%',verticalAlign:'middle'}}/>}
                    inverted                    
                    content="مرا به خاطر بسپار"
                    position="right center"/>
                <Button content="ورود" color="yellow"  style={{width:'90%'}}/> 
                </div>
                <Divider horizontal> یا </Divider>
               <Grid centered>
                   <Icon name="google plus square" size="huge" link color="red" style={{padding:'0',margin:'0'}}/>
                   <Icon name="github square" size="huge" link color="grey" style={{padding:'0',margin:'<0></0>'}}/>
               </Grid>
            </Form>
        </Segment>
        )
};

export default LoginForm 