import React,{Component} from 'react'
import {Divider,Form,Grid,Dropdown,Segment,Button,Message} from 'semantic-ui-react'
import {connect} from 'react-redux'
import MainDetail from './MainDetail'
import SecondaryDetail from './SecondaryDetail'
import Properties from './Properties'
import {addProduct,cleanNewProduct,changeSelectedProduct} from '../../actions'
import {Redirect} from 'react-router-dom'

class ProductCreate extends Component{ 
    constructor(props){
        super(props);
        this.state={
            redirect:""
        }
    }
    componentWillMount(){
        if(this.props.match.params.productCode){
            this.props.changeProduct(this.props.match.params.productCode);
        }
    }
    componentWillUnmount(){        
        this.props.cleanProduct();
    }
    render(){
        const {wait,error,message,createProduct} = this.props;

        if(message){
           setTimeout(()=>{
                this.setState({
                    redirect:<Redirect to="/Panel/products"/>});
           },1000);
        }
            
        return(
            <Form>
                {this.state.redirect}
                <Segment color="purple">                            
                    <MainDetail/>
                </Segment>                    
                <Segment color="purple">
                    <SecondaryDetail/>
                </Segment>
                <Segment color="purple">
                    <Properties/>
                </Segment>
                {message&&<Message color="green">{message}</Message>}
                {error&&<Message negative>{error}</Message>}
                <Button loading={wait} color="yellow" onClick={()=>createProduct()} attached="bottom"> ثبت </Button> 
            </Form>
        )
    }
}

const mapStateToProps = (state,ownProps)=>({
    wait:state.waitForResponse,    
    error:state.error.products,
    message:state.message.products
})
const mapDispatchToProps=(dispatch,ownProps)=>({
    createProduct:()=>{
        dispatch(addProduct());
    },
    cleanProduct:()=>{
        dispatch(cleanNewProduct());
        //clean Err
        //dispatch();
    },
    changeProduct:(productCode)=>{
        dispatch(changeSelectedProduct(productCode));        
    },
});
export default connect(mapStateToProps,mapDispatchToProps)(ProductCreate);