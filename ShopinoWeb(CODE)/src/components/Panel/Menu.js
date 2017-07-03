import React,{Component} from 'react'
import {Menu,Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {colors} from '../styles'

class MyMenu extends Component{
    render(){
        const {onSideBar,onLogout,logoutWait} = this.props;
        return(
            <Menu attached="top" color="purple" inverted>
                <Menu.Item onClick={onSideBar}>
                    <Icon name="content"/>
                </Menu.Item>
                <Menu.Menu position="left">
                    <Menu.Item onClick={onLogout}>
                        <Icon size="big" name="log out" style={{color:'white'}} loading={logoutWait}/>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}
export default MyMenu;