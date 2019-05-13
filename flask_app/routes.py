from flask import jsonify, abort, request
from flask_app import app
from app import Account
from app.util import get_price

@app.errorhandler(404)
def error404():
    return jsonify({"error": "404 not found"}), 404 

@app.errorhandler(500) 
def error500():
    return jsonify({"error": "application error"}), 500

#works
@app.route('/api/price/<ticker>', methods=['GET'])
def lookup(ticker):
    response = get_price(ticker)
    if response:
        return jsonify({"symbol": response[0], "price": response[1]})
    else:
        return jsonify({"error": "404 not found"}), 404 

#works
@app.route('/api/<api_key>/positions', methods=['GET'])
def positions(api_key):
    account = Account.authenticate_api(api_key)
    if not account:
        return jsonify({"error": "authentication error"}), 401
    positions = account.get_positions_json()
    return jsonify({"positions": positions})


@app.route('/api/<api_key>/position/<ticker>', methods=['GET'])
def position(api_key, ticker):
    account = Account.authenticate_api(api_key)
    if not account:
        return jsonify({"error": "authentication error"}), 401
    positions = account.get_positions()
    for posish in positions:
        if posish.ticker == ticker:
            return jsonify({"position": posish.ticker, "shares": posish.shares})
    return jsonify({"error": "404 not found"}), 404 
  

@app.route('/api/<api_key>/trades/<ticker>', methods=['GET'])
def trades(api_key, ticker):
    account = Account.authenticate_api(api_key)
    if not account:
            return jsonify({"error": "authentication error"}), 401
    ticker_trades = account.get_trades_by_ticker_json(ticker)
    return jsonify({"trades": ticker_trades})
    
@app.route('/api/<api_key>/alltrades', methods=['GET'])
def alltrades(api_key):
    account = Account.authenticate_api(api_key)
    if not account:
        return jsonify({"error": "authentication error"}), 401
    else:
        all_trades = account.get_all_trades_json()
        return jsonify({"trades": all_trades})


@app.route('/api/<api_key>/balance', methods=['GET'])
def balance(api_key):
    account = Account.authenticate_api(api_key)
    if not account:
        return jsonify({"error": "authentication error"}), 401
    return jsonify({"username": account.username, "balance": account.balance})

@app.route('/api/<api_key>/deposit', methods=['PUT'])
def deposit(api_key):
    account = Account.authenticate_api(api_key)
    if not account:
        return jsonify({"error": "authentication error"}), 401
    if not request.json:
        return jsonify({"error": "bad request"}), 400
    try:
        amount = request.json['amount']
        if amount < 0.0:
            raise ValueError
        account.balance += amount
    except (ValueError, KeyError):
        return jsonify({"error": "bad reuqest"}), 400
    account.save()
    return jsonify({"username": account.username, "balance": account.balance})

@app.route('/api/<api_key>/buy/<ticker>/<amount>', methods=['POST'])
def buy(api_key, ticker, amount):
    account = Account.authenticate_api(api_key)
    price = get_price(ticker)[1]
    purchase = int(amount) * int(price)
    if not account:
        return jsonify({"error": "authentication error"}), 401
    if not price:
        return jsonify({ "error": "bad ticker data"})
    if not request.json:
        return jsonify({"error": "bad request"}), 400
    try:
        if request.json['amount'] and request.json['ticker']:
            if account.balance > purchase:
                account.buy(ticker, int(amount), int(price), purchase)
    except (ValueError, KeyError):
        return jsonify({"error": "bad request"}), 400
    return jsonify({"username": account.username, "balance": account.balance})


@app.route('/api/<api_key>/sell/<ticker>/<amount>', methods=['POST'])
def sell(api_key, ticker, amount):
    account = Account.authenticate_api(api_key) 
    position = account.get_position_for(ticker)
    # ticker, ticker_price = get_price(ticker)[0], get_price(ticker)[1]  
    # cash = integer(ticker_price) * amount 
    if not account:
        return jsonify({"error": "authentication error"}), 401
    if not ticker:
        return jsonify({ "error": "bad ticker data"})
    if not request.json:
        return jsonify({"error": "bad request"}), 400
    try:
        if request.json['amount'] and request.json['ticker']:
            if position.shares > int(amount):
                account.sell(ticker, amount)
    except (ValueError, KeyError):
        return jsonify({"error": "bad request"}), 400
    return jsonify({"username": account.username, "balance": account.balance})
            
@app.route('/api/accounts', methods=['GET'])
def accounts():
    accounts_dic = {}
    accounts = Account.all()
    for account in accounts:
        accounts_dic[account.username] = {
            "username": account.username,
            "balance": account.balance,
            "api-key": account.api_key
        }
    return jsonify({"accounts": accounts_dic})