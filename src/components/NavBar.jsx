import React from 'react'
import { AppBar, Toolbar, makeStyles } from '@material-ui/core'
import { NavLink } from 'react-router-dom';

const useStyle = makeStyles({
    header: {
        background: '#111111'
    },
    tabs: {
        color: '#FFFFFF',
        marginRight: 20,
        textDecoration: 'none',
        fontSize: 20
    }
})

export function NavBar() {

    const classes = useStyle();

    return (
        <AppBar position="static" className={classes.header}>
            <Toolbar>
                <NavLink className={classes.tabs} to="/">Inicio</NavLink>
                <NavLink className={classes.tabs} to="/add">Crear Producto</NavLink>
            </Toolbar>
        </AppBar>
    )
}
