// index.js - UI

var React = require('react')
var ReactDOM = require('react-dom')

import injectTapEventPlugin from 'react-tap-event-plugin'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

var Index = require('./components/Index.react')
var Stock = require('./components/Stock.react')

// For Overall App - onTouchTap() for onClick
injectTapEventPlugin()

// Home Page
ReactDOM.render(
    (
        <Router history={hashHistory}>
            <Route path='/' component={Index}>
                <IndexRoute component={Stock} />
            </Route>
        </Router>
    ), document.getElementById('content'))