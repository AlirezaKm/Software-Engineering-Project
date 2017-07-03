import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Route,Link} from 'react-router-dom'
import GridColumn from '../common/GridColumn'
import ErrorMessage from '../common/ErrorMessage'
import {Segment,Grid,Button,Icon} from 'semantic-ui-react'
import {loadUsers} from '../../actions/Users'
import CreateUser from './CreateUser'

class Users extends Component{
    constructor(props){
        super(props);                
    }
    componentWillMount(){
        this.props.load();
    }
    render(){
        const {users,wait,error,match} = this.props;
        
        const usersViews = users.map(user =>{
            let type = "مدیر";
            switch(user.type){
                case 2 || "2":
                    type = "انباردار";
                    break;
                case 3 || "3":
                    type = "حسابدار";
                    break;
                case  4 || "4":
                    type = "فروشنده";
                    break;
            }
            return (
                <Segment basic>
                    <GridColumn
                        to={this.props.location.pathname}
                        key={user.id}
                        title={user.email}
                        icon="man"
                        ItemOne={user.fname}
                        ItemTwo={user.lname}
                        badgeTop={type}
                        badgeBottom={user.created_at}
                    />
                </Segment>
        )});
        return (
            <div>
                <Segment> 
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <h3 style={{display:'inline'}}> کارمندان </h3>
                        {this.props.location.pathname == '/Panel/users'&&
                        <Link to="/Panel/users/create">
                            <Button color="yellow"> 
                                کاربر جدید
                            </Button>
                        </Link>
                        }   
                    </div>
                </Segment>
                <Route exact path={match.url} render={()=>
                    <Segment loading={wait}>   
                            {error&&<ErrorMessage error={error} onError={()=>this.props.load()}/>}
                            {usersViews}
                    </Segment>}
                    /> 
                <Route path={`${match.url}/create`} component={CreateUser}/>
            </div>
        )
    }
}

const mapStateToProps = (state)=>({
    error:state.error.users,
    users:state.users,
    wait:state.waitForResponse
});

const mapDispatchToProps = (dispatch)=>({
    load:()=>{
        dispatch(loadUsers());
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Users);