import React,{Component} from 'react'
import {Modal,Button,Message,Form,Label,Input} from 'semantic-ui-react'
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
        const fade=()=>{
            setVisible(false);
            onFade();
        }
        const onFade = ()=>clean();
        if(message){
            setTimeout(()=>{
                fade();
            },1000);
        }
        return(
            <Modal size="small" open={visible} >
                <Modal.Header>
                    اضافه کردن دسته
                </Modal.Header>
                <Modal.Content>
                    {message&&<Message color="green">{message}</Message>}
                    <Form>
                        <Form.Field>
                            <Input
                                icon="checkmark"
                                placeholder="نام دسته جدید را وارد کنید"
                                onChange={(event,data)=>this.changeCategoryInfo('name',data.value)}
                            />
                            {error.categoryName&&
                                <Label basic color='red' pointing>{error.categoryName}</Label>
                            }                        
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={fade}>
                    لغو
                    </Button>
                    <Button 
                        loading={wait}
                        onClick={()=>createCategory()}
                        color="yellow" 
                        icon='checkmark'
                        labelPosition='right'
                        content={<span>اضافه کردن</span>} />
                </Modal.Actions>
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