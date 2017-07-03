import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Segment} from 'semantic-ui-react'
import {Route,Link,Redirect} from 'react-router-dom'
import SideBar from './SideBar'
import Menu from './Menu'
import Products from '../Products/index'
import Accounting from '../Accounting/index'
import Selling from '../Selling/index'
import Logs from '../Logs/index'
import Users from '../Users/index'
import {logout} from '../../actions'

class Panel extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:true,
            redirect:null
        }
    }
    componentDidMount(){
        const {type} = this.props;
        let redirect;
        switch(type){
            case "stockman":
                redirect =<Redirect to={'Panel/products'}/>;
                break;
            case "accountant":
                redirect = <Redirect to={'/Panel/accounting'}/>                    
                break;
            case "seller":
                redirect = <Redirect to={'Panel/selling'}/>  
                break;
        }        
        if(type !="admin"){
            this.setState({
                redirect:redirect
            })
        }
    
    }
    changeSideBarVisibility(){
        this.setState({
            visible:!this.state.visible
        });
    }
    render(){
        const {wait,match,type,logout} = this.props;
        console.log('url:',match.url,'type: ',type);  
        const {visible} = this.state;
        const onSideBar = ()=>this.changeSideBarVisibility();
        const home=()=>
            <Menu onSideBar={onSideBar} onLogout={()=>{
                logout(()=>{
                    this.setState({
                        redirect:<Redirect to="/"/>
                    })
                })
            }} logoutWait={wait}/>

        let child;
        switch(type){
            case "admin":
                child=
                    <SideBar visible={visible} onSideBar={onSideBar}>
                        <Route path={match.url} component={home}/>
                        <Segment basic>
                            <Route path={`${match.url}/products`} component={Products}/>
                            <Route path={`${match.url}/accounting`} component={Accounting}/>
                            <Route path={`${match.url}/selling`} component={Selling}/>
                            <Route path={`${match.url}/users`} component={Users}/>            
                            <Route path={`${match.url}/logs`} component={Logs}/>    
                        </Segment>
                    </SideBar> 
                break;
            case "stockman":
                child =
                    <div>
                        <Route path={match.url} component={home}/>
                        <Segment basic>
                            <Route path={`${match.url}/products`} component={Products}/>
                        </Segment>
                    </div>
                break;
            case "accountant":
                child = 
                    <div>
                        <Route path={match.url} component={home}/>
                            <Segment basic>
                                <Route path={`${match.url}/accounting`} component={Accounting}/>
                            </Segment>                        
                    </div>
                break;
            case "seller":
                child = 
                    <div>
                        <Route path={match.url} component={home}/>
                            <Segment basic>
                            <Route path={`${match.url}/selling`} component={Selling}/>
                        </Segment>
                    </div>
                break;
        }
        return(
            <div style={{height:'100%'}}>
                {child}
                {this.state.redirect}
            </div>         
        )
    }
}

const mapStateToProps = (state)=>({
    wait:state.waitForResponse,
    type:state.userInfo.type
})
const mapDispatchToProps = (dispatch)=>({
    logout:(callback)=>{
        dispatch(logout(callback));
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Panel);