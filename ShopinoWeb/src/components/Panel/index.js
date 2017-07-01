import React,{Component} from 'react'
import {Segment} from 'semantic-ui-react'
import {Route,Link} from 'react-router-dom'
import SideBar from './SideBar'
import Menu from './Menu'
import Products from '../Products/index'

const Accounting = ()=>
    <div> Accounting </div>

const Selling = ()=>
    <div> Selling </div>

const Users= ()=>
    <div> Users </div>

class Panel extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:true
        }
    }
    changeSideBarVisibility(){
        this.setState({
            visible:!this.state.visible
        });
    }
    render(){
        const {match} = this.props;
        console.log('url:',match.url);  
        const {visible} = this.state;

        const onSideBar = ()=>this.changeSideBarVisibility();
        const home=()=>
            <Menu onSideBar={onSideBar}/>

        return(
            <SideBar visible={visible} onSideBar={onSideBar}>
                <Route path={match.url} component={home}/>
                    <Segment basic>
                        <Route path={`${match.url}/products`} component={Products}/>
                        <Route path={`${match.url}/accounting`} component={Accounting}/>
                        <Route path={`${match.url}/selling`} component={Selling}/>
                        <Route path={`${match.url}/users`} component={Users}/>            
                    </Segment>
            </SideBar>            
        )
    }
}
export default Panel;