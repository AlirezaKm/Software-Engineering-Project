import React, { Component } from 'react'
import {Container,Content,Button,View,Icon,Toast} from 'native-base'
import {connect} from 'react-redux'
import { Text,Field,CardRow,Row,SimpleLoad} from '../common'
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
        
        const {wait,message,orderFactor,orders,error,clearError} = this.props;        
        const orderViews = orders.map(order =>
            <CardRow
                key={order.code}
                icon="pricetag"
                title={order.name}
                ItemOne={order.category.name}
                ItemTwo={order.subcategory.name}
                badgeTop={order.sellPrice+' تومان'}
                badgeBottom={order.count+' عدد'}
            />);
        
        return (
            <Container>
                {message&&<Text success background>{message}</Text>}
                {error&&<Text error> {error} </Text>}
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
                    <Button style={{alignSelf:'center'}} transparent small onPress={()=>this.addOrder()} 
                            disabled={wait}>
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
                <SimpleLoad wait={wait}>
                    <Button block style={{backgroundColor:colors.accent}} onPress={()=>{
                        this.submitFactorCode()
                        this.setCode('');
                    }}>
                    <Text big> ثبت نهایی! </Text>
                    </Button>             
                </SimpleLoad>
            </Container>
        );
    }
}

const mapStateToProps =(state)=>({
    wait:state.waitForResponse,
    message:state.message.selling,
    error:state.error.selling,
    orderFactor: state.newOrderFactor,
    orders:state.newOrders
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