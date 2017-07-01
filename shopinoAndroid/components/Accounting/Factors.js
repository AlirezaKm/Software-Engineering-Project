import React,{Component} from 'react'
import {View} from 'native-base'
import {connect} from 'react-redux'
import {Text,CardRow,Load} from '../common'
import {changeSelectedFactor,loadFactors} from '../../actions'

class Factors extends Component {
    
    componentWillMount(){
        this.props.load();
    }
    render(){
        const {wait,error,title,factors,navigate,changeFactor} = this.props;
        const factorViews = factors.map(({id,seller,date,count,sum})=>{
            return (
                <CardRow
                    key={id}
                    title={id+"#"}
                    icon="pricetag" 
                    ItemOne={seller.name}
                    ItemTwo={count + 'عدد'}
                    badgeTop={sum + 'تومان'} 
                    badgeBottom={date}
                    onPress={()=>{
                        changeFactor(id);
                        navigate('FactorDetail',{factorId:id});
                    }}
            />)
        });
        return (
            <Load wait={wait} error={wait?null:error} onError={()=>this.props.load()}>        
                {factorViews}
            </Load>
        )
    }
}
const mapStateToProps =(state,ownProps)=>({
    wait:state.waitForResponse,
    error:state.error.factors,
    factors:state.factors
})

const mapDispatchToProps = (dispatch,ownProps)=>({
    changeFactor:(factorId)=>{
        dispatch(changeSelectedFactor(factorId));
    },
    load:(page = 1)=>{
        dispatch(loadFactors(page,true));
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Factors)