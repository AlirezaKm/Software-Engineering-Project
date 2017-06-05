import React,{Component} from 'react'
import {Modal,View,TouchableHighlight} from 'react-native'
import {Button,Icon} from 'native-base'
import {connect} from 'react-redux'
import {Text,Field} from './common'
import {colors} from './styles'
import {changeSearch} from '../actions'

const styles={
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'flex-end',
        backgroundColor: 'transparent'
    },
    content:{
        paddingTop:4,
        backgroundColor: 'white'
    },
    modal:{
        backgroundColor:'white',
        borderTopRightRadius:16,
        borderTopLeftRadius:16,
/*        shadowColor:'black',
        shadowOffset:{width:10,height:10},
        shadowRadius:16,
        shadowOpacity:100,   */
        elevation:4,
        padding:8        
    },
    header:{
        flexDirection:'row',        
    },
    title:{
        padding:8,
        paddingTop:10
    },
    body:{
        padding:16
    }
}


class MyActionSheet extends Component{
    constructor(props){
        super(props);        
        
    }
    render(){        
        const {visible,title,label,icon,children,setVisible,changeSearchInfo} = this.props;        
        const fade = ()=>{
            setVisible(false); //TODO: find a way to do it internally
        };

        return(
            <Modal                
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={fade}
                >
                <View style={styles.container}>
                    <TouchableHighlight style={styles.content}>
                        <View style={styles.modal}>
                            <View style={styles.header}>
                                {setVisible&&
                                <Button onPress={fade} style={{alignSelf:'center'}} transparent small>
                                    <Icon name="close" style={{color:'red'}}/>
                                </Button>
                                }
                                <View style={{flex:1}}>
                                    <Field
                                        icon={icon}
                                        label={label}
                                        input
                                        onChange={(event)=>changeSearchInfo('name',event.nativeEvent.text)}/>
                                </View>
                            </View>                            

                        </View>
                    </TouchableHighlight>
                </View>
            </Modal>
        );
    }
}

const mapDispatchTopProps = (dispatch,ownProps) =>({
    changeSearchInfo:(field,value)=>{
        console.log(field," : ",value);
        let info ={};
        info[field] = value;
        console.log(info);
        dispatch(changeSearch(info));
    }
})

export default connect(null,mapDispatchTopProps)(MyActionSheet)