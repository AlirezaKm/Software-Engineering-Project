import React,{Component} from 'react'
import {View,Button,Icon} from 'native-base'
import {connect} from 'react-redux'
import {Card,Text,Field} from '../common'
import {colors} from '../styles'
import Tab from './Tab'
import {addProperty,changeNewProperty,addNewProductProperty} from '../../actions'

class Properties extends Component{
    static navigationOptions={
        tabBarLabel:()=><Text white small> ویژگی ها</Text>
    }
    render(){
        const {properties,error,changeProperty,createProperty,addProductProperty,edit,editCode} = this.props;

        const propertyItems = properties.map((item,index)=>{
            const temp = edit.find(element=> element.propertyId == item.id);
            return(
            <Field
                key={index}
                icon="arrow-dropleft"
                input
                value={temp?temp.value:null}
                label={item.name}
                onChange={(event)=>{
                    addProductProperty({
                        productCode: editCode,
                        propertyId: item.id,
                        value:event.nativeEvent.text
                    });
                }}
                />
        )});
        return(
            <Tab>
                <Card column>
                    <Field
                        icon="link"
                        input
                        label="ویژگی جدید"
                        onChange={(event)=>changeProperty(event.nativeEvent.text)}
                        error={error.propertyName?error.propertyName:null}>

                        <Button transparent small style={{alignSelf:'center'}} onPress={()=>createProperty()}>
                            <Icon name="add-circle" style={{color:colors.accent}}/>
                        </Button>
                    </Field>
                    {propertyItems}
                </Card>
            </Tab>
        );
    }
}

const mapStateToProps = (state,ownProps)=>({
    error:state.error,
    properties: state.properties.filter((item)=>item.subCategoryId === state.selectedSubCategory),
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
    }
})
export default connect(mapStateToProps,mapDispatchToProp)(Properties)