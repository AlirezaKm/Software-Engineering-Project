import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Input,Label,Divider,Segment,Form,Dropdown,Icon} from 'semantic-ui-react'
import {addProperty,changeNewProperty,addNewProductProperty,loadProperties} from '../../actions'

class Properties extends Component{
    render(){
        const {wait,
            loadingProperties,
            properties,error,changeProperty,createProperty,addProductProperty,edit,editCode} 
        = this.props;

        const propertyItems = properties.map((item,index)=>{
            const temp = edit.find(element=> element.property == item.id);
            console.log('temp:',temp);
            return(
            <Form.Field>
                <Input
                key={index}
                value={temp?temp.value:''}
                icon="chevron left" 
                type='text' 
                placeholder={item.name}                
                onChange={(event,data)=>{
                    let info = {
                        property: item.id,
                        value:data.value
                    }
                    if(editCode){
                        info.product = editCode;
                    }
                    addProductProperty(info);
                }}/>
            </Form.Field>
        )});
        return(
            <Segment basic>
            <Divider horizontal> ویژگی ها </Divider>
                <Form.Field>
                    <Input 
                        action={{ color: 'yellow', content: 'اضافه کردن',onClick:()=>createProperty()}}
                        actionPosition='left' 
                        icon="linkify" type='text' placeholder='نام ویژگی جدید'
                        onChange={(event,data)=>changeProperty(data.value)}>
                    </Input>
                    {error.propertyName&&<Label basic color='red' pointing>{error.propertyName}</Label>}
                </Form.Field>                
                {propertyItems}
            </Segment>
        );
    }
}

const mapStateToProps = (state,ownProps)=>({
    wait:state.waitForResponse,
    loadingProperties:state.loadingProperties,
    error:state.error,
    properties: state.properties,
    edit:state.newProductProperty,
    editCode:state.newProduct.code
});
const mapDispatchToProp = (dispatch,ownProps)=>({
    createProperty:()=>{
        dispatch(addProperty());
    },
    changeProperty:(name)=>{
        dispatch(changeNewProperty({name:name}));
    },
    addProductProperty:(productProperty)=>{
        dispatch(addNewProductProperty(productProperty));
    }/*,
    loadInfo:()=>{
        dispatch(loadProperties());
    }*/
})
export default connect(mapStateToProps,mapDispatchToProp)(Properties)