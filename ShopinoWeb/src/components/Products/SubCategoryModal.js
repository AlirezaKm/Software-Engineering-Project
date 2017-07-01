import React,{Component} from 'react'
import {Modal,Button,Message,Form,Label,Input} from 'semantic-ui-react'
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
                    اضافه کردن زیر دسته
                </Modal.Header>
                <Modal.Content>
                    {message&&<Message color="green">{message}</Message>}
                    <Form>
                        <Form.Field>
                            <Input
                                icon="checkmark"
                                placeholder="نام زیر دسته جدید را وارد کنید"
                                onChange={(event,data)=>this.changeSubCategoryInfo('name',data.value)}
                            />
                            {error.subCategoryName&&
                                <Label basic color='red' pointing>{error.subCategoryName}</Label>
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
                        onClick={()=>createSubCategory()}
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