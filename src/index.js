// index.js - UI

var React = require('react')
var ReactDOM = require('react-dom')

import { Router, Route, hashHistory, IndexRoute } from 'react-router'

var Index = require('./components/Index.react')
var Stock = require('./components/Stock.react')
var TwitterStream = require('./components/TwitterStream.react')

// Home Page
ReactDOM.render(
    (
        <Router history={hashHistory}>
            <Route path='/' component={Index}>
                <IndexRoute component={Stock} />
                <Route path='/tweets' component={TwitterStream}></Route>
            </Route>
        </Router>
    ), document.getElementById('content'))