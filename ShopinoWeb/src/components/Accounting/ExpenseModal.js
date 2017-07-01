import React,{Component} from 'react'
import {Modal,Button,Message,Form,Label,Input} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {changeNewExpense,addExpense,cleanNewExpense} from '../../actions/Accounting'
import {cleanError} from '../../actions'
class ExpenseModal extends Component{ 
    render(){
        const {
            wait,
            visible,
            setVisible,
            error,
            changeExpense,
            createExpense,
            message,
            clean
        } = this.props;
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
                    اضافه کردن خرج
                </Modal.Header>
                <Modal.Content>
                    {message&&<Message color="green">{message}</Message>}
                    {error.expenses&&<Message negative>{error.expenses}</Message>}
                    <Form>
                        <Form.Field>
                            <Input
                                icon="checkmark"
                                placeholder="عنوان خرج را وارد کنید"
                                onChange={(event,data)=>changeExpense('title',data.value)} 
                            />
                            {error.title&&
                                <Label basic color='red' pointing>{error.title}</Label>
                            }                        
                        </Form.Field>
                        <Form.Field>
                            <Input
                                icon="dollar"
                                placeholder="مبلغ"
                                onChange={(event,data)=>changeExpense('price',data.value)} 
                            />
                            {error.price&&
                                <Label basic color='red' pointing>{error.price}</Label>
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
                        onClick={()=>createExpense()}
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
    error:state.error,
    message:state.message.expenses
});
const mapDispatchToProps = (dispatch,ownProps)=>({
    changeExpense:(field,value)=>{
        let info={};
        info[field] =value;
        dispatch(changeNewExpense(info));
    },
    createExpense:()=>{
        dispatch(addExpense());
    },
    clean:()=>{
        dispatch(cleanNewExpense());
        dispatch(cleanError('title'));
        dispatch(cleanError('price'));
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(ExpenseModal)