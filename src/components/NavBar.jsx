import React from 'react'
import { AppBar, Toolbar, makeStyles, Button, Box } from '@material-ui/core'
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
    },
    tab_end: {
        color: '#FFFFFF',
        marginRight: 20,
        textDecoration: 'none',
        fontSize: 20,
        alignItems: 'end'
        
    }
})

export function NavBar() {

    const classes = useStyle();

    return (
        <Box sx={{ display: 'flex', p: 1}}>
            <AppBar position="static" className={classes.header}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}>
                        <NavLink className={classes.tabs} to="/">Inicio</NavLink>
                        <NavLink className={classes.tabs} to="/add">Crear Producto</NavLink>
                    </Box>
                    <NavLink className={classes.tab_end} to="/registrarse">
                        <Button color="secondary">
                            registrarse
                        </Button>
                    </NavLink>
                    <NavLink className={classes.tab_end} to="/login">
                        <Button color="secondary">
                            Login
                        </Button>
                    </NavLink>
                    <NavLink className={classes.tab_end} to="/logout">
                        <Button color="secondary">
                            Logout
                        </Button>
                    </NavLink>
                </Toolbar>
            </AppBar>
        </Box>
       
    )
}
