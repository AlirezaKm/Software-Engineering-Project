import React,{Component} from 'react'
import {connect} from 'react-redux'
import {View} from 'native-base'
import {Text,CardRow,Load} from '../common'
import {loadOrders} from '../../actions'
class OrderFactorDetail extends Component{
    /*static navigationOptions = ({navigation})=>({
        title:navigation.state.params.title
    })*/
    componentWillMount(){
        this.props.load();
    }
    static navigationOptions = {
        title:'جزییات سفارش'
    }
    render(){
        const {wait,error,orders} = this.props;
        console.log('orders:',orders);  
        ordersView = orders.map(
            ({code,product})=>
            <CardRow
                key={code}
                title={product.name}
                icon="pricetag" 
                ItemOne={product.category.name}
                ItemTwo={product.subcategory.name}
                badgeTop={product.sellPrice + ' تومان'} 
                badgeBottom={product.count + ' عدد'}
            />)
        return(
            <Load wait={wait} error={wait?null:error} onError={()=>this.props.load()}>
                {ordersView}
            </Load>         
        )
    }
}

/*const mapStateTopProps = (state,ownProps)=>{

    const selectedOrders = state.orders.filter(item=> item.orderFactorCode === state.selectedOrderFactor);

    const selectedOrderProducts = state.products.filter(item=>{        
        result  = selectedOrders.find(order=> order.productCode == item.code);
        return result?true:false;
    });

    const orders = selectedOrderProducts.map(product=>{
            //console.log('single Product: ', product);
            const cat = state.categories.find((category)=>category.id == product.categoryId);
            const subCat = state.subCategories.find((subCategory)=>subCategory.id == product.subCategoryId);
            const order = selectedOrders.find(order=> order.productCode == product.code);

            return (
                Object.assign({},product,
                    {
                        category:cat.name,
                        subCategory:subCat.name,
                        count:order.count
                    })
            );
    })
    return {
        orders:orders
    }
};*/
const mapStateTopProps = (state,ownProps)=>({
    wait:state.waitForResponse,
    error:state.error.orders,
    orders:state.orders
})
const mapDispatchToProps = (dispatch,ownProps)=>({
    load:()=>{
        dispatch(loadOrders());
    }
})

export default connect(mapStateTopProps,mapDispatchToProps)(OrderFactorDetail)