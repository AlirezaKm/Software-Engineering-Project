import React,{Component} from 'react'
import {Button} from 'native-base'
import {Text,Card,CardItem,Field} from '../common'
import {colors} from '../styles'
import Modal from '../Modal'
import {connect} from 'react-redux'
import {changeNewExpense,addExpense} from '../../actions/Accounting'

class ExpenseModal extends Component{ 
    render(){
        const {
            visible,
            setVisible,
            error,
            changeExpense,
            createExpense
        } = this.props;
        return(
            <Modal
                title="اضافه کردن خرج" 
                visible={visible}
                setVisible={setVisible}>
                <Card column>
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
                    <Button block rounded style={{backgroundColor:colors.accent,marginHorizontal:8}} 
                        onPress={()=>{createExpense()}}>
                        <Text> ثبت </Text>
                    </Button>
                </Card>
            </Modal>
            );
    }
}

const mapStateToProps =(state,ownProps)=>({
    error:state.error
});
const mapDispatchToProps = (dispatch,ownProps)=>({
    changeExpense:(field,value)=>{
        let info={};
        info[field] =value;
        dispatch(changeNewExpense(info));
    },
    createExpense:()=>{
        dispatch(addExpense());
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(ExpenseModal)