import React from 'react'
import {Segment,Button,Input} from 'semantic-ui-react'
import {Route,Link} from 'react-router-dom'
import ProductList from './ProductList'
import ProductCreate from './ProductCreate'
import {changeSearch} from '../../actions'
import {connect} from 'react-redux'

const Products = ({match,location,changeSearchInfo})=>{
    console.log('location:',location);
    const isproductlist = location.pathname == "/Panel/products";
    return(
        <div>
            <Segment> 
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <h3 style={{display:'inline'}}> محصولات </h3>
                    {isproductlist
                        &&<Input placeholder="جستجو" onChange={(event,data)=>{
                            changeSearchInfo('name',data.value);
                        }}/>}
                    {isproductlist
                        &&<Link to="/Panel/products/create">
                            <Button color="yellow"> محصول جدید </Button>
                        </Link>
                    }
                </div>
            </Segment>
            <Route exact path={match.url} component={ProductList}/>
            <Route exact path={`${match.url}/edit/:productCode`} component={ProductCreate}/>
            <Route exact path={`${match.url}/create`} component={ProductCreate}/>
        </div>
    );
}
const mapDispatchTopProps = (dispatch,ownProps) =>({
    changeSearchInfo:(field,value)=>{
        console.log(field," : ",value);
        let info ={};
        info[field] = value;
        console.log(info);
        dispatch(changeSearch(info));
    }
})
export default connect(null,mapDispatchTopProps)(Products)

