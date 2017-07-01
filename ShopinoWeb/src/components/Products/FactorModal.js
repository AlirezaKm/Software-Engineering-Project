import React,{Component} from 'react'
import {Modal,Button,Message,Form,Label,Input} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {changeNewFactor,addFactor,cleanError,cleanNewFactor} from '../../actions'

class FactorModal extends Component{ 
    constructor(props){
        super(props);
        this.state={
            date:null
        }
        //this.showDatePicker = this.showDatePicker.bind(this);
        this.changeFactorInfo = this.changeFactorInfo.bind(this);
        //
    }
    changeFactorInfo(field,value){
        const {changeFactor} = this.props;
        let info={};
        info[field] = value?value:" ";
        changeFactor(info);// change Factor Info in the store
    }
    /*showDatePicker= async ()=>{
        try{
            const {action, year, month, day} = await DatePickerAndroid.open({
                mode:'spinner',
                date:Date.now()
            });
            if(action !== DatePickerAndroid.dismissedAction){
                this.setState({
                    date:year+'-'+month+'-'+day                    
                });
                this.changeFactorInfo('date',this.state.date);
            }
        }
        catch({code,message}){
            console.warn('Error opening Date Picker',message);
        }
}*/
    render(){
        const {wait,visible,setVisible,error,createFactor,message,clean} = this.props;
        const {date} = this.state;
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
                    اضافه کردن فاکتور
                </Modal.Header>
                <Modal.Content>
                    {message&&<Message color="green">{message}</Message>}
                    <Form>
                        <Form.Field>
                            <Input
                                icon="shop"
                                placeholder="خرید از"
                                onChange={(event,data)=>this.changeFactorInfo('seller',data.value)}
                            />
                            {error.seller&&
                                <Label basic color='red' pointing>{error.seller}</Label>
                            }                        
                        </Form.Field>
                        <Form.Field>
                            <Input
                                icon="calendar"
                                placeholder="تاریخ"
                                onChange={(event,data)=>this.changeFactorInfo('date',"2017-10-10")}
                            />
                            {error.date&&
                                <Label basic color='red' pointing>{error.date}</Label>
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
                        onClick={()=>createFactor()}
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
    message:state.message.factors,
    newFactor:state.newFactor
});
const mapDispatchToProps = (dispatch,ownProps)=>({
    changeFactor: (factorInfo)=>{
        dispatch(changeNewFactor(factorInfo));
    },
    createFactor:()=>{
        dispatch(addFactor());
    },
    clean:()=>{
        dispatch(cleanNewFactor());
        dispatch(cleanError('seller'));
        dispatch(cleanError('date'));
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(FactorModal)