import React,{Component} from 'react'
import {List,Segment} from 'semantic-ui-react'
import {loadLogs} from '../../actions'
import {connect} from 'react-redux'

class Logs extends Component{
    componentDidMount(){
        this.props.load();
    }
    render(){
        const {wait,logs,error} = this.props;

        const logViews = logs.map(log=>
            <List.Item key={log.id}>
                <List.Icon name='file text outline' size='large' verticalAlign='middle' />
                <List.Content>
                    <List.Header>{log.title}</List.Header>
                    <List.Description>{log.created_at}</List.Description>
            </List.Content>
        </List.Item>);
        
        return (
            <div>
                <Segment> 
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <h3 style={{display:'inline'}}> لاگ </h3>
                    </div>
                </Segment>
                <Segment color="purple" loading={wait}>
                    <List divided relaxed>
                        {logViews}
                    </List>
                </Segment>
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps)=>({
    wait:state.waitForResponse,
    error:state.error.logs,
    logs:state.logs
});

const mapDispatchToProps =(dispatch)=>({
    load:()=>{
        dispatch(loadLogs());
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Logs);