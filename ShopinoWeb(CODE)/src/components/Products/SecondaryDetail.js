import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Input,Label,Divider,Segment,Form,Dropdown,Icon} from 'semantic-ui-react'
import {changeNewProduct} from '../../actions'

class SecondaryDetail extends Component{
    changeProductInfo(field,value){
        const {changeProduct} = this.props;
        let info={};
        info[field] = value;
        changeProduct(info);// change Product Info in the store
    } 
    render(){
        const {error,edit} = this.props;
        return(
            <Segment basic>
            <Divider horizontal> مشخصات ثانویه </Divider>
                <Form.Group widths="equal">
                    <Form.Field>
                        <Input 
                        defaultValue={edit.code?edit.buyPrice:''}
                        icon="dollar" type='number' placeholder='قیمت خرید'
                        onChange={(event,data)=>{
                            this.changeProductInfo('buyPrice',data.value)
                        }}>
                        </Input>
                        {error.buyPrice&&<Label basic color='red' pointing>{error.buyPrice}</Label>}
                    </Form.Field>
                    <Form.Field>
                        <Input 
                            defaultValue={edit.code?edit.sellPrice:''}
                            icon="dollar" type='number' placeholder='قیمت فروش'
                        onChange={(event,data)=>{
                            this.changeProductInfo('sellPrice',data.value)
                        }}>
                        </Input>
                        {error.sellPrice&&<Label basic color='red' pointing>{error.sellPrice}</Label>}
                    </Form.Field>
                    <Form.Field>
                        <Input 
                            defaultValue={edit.code?edit.count:''}
                            icon="checkmark" type='number' placeholder='تعداد'
                        onChange={(event,data)=>{
                            this.changeProductInfo('count',data.value)
                        }}>
                        </Input>
                        {error.count&&<Label basic color='red' pointing>{error.count}</Label>}
                    </Form.Field>
                </Form.Group>
            </Segment>
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