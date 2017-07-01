import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Form,Divider,Dropdown,Segment,Button,Label,Input} from 'semantic-ui-react'
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
            console.log('edit:',edit);
            this.onFactorChanged(edit.factor.id);
            this.onCategoryChanged(edit.category.id);
            this.onSubCategoryChanged(edit.subcategory.id);
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
        console.log('onFactorChanged:value:',value);
        if(value){
            this.setState({
                selectedFactor:value
            },
            ()=>this.changeProductInfo('factor',this.state.selectedFactor)
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
                this.changeProductInfo('category',this.state.selectedCategory)
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
                this.changeProductInfo('subcategory',this.state.selectedSubCategory)
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

        const factorItems =factors.map((item)=>(
            {
                text: item.seller.name +' '+ item.date,
                value:item.id
            }));

        const categoryItems=categories.map((item)=>(
            {
                text:item.name,
                value:item.id
            }));

        const selectedSubCategoryItems=selectedSubCategories.map((item)=>(
            {
                text:item.name,
                value:item.id
            }));
        
        return(
            <Segment basic>
            <CategoryModal visible={categoryModal} 
                    setVisible={(visible)=>this.setModalVisible('categoryModal',visible)}/>
            <FactorModal visible={factorModal} 
                setVisible={(visible)=>this.setModalVisible('factorModal',visible)}/>
            <SubCategoryModal visible={subCategoryModal} 
                setVisible={(visible)=>this.setModalVisible('subCategoryModal',visible)}/>
            <Divider horizontal> مشخصات اصلی </Divider>
                <Form.Group widths="equal">
                    <Form.Field>
                        <Input
                        icon="cube" 
                        defaultValue={edit.code?edit.name:''}
                        placeholder="اسم محصول"
                        onChange={(event,data)=>{
                            this.changeProductInfo('name',data.value)
                        }}/>
                        {error.name&&<Label basic color='red' pointing>{error.name}</Label>}
                    </Form.Field>
                    <Form.Field>
                        <div>
                        <Dropdown
                            defaultValue={this.state.selectedFactor}
                            icon="shop"
                            loading={loadingFactors}
                            onChange={(event,data)=>this.onFactorChanged(data.value)}
                            placeholder='فاکتور را انتخاب کنید' selection options={factorItems} />
                        <Button color="yellow" onClick={()=>this.setModalVisible('factorModal',true)}> اضافه کردن </Button>
                        </div>
                        {error.factorId&&<Label basic color='red' pointing>{error.factorId}</Label>}
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                    <div>
                        <Dropdown 
                            icon="bookmark"   
                            defaultValue={this.state.selectedCategory}                   
                            loading={loadingCategories}
                            onChange={(event,data)=>this.onCategoryChanged(data.value)}
                            placeholder='دسته را انتخاب کنید' selection options={categoryItems} />
                            <Button color="yellow" onClick={()=>this.setModalVisible('categoryModal',true)}> اضافه کردن </Button>
                        </div>
                        {error.categoryId&&<Label basic color='red' pointing>{error.categoryId}</Label>}
                    </Form.Field>
                    <Form.Field>
                        <div>
                        <Dropdown
                            defaultValue={this.state.selectedSubCategory}
                            icon="bookmark"   
                            loading={loadingSubCategories}
                            onChange={(event,data)=>this.onSubCategoryChanged(data.value)}
                            placeholder='زیر دسته را انتخاب کنید' selection options={selectedSubCategoryItems} />
                        <Button color="yellow" onClick={()=>{
                            if(this.state.selectedCategory>=1){
                                this.setModalVisible('subCategoryModal',true)
                            }
                            else{
                                this.onCategoryChanged(-1);
                            }
                        }}
                            > اضافه کردن </Button>
                        </div>
                        {error.subCategoryId&&<Label basic color='red' pointing>{error.subCategoryId}</Label>}
                    </Form.Field>
                </Form.Group>
            </Segment>
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