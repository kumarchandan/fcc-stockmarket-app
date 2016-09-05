// TwitterStream.react.js

var React = require('react')
//
import { ListGroup, ListGroupItem, Jumbotron, Grid, Row, Col } from 'react-bootstrap'

//
var TweetList = React.createClass({
    //
    render: function() {
        //
        var tweets = this.props.tweets
        var rows = []
        if(tweets && tweets.length !== 0) {
            tweets.forEach(function(tweet, index) {
                rows.push(
                    <ListGroupItem header={tweet} key={index}></ListGroupItem>
                )
            })
        }
        return (
            <ListGroup>
                {rows}
            </ListGroup>
        )
    }
})
//
var TwitterStream = React.createClass({
    //
    getInitialState: function() {
        return {
            tweets: []
        }
    },
    //
    componentDidMount: function() {
        //
        var self = this
        // Initialize socket io
        var socket = io()
        socket.on('tweet', function(data) {
            var temp = []
            temp.push(data)
            self.setState({
                tweets: temp
            })
        })
    },
    //
    render: function() {
        return (
            <Grid>
                <Row>
                    <Col lg={12}>
                        <Jumbotron>
                            <h3>Twitter Streams</h3>
                            <br />
                            <TweetList tweets={this.state.tweets} />
                        </Jumbotron>
                    </Col>
                </Row>
            </Grid>
        )
    }
})

module.exports = TwitterStream