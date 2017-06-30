import React,{Component} from 'react'
import {Modal,View,TouchableHighlight} from 'react-native'
import {Button,Icon} from 'native-base'
import {Text} from '../common'

const styles={
    container:{
        flex:1,
        backgroundColor: 'rgba(52, 52, 52, 0.7)'
    },
    content:{
        flex:1,        
        justifyContent:'center',
        padding:16
    },
    modal:{
        flexDirection:'column',
        backgroundColor:'white',
        borderRadius:8,
        padding:4
    },
    header:{
        flexDirection:'row',        
    },
    title:{
        padding:8,
        paddingTop:10
    },
    body:{
        paddingHorizontal:16
    }
}

export class MyModal extends Component{
    constructor(props){
        super(props);        
        this.state={            
            modalVisible:false
        }
        this.setVisible = this.setVisible.bind(this);
    }
    setVisible(visible){
        this.setState({
            modalVisible:visible
        })
    }
    componentDidMount(){
        this.setVisible(this.props.visible);
    }
    render(){        
        const {title,children} = this.props;
        const {modalVisible} = this.state;
        
        const fade = ()=>this.setVisible(false);

        return(
            <Modal                
                animationType="slide"
                transparent={true}
                visible={true}
                onRequestClose={fade}
                >
                <View style={styles.container}>
                    <TouchableHighlight style={styles.content}>
                        <View style={styles.modal}>
                            <View style={styles.header}>
                                <Button onPress={fade} transparent>
                                    <Icon name="close"/>
                                </Button>
                                <Text style={styles.title} active> {title} </Text>
                            </View>
                            <View style={styles.body}>
                                {children}
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
            </Modal>
        );
    }
}