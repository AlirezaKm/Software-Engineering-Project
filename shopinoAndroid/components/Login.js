import React,{Component} from 'react'
import {Form,Icon,View,Spinner,Item,Button,Input,Label} from 'native-base'
import {Text} from './common'
import Landing from './Landing'
import {connect} from 'react-redux'
import {login,setNavigate} from '../actions'
import {loginStyles,colors} from './styles'

const styles = loginStyles;

const constants={
    title:'مدیریت فروشگاه',
    username:'نام کاربری یا پست الکترونیک',
    password:'رمز عبور',
    button:'ورود',
    error:'اطلاعات وارد شده صحیح نیست'
}
class Login extends Component{

    static navigationOptions = {   
        title: constants.title        
    };

    constructor(props){
        super(props);        
        this.state ={
            loading:true,
            username:null,
            password:null
        }

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }
    onUsernameChange(text){
        this.setState({
            username:text
        })
    }
    onPasswordChange(text){
        this.setState({
            password:text
        })
    }
    componentWillMount(){
        this.props.setNavigate();

        setTimeout(()=>{
            this.setState({
                loading:false
            });
        },1000);
    }
    render(){
        const {navigate} = this.props.navigation;
        const {error,login,authorized,wait} = this.props;
        const {loading,username,password} = this.state;
        let body=null;
    

        if(loading){
            body=<Spinner size="large" color={colors.accent}/>; 
        }
        else{
            body=<Form style={styles.container}>
                <View style={styles.username}>
                    <Item >
                        <Input 
                            placeholder={constants.username}
                            placeholderTextColor="white"
                            style={{color:'white',fontFamily:'iransans',fontSize:14}}   
                            value={username}
                            onChange={(e)=>this.onUsernameChange(e.nativeEvent.text)}                                                     
                            />
                        <Icon name="person" style={styles.icon}  />                        
                    </Item>
                </View>
                <View style={styles.password}>
                    <Item>
                        <Input 
                            placeholder={constants.password}
                            placeholderTextColor="white"
                            secureTextEntry={true}
                            style={{color:'white',fontFamily:'iransans',fontSize:14,textAlign:'right'}}
                            value={password}
                            onChange={(e)=>this.onPasswordChange(e.nativeEvent.text)}
                            />
                        <Icon name="lock" style={styles.icon} />
                    </Item>
                </View>
            <View>
            </View>
                <Text style={styles.error}>{error.login?error.login:''}</Text>
                {wait?<Spinner color={colors.accent}/>:
                    <Button
                        block
                        rounded
                        style={styles.button}
                        onPress={()=>login(username,password)}>
                        <Text style={styles.buttonText}> {constants.button} </Text>
                    </Button>
                }
            </Form>
        }
        return(
            <Landing>
                {body}
            </Landing>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        wait:state.waitForResponse,
        error: state.error,
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (username,password) => {
            dispatch(login(username,password));
        },
        setNavigate(){
            dispatch(setNavigate(ownProps.navigation.navigate));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);