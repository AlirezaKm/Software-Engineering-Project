import React,{Component} from 'react'
import {DatePickerAndroid} from 'react-native'
import {Button} from 'native-base'
import {Text,Card,CardItem,Field} from '../common'
import {colors} from '../styles'
import Modal from '../Modal'
import {connect} from 'react-redux'
import {changeNewFactor,addFactor} from '../../actions'

class FactorModal extends Component{ 
    constructor(props){
        super(props);
        this.state={
            date:null
        }
        this.showDatePicker = this.showDatePicker.bind(this);
        this.changeFactorInfo = this.changeFactorInfo.bind(this);
    }
    changeFactorInfo(field,value){
        const {changeFactor} = this.props;
        let info={};
        info[field] = value?value:" ";
        changeFactor(info);// change Factor Info in the store
    }
    showDatePicker= async ()=>{
        try{
            const {action, year, month, day} = await DatePickerAndroid.open({
                mode:'spinner',
                date:Date.now()
            });
            if(action !== DatePickerAndroid.dismissedAction){
                this.setState({
                    date:{
                        year:year,
                        month:month,
                        day:day
                    }
                })
                this.changeFactorInfo('date',this.state.date);
            }
        }
        catch({code,message}){
            console.warn('Error opening Date Picker',message);
        }
    }
    render(){
        const {visible,setVisible,error,createFactor,message} = this.props;
        const {date} = this.state;
        return(
            <Modal
                title="اضافه کردن فاکتور" 
                visible={visible}
                setVisible={setVisible}>
                <Card column>
                    <Field
                        icon="add"
                        label="خرید از"
                        input     
                        onChange={(event)=>this.changeFactorInfo('seller',event.nativeEvent.text)}
                        error={error.seller?error.seller:null}                  
                    />
                    <Field
                        icon="calendar"
                        label="تاریخ"
                        error={error.date?error.date:null}
                    >
                        <Button transparent onPress={()=>this.showDatePicker()}>
                            <Text> {date?date.year+':'+date.month+':'+date.day:'انتخاب کنید'} </Text>
                        </Button>
                    </Field>
                    <Button block rounded style={{backgroundColor:colors.accent,marginHorizontal:8}} onPress={()=>{
                        createFactor();
                        setTimeout(()=>{
                            if(message.factor){
                                setVisible(false);
                            }
                        },2000);
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
    message:state.message,
    newFactor:state.newFactor
});
const mapDispatchToProps = (dispatch,ownProps)=>({
    changeFactor: (factorInfo)=>{
        dispatch(changeNewFactor(factorInfo));
    },
    createFactor:()=>{
        dispatch(addFactor());
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(FactorModal)