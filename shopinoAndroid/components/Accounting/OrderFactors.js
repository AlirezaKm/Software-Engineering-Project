import React,{Component} from 'react'
import {View} from 'native-base'
import {Text,CardRow} from '../common'
import {connect} from 'react-redux'
import {changeSelectedOrderFactor} from '../../actions'

class OrderFactors extends Component{

    render(){
        const {orderFactors,changeOrderFactor,navigate,title} = this.props;

        orderFactorViews = orderFactors.map(
            ({code,status,count,sum,create_date_time})=>{
                const {year,month,day} = create_date_time;
                return (
                    <CardRow 
                        key={code}
                        title={code+"#"}
                        icon="pricetag" 
                        ItemOne={status == 1 ? 'پرداخت شده':'معوق'}
                        ItemTwo={count + 'عدد'}
                        badgeTop={sum + 'تومان'} 
                        badgeBottom={year?year+'/'+month+'/'+day:create_date_time}
                        onPress={()=>{
                            changeOrderFactor(code);
                            navigate('OrderFactorDetail',{title:code+'فاکتور شماره '});
                        }}/>
        )});

        return (
            <View>                
                {orderFactorViews}
            </View>
        );
    }
}
const mapStateToProps =(state,ownProps)=>({
    orderFactors:state.orderFactors
})

const mapDispatchToProps = (dispatch,ownProps)=>({
    changeOrderFactor:(orderFactorCode)=>{
        dispatch(changeSelectedOrderFactor(orderFactorCode));
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(OrderFactors)