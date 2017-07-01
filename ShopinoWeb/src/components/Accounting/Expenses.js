import React,{Component} from 'react'
import {Container,Content,View,Butto,Icon} from 'native-base'
import {Text,CardRow,Load} from '../common'
import {colors} from '../styles'
import {connect} from 'react-redux'
import {loadExpenses} from '../../actions/Accounting'
class Expenses extends Component {
    componentWillMount(){
        this.props.load();
    }
    render(){
        const {wait,error,expenses} = this.props;

        const expensesView = 
            expenses.map(({id,title,price,created_at})=>
            <CardRow
                key={id}
                title={title}
                icon="pricetag" 
                ItemOne={id+"#"}
                badgeTop={price + 'تومان'} 
                badgeBottom={created_at}/>
        );

        return (
            <Load wait={wait} error={wait?null:error} onError={()=>this.props.load()}>
                {expensesView}
            </Load>
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