import react, { useState, useEffect } from 'react';
import { FormGroup, Table, TableHead, TableCell, TableRow, TableBody, FormControl, DesktopDatePicker, InputLabel, Input, Button, makeStyles, Typography, RadioGroup, FormLabel, FormControlLabel, Radio } from '@material-ui/core';
import { addSale } from '../../services/SalesService';
import { useHistory } from 'react-router-dom';
import { getCurrentUser, verifyToken } from '../../services/AuthService';

const initialValue = {
    productos: [],
    fecha: "",
    valor: 0,
    nombreCliente: "",
    idCliente: "",
    idVendedor: ""
}

const initialValueProduct = {
    _id: '',
    valor: 0,
    cantidad: 0
}

const useStyles = makeStyles({
    container: {
        width: '60%',
        margin: '100px auto 0 auto',
        '& > *': {
            marginTop: 20
        }
    },
    table: {
        width: '100%',
        margin: '1% auto 0 auto'
    },
    thead: {
        '& > *': {
            fontSize: 20,
            background: '#FFFFFF',
            color: '#000000'
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

export function CreateSale() {
    const classes = useStyles();
    const history = useHistory();
    const [user, setUser] = useState(null)

    useEffect(() => {
        setUser(getCurrentUser());
    }, [])

    const [sale, setSale] = useState(initialValue);
    const [newProduct, setNewProduct] = useState(initialValueProduct);

    const [creatingProductState, setCreatingProductState] = useState('minimizado');

    const { productos, fecha, valor, nombreCliente, idCliente, idVendedor } = sale;

    const onValueChange = (e) => {
        setSale({ ...sale, [e.target.name]: e.target.value });
    }

    const onValueNewProductChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    }

    const addProduct = (newProduct) => {
        let productsCopy = productos
        productsCopy.push(newProduct)
        setSale({ ...sale, productos: productsCopy });
        setNewProduct(initialValueProduct);
        changeStateCreateProductForm('minimizado');
    }

    const onDateChange = (e) => { }

    const addSaleData = (e) => { }

    const deleteProduct = (id) => {
        let productsCopy = productos.filter(product => product._id !== id);
        setSale({ ...sale, productos: productsCopy });
    }

    const changeStateCreateProductForm = (state) => {
        setCreatingProductState(state);
    }

    return (
        <>
            <FormGroup className={classes.container}>
                <Typography variant="h4">Agregar Venta</Typography>
                <FormControl>
                    <InputLabel htmlFor="my-input">Valor</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} type="number" name="valor" value={valor} id="my-input" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Id Cliente</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} type="number" name="idCliente" value={idCliente} id="my-input" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Nombre Cliente</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} type="text" name="nombreCliente" value={nombreCliente} id="my-input" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Id Vendedor</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} type="number" name="idVendedor" value={idVendedor} id="my-input" />
                </FormControl>
                <FormControl compMMonent="fieldset">
                    <FormLabel component="legend">Fecha</FormLabel>
                    <Input name="fecha" value={fecha} onChange={(e) => onDateChange(e)} type="date" />
                </FormControl>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow className={classes.thead}>
                            <TableCell>
                                Id {creatingProductState === 'desplegado' &&
                                    (
                                        <>
                                            :<Input
                                                onChange={(e) => onValueNewProductChange(e)}
                                                value={newProduct._id}
                                                type="text" 
                                                name="_id"/>
                                        </>
                                    )
                                }
                            </TableCell>
                            <TableCell>
                                Valor {creatingProductState === 'desplegado' &&
                                    (
                                        <>
                                            :<Input
                                                onChange={(e) => onValueNewProductChange(e)}
                                                value={newProduct.valor}
                                                type="text" 
                                                name="valor"/>
                                        </>
                                    )
                                }
                            </TableCell>
                            <TableCell>
                                Cantidad {creatingProductState === 'desplegado' &&
                                    (
                                        <>
                                            :<Input
                                                onChange={(e) => onValueNewProductChange(e)}
                                                value={newProduct.cantidad}
                                                type="text" 
                                                name="cantidad"/>
                                        </>
                                    )
                                }
                            </TableCell>
                            <TableCell className={classes.button_add}>
                            { creatingProductState === 'minimizado' && (
                                <Button variant="contained" onClick={() => changeStateCreateProductForm('desplegado')} >Agregar</Button>
                            )}
                            { creatingProductState === 'desplegado' && (
                                <Button variant="contained" onClick={() => addProduct(newProduct)  } >+</Button>
                            )}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            sale.productos.map(product => (
                                <TableRow className={classes.row} key={product._id}>
                                    <TableCell>{product._id}</TableCell>
                                    <TableCell>{product.valor}</TableCell>
                                    <TableCell>{product.cantidad}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="secondary" onClick={() => deleteProduct(product._id)} >X</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <FormControl>
                    <Button variant="contained" onClick={(e) => addSaleData()} color="primary">Agregar Venta</Button>
                </FormControl>
            </FormGroup>


        </>
    )
}
