import React,{Component} from 'react'
import {Button} from 'native-base'
import {Text,Card,CardItem,Field,SimpleLoad} from '../common'
import {colors} from '../styles'
import Modal from '../Modal'
import {connect} from 'react-redux'
import {changeNewCategory,addCategory,cleanNewCatgory,cleanError} from '../../actions'

class CategoryModal extends Component{ 
    changeCategoryInfo(field,value){
        const {changeCategory} = this.props;
        let info={};
        info[field] = value?value:" ";
        changeCategory(info);// change Category Info in the store
    }
    render(){
        const {visible,setVisible,error,createCategory,message,clean,wait} = this.props;
        const onFade = ()=>clean();
        if(message){
            setTimeout(()=>{
                setVisible(false);
                onFade();
            },1000);
        }
        return(
            <Modal
                title="اضافه کردن دسته" 
                visible={visible}
                setVisible={setVisible}
                onFade={onFade}>
                <Card column>
                    {message&&<Text success background>{message}</Text>}
                    <Field
                        icon="add"
                        label="نام"
                        input     
                        onChange={(event)=>this.changeCategoryInfo('name',event.nativeEvent.text)}
                        error={error.categoryName?error.categoryName:null}                  
                    />
                    <SimpleLoad wait={wait}>
                        <Button block rounded style={{backgroundColor:colors.accent,marginHorizontal:8}} onPress={()=>{
                            createCategory();
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
    message:state.message.category,
    error:state.error,
});
const mapDispatchToProps = (dispatch,ownProps)=>({
    changeCategory: (categoryInfo)=>{
        dispatch(changeNewCategory(categoryInfo));
    },
    createCategory:()=>{
        dispatch(addCategory());
    },
    clean:()=>{
        dispatch(cleanNewCatgory());
        dispatch(cleanError('categoryName'));
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(CategoryModal)