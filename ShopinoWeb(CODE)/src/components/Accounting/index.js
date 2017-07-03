import React,{Component} from 'react'
import {Segment,Button,Input,Menu} from 'semantic-ui-react'
import {Route,Link} from 'react-router-dom'
import {connect} from 'react-redux'
import OrderFactors  from './OrderFactors'
import OrderFactorDetail from './OrderFactorDetail'
import Factors from './Factors'
import FactorDetail from './FactorDetail'
import Expenses from './Expenses'
//import Chart from './Chart'
import ExpenseModal from './ExpenseModal'

const pages={
    OrderFactors:'OrderFactors',
    Factors:'Factors',
    Expenses:'Expenses',
    Chart:'Chart'
}

const Chart = ()=>
    <div> Chart </div>

class Accounting extends Component {
    constructor(props){
        super(props);
        this.state={
            page:pages.OrderFactors,
            ExpenseModalVisible:false
        }
        
    }
    changePage(page){
        this.setState({
            page:page
        });   
    }
    showExpenseModal(visible){
        this.setState({ExpenseModalVisible:visible});
    }
    render(){
        const {match} = this.props;
        let renderView = null;
        const {ExpenseModalVisible,page} = this.state;
        console.log('page:',page);
        switch(this.state.page){
            case pages.Factors:
                renderView = <Factors/>;
                break;
            case pages.Expenses:                
                renderView = <Expenses pathname={this.props.location.pathname}/>
                break;
            case pages.Chart:                
                renderView = <Chart/>
                break;
            default:                
                renderView = <OrderFactors/>;
        }

        return(
            <div>
                <ExpenseModal visible={ExpenseModalVisible} setVisible={(visible)=>this.showExpenseModal(visible)}/>
                <Segment> 
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <h3 style={{display:'inline'}}> حسابداری </h3>
                        {this.state.page == pages.Expenses&&                        
                            <Button
                                onClick={()=>this.showExpenseModal(true)} color="yellow"> 
                            خرج جدید </Button>
                        }
                    </div>
                </Segment>
                <Route exact path={match.url} render={()=>
                    <div>
                        <Menu tabular>
                            <Menu.Item name={'فاکتورهای فروش'} active={ page ==pages.OrderFactors } 
                                onClick={()=>this.changePage(pages.OrderFactors)} />
                            <Menu.Item name={'فاکتورهای خرید'} active={ page ==pages.Factors } 
                                onClick={()=>this.changePage(pages.Factors)} />
                            <Menu.Item name={'خرج ها'} active={ page ==pages.Expenses } 
                                onClick={()=>this.changePage(pages.Expenses)} />
                            <Menu.Item name={'نمودار'} active={ page ==pages.Chart } 
                                onClick={()=>this.changePage(pages.Chart)} />
                        </Menu>
                        {renderView}
                    </div>
                }/>           
                <Route path={`${match.url}/orders/:orderFactorId`} component={OrderFactorDetail}/>
                <Route path={`${match.url}/factors/:factorId`} component={FactorDetail}/>
            </div>
        );
    }
}
export default Accounting