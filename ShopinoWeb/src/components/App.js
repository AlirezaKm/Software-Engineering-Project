import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import HomePage from './HomePage/'
import Panel from './Panel/index'

const App = ({children})=>(
    <div id="root" style={{height:'100%'}}>
        {children}
    </div>
)
const HP = ()=> 
    <HomePage background={'./static/image/HomePageBackground.png'} />

const routes = (
    <Router>
        <App>
            <Route exact path="/" component={HP}/>
            <Route path="/panel" component={Panel}/>
        </App>
  </Router>
)

export default routes;
/*
const home=()=>
  <div> home </div>
const Products=()=>
    <div> products </div>
const Panel = ({ match }) => (
  <div>
    <h2>Topics</h2>
      <li>
        <Link to={`${match.url}/products`}>
          Rendering with React
        </Link>
      </li>
    
    <Route path={match.url} component={home}/>
    <Route path={`${match.url}/products`} component={Products}/>
  </div>
)

const BasicExample =(
  <Router>
    <div>
      <Route exact path="/" component={HP}/>
      <Route path="/panel" component={Panel}/>
    </div>
  </Router>     
)
export default BasicExample*/