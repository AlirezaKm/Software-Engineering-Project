import React,{Component} from 'react'
import {Container,Content,Fab,Icon,Picker,Item,Button} from 'native-base'
import {connect} from 'react-redux'
import {Text,Field,SimpleLoad} from '../common'
import {colors} from '../styles'
import {changeNewUser,addUser,cleanNewUser} from '../../actions/Users'
import {cleanAllError} from '../../actions'
class CreateUser extends Component{
    static navigationOptions={
        title:'اضافه کردن کاربر'
    }
    constructor(props){
        super(props);
        this.state={
            selectedType:'1'
        }
    }
    changeUserInfo(field,value){
        const {changeUser} = this.props;
        let info={};
        info[field] = value;
        changeUser(info);
    }
    changeSelectedType(selectedType){
        this.setState({
            selectedType:selectedType
        });
        this.changeUserInfo('type',selectedType);
    }
    componentDidMount(){
        this.changeSelectedType(this.state.selectedType);
    }
    componentWillUnmount(){
        this.props.clean();
    }
    render(){
        const {wait,createUser,error,message} = this.props;
        console.log('CreateUser.render:wait:',wait);
        if(message){
            setTimeout(()=>this.props.navigation.goBack(),2000);
        }
        return (
            <Container style={{backgroundColor:'white'}}>
                <Content>
                    {message&&<Text success background>{message}</Text>}
                    {error.users&&<Text error>{error.users}</Text>}
                    <Field
                        icon="person"
                        label="نام"
                        placeholder="مثلا محمد"
                        error={error.fname?error.fname:null}
                        onChange={({nativeEvent})=>this.changeUserInfo('fname',nativeEvent.text)}
                    />
                    <Field
                        icon="people"
                        label="نام خانوادگی"
                        placeholder="مثلا سپه وند"
                        error={error.lname?error.lname:null}
                        onChange={({nativeEvent})=>this.changeUserInfo('lname',nativeEvent.text)}
                    />
                    <Field
                        icon="mail"
                        label="ایمیل"
                        placeholder="مثلا example@example.com"
                        error={error.email?error.email:null}
                        onChange={({nativeEvent})=>this.changeUserInfo('email',nativeEvent.text)}
                    />
                    <Field
                        icon="key"
                        password
                        label="رمز عبور"  
                        error={error.password?error.password:null}   
                        onChange={({nativeEvent})=>this.changeUserInfo('password',nativeEvent.text)}                   
                    />
                    <Field
                        icon="key"
                        password
                        label="تکرار رمز عبور"
                        error={error.repassword?error.repassword:null}
                        onChange={({nativeEvent})=>this.changeUserInfo('repassword',nativeEvent.text)}                      
                    />
                    <Field 
                        icon="person-add"
                        label="نوع"
                        error={error.type?error.type:null}>

                        <Picker
                            style={{flex:1}}
                            mode="dialog"
                            selectedValue={this.state.selectedType}
                            onValueChange={(value)=>this.changeSelectedType(value)}>
                            <Item label="مدیر" value="1" key="1"/>
                            <Item label="انباردار" value="2" key="2"/>
                            <Item label="حسابدار" value="3" key="3"/>
                            <Item label="فروشنده" value="4" key="4"/>
                        </Picker>
                    </Field>
                </Content>
                <SimpleLoad wait={wait}>
                    <Button block style={{backgroundColor:colors.accent}} disabled={message&&true}
                        onPress={()=>createUser()}> 
                        <Text big> ثبت! </Text>
                    </Button>
                </SimpleLoad>
            </Container>
        )
    }
}

const mapStateToProps = (state)=>({
    wait:state.waitForResponse,
    error:state.error,
    message:state.message.users
});
const mapDispatchToProps = (dispatch)=>({
    changeUser:(info)=>{
        dispatch(changeNewUser(info));
    },
    createUser:()=>{
        dispatch(addUser());
    },
    clean:()=>{
        dispatch(cleanAllError());
        dispatch(cleanNewUser());
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(CreateUser);