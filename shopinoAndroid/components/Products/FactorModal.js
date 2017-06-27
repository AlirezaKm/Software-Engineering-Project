import React,{Component} from 'react'
import {DatePickerAndroid} from 'react-native'
import {Button} from 'native-base'
import {Text,Card,CardItem,Field,SimpleLoad} from '../common'
import {colors} from '../styles'
import Modal from '../Modal'
import {connect} from 'react-redux'
import {changeNewFactor,addFactor,cleanError,cleanNewFactor} from '../../actions'

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
        const {wait,visible,setVisible,error,createFactor,message,clean} = this.props;
        const {date} = this.state;
        const onFade = ()=>clean();
        if(this.timer == null && message){
            this.timer = setTimeout(()=>{
                setVisible(false);
                onFade();
                this.timer = null;
            },1000);
        }
        return(
            <Modal
                title="اضافه کردن فاکتور" 
                visible={visible}
                setVisible={setVisible}
                onFade={onFade}>
                <Card column>
                    {message&&<Text success background>{message}</Text>}
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
                    <SimpleLoad wait={wait}>
                        <Button block rounded style={{backgroundColor:colors.accent,marginHorizontal:8}} onPress={()=>{
                            createFactor();
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
    error:state.error,
    message:state.message.factor,
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