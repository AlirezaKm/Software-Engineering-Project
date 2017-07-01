import React from 'react'
import {Grid,Segment,Button,Modal,Message} from 'semantic-ui-react'
import GridColumn from '../common/GridColumn'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {changeSelectedProduct,deleteProduct,loadProducts} from '../../actions'

const DeleteProductModal=({visible,fade,onClick})=>
    <Modal size="small" open={visible} >
          <Modal.Header>
            آیا از حذف محصول مطمئن هستید؟
          </Modal.Header>
          <Modal.Actions>
            <Button onClick={fade}>
              لغو
            </Button>
            <Button 
                onClick={()=>{
                    onClick();
                    fade();
                }}
                color="yellow" 
                icon='checkmark'
                labelPosition='right'
                content={<span>بله!</span>} />
          </Modal.Actions>
    </Modal>

class ProductList extends React.Component{ 
    constructor(props){
        super(props);
        this.state={
            goingToDelete:-1,
            modalVisible:false,
            searchVisible:false
        }
        //this.setModalVisble = this.setModalVisible.bind(this);
        //this.setSearchVisible = this.setSearchVisible.bind(this);
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
        const {wait,message,error,products,removeProduct} = this.props;
        const {modalVisible,searchVisible} = this.state;
        console.log('modelVisible:',modalVisible);
        const productList = products.map((product)=>(
            <GridColumn
                to={'/Panel/products/edit/'+product.code}
                onLongPress={()=>this.setModalVisible(true,product.code)}
                icon="tags"
                title={product.name}
                ItemOne={product.category.name}
                ItemTwo={product.subcategory.name}
                badgeTop={product.sellPrice + ' تومان'}
                badgeBottom={product.count + ' عدد'}
            />
        ));
        return(
            <Segment basic loading={wait}>
                <div style={{display:'flex',justifyContent:'center'}}>
                <DeleteProductModal visible={modalVisible} 
                    onClick={()=>removeProduct(this.state.goingToDelete)}
                 fade={()=>this.setModalVisible(false)}/>
                {error&&<Button onClick={()=>this.props.load()}> سعی مجدد </Button>}
                </div>
                <Grid padded>
                    {productList}            
                </Grid>
            </Segment>
        );
    }
}

const mapStateToProps = (state, ownProps) =>({
    wait:state.waitForResponse,
    message:state.message.products,
    error:state.error.products,
    products:state.products
})

const mapDispatchToProps = (dispatch, ownProps)=>({
    removeProduct:(productCode)=>{
        dispatch(deleteProduct(productCode));
    },
    load:()=>{
        dispatch(loadProducts());
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(ProductList)