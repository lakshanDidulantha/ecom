import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import'./productItem.css'
import {GlobalState} from '../../../../GlobalState'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'



function BtnRender({product, deleteProduct}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const addCart = state.userAPI.addCart

    return (
        <div className="row_btn">
            {
                isAdmin ?
                <>
                   <Link className="btn btn-danger" to="#!" 
                    onClick={() =>deleteProduct(product._id, product.images.public_id)}>
                        Delete
                    </Link>
                    <Link className="btn btn-info" to={`/edit_product/${product._id}`}>
                        Edit
                    </Link>
                </>
            :
                <>
                    <Link className="btn btn-success" to="#!" onClick={() => addCart(product)}>
                        Buy
                    </Link>
                    <Link className="btn btn-info" to={`/detail/${product._id}`}>
                        View
                    </Link>
                </>
            }   
        </div>
    )
}
export default BtnRender
