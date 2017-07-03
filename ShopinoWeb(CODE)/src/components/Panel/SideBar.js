import React,{Component} from 'react'
import {Sidebar,Segment,Menu,Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {colors} from '../styles'

class MySidebar extends Component{
    render(){
        const {children,visible,onSideBar} = this.props;
        return(
            <Sidebar.Pushable as={Segment}>
            <Sidebar
                as={Menu}
                animation='push'
                width='thin'
                direction='right'
                visible={visible}
                icon='labeled'
                vertical
                inverted
            >
                <Link to="/Panel/">
                <Menu.Item name='home' onClick={onSideBar}>
                    <Icon name='home' />
                    خانه
                </Menu.Item>
                </Link>
                <Link to="/Panel/products">
                <Menu.Item name='products' onClick={onSideBar}>
                    <Icon name='tags' />
                    انبارداری
                </Menu.Item>
                </Link>
                <Link to="/Panel/accounting">
                <Menu.Item name='accounting' onClick={onSideBar}>
                    <Icon name='signal' />
                    حسابداری
                </Menu.Item>
                </Link>
                <Link to="/Panel/selling">
                    <Menu.Item name='selling' onClick={onSideBar}>
                        <Icon name='tv' />
                        فروش
                    </Menu.Item>
                </Link>
                <Link to="/Panel/users">
                    <Menu.Item name='users' onClick={onSideBar}>
                        <Icon name='address book' />
                        کاربران
                    </Menu.Item>
                </Link>
                <Link to="/Panel/logs">
                    <Menu.Item name='logs' onClick={onSideBar}>
                        <Icon name='tasks' />
                        لاگ
                    </Menu.Item>
                </Link>
            </Sidebar>
            <Sidebar.Pusher>
                {children}
            </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }
}
export default MySidebar;