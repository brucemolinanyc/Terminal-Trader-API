import React from 'react';
import Navigation from './Navigation';
// import {Button, Form, Message, Icon, Container} from 'semantic-ui-react';
import './DepositPage.css'
class DepositPage extends React.Component{
    
    state = {
            amount: '',
            balance: null,
            error: null
            }

    handleChange = (e) =>{
        const amount = e.target.value
        this.setState(() => ({ amount: amount }));
    }
  
    handleSubmit = (e) => {
        e.preventDefault()
        const amount = this.state.amount
        const api_key = localStorage.getItem('api_key')

        fetch(`http://127.0.0.1:5000/api/${api_key}/deposit`, {
            method: 'put',
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"},
            body: JSON.stringify({amount: amount})
        })
        .then(response => response.json())
        .then(data => {
            if(data.balance){
                this.setState({balance: data.balance, amount: '', error: false})
                }
            else if (data.error){
                this.setState({error: true})
            }
            })
    }
  
    // need:
    // validation on the number that goes in 
    // a confirmation message on the Deposit
    // Write it to the database if successful - success
    // a denial message on the deposit if not valid 


    render(){
        const success = this.state.error === false &&
            <div className="success">
               <p>Your Deposit was successful. Your balance is now ${this.state.balance}</p>
            </div>
        
        const failure = this.state.error === true &&
            <div className="failure">
               <p>Your entry was invalid - Please submit again</p>
            </div>

        return(
            <div>
            <Navigation/>
                <div className="depositForm">
                    <form onSubmit={this.handleSubmit}>
                        <h1>Deposit Funds</h1>   

                        <div className="depositFormInput">
                            <input className="A" placeholder="Enter Dollar Amount $" value={this.state.amount} onChange={this.handleChange} />
                        </div>     
                        <div className="button">
                            <button>Submit</button>
                        </div>
                    </form>
                    {this.state.error ? failure:success}
                    
                </div>
             
                
            </div>
        )
    }
}
            // {console.log(localStorage.getItem('api'))}


export default DepositPage;
