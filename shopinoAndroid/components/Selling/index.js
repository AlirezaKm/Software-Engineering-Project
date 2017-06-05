import React, { Component } from 'react'
import {Container,Content,Button,View,Icon,Toast} from 'native-base'
import {connect} from 'react-redux'
import { Text,Field,CardRow,Row} from '../common'
import {colors} from '../styles'
import * as actions from '../../actions/Selling'
import {cleanError} from '../../actions'

class Selling extends Component {
    constructor(props){
        super(props);

        this.state={
            code:''
        }
    }
    static navigationOptions = {
        title: 'بخش فروش'
    }
    setCode(code){
        this.setState({
            code:code
        });
    }
    addOrder(){
        //this function edits order factor information itself
        this.props.addNewOrder(this.state.code);
    }
    componentDidMount(){
        const {cleanOrderFactor} = this.props;
        cleanOrderFactor();
    }
    submitFactorCode(){
        this.props.createOrderFactor();
    }
    render() {
        
        const {orderFactor,orders,error,clearError} = this.props;        
        const orderViews = orders.map(order =>
            <CardRow
                key={order.code}
                icon="pricetag"
                title={order.name}
                ItemOne={order.category}
                ItemTwo={order.subCategory}
                badgeTop={order.buyPrice+' تومان'}
                badgeBottom={order.count+' عدد'}
            />);

        if(error){
            Toast.show({
                text:error,
                buttonText:'باشه!',
                position:'bottom',
                type:'warning',
                duration:3000
            });
            clearError('selling');
        }
        
        return (
            <Container>
                <Row spaceAround style={{backgroundColor:colors.darkPrimary}}>
                    <View>
                        <Text white center>تعداد</Text>
                        <Text white center>{orderFactor.count}</Text>
                    </View>
                    <View>
                        <Text white center>جمع کل</Text>
                        <Text white center>{orderFactor.sum} تومان</Text>
                    </View>
                    <View>
                        <Text white center> تاریخ </Text>
                        <Text white center> {orderFactor.create_date_time} </Text>
                    </View>
                </Row> 
                <Content style={{backgroundColor:'white'}}>     
                {orderViews}               
                </Content>
                <Row>
                    <Button style={{alignSelf:'center'}} transparent small onPress={()=>this.addOrder()}>
                        <Icon name="send" style={{fontSize:24,color:colors.accent}}/>
                    </Button>
                    <View style={{flex:1}}>
                        <Field
                            input
                            icon="code"
                            label="کد محصول"
                            value={this.state.code}
                            onChange={({nativeEvent})=>this.setCode(nativeEvent.text)}/>
                    </View>                    
                </Row>
                <Button block style={{backgroundColor:colors.accent}} onPress={()=>{
                    this.submitFactorCode()
                    this.setCode('');
                }}>
                    <Text big> ثبت نهایی! </Text>
                </Button>             
            </Container>
        );
    }
}

const mapStateToProps =(state)=>({
    error:state.error.selling,
    orderFactor: state.newOrderFactor,
    orders:state.newOrders.map(order=>{
        const result = state.products.find((product => product.code == order.productCode)); 
        const cat = state.categories.find(category=>category.id == result.categoryId);      
        const subCat = state.subCategories.find(subCategory=>subCategory.id == result.subCategoryId);
        return Object.assign({},result,{
            category:cat.name,
            subCategory:subCat.name,
            count:order.count});
    })
})
const mapDispatchToProps = (dispatch)=>({
    cleanOrderFactor:()=>{
        dispatch(actions.cleanNewOrderFactor());
    },
    addNewOrder:(productCode)=>{
        dispatch(actions.addNewOrder(productCode));
    },
    clearOrders:()=>{
        dispatch(actions.clearOrders());
    },
    createOrderFactor:()=>{
        dispatch(actions.addOrderFactor(1)); //status: 1 <=> payed
    },
    clearError:(field)=>{
        dispatch(cleanError(field));
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(Selling);