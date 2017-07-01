import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Form,Button,Message,Input,Label,Dropdown,Grid} from 'semantic-ui-react'
import {changeNewUser,addUser,cleanNewUser} from '../../actions/Users'
import {cleanAllError} from '../../actions'
class CreateUser extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedType:'1',
            redirect:''
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
        const typeItems=[
            {
                text:'مدیر',
                value:1
            },
            {
                text:'انباردار',
                value:2
            },
            {
                text:'حسابدار',
                value:3
            },
            {
                text:'فروشنده',
                value:4
            }
        ]
        if(message){
           setTimeout(()=>{
                this.setState({
                    redirect:<Redirect to="/Panel/products"/>});
           },1000);
        }
        return (
            <div>
                <Grid centered>             
                <Grid.Column width="8">
                    <Form>
                        <Form.Field>
                            <Input
                                icon="user"
                                label="نام"
                                placeholder="مثلا محمد"
                                onChange={(error,data)=>this.changeUserInfo('fname',data.value)}
                        />
                        {error.fname&&<Label basic color='red' pointing>{error.fname}</Label>}
                        </Form.Field>
                        <Form.Field>
                            <Input
                            icon="users"
                            label="نام خانوادگی"
                            placeholder="مثلا سپه وند"
                            error={error.lname?error.lname:null}
                            onChange={(error,data)=>this.changeUserInfo('lname',data.value)}
                            />
                            {error.lname&&<Label basic color='red' pointing>{error.lname}</Label>}
                        </Form.Field>
                        <Form.Field>
                            <Input
                            icon="mail"
                            label="ایمیل"
                            placeholder="مثلا example@example.com"
                            onChange={(error,data)=>this.changeUserInfo('email',data.value)}
                            />
                            {error.email&&<Label basic color='red' pointing>{error.email}</Label>}
                        </Form.Field>
                        <Form.Field>
                            <Input
                            icon="user plus"
                            type="password"
                            label="رمز عبور"  
                            onChange={(error,data)=>this.changeUserInfo('password',data.value)}
                            />
                            {error.password&&<Label basic color='red' pointing>{error.password}</Label>}
                        </Form.Field>
                        <Form.Field>
                            <Input
                            icon="key"
                            type="password"
                            label="تکرار رمز عبور"
                            onChange={(error,data)=>this.changeUserInfo('repassword',data.value)}/>
                            {error.repassword&&<Label basic color='red' pointing>{error.repassword}</Label>}
                        </Form.Field>
                        <Form.Field>
                            <Dropdown
                                icon="person-add"
                                onChange={(event,data)=>this.changeSelectedType(data.value)}
                                placeholder='نوع را انتخاب کنید' selection options={typeItems} />
                            {error.type&&<Label basic color='red' pointing>{error.type}</Label>}
                        </Form.Field>
                        <Form.Field>
                            {message&&<Message color="green">{message}</Message>}
                            {error.users&&<Message negative>{error.users}</Message>}
                            <Button loading={wait} color="yellow" fluid onClick={()=>createUser()}> ثبت </Button> 
                        </Form.Field>
                    </Form>
                    </Grid.Column>            
                </Grid>
            </div>
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