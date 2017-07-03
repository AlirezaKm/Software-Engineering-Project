import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Card,Text,Field} from '../common'
import Tab from './Tab'
import {changeNewProduct} from '../../actions'

class SecondaryDetail extends Component{
    static navigationOptions={
        tabBarLabel:()=><Text white small> مشخصات فرعی </Text>
    }
    changeProductInfo(field,value){
        const {changeProduct} = this.props;
        let info={};
        info[field] = value;
        changeProduct(info);// change Product Info in the store
    } 
    render(){
        const {error,edit} = this.props;
        return(
            <Tab>                                
                <Card column>
                    <Field
                        icon="md-done-all"
                        placeholder="تعداد "
                        label="عدد"
                        labelEnd
                        value={edit.count?''+edit.count:''}
                        onChange={(event)=>this.changeProductInfo('count',event.nativeEvent.text)}
                        error={error.count?error.count:null}/>
                    <Field
                        icon="cash"
                        placeholder="قیمت خرید واحد"
                        label="تومان"
                        labelEnd
                        value={edit.buyPrice?''+edit.buyPrice:''}
                        onChange={(event)=>this.changeProductInfo('buyPrice',event.nativeEvent.text)}
                        error={error.buyPrice?error.buyPrice:null}/>
                    <Field
                        icon="cash"
                        placeholder="قیمت فروش واحد"
                        value={edit.sellPrice?''+edit.sellPrice:''}
                        label="تومان"
                        labelEnd
                        onChange={(event)=>this.changeProductInfo('sellPrice',event.nativeEvent.text)}
                        error={error.sellPrice?error.sellPrice:null}/>
                </Card>                    
            </Tab>
        );
    }

}

const mapStateTopProps = (state,ownProps)=>({
    error:state.error,
    edit:state.newProduct
})

const mapDispatchToProps = (dispatch,ownProps)=>({
    changeProduct:(info)=>{
        dispatch(changeNewProduct(info));
    }
})

export default connect(mapStateTopProps,mapDispatchToProps)(SecondaryDetail)