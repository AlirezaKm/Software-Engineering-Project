import React,{Component} from 'react'
import {Image} from 'react-native'
import {NavigationActions} from 'react-navigation'
import {Container,View,Fab,Button,Icon,Thumbnail} from 'native-base'
import {Text,Card,CardItem,Row,SimpleLoad} from '../common'
import {homepageStyles,colors} from '../styles'
import warehouseIcon from '../../assets/images/warehouse.png'
import accounting from '../../assets/images/accounting.png'
import seller from '../../assets/images/seller.png'
import clerks from '../../assets/images/clerks.png'
import settings from '../../assets/images/settings.png'
import logs from '../../assets/images/logs.png'
import userIcon from '../../assets/images/profile.png'
import {connect} from 'react-redux'
import {logout} from '../../actions'

const styles = homepageStyles;


const MenuItem = ({image,title,onPress})=>
    <CardItem style={styles.cardItem} parentStyle={{flex:1}} onPress={onPress}>
        <Image source={image} style={styles.icon}/>
        <Text style={styles.title} active> {title} </Text>                        
    </CardItem>

class HomePage extends Component{
    render(){
        const {wait,logout} = this.props;
        const {navigate} = this.props.navigation;
        return(
            <Container style={styles.container}>
                <View style={{flex:2,backgroundColor:colors.darkPrimary,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>                    
                    <SimpleLoad wait={wait}>
                        <Button style={{alignSelf:'center'}} transparent
                            onPress={()=>{
                                logout(()=>{
                                    const resetAction = NavigationActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({ routeName: 'Login'})
                                    ]
                                    })
                                    this.props.navigation.dispatch(resetAction);
                                })
                            }}>
                            <Icon name="log-out" style={{fontSize:32,color:colors.accent}}/>
                        </Button>
                    </SimpleLoad>
                    <Button style={{alignSelf:'center'}} transparent large><Thumbnail style={{width:62,height:62}} circular source={userIcon}/></Button>
                    <Button style={{alignSelf:'center'}} transparent><Icon name="md-notifications" style={{fontSize:32,color:colors.accent}}/></Button>
                </View>
                <Card style={{flex:3}}>
                    <MenuItem image={warehouseIcon} title="انبارداری" onPress={()=>navigate('ProductList')}/>                    
                    <MenuItem image={accounting} title="حسابداری" onPress={()=>navigate('Accounting',{
                        title:'فاکتورهای فروش',
                        ExpenseModalVisible:false
                    })}/>                    
                </Card>
                <Card style={{flex:3}}>
                    <MenuItem image={seller} title="فروش" onPress={()=>navigate('Selling')}/>                    
                    <MenuItem image={clerks} title="کارمندان" onPress={()=>navigate('Users')}/>                    
                </Card>
                <Card style={{flex:3}}>
                    <MenuItem image={logs} title="لاگ" onPress={()=>navigate('Logs')}/>                    
                    <MenuItem image={settings} title="تنظیمات"/>                    
                </Card>
            </Container>
        );
    }
}

const mapStateToProps= (state)=>({
    wait:state.waitForResponse
});
const mapDispatchToProps = (dispatch)=>({
    logout:(callback)=>{
        dispatch(logout(callback));
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(HomePage)