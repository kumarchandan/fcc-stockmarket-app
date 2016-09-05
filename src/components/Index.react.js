// Index.react.js : Navigation bar [parent of all UI components]

var React = require('react')

import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


// Navigation bar
var NavigationBar = React.createClass({
    // render
    render: function() {
        return (
            <div>
                <Navbar inverse>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Stock.Market</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                        <Nav pullRight>
                            <LinkContainer to='/'>
                                <NavItem eventKey={1}>Home</NavItem>
                            </LinkContainer>
                            <LinkContainer to='/tweets'>
                                <NavItem eventKey={2}>Twitter Stream</NavItem>
                            </LinkContainer>
                        </Nav>
                </Navbar>
                {this.props.children}
            </div>
        )
    }
})


// module exports 
module.exports = NavigationBar

