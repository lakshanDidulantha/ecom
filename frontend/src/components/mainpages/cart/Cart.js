import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import PaypalButton from './PaypalButton'
import CartItem from './CartItem'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {Table, TableBody,makeStyles,CardContent,Card,Container,CssBaseline} from '@material-ui/core';


function Cart() {
    const classes  = useStyles();
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
  })
  
    const addToCart = async (cart) =>{
      await axiosInstance.patch('/user/addcart', {cart}, {
          headers: {Authorization: token}
      })
  }
    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])

    const tranSuccess = async(payment) => {
      const {paymentID, address} = payment;

      await axiosInstance.post('/api/payment', {cart, paymentID, address}, {
          headers: {Authorization: token}
      })
      setCart([])
      addToCart([])
      toast.success("You have successfully placed an order.")
  }
 if(cart.length=== 0) 
        return <h2 style={{textAlign: "center",  margin: '30px', textTransform: 'uppercase',letterSpacing: '1.2px'}}>Cart Empty</h2> 
   
  return (
    <Container className={classes.container}>
       <Card className={classes.card}>
        <CardContent>
          <ToastContainer/>
            <CssBaseline/>
              <title>Cart Page</title>
                <div className="col-md-9 text-secondary table-responsive my-1">
                  <h2 className="text-uppercase"style={{textAlign:'center'}}>Shopping Cart</h2>

                  <Table className="table my-2">
                    <TableBody>
                      {
                        cart.map(product => (
                          <CartItem key={product._id} product={product} />
                        ))
                        }

                    </TableBody>
                    </Table>
                  </div> 

            <div className="col-md-43 my-1 text-right text-uppercase text-secondary">
                  <h2>Total: <span className="text-danger">${total}</span></h2>  
                  <PaypalButton
                  total={total}
                  tranSuccess={tranSuccess} />  
                </div>
        </CardContent>
      </Card>
    </Container>   
 
    )
}


const useStyles = makeStyles((theme) => ({
  button: {
      margin: theme.spacing(1),
      marginLeft:'-50px'
  },
  container: {
      marginTop: '80px',
     
  },
  card: {
      marginTop: '60px',
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingBottom: '10px',
  },
}));
export default Cart