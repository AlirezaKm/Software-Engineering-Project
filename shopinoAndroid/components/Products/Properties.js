import React,{Component} from 'react'
import {View,Button,Icon} from 'native-base'
import {connect} from 'react-redux'
import {Card,Text,Field,SimpleLoad} from '../common'
import {colors} from '../styles'
import Tab from './Tab'
import {addProperty,changeNewProperty,addNewProductProperty,loadProperties} from '../../actions'

class Properties extends Component{
    static navigationOptions={
        tabBarLabel:()=><Text white small> ویژگی ها</Text>
    }
    render(){
        const {wait,
            loadingProperties,
            properties,error,changeProperty,createProperty,addProductProperty,edit,editCode} 
        = this.props;

        const propertyItems = properties.map((item,index)=>{
            const temp = edit.find(element=> element.property == item.id);
            console.log('temp:',temp);
            return(
            <Field
                key={index}
                icon="arrow-dropleft"
                value={temp?temp.value:null}
                label={item.name}
                onChange={(event)=>{
                    let info = {
                        property: item.id,
                        value:event.nativeEvent.text
                    }
                    if(editCode){
                        info.product = editCode;
                    }
                    addProductProperty(info);
                }}
                />
        )});
        return(
            <Tab>
                <Card column>
                    <Field
                        load={wait}
                        icon="link"
                        placeholder="ویژگی جدید"
                        onChange={(event)=>changeProperty(event.nativeEvent.text)}
                        error={error.propertyName?error.propertyName:null}>
                        <Button transparent small style={{alignSelf:'center'}} onPress={()=>createProperty()}>
                            <Icon name="add-circle" style={{color:colors.accent}}/>
                        </Button>
                    </Field>
                    {loadingProperties?<SimpleLoad wait={true}/>:
                        propertyItems
                    }
                </Card>
            </Tab>
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