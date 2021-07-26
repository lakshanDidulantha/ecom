import React, {useContext,useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {Card,Container,CardContent,DialogContent, CssBaseline,Table, TableBody, TableCell, TableRow, TableHead, makeStyles} from '@material-ui/core';
import {ScaleLoader} from 'react-spinners';


function OrderHistory() {
    const classes  = useStyles();
    const state = useContext(GlobalState)
    const [history, setHistory] = state.userAPI.history
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [loading, setLoading] = useState(false);
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    })
    const override =`
    display: flex;
    align-items: center;
    justify-content: center;    
    border-color: red;
`;
    useEffect(() => {
        if (token) {
            setLoading(true)
            const getHistory = async () => {
                if (isAdmin) {
                    const res = await axiosInstance.get('/api/payment', {
                        headers: { Authorization: token }
                    })
                    setHistory(res.data)
                } else {
                    const res = await axiosInstance.get('/user/history', {
                        headers: { Authorization: token }
                    })
                    setLoading(false);
                    setHistory(res.data)
                }
            }
            getHistory()
        }
    }, [token, isAdmin, setHistory]);

    return (
        <Container className={classes.container}>
             <Card className={classes.card}>
                <CardContent>
                    <CssBaseline />
                    <DialogContent>  
                        <h2>History</h2>

                        <h4>You have {history.length} ordered</h4>

            <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.head}>Payment ID</TableCell>
                            <TableCell className={classes.head}>Date of Purchased</TableCell>
                            <TableCell className={classes.head}>Status</TableCell>
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
                        {   history.map(items => (
                            <TableRow key={items._id}>
                                <TableCell>{items.paymentID}</TableCell>
                                <TableCell>{new Date(items.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell><Link to={`/history/${items._id}`}>View</Link></TableCell>
                            </TableRow>
                            ))         
                        }  
                    </> 
                    )
                }
                   
                        </TableBody>
                        </Table>
                        </DialogContent>      
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


export default OrderHistory
