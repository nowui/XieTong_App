import React, { PropTypes } from 'react'
import { Router, Route, IndexRedirect } from 'react-router'
import NotFound from '../components/NotFound'
import Login from '../components/Login'
import Index from '../components/Index'
import Course from '../components/Course'
import History from '../components/History'
import Mine from '../components/Mine'
import MyCourse from '../components/MyCourse'
import Password from '../components/Password'
import Helper from '../common/Helper'

const validate = function (next, replace, callback) {
    if (!Helper.getToken() && next.location.pathname != '/login') {
        replace('/login')
    }
    callback()
}

const Routes = ({ history }) =>
  <Router history={history}>
    <Route path="/" onEnter={validate}>
    	<IndexRedirect to="index" />
      <Route path="index" component={Index}></Route>
      <Route path="course/:course_id" component={Course}></Route>
      <Route path="history/:course_id" component={History}></Route>
      <Route path="mine" component={Mine}></Route>
      <Route path="mycourse" component={MyCourse}></Route>
      <Route path="password" component={Password}></Route>
	    <Route path="login" component={Login}></Route>
	    <Route path="*" component={NotFound}></Route>
    </Route>
  </Router>

Routes.propTypes = {
  history: PropTypes.any,
}

export default Routes
