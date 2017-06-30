import React,{Component} from 'react'
import {connect} from 'react-redux'
import {View} from 'native-base'
import {Text,CardRow} from '../common'

class FactorDetail extends Component{
    /*static navigationOptions = ({navigation})=>({
        title:navigation.state.params.title
    })*/
    static navigationOptions = {
        title:'جزییات فاکتور خرید'
    }
    render(){
        const {products} = this.props;
        productViews = products.map(
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
                {productViews}
            </View>         
        )
    }
}

const mapStateTopProps = (state,ownProps)=>{

    const selectedFactorProducts = state.products.filter(product=>product.factorId === state.selectedFactor);

    const products = selectedFactorProducts.map(product=>{
            
            const cat = state.categories.find((category)=>category.id == product.categoryId);
            const subCat = state.subCategories.find((subCategory)=>subCategory.id == product.subCategoryId);

            return (
                Object.assign({},product,
                    {
                        category:cat.name,
                        subCategory:subCat.name,
                    })
            );
    })
    return {
        products:products
    }
};

export default connect(mapStateTopProps)(FactorDetail)