import React,{Component} from 'react'
import {View,List,ListItem,Button,Text,Card,CardItem,Badge,Icon} from 'native-base'

const styles={
    header:{
        justifyContent:'center'
    },
    headerText:{
        fontWeight:'bold'
    },
    list:{
        flex:1,
        borderLeftWidth:1,
        borderLeftColor:'#efefef'
    },
    card:{
        flexDirection:'column'
    },
    cardItem:{
        flexDirection:'row-reverse',
        justifyContent:'space-between'
    }
}

export default class CatList extends Component{
    render(){
        const {
            dataArray,
            header,
            onItemPress,
            errMessage} 
        =this.props;

        return(
            <View style={styles.list}>

                <ListItem style={styles.header} itemDivider>
                    <Text style={styles.headerText}>{header}</Text>
                </ListItem>
                {dataArray?
                    <List 
                    dataArray={dataArray}
                    renderRow={(item)=>(
                        <Card> 
                            <CardItem style={styles.cardItem} onPress={onItemPress?()=> onItemPress(item):null}>
                                <Text>{item.name}</Text>
                                <Button transparent>
                                    <Icon name="md-create"/>
                                </Button>
                            </CardItem>

                            <CardItem style={styles.cardItem} onPress={onItemPress?()=> onItemPress(item):null}> 

                                <Text>تعداد: 16</Text>
                                
                                <Badge info>
                                    <Text>10%</Text>
                                </Badge>

                            </CardItem>

                        </Card>                    
                    )}/>
                    :<Text>{errMessage}</Text>}

            </View>
        );
    }
}