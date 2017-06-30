import React from 'react'
import {Grid,Modal,Icon, Menu,Popup, Checkbox, Segment, Form, Image, Button, Divider } from 'semantic-ui-react'
import {Link} from 'react-router-dom';

const LoginForm = ({showForgotPass}) =>(
    <Form className="AuthForm">
                <Form.Input
                    icon="mail"
                    placeholder="پست الکترونیک"
                />
                <Form.Input 
                    icon="lock"
                    placeholder="رمز عبور"
                />
                <Segment basic textAlign="center">
                    <Button onClick={(event)=>{
                        event.preventDefault();
                        showForgotPass()
                    }}> رمز عبور خود را فراموش کرده اید؟ </Button> 
                </Segment>
                <div>
                <Popup 
                    trigger={<Checkbox style={{width:'4%',verticalAlign:'middle'}}/>}
                    inverted                    
                    content="مرا به خاطر بسپار"
                    position="right center"/>
                <Link to="Panel">
                    <Button content="ورود" color="yellow"  style={{width:'92%'}}/>
                </Link>
                </div>
        </Form>
);


const ForgotPassModal = ({visible,fade}) => (
    <Modal size="small" open={visible} >
          <Modal.Header>
            بازیابی رمز عبور
          </Modal.Header>
          <Modal.Content>
            <Form>
                <Form.Input
                    icon="mail"
                    placeholder="پست الکترونیک خود را وارد کنید"
                    >
                </Form.Input>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={fade}>
              لغو
            </Button>
            <Button color="yellow" 
                icon='checkmark'
                labelPosition='right'
                content={<span>ارسال رمز عبور</span>} />
          </Modal.Actions>
    </Modal>
)

const AuthMenu= () => (
    <Menu pointing secondary color="purple" size="massive" widths="1">
        <Menu.Item active> 
                ورود
        </Menu.Item>
    </Menu>    
);

class AuthForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            ForgotPassModalVisible:false
        }
        this.changeFPVisible = this.changeFPVisible.bind(this);
    }
    changeFPVisible(visible){
        this.setState({
            ForgotPassModalVisible:visible
        })
    }
    render(){
        const LoginFormStyle={            
            padding:'4% 8% 8%',
            background:'rgba(255,255,255,0.95)'
        }
        const {ForgotPassModalVisible} = this.state;
        return (
            <Segment style={LoginFormStyle}>
                <AuthMenu />
                <LoginForm showForgotPass={()=>this.changeFPVisible(true)}/>
                <ForgotPassModal visible={ForgotPassModalVisible} fade={()=>this.changeFPVisible(false)}/>
            </Segment>
        );
    }
};

export default AuthForm 