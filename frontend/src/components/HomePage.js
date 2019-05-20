import React from 'react';
import Navigation from './Navigation';
import { Divider, Grid, Segment, Card } from 'semantic-ui-react';
import './HomePage.css'
class HomePage extends React.Component{

    state = {
        positions: null,
        trades: null
    }

    componentDidMount = () => {
        const api_key = this.props.match.params.id

        fetch(`http://127.0.0.1:5000/api/${api_key}/positions`, {
            method: 'get',
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
        }).then(response => response.json())
        .then(data => this.setState({positions: [data.positions][0]}))

        fetch(`http://127.0.0.1:5000/api/${api_key}/alltrades`, {
            method: 'get',
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"}
        })
        .then(response => response.json())
        .then(data => this.setState({trades: [data.trades][0]}))
    }



    render(){
        const positions = this.state.positions && this.state.positions.map( (el, idx) => {
            const key = Object.keys(el)
                    return <div className="test">
                                <div class="content">
                                    <div class="header">stock:  <font color="blue">{el[key].ticker}</font></div>
                                    <div class="meta">amount: <font color="orange">{el[key].shares}</font></div>
                                </div>
                            </div>
         })

        
        return(
            <div>
            <Navigation/>

            <Segment>
                <Grid columns={2} textAlign='center' container divided stackable>
                    <Grid.Column textAlign='center'>
                        <h2>Your Positions</h2>
                        {positions}
                    </Grid.Column>

                    <Grid.Column textAlign='center'>
                        <h2>Your Trade History</h2>
                        configure cards from semantic ui 

                    </Grid.Column>
                </Grid>
                <Divider vertical></Divider>

            </Segment>
            {console.log(this.state.positions)}
            </div>
        )
    }
}

export default HomePage;