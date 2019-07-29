import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './services/auth';
import SignUp from './pages/signUp';
import SignIn from './pages/signIn';
import Home from './pages/Home';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route 
        {...rest}
        render={props => isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/", state: { from: props.location} }}/>
            )
        }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/signUp" component={SignUp} />
            <PrivateRoute path="/home" component={Home}/>
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
)

export default Routes;