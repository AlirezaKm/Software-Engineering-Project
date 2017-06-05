import React,{Component} from 'react'
import {Button} from 'native-base'
import {Text,Card,CardItem,Field} from '../common'
import {colors} from '../styles'
import Modal from '../Modal'
import {connect} from 'react-redux'
import {changeNewSubCategory,addSubCategory} from '../../actions'

class SubCategoryModal extends Component{ 
    constructor(props){
        super(props);
        this.changeSubCategoryInfo = this.changeSubCategoryInfo.bind(this);
    }
    changeSubCategoryInfo(field,value){
        const {changeSubCategory} = this.props;
        let info={};
        info[field] = value?value:" ";
        changeSubCategory(info);// change Category Info in the store
    }
    render(){
        const {visible,setVisible,error,createSubCategory,message} = this.props;
        return(
            <Modal
                title="اضافه کردن زیر دسته" 
                visible={visible}
                setVisible={setVisible}>
                <Card column>
                    <Field
                        icon="add"
                        label="نام"
                        input     
                        onChange={(event)=>this.changeSubCategoryInfo('name',event.nativeEvent.text)}
                        error={error.subCategoryName?error.subCategoryName:null}                  
                    />
                    <Button block rounded style={{backgroundColor:colors.accent,marginHorizontal:8}} onPress={()=>{
                        createSubCategory();
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
    changeSubCategory: (subCategoryInfo)=>{
        dispatch(changeNewSubCategory(subCategoryInfo));
    },
    createSubCategory:()=>{
        dispatch(addSubCategory());
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(SubCategoryModal)