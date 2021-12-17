import React from 'react'
import Signup from './auth/Signup';
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Signin from './auth/Signin';
import PrivateRoute from './auth/PrivateRoute';
import ForgetPassword from './auth/ForgetPassword';

export default function Login() {
    return (
                <BrowserRouter>
                    <AuthProvider>
                        <Switch>
                            <PrivateRoute exact path="/" component={Home}/>
                            <Route path="/signup" component={Signup}/>
                            <Route path="/signin" component={Signin}/>
                            <Route path="/forgot-password" component={ForgetPassword}/>
                        </Switch>
                    </AuthProvider>
                </BrowserRouter>
    )
}
