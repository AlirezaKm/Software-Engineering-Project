import React from 'react'
import {connect} from 'react-redux'
import {Container,Icon,Badge,CardItem,Input,List,View,ListItem,Button} from 'native-base'
import {TextInput} from 'react-native'
import Fab from '../common/Fab'
import Modal from '../common/Modal'
import CatList from './CatList'
import {changeSelectedCategory} from '../../actions'
const styles={
    container:{
        flexDirection:'row-reverse'
    }
}
class ProductHome extends React.Component{ 
    constructor(props){
        super(props);

        this.state = {
            modalVisible:false
        };

        this.setModalVisible = this.setModalVisible.bind(this);
    }
    static navigationOptions={
        tabBar:{
            label:'خانه',
            icon:()=>(
                <Icon name="pricetags"/>
            )
        }
    }
    setModalVisible(visible){
        this.setState({
            modalVisible:visible
        });
    }
    render(){
        const {changeCategory,categories,selectedSubCategories} = this.props;   
        const {modalVisible} = this.state;     
        return(
            <Container>            
            <Fab buttonArray={
                [{name:'md-done-all',onPress:()=>this.setModalVisible(true)},
                {name:'add',onPress:()=>this.setModalVisible(true)}]}/>

                <Modal visible={modalVisible} setVisible={(visible)=>this.setModalVisible(visible)}>
                    <TextInput placeholder="سلام"/>
                </Modal>
                <View style={styles.container}>
                <CatList dataArray={categories} header={'دسته ها'} 
                    onItemPress={(item)=>changeCategory(item.id)}                        
                        />
                <CatList dataArray={selectedSubCategories} header={'زیر دسته ها'}/>                

                </View>
            </Container>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.categories,
        selectedSubCategories:state.subCategories.filter((item)=>item.categoryId == state.selectedCategory)
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeCategory:(categoryId)=>{
            dispatch(changeSelectedCategory(categoryId));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductHome)