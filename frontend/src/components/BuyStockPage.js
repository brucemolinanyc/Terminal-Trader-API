import React from 'react';
import Navigation from './Navigation';


class BuyStockPage extends React.Component{

    state = {

    }
    
    render(){
        return(
            <div>
                <Navigation/>
                {console.log(this.props.match.params.id)}
                Buy stock
            </div>
        )
    }
}

export default BuyStockPage;
