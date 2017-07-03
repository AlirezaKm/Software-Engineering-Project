import React,{Component} from 'react'
import {Container,Content} from 'native-base'
import {Field,Text,Load} from '../common'
import {loadLogs} from '../../actions'
import {connect} from 'react-redux'

class Logs extends Component{
    componentDidMount(){
        this.props.load();
    }
    render(){
        const {wait,logs,error} = this.props;

        const logViews = logs.map(log=>
            <Field icon="clipboard" key={log.id}>
                <Text> {log.title} </Text>
            </Field>);
        return (
            <Container>
                <Load wait={wait} error={wait?null:error} onError={()=>this.props.load()}>
                    {logViews}
                </Load>
            </Container>
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