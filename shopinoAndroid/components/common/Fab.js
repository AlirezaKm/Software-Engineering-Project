import React,{Component} from 'react'
import {Fab,Button,Icon} from 'native-base'
import {colors} from '../styles'
const styles={
    fab:{
        backgroundColor:colors.accent
    },
    button:{
        backgroundColor:colors.accent
    }
}

export default class CustomFab extends Component{
    //propTypes
    constructor(props){
        super(props);

        this.state={
            active:false
        }

        this.onToggle = this.onToggle.bind(this);
    }
    onToggle(){
        const {active} = this.state;
        this.setState({
            active:!active
        });
    }
    render(){
        const {position,direction,buttonArray,buttonStyle,icon} = this.props;
        const {active} = this.state;
        return (
            <Fab
                style={styles.fab}
                direction={direction?direction:"up"}
                position={position?position:"bottomRight"}
                active={active}
                onPress={this.onToggle}>

                        <Icon name={icon?icon:"md-create"}/>

                        {buttonArray &&
                            buttonArray.map((button,index)=>
                                <Button style={buttonStyle?buttonStyle:styles.button} 
                                        key={index}
                                        onPress={()=>button.onPress()}>
                                    <Icon name={button.name}/>
                                </Button>)}
            </Fab>
        );
    }
}