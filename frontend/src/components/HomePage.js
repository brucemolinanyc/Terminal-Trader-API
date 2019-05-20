import React from 'react';
import Navigation from './Navigation';
import { Divider, Grid, Segment, Card } from 'semantic-ui-react';

class HomePage extends React.Component{

    state = {

    }

    componentDidMount = () => {

    }



    render(){
        return(
            <div>
            <Navigation/>
            my homepage

            <Segment>
                <Grid columns={2} relaxed='very'>
                    <Grid.Column textAlign='center'>
                        <h2>Your Positions</h2>
                        configure cards from semantic ui 
                        
                    </Grid.Column>

                    <Grid.Column textAlign='center'>
                        <h2>Your Trade History</h2>
                        configure cards from semantic ui 

                    </Grid.Column>
                </Grid>
                <Divider vertical></Divider>

            </Segment>
            {console.log(this.props)}
            </div>
        )
    }
}

export default HomePage;