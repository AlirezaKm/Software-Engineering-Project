import React,{Component} from 'react'
import {View} from 'native-base'
import {connect} from 'react-redux'
import {Text,CardRow} from '../common'
import {changeSelectedFactor} from '../../actions'

class Factors extends Component {
    
    render(){
        const {title,factors,navigate,changeFactor} = this.props;
        const factorViews = factors.map(({id,seller,date,count,sum})=>{
            const {day,month,year} = date;
            return (
                <CardRow
                    key={id}
                    title={id+"#"}
                    icon="pricetag" 
                    ItemOne={seller}
                    ItemTwo={count + 'عدد'}
                    badgeTop={sum + 'تومان'} 
                    badgeBottom={year+'/'+month+'/'+day}
                    onPress={()=>{
                        changeFactor(id);
                        navigate('FactorDetail');
                    }}
            />)
        });
        return (
            <View>                
                {factorViews}
            </View>
        )
    }
}
const mapStateToProps =(state,ownProps)=>{
    const factors = state.factors.map(factor=>({
        ...factor,
        count:state.products.filter(product=>product.factorId === factor.id).length
    }))
    console.log(factors)
    return {
        factors:factors
    }
}

const mapDispatchToProps = (dispatch,ownProps)=>({
    changeFactor:(factorId)=>{
        dispatch(changeSelectedFactor(factorId));
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Factors)