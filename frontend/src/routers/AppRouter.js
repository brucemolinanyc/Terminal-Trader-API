import React from 'react';
import LoginPage from '../components/LoginPage';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={LoginPage} exact={true}/>
            </Switch>
        </div>
    </BrowserRouter>
    
)

export default AppRouter;