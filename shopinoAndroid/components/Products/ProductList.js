import React from 'react'
import {connect} from 'react-redux'
import {Icon,Container,Fab,View,Badge,Body,FooterTab,Footer,Button,Segment,Spinner} from 'native-base'
import {colors} from '../styles'
import {Text,Card,CardItem,textShadow,Field} from '../common'
import Modal from '../Modal'
import ActionSheet from '../ActionSheet'
import {changeSelectedProduct,deleteProduct} from '../../actions'

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
        const {products,changeProduct,removeProduct} = this.props;
        const {navigate} = this.props.navigation;
        const {modalVisible,searchVisible} = this.state;

        const productList = products.map((item)=>(
            <Card key={item.code} column>
                <CardItem onLongPress={()=>this.setModalVisble(true,item.code)} onPress={()=>{
                    changeProduct(item.code,()=>navigate('ProductCreate',{title:'ویرایش محصول'}));                    
                }}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
                        <View style={{flexDirection:'row'}}>
                        <Icon name="pricetags" style={{color:colors.primary,margin:2}}/>               
                        <Text style={{margin:2}} active>{item.name}</Text>
                        </View>
                        <Badge style={{backgroundColor:colors.accent}}><Text style={{padding:4}}>{item.sellPrice} تومان</Text></Badge>
                    </View>
                    <View style={{marginTop:8,flexDirection:'row',justifyContent:'space-around'}}>
                        <View style={{flex:1,flexDirection:'row',borderColor:colors.divider,borderTopWidth:0.5,borderLeftWidth:1}}>
                            <Icon name="md-arrow-dropleft" style={{color:colors.divider,paddingHorizontal:8}}/>
                            <Text style={{paddingTop:2}}>{item.category}</Text>
                        </View>
                        <View style={{flex:1,flexDirection:'row',borderColor:colors.divider,borderTopWidth:0.5,}}>
                            <Icon name="md-arrow-dropleft" style={{color:colors.divider,paddingHorizontal:8}}/>
                            <Text style={{paddingTop:2}}>{item.subCategory}</Text>
                        </View>
                        <Badge style={{flex:1,padding:2}} style={{backgroundColor:colors.primary}}><Text style={{padding:4}}>تعداد: {item.count}</Text></Badge>
                    </View>
                </CardItem>
            </Card>
        ));
        return(
            <Container style={{backgroundColor:'white'}}>
                <View style={{paddingVertical:4,paddingHorizontal:8}}>
                    {productList}  
                </View>

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
const mapStateToProps = (state, ownProps) => {
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
}


const mapDispatchToProps = (dispatch, ownProps)=>({
    changeProduct:(productCode,callback)=>{
        dispatch(changeSelectedProduct(productCode));
        callback();        
    },
    removeProduct:(productCode)=>{
        dispatch(deleteProduct(productCode));
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(ProductList)