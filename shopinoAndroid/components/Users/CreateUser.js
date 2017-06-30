import React,{Component} from 'react'
import {Container,Content,Fab,Icon,Picker,Item,Button} from 'native-base'
import {connect} from 'react-redux'
import {Text,Field} from '../common'
import {colors} from '../styles'
import {changeNewUser,addUser} from '../../actions/Users'
class CreateUser extends Component{
    static navigationOptions={
        title:'اضافه کردن کاربر'
    }
    changeUserInfo(field,value){
        const {changeUser} = this.props;
        let info={};
        info[field] = value;
        changeUser(info);
    }
    constructor(props){
        super(props);
        this.state={
            selectedType:1
        }
    }
    changeSelectedType(selectedType){
        this.setState({
            selectedType:selectedType
        });
        this.changeUserInfo('type',selectedType);
    }
    render(){
        const {createUser,error} = this.props;

        return (
            <Container style={{backgroundColor:'white'}}>
                <Content>
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
                <Button block style={{backgroundColor:colors.accent}} 
                    onPress={()=>createUser()}> 
                    <Text big> ثبت! </Text>
                </Button>
            </Container>
        )
    }
}

const mapStateToProps = (state)=>({
    error:state.error    
});
const mapDispatchToProps = (dispatch)=>({
    changeUser:(info)=>{
        dispatch(changeNewUser(info));
    },
    createUser:()=>{
        dispatch(addUser());
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(CreateUser);