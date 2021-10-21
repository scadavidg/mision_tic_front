import React,{useEffect, useState} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ProductList } from './components/ProductList';
import { CreateProduct } from './components/CreateProduct';
import { EditProduct } from './components/EditProduct';
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Home } from "./components/Home";
import { NotFound } from './components/NotFound';
import { NavBar } from './components/NavBar';
import { getCurrentUser } from './services/AuthService';
//import { verifyToken } from './services/AuthService';

export function App() {

    /*setTimeout(() => {
        verifyToken()
    }, 80000);*/ 

    const [user, setUser] = useState([])
    useEffect(() => {
        setUser(getCurrentUser());
    }, [])

    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/productos" component={ProductList} />
                {user && (
                    <>
                        <Route exact path="/productos/agregar" component={CreateProduct} />
                        <Route exact path="/productos/editar/:id" component={EditProduct} />
                    </>
                )}
                <Route exact path="/login" component={Login} />
                <Route exact path="/registrarse" component={Signup} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}


