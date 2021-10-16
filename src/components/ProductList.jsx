import React, { useState, useEffect } from 'react'
import { Table, TableHead, TableCell, TableRow, TableBody, Button, makeStyles } from '@material-ui/core';
import { getProducts, deleteProduct } from '../services/ProductService';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../services/AuthService';

const useStyles = makeStyles({
    table: {
        width: '50%',
        margin: '1% auto 0 auto'
    },
    thead: {
        '& > *': {
            fontSize: 20,
            background: '#000000',
            color: '#FFFFFF'
        }
    },
    row: {
        '& > *': {
            fontSize: 18
        }
    },
    button: {
        marginInline: '20px'
    },
    button_add: {
        textAlign: "right"
    }
})

export function ProductList() {
    const classes = useStyles();

    const [user, setUser] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        getAllProducts();
        setUser(getCurrentUser());
    }, [])

    const getAllProducts = async () => {
        let response = await getProducts();
        console.log(response);
        setProducts(response.data.data);
    }

    const deleteProductData = async (id) => {
        let callbackUser = window.confirm('Esta seguro de elimar el prudcto');
        if (callbackUser) {
            await deleteProduct(id);
            getAllProducts();
        }
    }

    return (
        <>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow className={classes.thead}>
                        <TableCell>Id</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Valor</TableCell>
                        <TableCell>Estado</TableCell>
                        {user && (
                            <TableCell className={classes.button_add}>
                                <Button variant="contained" color="primary" component={Link} to="productos/agregar" >Agregar</Button>
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        products.map(product => (
                            <TableRow className={classes.row} key={product._id}>
                                <TableCell>{product._id}</TableCell>
                                <TableCell>{product.descripcion}</TableCell>
                                <TableCell>{product.valor}</TableCell>
                                <TableCell>{product.estado ? "Disponible" : "Agotado"}</TableCell>
                                {user
                                    &&

                                    (<TableCell>
                                        <Button className={classes.button} variant="contained" component={Link} to={`productos/editar/${product._id}`} color="info">Editar</Button>
                                        <Button variant="contained" color="secondary" onClick={() => deleteProductData(product._id)} >Eliminar</Button>
                                    </TableCell>)
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}
