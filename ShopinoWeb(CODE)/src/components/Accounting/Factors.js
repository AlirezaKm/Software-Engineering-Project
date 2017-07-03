import React,{Component} from 'react'
import {connect} from 'react-redux'
import ErrorMessage from '../common/ErrorMessage'
import GridColumn from '../common/GridColumn'
import {Grid,Segment} from 'semantic-ui-react'
import {loadFactors} from '../../actions'

class Factors extends Component {
    
    componentWillMount(){
        this.props.load();
    }
    render(){
        const {wait,error,title,factors,changeFactor} = this.props;
        console.log('factors: ',factors);
        const factorViews = factors.map(({id,seller,date,count,sum})=>{
            return (
                <GridColumn
                    to={'/Panel/accounting/factors/'+id}
                    key={id}
                    title={id+"#"}
                    icon="tags" 
                    ItemOne={seller.name?seller.name:seller.id}
                    ItemTwo={count + 'عدد'}
                    badgeTop={sum + 'تومان'} 
                    badgeBottom={date}
            />)
        });
        return (
            <Segment basic loading={wait}>  
            {error&&<ErrorMessage error={error} onError={()=>this.props.load()}/>}     
                <Grid>
                {factorViews}
                </Grid>
            </Segment>
        )
    }
}
const mapStateToProps =(state,ownProps)=>({
    wait:state.waitForResponse,
    error:state.error.factors,
    factors:state.factors
})

const mapDispatchToProps = (dispatch,ownProps)=>({
    load:(page = 1)=>{
        dispatch(loadFactors(page,true));
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Factors)