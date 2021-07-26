import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import {Card,Container,CardContent,makeStyles,CssBaseline,Table,TableContainer, TableBody, TableCell, TableRow, TableHead, Paper} from '@material-ui/core';
import {ScaleLoader} from 'react-spinners';

function OrderDetails() {
    const classes  = useStyles();
    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    const [orderDetails, setOrderDetails] = useState([])
    const params = useParams()
    const [loading, setLoading] = useState(false);
    const override =`
    display: flex;
    align-items: center;
    justify-content: center;    
    border-color: red`;

    useEffect(() => {
        if(params.id){
            setLoading(true)
            history.forEach(item =>{
                if(item._id === params.id) setOrderDetails(item)
            })
            setLoading(false);
        }
    },[params.id, history])


    if(orderDetails.length === 0) return null;

    return (
        <Container className={classes.container}>
             <Card className={classes.card}>
                <CardContent>
                   <CssBaseline/>
                        <TableContainer component={Paper}>
                            <div className="history-page">
                                
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.head}>Name</TableCell>
                                        <TableCell className={classes.head}>Address</TableCell>
                                        <TableCell className={classes.head}>Postal Code</TableCell>
                                        <TableCell className={classes.head}>Country Code </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{orderDetails.address.recipient_name}</TableCell>
                                        <TableCell>{orderDetails.address.line1 + " - " + orderDetails.address.city}</TableCell>
                                        <TableCell>{orderDetails.address.postal_code}</TableCell>
                                        <TableCell>{orderDetails.address.country_code}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <div style={{margin: "100px 0px"}}></div>

                        
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.head}></TableCell>
                                        <TableCell className={classes.head}>Products</TableCell>
                                        <TableCell className={classes.head}>Quantity</TableCell>
                                        <TableCell className={classes.head}>Price</TableCell>
                                    </TableRow>
                                </TableHead>
                            <TableBody>
                            {history.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7}>
                                        <ScaleLoader 
                                        css={override}
                                        size={150}
                                        color={"#eb4034"}
                                        loading={loading}/>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <>
                            { 
                                orderDetails.cart.map(item =>(
                                <TableRow key={item._id}>
                                <TableCell><img src={item.images.url} alt="" /></TableCell>
                                <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>$ {item.price * item.quantity}</TableCell>
                                </TableRow>
                                    ))         
                                }  
                            </> 
                            )
                            }
                        
                            </TableBody>
                            </Table>
                            </div> 
                        </TableContainer>
                </CardContent>
            </Card>
    </Container>
    )
}
const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    container: {
        marginTop: '40px'
    }, 
    title: {
        flex: '1 1 100%',
        padding: '20px'
    },
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    button: {
        margin: theme.spacing(1),
        float: 'right',
    },
}));

export default OrderDetails
