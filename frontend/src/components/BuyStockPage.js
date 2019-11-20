import React from 'react';
import Navigation from './Navigation';
import baseURL from '../util/utilities'
// const baseURL = ''

class BuyStockPage extends React.Component{

    state = {
        ticker: '',
        symbol: '',
        amount: '',
        cost: '',
        balance: 0,
        error: null
    }

    onStockInputChange = (e) => {
        this.setState({ticker: e.target.value})
    }

    onPurchaseInputChange = (e) => {
        let amount = e.target.value 
        let cost = Number(amount) * Number(this.state.symbol.high)
        this.setState({amount: e.target.value, cost: cost })
    }

    onStockInputClick = (e) => {
        e.preventDefault()
        fetch(`https://cloud.iexapis.com/stable/stock/${this.state.ticker}/quote?token=pk_246dc82381254e7ebc9498406cfd5e31`)
        .then(response => response.status === 404 ? this.setState({error: true}) : response.json()
        .then(data => this.setState({symbol: data}))
        )}

    handleSubmit = (e) => {
        e.preventDefault()
        const api_key = localStorage.getItem('api_key')
        let ticker = this.state.ticker
        let amount = Math.round(Number(this.state.amount))
        console.log("amount", amount)
        console.log( baseURL + `/api/${api_key}/buy/${ticker}/${amount}`)

        if (Number.isInteger(amount)){
                fetch(baseURL + `/api/${api_key}/buy/${ticker}/${amount}`, {
                    method: 'post',
                    mode: "cors",
                    headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"},
                    body: JSON.stringify({amount: amount, ticker:ticker})
                }).then(response => response.json())
                .then(data => {
                    if (data.balance){
                        this.setState({balance: Math.round(data.balance), error: false})
                    } else if (data.error){
                        this.setState({error: true})
                        }
                    })
        } else{
            this.setState({error:true})
        }
    }
       
    
    render(){
        console.log(this.state.symbol)
        let {symbol, latestTime,  latestPrice} = this.state.symbol
        const stock_result = this.state.symbol && 
            <div className="stockResult">
                {symbol}<br></br>
                StockPrice: ${Math.round(latestPrice)} <br></br>
                Live as of: {latestTime}
            </div>

        const success = this.state.error === false &&
            <div className="success">
               <p>Your Stock purchase was successful. Your balance is now ${Math.round(this.state.balance)}</p>
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
                        <h1>Buy Stock</h1>   
                        {console.log(this.state)}
                        <div className="depositFormInput">
                            <div className="ui action input">
                                <input type="text" placeholder="Lookup Stock" onChange={this.onStockInputChange}/>
                                <button className="ui button" onClick={this.onStockInputClick}>Search</button>   
                            </div>
                            <br></br><br></br>

                            {stock_result}

                            <br></br>
                            <div className="ui input">
                                {this.state.symbol && <input type="text" placeholder="Enter purchase amount" onChange={this.onPurchaseInputChange} />}
                            </div>
                            <br></br><br></br>

                            <div>
                                {this.state.symbol !== '' && <p>Confirm purchase of {this.state.amount} shares of {symbol} for ${this.state.amount && Number((Math.round(this.state.amount * latestPrice)))} </p>}
                            </div>

                            <div className="button">
                                {this.state.symbol !== '' && <button>Submit</button>}
                            </div>
                        </div>     
                        
                    </form>
                     {this.state.error ? failure : success}
                     {this.state.error !== null && setTimeout(function(){window.location.reload()}, 2500)}

                </div>                
            </div>
        )
    }
}

export default BuyStockPage;
