import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'



const CartItem = ({product}) => {
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
    
    
    useEffect(() => {
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])



    const increment = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })
    
        setCart([...cart])
        addToCart(cart)
    }
    
    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })
    
        setCart([...cart])
        addToCart(cart)
    }
    const removeProduct = id =>{
        if(toast.success("Successfully delete this product")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })
            setCart([...cart])
            addToCart(cart)
        }
    }

    return (
        <tr>
       <td style={{width: '100px', overflow: 'hidden'}}>
            <img src={product.images.url}alt={product.images.url}
            className="img-thumbnail w-100"
            style={{minWidth: '150px', height: '125px'}} />
        </td>
       
        <td style={{minWidth: '200px'}} className="w-50 align-middle" >
            <h5 className="text-capitalize text-secondary">
                <Link href={`/product/${product._id}`}>
                    {product.title}
                </Link>
            </h5>
            <h6 className="text-danger">${product.price * product.quantity}</h6>
        </td>
                    
        <td className="align-middle" style={{minWidth: '150px'}}>
            <button className="btn btn-outline-secondary"
            onClick={() => decrement(product._id)}> - </button>
            <span className="px-3">{product.quantity}</span>
            <button className="btn btn-outline-secondary"
            onClick={() => increment(product._id)}>  + </button>
        </td>

        <td className="align-middle" style={{minWidth: '50px', cursor: 'pointer',}}>
            <i className="far fa-trash-alt text-danger" aria-hidden="true" 
            style={{fontSize: '18px'}} data-toggle="modal" data-target="#exampleModal"
            onClick={() => removeProduct(product._id)}></i>
        </td>
   
        </tr>
  
    )
}

export default CartItem