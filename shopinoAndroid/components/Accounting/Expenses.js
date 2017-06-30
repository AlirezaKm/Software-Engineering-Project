import React,{Component} from 'react'
import {Container,Content,View,Butto,Icon} from 'native-base'
import {Text,CardRow} from '../common'
import {colors} from '../styles'
import {connect} from 'react-redux'

class Expenses extends Component {
    render(){
        const {expenses} = this.props;

        const expensesView = expenses.map(({id,title,price,create_date_time})=><CardRow
            key={id}
            title={title}
            icon="pricetag" 
            ItemOne={id+"#"}
            badgeTop={price + 'تومان'} 
            badgeBottom={create_date_time}
        />);

        return (
            <View>
                    {expensesView}
            </View>
        )
    }
}

const mapStateToProps = (state,ownProps)=>({
    expenses:state.expenses
});

export default connect(mapStateToProps)(Expenses)