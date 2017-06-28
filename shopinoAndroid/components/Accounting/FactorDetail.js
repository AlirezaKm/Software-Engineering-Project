import React,{Component} from 'react'
import {connect} from 'react-redux'
import {View} from 'native-base'
import {Text,CardRow,Load} from '../common'
import {loadProducts} from '../../actions'

class FactorDetail extends Component{
    /*static navigationOptions = ({navigation})=>({
        title:navigation.state.params.title
    })*/
    componentWillMount(){
        this.props.load();
    }
    static navigationOptions = {
        title:'جزییات فاکتور خرید'
    }
    render(){
        const {wait,error,products} = this.props;

        productViews = products.map(
            ({code,name,sellPrice,count,category,subCategory})=>
            <CardRow
                key={code}
                title={name}
                icon="pricetag" 
                ItemOne={category.name}
                ItemTwo={subCategory.name}
                badgeTop={sellPrice + 'تومان'} 
                badgeBottom={count + 'عدد'}
            />)
        return(
            <Load wait={wait} error={wait?null:error} onError={()=>this.props.load()}> 
                {productViews}
            </Load>         
        )
    }
}

/*const mapStateTopProps = (state,ownProps)=>{

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
};*/
const mapStateTopProps = (state,ownProps)=>({
    wait:state.waitForResponse,
    error:state.error.products,
    products:state.products
})
const mapDispatchToProps = (dispatch,ownProps)=>({
    load:()=>{
        dispatch(loadProducts(null,ownProps.navigation.state.params.factorId));
    }
})

export default connect(mapStateTopProps,mapDispatchToProps)(FactorDetail)