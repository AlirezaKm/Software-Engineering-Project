import React,{Component} from 'react'
import {Container,Content,Fab,Icon,Spinner} from 'native-base'
import {connect} from 'react-redux'
import {Text,CardRow,Load} from '../common'
import {colors} from '../styles'
import {loadUsers} from '../../actions/Users'
//import SQLite from 'react-native-sqlite-storage'

class Users extends Component{
    static navigationOptions={
        title:'کارمندان'
    }
    constructor(props){
        super(props);        
        /*this.state={
            message:''
        }*/
        console.log('Users.constructor');
    }
    load(){
        const {loadUsersInfo} = this.props;
        loadUsersInfo();
    }
    componentWillMount(){
        this.load();
        console.log('Users.componentWillMount');
    }
    componentDidMount(){
        console.log('Users.componentDidMount');
        
        /*let db =SQLite.openDatabase({name: 'my.db', location: 'Documents'}, 
        ()=>{
            this.setState({
                message:'sqlite db has connected'
            });
        },(error)=>{
            this.setState({
                message:'sqlite db has failed to connect'
            });
        });*/
    }
    componentWillUnmount(){
        console.log('Users.componentWillUnmount');
    }
    render(){
        console.log('Users.render');
        const {users,wait,error} = this.props;
        const {navigate} = this.props.navigation;
        
        const usersViews = users.map(user =>{
            let type = "مدیر";
            switch(user.type){
                case 2:
                    type = "فروشنده";
                    break;
                case 3:
                    type = "حسابدار";
                    break;
                case 4:
                    type = "فروشنده";
                    break;
            }

            return (
                <CardRow
                    key={user.id}
                    title={user.email}
                    icon="man"
                    ItemOne={user.fname}
                    ItemTwo={user.lname}
                    badgeTop={type}
                    badgeBottom={user.created_at}
            />)
        })
        return (
            <Container>
                <Load wait={wait} error={wait?null:error} onError={()=>this.load()}>                
                    {usersViews}                
                </Load>
                <Fab 
                    style={{backgroundColor:colors.accent}}
                    position="bottomLeft"
                    onPress={()=>navigate('CreateUser')}>
                    <Icon name="add"/>
                </Fab>
            </Container>
        )
    }
}

const mapStateToProps = (state)=>({
    error:state.error.users,
    users:state.users,
    wait:state.waitForResponse
});
const mapDispatchToProps = (dispatch)=>({
    loadUsersInfo:()=>{
        dispatch(loadUsers());
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Users);