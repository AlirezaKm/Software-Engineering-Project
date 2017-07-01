import {Link} from 'react-router-dom';

const LoginForm = () =>(
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
                    <a href="#"> رمز عبور خود را فراموش کرده اید؟ </a> 
                </Segment>
                <div>
                <Popup 
                    trigger={<Checkbox style={{width:'4%',verticalAlign:'middle'}}/>}
                    inverted                    
                    content="مرا به خاطر بسپار"
                    position="right center"/>
                <Link to="Panel">
                    <Button content="ورود" color="yellow"  style={{width:'92%'}}> </Button> 
                 </Link>
                </div>
        </Form>
);