import React from 'react'
import {connect} from 'react-redux'
import {Icon,Container,Fab,View,Badge,Body,FooterTab,Footer,Button,Segment,Spinner} from 'native-base'
import {colors} from '../styles'
import {Text,Card,CardItem,textShadow,Field,Load,CardRow} from '../common'
import Modal from '../Modal'
import ActionSheet from '../ActionSheet'
import {changeSelectedProduct,deleteProduct,loadProducts} from '../../actions'

class ProductList extends React.Component{ 
    constructor(props){
        super(props);
        this.state={
            goingToDelete:-1,
            modalVisible:false,
            searchVisible:false
        }
        this.setModalVisble = this.setModalVisible.bind(this);
        this.setSearchVisible = this.setSearchVisible.bind(this);
    }
    static navigationOptions={
        title:'انبارداری'
    }
    componentWillMount(){
        this.props.load();
    }
    setModalVisible(visible,productCode=-1){
        this.setState({
            modalVisible:visible,
            goingToDelete:productCode
        });
    }
    setSearchVisible(visible){
        this.setState({
            searchVisible:visible
        })
    }
    render(){
        const {wait,message,error,products,changeProduct,removeProduct} = this.props;
        const {navigate} = this.props.navigation;
        const {modalVisible,searchVisible} = this.state;
        const productList = products.map((product)=>(            
            <CardRow
                onLongPress={()=>this.setModalVisble(true,product.code)} 
                onPress={()=>{
                    changeProduct(product.code,()=>navigate('ProductCreate',{title:'ویرایش محصول'}))
                }}                    
                key={product.code}
                title={product.name}
                icon="pricetag"
                ItemOne={product.category.name}
                ItemTwo={product.subcategory.name}
                badgeTop={product.sellPrice+" تومان"}
                badgeBottom={product.count+" عدد"}/>
        ));
        return(
            <Container style={{backgroundColor:'white'}}>
                {message&&<Text success background> {message} </Text>}
                {error&& <Text error>{error}</Text>}
                <Load wait={wait} error={wait?null:error} onError={()=>this.props.load()}>
                    {productList}
                </Load>

                <ActionSheet title="جستجو" visible={searchVisible} setVisible={(visible)=>this.setSearchVisible(visible)}>    
                </ActionSheet>
            <Modal 
                title="آیا از حذف محصول مطمئن هستید؟"
                visible={modalVisible} 
                setVisible={(visible)=>this.setModalVisible(visible)}>      
                    <View style={{flexDirection:'row'}}>
                        <Button onPress={()=>this.setModalVisible(false)} style={{flex:1,justifyContent:'center',margin:4,backgroundColor:colors.negative}}>
                            <Text>خیر </Text>
                        </Button>
                        <Button style={{flex:1,justifyContent:'center',margin:4,backgroundColor:colors.positive}}
                         onPress={()=>{
                             removeProduct(this.state.goingToDelete);
                             this.setModalVisble(false);
                         }}>
                            <Text>بله!</Text>
                        </Button>
                    </View>      
            </Modal>
                <Body>
                </Body>
            <Footer style={{height:40,borderTopLeftRadius:16,borderTopRightRadius:16}}>
                <FooterTab style={{backgroundColor:colors.accent,borderTopLeftRadius:16,borderTopRightRadius:16}}>
                    <Button transparent onPress={()=>this.setSearchVisible(true)}>
                    <Icon name="search" style={{color:'white',fontSize:24}}/>
                    </Button>
                    <Button transparent onPress={()=>navigate('ProductCreate',{title:'اضافه کردن محصول'})}>
                    <Icon name="md-add-circle" style={{color:'white',fontSize:24}}/>
                    </Button>
                </FooterTab>
            </Footer>        
            </Container>
        );
    }
}
/*const mapStateToProps = (state, ownProps) => {
    let {products} =state;
    const {name,categoryId,subCategoryId} = state.search;

    if(name || categoryId || subCategoryId){
        products = products.filter((item)=>{
            let ret = true;

            if(name && !item.name.contains(name)){
                ret = false;
            }

            if(categoryId && categoryId !== item.categoryId){
                ret =false;
            }

            if(subCategoryId && subCategoryId !== item.subCategoryId){
                ret = false;
            }
            return ret;
        })
    }
    return {
        products: products.map(product=>{
            //console.log('single Product: ', product);
            const cat = state.categories.find((category)=>category.id == product.categoryId);
            const subCat = state.subCategories.find((subCategory)=>subCategory.id == product.subCategoryId);
            return (
                Object.assign({},product,
                    {
                        category:cat.name,
                        subCategory:subCat.name
                    })
            );
        })            

    }
}*/

const mapStateToProps = (state, ownProps) =>({
    wait:state.waitForResponse,
    message:state.message.products,
    error:state.error.products,
    products:state.products
})

const mapDispatchToProps = (dispatch, ownProps)=>({
    changeProduct:(productCode,callback)=>{
        dispatch(changeSelectedProduct(productCode));
        callback();        
    },
    removeProduct:(productCode)=>{
        dispatch(deleteProduct(productCode));
    },
    load:()=>{
        dispatch(loadProducts());
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(ProductList)