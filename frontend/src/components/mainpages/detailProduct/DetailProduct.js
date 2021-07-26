import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import { Typography, Card, Container,CssBaseline, CardContent, makeStyles } from '@material-ui/core';
import { MDBTypography, MDBBox } from 'mdbreact';

function DetailProduct() {
    const classes  = useStyles();
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    const [detailProduct, setDetailProduct] = useState([])
 
    useEffect(() =>{
        if(params.id){

            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    },[params.id, products])

    if(detailProduct.length === 0) return null;

    return (
        <>
            <Container className={classes.container}>
                <Card className={classes.card}>
                    <CardContent>
                        <CssBaseline/>
                        <div className="detail">
                            <img src={detailProduct.images.url} alt=""className="d-block img-thumbnail rounded mt-4 w-100"style={{height: '450px'}} />
                        
                        <div className="col-md-7 ">
                            <div className="box-detail">
                            <h2 className="text-uppercase">{detailProduct.title}</h2>
                         </div>

                        <div className="row mx-0 d-flex justify-content-between">
                            <h4 className="text-danger">${detailProduct.price}</h4>
                            <h4 className="text-danger">Sold: {detailProduct.sold}</h4>
                        </div>
                        <br/>
                        
                        <MDBTypography blockquote> 
                            <h5 className="text-uppercase">Description :</h5>
                                <MDBBox tag="p" mb={0}>{detailProduct.description}</MDBBox>
                            <br/>
                            <h5 className="text-uppercase">Content :</h5>
                                <MDBBox tag="p" mb={0}>{detailProduct.content}</MDBBox>
                        </MDBTypography>
                       
                    <div className="row">
                        <Link to="/cart" className="btn btn-dark mt-4 my-3 px-5"
                            onClick={() => addCart(detailProduct)}>
                            Buy Now
                        </Link> 
                    </div>
                </div>
            </div>
        </CardContent>
        </Card>
   </Container>
    
            <div>
                <Typography className={classes.title} variant="h6" component="div">
                Related products
                </Typography> 

                <div className="products">
                    {
                        products.map(product => {
                            return product.category === detailProduct.category 
                                ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>
            </>
     
           
    )
}
const useStyles = makeStyles(() => ({ 
    title: {
        flex: '1 1 100%',
        padding: '-10px',
        marginTop:'40px',
        textAlign: 'center',
        fontWeightMedium: 500,
        fontSize: 32
    },
    container: {
        marginTop: '80px',
    }, 
    card: {
        marginTop: '20px',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '-5px',
    },
   
}));

export default DetailProduct
