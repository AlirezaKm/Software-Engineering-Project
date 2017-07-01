import React,{Component} from 'react'
import {View} from 'native-base'
import {Text,CardRow,Load} from '../common'
import {connect} from 'react-redux'
import {changeSelectedOrderFactor,loadOrderFactors} from '../../actions'

class OrderFactors extends Component{

    componentWillMount(){
        this.props.load();
    }
    render(){
        const {wait,error,orderFactors,changeOrderFactor,navigate,title} = this.props;

        const orderFactorViews = orderFactors.map(
            ({id,status,count,sum,created_at})=>{
                return (
                    <CardRow 
                        key={id}
                        title={id+"#"}
                        icon="pricetag" 
                        ItemOne={status == 1 ? 'پرداخت شده':'معوق'}
                        ItemTwo={count + 'عدد'}
                        badgeTop={sum + 'تومان'} 
                        badgeBottom={created_at}
                        onPress={()=>{
                            changeOrderFactor(id);
                            navigate('OrderFactorDetail',{title:id+'فاکتور شماره '});
                        }}/>
        )});

        return (
            <Load wait={wait} error={wait?null:error} onError={()=>this.props.load()}>              
                {orderFactorViews}
            </Load>
        );
    }
}
const mapStateToProps =(state,ownProps)=>({
    wait:state.waitForResponse,
    error:state.error.orderFactors,
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