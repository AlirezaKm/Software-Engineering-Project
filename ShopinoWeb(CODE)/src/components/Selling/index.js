import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Message,Grid,Button,Segment,Icon,Input} from 'semantic-ui-react'
import GridColumn from '../common/GridColumn'
import ErrorMessage from '../common/ErrorMessage'
import * as actions from '../../actions/Selling'
import {cleanError,loadProducts} from '../../actions'

class Selling extends Component {
    constructor(props){
        super(props);
        this.state={
            code:''
        }
    }
    setCode(code){
        this.setState({
            code:code
        });
    }
    addOrder(code = -1){
        //this function edits order factor information itself
        const sendCode = code==-1 ? this.state.code : code;

        this.props.addNewOrder(sendCode);
    }
    componentDidMount(){
        const {cleanOrderFactor,load} = this.props;
        load();
        cleanOrderFactor();
    }
    submitFactorCode(){
        this.props.createOrderFactor();
    }
    render() {
        const {wait,message,orderFactor,orders,error,clearError,products} = this.props;        
        const orderViews = orders.map(order =>
            <GridColumn
                three={true}
                to={this.props.location.pathname}
                key={order.code}
                icon="pricetag"
                title={order.name}
                ItemOne={order.category.name}
                ItemTwo={order.subcategory.name}
                badgeTop={order.sellPrice+' تومان'}
                badgeBottom={order.count+' عدد'}
            />);
        
        const productViews = products.map((product)=>                              
            <Button fluid style={{margin:4}} onClick={()=>this.addOrder(product.code)}>
                {product.name + "   کد:   "+product.code}</Button>);

        return (
            <div>
                <Segment> 
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <h3 style={{display:'inline'}}> فروش </h3>
                    </div>
                </Segment>
                <Grid>
                    <Grid.Column width="4">
                        <Segment color="purple">
                            <h5> محصولات </h5>
                            {productViews}
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width="12">
                        <Segment color="purple"> 
                            <Grid textAlign="center" columns="3">
                                <Grid.Column>
                                    <div>تعداد</div>
                                    <div>{orderFactor.count}</div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div>جمع کل</div>
                                    <div>{orderFactor.sum} تومان</div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div> تاریخ </div>
                                    <div> {orderFactor.create_date_time} </div>
                                </Grid.Column>
                            </Grid> 
                        </Segment>
                        <Grid style={{justifyContent:'space-between'}} color="purple">     
                            {orderViews}               
                        </Grid>
                        <Grid centered>
                            <Grid.Column width="8">
                            <Segment  color="purple" attached="bottom">
                            {message&&<Message color="green">{message}</Message>}
                            {error&&<Message negative> {error} </Message>}
                                <Grid container>    
                                    <Grid.Row>
                                        <Grid.Column width="6">
                                            <Button color="yellow" onClick={()=>this.addOrder()} 
                                                disabled={wait}>
                                            <Icon name="send"/>
                                            </Button>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Input                       
                                                icon="code"
                                                placeholder="کد محصول"
                                                onChange={(event,data)=>this.setCode(data.value)}/>
                                            </Grid.Column>
                                    </Grid.Row>           
                                    <Grid.Row>       
                                        <Button loading={wait} color="yellow" fluid onClick={()=>{
                                            this.submitFactorCode()
                                            this.setCode('');
                                        }}>
                                        ثبت نهایی! 
                                        </Button> 
                                    </Grid.Row>
                                    </Grid>
                            </Segment>     
                            </Grid.Column>
                        </Grid>                                               
                        </Grid.Column>
                    </Grid>
            </div>
        );
    }
}

const mapStateToProps =(state)=>({
    wait:state.waitForResponse,
    message:state.message.selling,
    error:state.error.selling,
    orderFactor: state.newOrderFactor,
    orders:state.newOrders,
    products:state.products
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
    },
    load:()=>{
        dispatch(loadProducts());
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(Selling);