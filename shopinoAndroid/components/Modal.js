import React,{Component} from 'react'
import {Modal,View,TouchableHighlight} from 'react-native'
import {Button,Icon} from 'native-base'
import {Text} from './common'

const styles={
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        backgroundColor: 'rgba(52, 52, 52, 0.7)'
    },
    content:{       
        padding:16
    },
    modal:{
        backgroundColor:'white',
        borderRadius:16,
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

export default class MyModal extends Component{
    constructor(props){
        super(props);        
        
    }
    render(){        
        const {visible,title,children,setVisible,actionSheet,onFade} = this.props;        
        /*let actionSheetStyle={};
        if(actionSheet){
            actionSheetStyle={
            styles.container.backgroundColor='transparent';
            styles.content.paddingVertical=0;
            styles.content.paddingHorizontal=4;
            styles.content.justifyContent='flex-end';
            styles.body.paddingHorizontal=64;
            styles.modal.elevation=8;
            styles.modal.borderBottomLeftRadius=0;
            styles.modal.borderBottomRightRadius=0;
            styles.modal.height=200;
            }
            */
        const fade = ()=>{
            setVisible(false);
            if(onFade)
                onFade();
             //TODO: find a way to do it internally
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
                                <Button onPress={fade} transparent>
                                    <Icon name="close" style={{color:'red'}}/>
                                </Button>
                                <Text style={styles.title} active> {title} </Text>
                            </View>                            
                                {children}
                        </View>
                    </TouchableHighlight>
                </View>
            </Modal>
        );
    }
}