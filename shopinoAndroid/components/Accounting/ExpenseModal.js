import React,{Component} from 'react'
import {Button} from 'native-base'
import {Text,Card,CardItem,Field,SimpleLoad} from '../common'
import {colors} from '../styles'
import Modal from '../Modal'
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
        const onFade=()=>{
            clean();
        }
        if(message){
            setTimeout(()=>{
                setVisible(false);
                onFade();
            },1000);
        }
        return(
            <Modal
                title="اضافه کردن خرج" 
                visible={visible}
                setVisible={setVisible}
                onFade={onFade}>
                <Card column>
                    {message&&<Text success background>{message}</Text>}
                    <Field
                        icon="add"
                        label="عنوان"
                        input
                        error={error.title?error.title:null}
                        onChange={({nativeEvent})=>{changeExpense('title',nativeEvent.text)}}                   
                    />
                    <Field
                        icon="calendar"
                        placeholder="مبلغ"
                        label="تومان"
                        labelEnd
                        input
                        error={error.price?error.price:null}
                        onChange={({nativeEvent})=>{changeExpense('price',nativeEvent.text)}}                   
                    >
                    </Field>
                    <SimpleLoad wait={wait}>
                        <Button block rounded style={{backgroundColor:colors.accent,marginHorizontal:8}} 
                            onPress={()=>{createExpense()}}>
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