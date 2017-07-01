import React,{Component} from 'react'
import {connect} from 'react-redux'
import ErrorMessage from '../common/ErrorMessage'
import GridColumn from '../common/GridColumn'
import {Grid,Segment} from 'semantic-ui-react'
import {loadProducts,changeSelectedFactor} from '../../actions'

class FactorDetail extends Component{
    /*static navigationOptions = ({navigation})=>({
        title:navigation.state.params.title
    })*/
    componentWillMount(){
        this.props.changeFactor(this.props.match.params.factorId);
        this.props.load();
    }
    render(){
        const {wait,error,products} = this.props;
        const productViews = products.map(
            ({code,name,sellPrice,count,category,subcategory})=>
            <GridColumn
                to={this.props.location.pathname}
                key={code}
                title={name}
                icon="pricetag" 
                ItemOne={category.name}
                ItemTwo={subcategory.name}
                badgeTop={sellPrice + 'تومان'} 
                badgeBottom={count + 'عدد'}
            />)
        return(
            <Segment wait={wait}>
                <h4> {'جزییات فاکتور خرید'} </h4>
                {error&&<ErrorMessage error={error} onError={()=>this.props.load()}/>}
                <Grid> 
                    {productViews}
                </Grid>
            </Segment>         
        )
    }
}

const mapStateTopProps = (state,ownProps)=>({
    wait:state.waitForResponse,
    error:state.error.products,
    products:state.products
})
const mapDispatchToProps = (dispatch,ownProps)=>({
    changeFactor:(factorId)=>{
        dispatch(changeSelectedFactor(factorId));
    },
    load:()=>{
        dispatch(loadProducts());
    }
})

export default connect(mapStateTopProps,mapDispatchToProps)(FactorDetail)