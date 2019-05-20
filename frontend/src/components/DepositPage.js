import React from 'react';
import Navigation from './Navigation';

class DepositPage extends React.Component{

    state = {

    }
    
    render(){
        return(
            <div>
            <Navigation/>
            {console.log(this.props.match.params.id)}
            {console.log(localStorage.getItem('api'))}
            Deposit money
            </div>
        )
    }
}

export default DepositPage;
