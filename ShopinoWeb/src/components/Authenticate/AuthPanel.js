import React from 'react'
import {Grid,Modal,Icon, Menu,Popup, Checkbox, Segment, Form, Image, Button, Divider,Message } from 'semantic-ui-react'
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {login} from '../../actions'

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            username:'',
            password:''
        }
    }
    setUsername(username){
        this.setState({
            username:username
        })
    }
    setPassword(password){
        this.setState({
            password:password
        })
    }
    render(){
        const {showForgotPass,wait,error,message,doLogin} = this.props;
        console.log('username',this.state.username,'password:',this.state.password);
        console.log('wait',wait);
        console.log('wait',message);
        console.log('error',error);
        return(
            <Form className="AuthForm">
                 {message&&<Redirect to="/Panel"/>}
                <Form.Input
                    icon="mail"
                    placeholder="پست الکترونیک"
                    onChange={(event,data)=>this.setUsername(data.value)}
                />
                <Form.Input 
                    icon="lock"
                    type="password"
                    placeholder="رمز عبور"
                    onChange={(event,data)=>this.setPassword(data.value)}
                />
                <Segment basic textAlign="center">
                    <Button onClick={(event)=>{
                        event.preventDefault();
                        showForgotPass()
                    }}> رمز عبور خود را فراموش کرده اید؟ </Button> 
                </Segment>
                <div>
                    {error&&<Message negative style={{textAlign:'center'}}>{error}</Message>}
                <Popup 
                    trigger={<Checkbox style={{width:'4%',verticalAlign:'middle'}}/>}
                    inverted                    
                    content="مرا به خاطر بسپار"
                    position="right center"/> 
                    <Button 
                        loading={wait}
                        onClick={()=>doLogin(this.state.username,this.state.password)}
                        content="ورود" color="yellow" style={{width:'92%'}}/>            
                </div>
            </Form>
        );
    }
}


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
        const {error,message,doLogin,wait} = this.props;
        return (
            <Segment style={LoginFormStyle}>
                <AuthMenu/>
                <LoginForm showForgotPass={()=>this.changeFPVisible(true)} wait={wait} error={error} message={message} doLogin={doLogin}/>
                <ForgotPassModal visible={ForgotPassModalVisible} fade={()=>this.changeFPVisible(false)}/>
            </Segment>
        );
    }
};

const mapStateTopProps = (state)=>({
    wait:state.waitForResponse,
    error:state.error.login,
    message:state.message.login
});
const mapDispatchToProps = (dispatch)=>({
    doLogin:(username,password)=>{
        console.log('login:form',username,password);
        dispatch(login(username,password));
    }
});

export default connect(mapStateTopProps,mapDispatchToProps)(AuthForm)