// components/Stock.react.js
//
import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'
import ReactHighcharts from 'react-highcharts'
import StockStore from '../stores/StockStore'
import TextField from 'material-ui/TextField'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

//
function getStocks() {
    //
    return {
        config: {
            title: {
                text: 'Stock Quotes'
            },
            subtitle: {
                text: 'Source: www.quandl.com'
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'US dollars'
                }
            },
            series: [
                {
                    name: 'Facebook',   // set from User Input
                    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]    // set from Close -> data[4]
                },
                {
                    name: 'Google',
                    data: [9.9, 7.5, 16.4, 29.2, 44.0, 76.0, 15.6, 48.5, 216.4, 294.1, 395.6, 554.4]
                }
            ]
        }
    }
}
//
var Stock = React.createClass({
    //
    onStockChange: function() {
        this.setState(getStocks())
    },
    //
    getInitialState: function() {
        return getStocks()
    },
    //
    componentDidMount: function() {
        StockStore.addChangeListener(this.onStockChange)
    },
    componentWillUnmount: function() {
        StockStore.removeChangeListener(this.onStockChange)
    },
    //
    render: function() {
        return (
            <div>
                <ReactHighcharts config={this.state.config} />
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <TextField hintText='Type Stock Code..' />
                        <ToolbarSeparator />
                        <RaisedButton label='Add' />
                    </ToolbarGroup>
                </Toolbar>
            </div>
        )
    }
})

module.exports = Stock