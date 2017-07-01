import React,{Component} from 'react'
import {connect} from 'react-redux'
import GridColumn from '../common/GridColumn'
import ErrorMessage from '../common/ErrorMessage'
import {Segment,Grid} from 'semantic-ui-react'
import {changeSelectedOrderFactor,loadOrderFactors} from '../../actions'

class OrderFactors extends Component{
    componentWillMount(){
        this.props.load();
    }
    render(){
        const {wait,error,orderFactors,changeOrderFactor} = this.props;
        const orderFactorViews = orderFactors.map((order)=>(
            <GridColumn
                three={true}
                to={'/Panel/accounting/orders/'+order.id}
                onLongPress={()=>console.log('longPress')}
                icon="tags"
                title={order.id+"#"}
                ItemOne={order.status == 1 ? 'پرداخت شده':'معوق'}
                ItemTwo={order.count + ' عدد'}
                badgeTop={order.sum + ' تومان'}
                badgeBottom={order.created_at}
            />
        ));
        return (
          <Segment loading={wait} basic> 
           {error&&<ErrorMessage error={error} onError={()=>this.props.load()}/>}
            <Grid style={{justifyContent:'space-between'}}>
                {orderFactorViews}
            </Grid>
          </Segment>
        );
    }
}
const mapStateToProps =(state,ownProps)=>({
    wait:state.waitForResponse,
    error:state.error.orderfactors,
    orderFactors:state.orderFactors
})

const mapDispatchToProps = (dispatch,ownProps)=>({
    changeOrderFactor:(orderFactorCode)=>{
        dispatch(changeSelectedOrderFactor(orderFactorCode));
    },
    load:()=>{
        dispatch(loadOrderFactors());
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(OrderFactors)