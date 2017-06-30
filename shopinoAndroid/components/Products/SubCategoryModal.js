import React,{Component} from 'react'
import {Button} from 'native-base'
import {Text,Card,CardItem,Field,SimpleLoad} from '../common'
import {colors} from '../styles'
import Modal from '../Modal'
import {connect} from 'react-redux'
import {changeNewSubCategory,addSubCategory,cleanError,cleanNewSubCategory} from '../../actions'

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
        const {wait,visible,setVisible,error,createSubCategory,message,clean} = this.props;
        const onFade = ()=>clean();
        if(message){
            setTimeout(()=>{
                setVisible(false);
                onFade();
            },1000);
        }
        return(
            <Modal
                title="اضافه کردن زیر دسته" 
                visible={visible}
                setVisible={setVisible}
                onFade={onFade}>
                <Card column>
                    {message&&<Text success background>{message}</Text>}
                    <Field
                        icon="add"
                        label="نام"
                        input     
                        onChange={(event)=>this.changeSubCategoryInfo('name',event.nativeEvent.text)}
                        error={error.subCategoryName?error.subCategoryName:null}                  
                    />
                    <SimpleLoad wait={wait}>
                        <Button block rounded style={{backgroundColor:colors.accent,marginHorizontal:8}} onPress={()=>{
                            createSubCategory();
                        }}>
                            <Text> ثبت </Text>
                        </Button>
                    </SimpleLoad>
                </Card>
            </Modal>
            );
    }
}

const mapStateToProps =(state,ownProps)=>({
    wait:state.waitForResponse,
    message:state.message.subCategory,
    error:state.error,
});
const mapDispatchToProps = (dispatch,ownProps)=>({
    changeSubCategory: (subCategoryInfo)=>{
        dispatch(changeNewSubCategory(subCategoryInfo));
    },
    createSubCategory:()=>{
        dispatch(addSubCategory());
    },
    clean:()=>{
        dispatch(cleanError('subCategoryName'));
        dispatch(cleanNewSubCategory());
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(SubCategoryModal)