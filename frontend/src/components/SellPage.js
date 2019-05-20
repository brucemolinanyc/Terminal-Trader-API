import React from 'react';
import Navigation from './Navigation';

class SellPage extends React.Component{

    state = {

    }
    render(){
        return(
            <div>
                <Navigation/>
                {console.log(this.props.match.params.id)}
                Sell stock
            </div>
        )
    }
}

export default SellPage;