import hashlib, uuid, random
import requests
import jwt 
import datetime


salt = "MYSALT"  # generates a random uuid
encoded_salt = salt.encode() 

""" fake prices to lookup for unit testing purposes """
FAKE_PRICES = {
        'stok': 3.50
    }

def hash_password(password):
    """ WEEK 4 TODO: encrypt with sha512 & a salt """
    encoded_pw = password.encode()
    hashed_pw = hashlib.sha512(encoded_pw + encoded_salt).hexdigest()
    return hashed_pw

def api_key():
    api_key = ''.join(["%s" % random.randint(0, 9) for num in range(0, 15)])
    return api_key

def get_price(ticker):
    # if ticker in FAKE_PRICES.keys():
    #     return FAKE_PRICES[ticker]
    # get my api key and add to route
    # get rid of try except and check value errors
    try: 
        # response = requests.get('https://api.iextrading.com/1.0/stock/{}/previous'.format(ticker))
        response = requests.get('https://cloud.iexapis.com/stable/stock/{}/quote?token=pk_246dc82381254e7ebc9498406cfd5e31'.format(ticker))
        # response = requests.get('https://cloud.iexapis.com/stable/tops?token=pk_246dc82381254e7ebc9498406cfd5e31&symbols={}'.format(ticker))
        data = response.json()
        return [data['symbol'], data['latestPrice']]
    except ValueError:
        return False


def encodeAuthToken(pk):
    payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
        'user': pk
    }
    token = jwt.encode(payload, 'secret-key', algorithm='HS256')
    return token

def decodeAuthToken(token):
    try:
        payload = jwt.decode(token, 'secret-key', algorithm='HS256')
        return payload
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Login please'
    except jwt.InvalidTokenError:
        return 'Nice try, invalid token. Login please'
