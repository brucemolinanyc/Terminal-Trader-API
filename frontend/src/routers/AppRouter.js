import React from 'react';
import HomePage from '../components/HomePage';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={LoginPage} exact={true}/>
                <Route path="/register" component={RegisterPage} />
                <Route path="/home" component={HomePage} />

            </Switch>
        </div>
    </BrowserRouter>
    
)

export default AppRouter;