import React from 'react';
import Navigation from './Navigation';

class SellPage extends React.Component{

    state = {

    }
    render(){
        return(
            <div>
                <Navigation/>
                {console.log(localStorage.getItem('api'))}
                Sell stock
            </div>
        )
    }
}

export default SellPage;