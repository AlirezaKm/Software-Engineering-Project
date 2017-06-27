import React,{Component} from 'react'
import {DatePickerAndroid} from 'react-native'
import {Picker,Item,Button,Icon,View,Input,Toast} from 'native-base'
import {connect} from 'react-redux'
import {Card,Text,Field,SimpleLoad} from '../common'
import {colors} from '../styles'
import Tab from './Tab'
import {
    changeNewProduct,
    changeSelectedCategory,
    changeSelectedSubCategory,
    loadFactors,
    loadCategories} 
from '../../actions'
import FactorModal from './FactorModal'
import CategoryModal from './CategoryModal'
import SubCategoryModal from './SubCategoryModal'
class MainDetail extends Component{
    static navigationOptions={
        tabBarLabel:()=><Text white small> مشخصات اصلی </Text>,
        tabBarIcon:()=><Icon name="pricetags"/>
    }    
    constructor(props){
        super(props);
        this.state={
            factorModal:false,
            categoryModal:false,
            subCategoryModal:false,
            selectedFactor:-1,
            selectedCategory:-1,
            selectedSubCategory:-1
        }
    }
    componentWillMount(){
        this.props.loadInfo();
    }
    componentDidMount(){
        console.log('onComponentDidMount called');
        const {edit} = this.props;
        if(edit.code){
            this.onFactorChanged(edit.factor.id);
            this.onCategoryChanged(edit.category.id);
            this.onSubCategoryChanged(edit.subCategory.id);
        }
    }
    setModalVisible(modal,visible){
        let temp = {};
        temp[modal] = visible;
        this.setState(temp);
        /*if(!visible){
            const {factor} = this.props.message;
            if(factor){
                Toast.show({
                    text: factor,
                    position: 'bottom',
                    type:'success',
                    buttonText: 'باشه!',
                });
            }
        }*/
    }
    changeProductInfo(field,value){
        const {changeProduct} = this.props;
        let info={};
        info[field] = value;
        changeProduct(info);// change Product Info in the store
    }   
    onFactorChanged(value){
        if(value){
            this.setState({
                selectedFactor:value
            },
            ()=>this.changeProductInfo('factorId',this.state.selectedFactor)
            );
        }
    }
    onCategoryChanged(value=-1){
        if(value){
            const {changeCategory} = this.props;
            changeCategory(parseInt(value));
            this.setState({
                selectedCategory:value
            },()=>
                this.changeProductInfo('categoryId',this.state.selectedCategory)
            );
        }
    } 
    onSubCategoryChanged(value){
        console.log('change Sub Category: '+value);
        if(value){
            const {changeSubCategory} = this.props;
            changeSubCategory(parseInt(value));
            this.setState({
                selectedSubCategory:value
            },()=>
                this.changeProductInfo('subCategoryId',this.state.selectedSubCategory)
            );
        }
    }
    render(){
        const {
            factors,
            categories,
            selectedSubCategories,
            changeCategory,
            error,
            edit,
            loadingFactors,
            loadingCategories,
            loadingSubCategories
        } = this.props;
        const {factorModal,categoryModal,subCategoryModal} = this.state;

        const chooseItem = <Item label='انتخاب کنید' value="-1" key={-1} disabled/>;

        const factorItems = [
            chooseItem,
            ...factors.map((item,index)=>
            <Item label={''+ item.seller +' '+ item.date.year+'/'+item.date.month+'/'+item.date.day} value={item.id} key={index}/>)
        ];

        const categoryItems=[
            chooseItem,
            ...categories.map((item,index)=>
            <Item label={item.name} value={item.id} key={index}/>)
        ];

        const selectedSubCategoryItems=[
            chooseItem,
            ...selectedSubCategories.map((item,index)=>
            <Item label={item.name} value={item.id} key={index} />)
        ];

        return(
            <Tab>           
                <FactorModal
                    visible={factorModal}
                    setVisible={(visible)=>this.setModalVisible('factorModal',visible)}/>
                <CategoryModal
                    visible={categoryModal}
                    setVisible={(visible)=>this.setModalVisible('categoryModal',visible)}/>
                <SubCategoryModal
                    visible={subCategoryModal}
                    setVisible={(visible)=>this.setModalVisible('subCategoryModal',visible)}/>

                    <Card column>
                        <Field 
                            load={loadingFactors}
                            icon="md-cart" 
                            label="فاکتور"
                            error={error.factorId?error.factorId:null}>
                            {factorItems.length>0?
                            <Picker
                                style={{flex:1}}
                                iosHeader="انتخاب کنید"
                                mode="dialog" 
                                selectedValue={this.state.selectedFactor}                               
                                onValueChange={(value)=>this.onFactorChanged(value)}
                                >
                                {factorItems}
                            </Picker>
                            :<Text secondary small style={{flex:1,padding:13}}> فاکتوری وجود ندارد </Text>}

                            <Button transparent small style={{alignSelf:'center'}} onPress={()=>this.setModalVisible('factorModal',true)}>
                                <Icon name="add-circle" style={{color:colors.accent}}/>
                            </Button>
                        </Field>
                        <Field 
                            icon="cube" 
                            label="نام محصول"
                            onChange={(event)=>this.changeProductInfo('name',event.nativeEvent.text)}
                            value={edit.name}
                            placeholder="مثلا شلوار جین ترک"
                            error={error.name?error.name:null}/>
                        <Field
                            load={loadingCategories}
                            icon="md-bookmark"
                            label="دسته"
                            error={error.categoryId?error.categoryId:null}>
                            <Picker
                                style={{flex:1}}
                                iosHeader="انتخاب کنید"
                                mode="dialog"
                                selectedValue={this.state.selectedCategory}
                                onValueChange={(value)=>this.onCategoryChanged(value)}
                                >
                                {categoryItems}
                            </Picker>  
                            <Button transparent small style={{alignSelf:'center'}} onPress={()=>this.setModalVisible('categoryModal',true)}>
                                <Icon name="add-circle" style={{color:colors.accent}}/>
                            </Button>
                        </Field>                                        
                        <Field
                            load={loadingSubCategories}
                            icon="md-bookmark"
                            label="زیر دسته"
                            error={error.subCategoryId?error.subCategoryId:null}>
                            {selectedSubCategoryItems.length>0?
                                <Picker
                                    style={{flex:1}}
                                    iosHeader="Select one"
                                    mode="dialog"
                                    selectedValue={this.state.selectedSubCategory}
                                    onValueChange={(value)=>this.onSubCategoryChanged(value)}
                                    >
                                    {selectedSubCategoryItems}
                                </Picker>                        
                            :<Text secondary small style={{flex:1,padding:13}}> زیر دسته ای وجود ندارد </Text>}
                            <Button transparent small style={{alignSelf:'center'}}
                                onPress={()=>{
                                    if(this.state.selectedCategory>= 0){
                                        this.setModalVisible('subCategoryModal',true)
                                    }
                                    else{
                                        this.changeProductInfo('categoryId',-1);
                                    }
                                }}>
                                <Icon name="add-circle" style={{color:colors.accent}}/>
                            </Button>
                        </Field>
                    </Card>
            </Tab>
        );
    }
}
const mapStateTopProps = (state,ownProps)=>{    
    return {
        loadingFactors:state.loadingFactors,
        loadingCategories:state.loadingCategories,
        loadingSubCategories:state.loadingSubCategories,
        error:state.error,
        message:state.message,
        factors:state.factors,
        categories:state.categories,
        selectedSubCategories:state.subCategories,
        edit:state.newProduct
    }
}
const mapDispatchToProps = (dispatch,ownProps)=>({
    changeProduct:(info)=>{
        dispatch(changeNewProduct(info));
    },
    changeCategory:(categoryId)=>{
        dispatch(changeSelectedCategory(categoryId));
    },
    changeSubCategory:(subCategoryId)=>{
        dispatch(changeSelectedSubCategory(subCategoryId));
    },
    loadInfo:()=>{
        dispatch(loadCategories());
        dispatch(loadFactors());
    }
})
export default connect(mapStateTopProps,mapDispatchToProps)(MainDetail)