import React,{Component} from 'react'
import {Container,Footer,FooterTab,Button} from 'native-base'
import {connect} from 'react-redux'
import {Text} from '../common'
import {colors} from '../styles'
import {TabNavigator} from 'react-navigation'
import MainDetail from './MainDetail'
import SecondaryDetail from './SecondaryDetail'
import Properties from './Properties'
import {addProduct,cleanNewProduct} from '../../actions'


const Tabs = TabNavigator({
    MainDetail:{screen:MainDetail},
    SecondaryDetail:{screen:SecondaryDetail},
    Properties:{screen:Properties}
},{
    tabBarOptions :{
        style:{
            backgroundColor:colors.darkPrimary
        }
    }
})

//const Tabs = connect(mapStateToProps)(TabsNavigator);

class ProductCreate extends Component{ 
    /*static navigationOptions =({navigation})=>{
        return {
            title:navigation.state.params.title,
        }
    }*/
    static navigationOptions ={
        title:'اطلاعات محصول'
    }
    componentWillUnmount(){        
        this.props.cleanProduct();
    }
    render(){
        const {createProduct} = this.props;
        return(
            <Container>
                <Tabs/>
                <Footer>
                    <FooterTab>
                        <Button style={{backgroundColor:colors.accent}} 
                            onPress={()=>createProduct()}>
                            <Text white big> ثبت! </Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}

const mapDispatchToProps=(dispatch,ownProps)=>({
    createProduct:()=>{
        dispatch(addProduct());
    },
    cleanProduct:()=>{
        dispatch(cleanNewProduct());
    }
});
export default connect(null,mapDispatchToProps)(ProductCreate);