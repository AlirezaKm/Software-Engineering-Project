import React,{Component} from 'react'
import {Container,Content,Body,Footer,FooterTab,Button,Fab,Icon} from 'native-base'
import {Text} from '../common'
import {colors} from '../styles'
import OrderFactors  from './OrderFactors'
import Factors from './Factors'
import Expenses from './Expenses'
import Chart from './Chart'
import ExpenseModal from './ExpenseModal'

const pages={
    OrderFactors:'OrderFactors',
    Factors:'Factors',
    Expenses:'Expenses',
    Chart:'Chart'
}

class Accounting extends Component {
    static navigationOptions=({navigation})=>({
        title:navigation.state.params.title
    })
    /*static navigationOptions ={                     
        title: 's'      
    }*/
    constructor(props){
        super(props);
        this.state={
            page:pages.OrderFactors,
            ExpenseModalVisible:false
        }
        this.changePage = this.changePage.bind(this);
    }
    changePage(page){
        const {setParams} = this.props.navigation;
        let title = '';
        switch(page){
            case pages.Factors:
                title='فاکتورهای خرید';
                break;
            case pages.Expenses:
                title='خرج ها'
                break;
            case pages.Chart:
                title='نمودار';
                break;
            default:
                title='فاکتورهای فروش';                
        }
        setParams({title:title});
        this.setState({
            page:page
        });        
    }
    showExpenseModal(visible){
        this.setState({ExpenseModalVisible:visible});
    }
    render(){
        let renderView = null;

        const {navigate} = this.props.navigation;
        const {ExpenseModalVisible} = this.state;
        
        switch(this.state.page){
            case pages.Factors:
                renderView = <Factors navigate={navigate}/>;
                break;
            case pages.Expenses:                
                renderView = <Expenses/>
                break;
            case pages.Chart:                
                renderView = <Chart/>
                break;
            default:                
                renderView = <OrderFactors navigate={navigate}/>;
        }

        return (
            <Container>
                <Content>
                    {renderView}
                    <ExpenseModal visible={ExpenseModalVisible} setVisible={(visible)=>this.showExpenseModal(visible)}/>
                </Content>
                {this.state.page == "Expenses" &&
                    <Fab 
                        style={{
                            bottom:12,
                            backgroundColor:colors.accent
                        }}
                        position="bottomLeft"
                        onPress={()=>this.showExpenseModal(true)}>
                    <Icon name="add"/>
                    </Fab>
                }
                <Footer style={{height:40,borderTopLeftRadius:16,borderTopRightRadius:16}}>
                    <FooterTab style={{backgroundColor:colors.accent,borderTopLeftRadius:16,borderTopRightRadius:16}}>
                        <Button transparent onPress={()=>this.changePage(pages.OrderFactors)}>
                            <Icon name="pricetags" style={this.state.page === pages.OrderFactors?{color:colors.darkPrimary}:{color:'white'}}/>
                        </Button>
                        <Button transparent onPress={()=>this.changePage(pages.Factors)}>
                            <Icon name="clipboard" style={this.state.page === pages.Factors?{color:colors.darkPrimary}:{color:'white'}}/>
                        </Button>
                        <Button transparent onPress={()=>this.changePage(pages.Expenses)}>
                            <Icon name="cash" style={this.state.page === pages.Expenses?{color:colors.darkPrimary}:{color:'white'}}/>
                        </Button>
                        <Button transparent onPress={()=>this.changePage(pages.Chart)}>
                            <Icon name="podium" style={this.state.page === pages.Chart?{color:colors.darkPrimary}:{color:'white'}}/>
                        </Button>
                    </FooterTab>
                </Footer>   
            </Container>
        )
    }
}



export default Accounting