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
                text: 'Author: KChan'
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
        // Broadcast to other clients
        this.socket.emit('update', { code: code }, function(err) {
            if(err) throw err
        })
    },
    handleKeyDown: function(event) {
        //
        if(event.keyCode === 13) {
            this.handleAddStock()
        }
    },
    // Remove Stock
    handleRemoveStock: function(code) {
        //
        StockActions.removeStock(code)
        // Broadcast removal of Stock
        this.socket.emit('remove', { code: code }, function(err) {
            if(err) throw err
        })
    },
    // Provide Info in Dialog
    handleInfo: function() {
        alert('We will provide detailed info here')
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
        // Listen to Socket
        this.socket = io()
        var that = this
        // Update Stock
        this.socket.on('broadcast', function(data){
            StockActions.getStocks(data.code)
        })
        // Remove Stock
        this.socket.on('removal', function(data) {
            StockActions.removeStock(data.code)
        })
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
                                key={data.code}
                                backgroundColor={cyan400} labelColor={white} style={styles.chip}
                                onRequestDelete={() => this.handleRemoveStock(data.code.toLowerCase())} onTouchTap={this.handleInfo}
                            >{data.name}</Chip>
                        )
                    }, this)}
                </div>
                <Toolbar className='toolbar-bottom'>
                    <ToolbarGroup>
                        <TextField hintText='Type Stock Code..' ref={ (ref) => this.addStock = ref } onKeyDown={this.handleKeyDown} />
                        <ToolbarSeparator />
                        <RaisedButton label='Add' primary={true} onTouchTap={this.handleAddStock} />
                    </ToolbarGroup>
                </Toolbar>
            </div>
        )
    }
})

module.exports = Stock