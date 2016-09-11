// components/Stock.react.js
//
import Chip from 'material-ui/Chip'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'
import ReactHighcharts from 'react-highcharts'
import StockActions from '../actions/StockActions'
import StockStore from '../stores/StockStore'
import TextField from 'material-ui/TextField'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import { cyan400, white } from 'material-ui/styles/colors'

// Chip styles
const styles = {
    chip: {
        margin: 4
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap'
    }
}

//
function getStocks() {
    //
    return {
        names: StockStore.getNames(),
        //
        config: {
            title: {
                text: 'Stock Quotes'
            },
            subtitle: {
                text: 'Source: www.quandl.com'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Value (in USD)'
                }
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: false
                    }
                }
            },
            series: StockStore.getSeries()
        }
    }
}
//
var Stock = React.createClass({
    // Add Stock
    handleAddStock: function() {
        //
        var code = this.addStock.getValue()
        var names = this.state.names
        for(var i = 0; i < names.length; i++) {
            if(names[i].code.toUpperCase() === code.toUpperCase()){
                alert('You already have '+names[i].name)
                return false
            }
        }
        StockActions.getStocks(code)
    },
    // Remove Stock
    handleRemoveStock: function() {
        alert('implementation yet to be done!')
    },
    // Provide Info in Dialog
    handleInfo: function() {
        alert('we will provide detailed info here')
    },
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
        // Focus on Stock Input Field
        this.addStock.focus()
    },
    componentWillUnmount: function() {
        StockStore.removeChangeListener(this.onStockChange)
    },
    //
    render: function() {
        return (
            <div>
                <ReactHighcharts config={this.state.config} />
                <Divider />
                <div style={styles.wrapper}>
                    {this.state.names.map(function(data) {
                        return (
                            <Chip
                                key={data.id}
                                backgroundColor={cyan400} labelColor={white} style={styles.chip}
                                onRequestDelete={this.handleRemoveStock} onTouchTap={this.handleInfo}
                            >{data.name}</Chip>
                        )
                    }, this)}
                </div>
                <Toolbar className='toolbar-bottom'>
                    <ToolbarGroup>
                        <TextField hintText='Type Stock Code..' ref={ (ref) => this.addStock = ref } />
                        <ToolbarSeparator />
                        <RaisedButton label='Add' primary={true} onTouchTap={this.handleAddStock} />
                    </ToolbarGroup>
                </Toolbar>
            </div>
        )
    }
})

module.exports = Stock