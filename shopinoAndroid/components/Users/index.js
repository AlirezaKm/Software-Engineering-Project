import React,{Component} from 'react'
import {Container,Content,Fab,Icon} from 'native-base'
import {connect} from 'react-redux'
import {Text,CardRow} from '../common'
import {colors} from '../styles'
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
    }
    componentDidMount(){
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
    render(){
        const {users} = this.props;
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
                    badgeBottom={user.create_date_time}
            />)
        })
        return (
            <Container>
                <Content>
                    {usersViews}
                </Content>
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
    users:state.users
});

export default connect(mapStateToProps)(Users);