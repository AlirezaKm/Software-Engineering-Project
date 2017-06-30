import React, {Component} from 'react'
import {Icon,View,Badge} from 'native-base'
import Text from './Text'
import Card from './Card'
import CardItem from './CardItem'
import {colors} from '../styles'

class CardRow extends Component{
    render(){
        const {title,icon,ItemOne,ItemTwo,badgeTop,badgeBottom,onPress} = this.props;
        return (            
            <Card column>
                <CardItem onPress={onPress}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
                        <View style={{flexDirection:'row'}}>
                        <Icon name={icon} style={{color:colors.primary,margin:2}}/>               
                        <Text style={{margin:2}} active>{title}</Text>
                        </View>
                        <Badge style={{backgroundColor:colors.accent}}><Text style={{padding:4}}>{badgeTop}</Text></Badge>
                    </View>
                    <View style={{marginTop:8,flexDirection:'row',justifyContent:'space-around'}}>
                        <View style={{flex:1,flexDirection:'row',borderColor:colors.divider,borderTopWidth:0.5}}>
                            <Icon name="md-arrow-dropleft" style={{color:colors.divider,paddingHorizontal:8}}/>
                            <Text style={{paddingTop:2}}>{ItemOne}</Text>
                        </View>
                        {ItemTwo&&
                            <View style={{flex:1,flexDirection:'row',borderColor:colors.divider,borderTopWidth:0.5,borderRightWidth:1}}>
                                <Icon name="md-arrow-dropleft" style={{color:colors.divider,paddingHorizontal:8}}/>
                                <Text style={{paddingTop:2}}>{ItemTwo}</Text>
                            </View>
                        }
                        <Badge style={{flex:1,padding:2}} style={{backgroundColor:colors.primary}}>
                            <Text style={{padding:4}}>{badgeBottom}</Text>
                        </Badge>
                    </View>
                </CardItem>
            </Card>
        );
    }
}
export default CardRow;