import React from 'react';
import Navigation from './Navigation';


class BuyStockPage extends React.Component{

    state = {

    }
    
    render(){
        return(
            <div>
                <Navigation/>
                {console.log(localStorage.getItem('api'))}
                Buy stock
            </div>
        )
    }
}

export default BuyStockPage;
