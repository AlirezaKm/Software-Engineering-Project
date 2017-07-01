import React,{Component} from 'react'
import GridColumn from '../common/GridColumn'
import ErrorMessage from '../common/ErrorMessage'
import {Grid,Segment} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {loadExpenses} from '../../actions/Accounting'
class Expenses extends Component {
    componentWillMount(){
        this.props.load();
    }
    render(){
        const {wait,error,expenses,pathname} = this.props;

        const expensesView = 
            expenses.map(({id,title,price,created_at})=>
            <GridColumn
                to={pathname}
                key={id}
                title={title}
                icon="pricetag" 
                ItemOne={id+"#"}
                badgeTop={price + 'تومان'} 
                badgeBottom={created_at}/>
        );

        return (
            <Segment loading={wait}>
                {error&&<ErrorMessage error={error} onError={()=>this.props.load()}/>}
                <Grid>
                    {expensesView}
                </Grid>
            </Segment>
        )
    }
}

const mapStateToProps = (state,ownProps)=>({
    wait:state.waitForResponse,
    error:state.error.expenses,
    expenses:state.expenses
});
const mapDispatchToProps = (dispatch)=>({
    load:()=>{
        dispatch(loadExpenses());
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Expenses)