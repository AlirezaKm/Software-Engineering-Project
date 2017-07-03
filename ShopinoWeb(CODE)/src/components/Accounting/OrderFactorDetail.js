import React,{Component} from 'react'
import {connect} from 'react-redux'
import ErrorMessage from '../common/ErrorMessage'
import GridColumn from '../common/GridColumn'
import {Grid,Segment} from 'semantic-ui-react'
import {loadOrders,changeSelectedOrderFactor} from '../../actions'
class OrderFactorDetail extends Component{
    /*static navigationOptions = ({navigation})=>({
        title:navigation.state.params.title
    })*/
    componentWillMount(){
        this.props.changeOrderFactor(this.props.match.params.orderFactorId);
        this.props.load();
    }
    render(){
        const {wait,error,orders} = this.props;
        console.log('orders:',orders);
        const ordersView = orders.map(
            ({product,count})=>product?
            <GridColumn
                to={this.props.location.pathname}
                title={product.name}
                icon="tags" 
                ItemOne={product.category}
                ItemTwo={product.category}
                badgeTop={product.sellPrice + ' تومان'} 
                badgeBottom={count + ' عدد'}
            />:null);
        return(
            <Segment loading={wait}>
                <h4> جزییات فاکتور فروش </h4>
                {error&&<ErrorMessage error={error} onError={()=>this.props.load()}/>}
                <Grid>
                    {ordersView}
                </Grid>
            </Segment>         
        )
    }
}
const mapStateTopProps = (state,ownProps)=>({
    wait:state.waitForResponse,
    error:state.error.orders,
    orders:state.orders
})
const mapDispatchToProps = (dispatch,ownProps)=>({
    changeOrderFactor:(orderFactorCode)=>{
        dispatch(changeSelectedOrderFactor(orderFactorCode));
    },
    load:()=>{
        dispatch(loadOrders());
    }
})

export default connect(mapStateTopProps,mapDispatchToProps)(OrderFactorDetail)