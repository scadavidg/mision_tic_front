import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { ProductList } from './components/ProductList';
import { CreateProduct } from './components/CreateProduct';
import { EditProduct } from './components/EditProduct';
import {Login} from "./components/Login";
import {Signup} from "./components/Signup";
import {Logout} from "./components/Logout";
import { NotFound } from './components/NotFound';

export function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route exact path="/" component={ProductList} />
                <Route exact path="/add" component={CreateProduct} />
                <Route exact path="/edit/:id" component={EditProduct} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/registrarse" component={Signup} />
                <Route exact path="/logout" component={Logout} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}


