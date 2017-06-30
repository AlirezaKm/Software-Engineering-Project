import React,{Component} from 'react'
import {Button} from 'native-base'
import {Text,Card,CardItem,Field} from '../common'
import {colors} from '../styles'
import Modal from '../Modal'
import {connect} from 'react-redux'
import {changeNewCategory,addCategory} from '../../actions'

class CategoryModal extends Component{ 
    constructor(props){
        super(props);
        this.changeCategoryInfo = this.changeCategoryInfo.bind(this);
    }
    changeCategoryInfo(field,value){
        const {changeCategory} = this.props;
        let info={};
        info[field] = value?value:" ";
        changeCategory(info);// change Category Info in the store
    }
    render(){
        const {visible,setVisible,error,createCategory,message} = this.props;
        return(
            <Modal
                title="اضافه کردن دسته" 
                visible={visible}
                setVisible={setVisible}>
                <Card column>
                    <Field
                        icon="add"
                        label="نام"
                        input     
                        onChange={(event)=>this.changeCategoryInfo('name',event.nativeEvent.text)}
                        error={error.categoryName?error.categoryName:null}                  
                    />
                    <Button block rounded style={{backgroundColor:colors.accent,marginHorizontal:8}} onPress={()=>{
                        createCategory();
                    }}>
                        <Text> ثبت </Text>
                    </Button>
                </Card>
            </Modal>
            );
    }
}

const mapStateToProps =(state,ownProps)=>({
    error:state.error,
});
const mapDispatchToProps = (dispatch,ownProps)=>({
    changeCategory: (categoryInfo)=>{
        dispatch(changeNewCategory(categoryInfo));
    },
    createCategory:()=>{
        dispatch(addCategory());
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(CategoryModal)