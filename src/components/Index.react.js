// Index.react.js : Navigation bar [parent of all UI components]

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React from 'react'

// Navigation bar
var NavigationBar = React.createClass({
    //
    handleLogout: function() {
        alert('Do not logout man!')
    },
    // render
    render: function() {
        return (
            <div>
                <MuiThemeProvider>
                    <AppBar
                        title='Stock.Market'
                        iconElementRight={
                            <IconMenu
                                iconButtonElement={
                                    <IconButton><MoreVertIcon /></IconButton>
                                }
                                targetOrigin={ { horizontal:'right', vertical: 'top' } }
                                anchorOrigin={ { horizontal:'right', vertical: 'top' } }
                            >
                                <MenuItem primaryText='Refresh' />
                                <MenuItem primaryText='Help' />
                                <MenuItem primaryText='Logout' onTouchTap={this.handleLogout} />
                            </IconMenu>
                        }
                    />
                </MuiThemeProvider>
                {this.props.children}
            </div>
        )
    }
})


// module exports 
module.exports = NavigationBar

