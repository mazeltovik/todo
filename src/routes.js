const React = require('react')
const ReactRouter = require('react-router')
const History = require('history')
const {
  Router,
  Route,
  IndexRoute,
  withRouter,
} = ReactRouter
let hashHistory = ReactRouter.useRouterHistory(History.createHashHistory)({
  queryKey: false
})
const All = require('components/all/all.js')
const Active = require('components/active/active.js')
const Completed = require('components/completed/completed.js')
const Main = require('components/main/main.js')
module.exports = (
    <Router history={hashHistory}>
    <Route path="/" component={Main} >
      <IndexRoute component={withRouter(All)}/>
      <Route path="/all" component={withRouter(All)} />
      <Route path="/active" component={withRouter(Active)}/>
      <Route path="/completed" component={withRouter(Completed)}/>
    </Route>
  </Router>
)