import React from 'react';
import {withRouter} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import './Navigation.css';

class Navigation extends React.Component{
 
  state = {
    username: '',
    api_key: ''
  }

  componentDidMount = () => {
    const token = localStorage.getItem('token')
    var decoded = jwt_decode(token)

    fetch(`http://localhost:5000/user/${decoded.user}`,{
            method: 'get',
            mode: 'cors',
            Navigations: {"Content-Type": "application/json"},
        })
        .then(response => response.json())
        .then(data => this.setState({username: data.user.toUpperCase(), api_key: data.api }))
  }

  onClick = () => {
    localStorage.clear()
    this.props.history.push('/')
  }

  render(){
    return(
    <div className="ui inverted menu huge black">
        <a className="red item" href="/home"  exact="true">Home</a>
        <a className="red item" href="/positions" exact="true">Your Positions</a>
        <a className="red item" href="/stock" exact="true">Stock Prices</a>
        <a className="red item" href="/transact" exact="true">Transactions</a>
        
        <div className="right menu">
            <div className="item" width={4}>
                <p><strong className="strong">Username: {this.state.username } <br></br>Account: {this.state.api_key}</strong></p>
            </div>

            <div className="right menu item">
                <div className="ui icon input">
                    <input type="text" placeholder="Search..." />
                    <i
                    aria-hidden="true"
                    className="search icon"
                    ></i>
                </div>
            </div>

            <div className="right menu item">
                <div className="ui primary button" onClick={this.onClick}>
                Sign Out
                </div>
            </div>

        </div>
    </div>
    )
  }
}

export default withRouter(Navigation);

