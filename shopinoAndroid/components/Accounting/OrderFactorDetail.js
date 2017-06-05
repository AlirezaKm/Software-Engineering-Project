import React,{Component} from 'react'
import {connect} from 'react-redux'
import {View} from 'native-base'
import {Text,CardRow} from '../common'

class OrderFactorDetail extends Component{
    /*static navigationOptions = ({navigation})=>({
        title:navigation.state.params.title
    })*/
    static navigationOptions = {
        title:'جزییات سفارش'
    }
    render(){
        const {orders} = this.props;
        ordersView = orders.map(
            ({code,name,sellPrice,count,category,subCategory})=>
            <CardRow
                key={code}
                title={name}
                icon="pricetag" 
                ItemOne={category}
                ItemTwo={subCategory}
                badgeTop={sellPrice + 'تومان'} 
                badgeBottom={count + 'عدد'}
            />)
        return(
            <View>
                {ordersView}
            </View>         
        )
    }
}

const mapStateTopProps = (state,ownProps)=>{

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
};

export default connect(mapStateTopProps)(OrderFactorDetail)