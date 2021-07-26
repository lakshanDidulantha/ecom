import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import {useHistory, useParams} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify';
import {makeStyles,CardContent,Card,Button,Container,CssBaseline,Grid,MenuItem} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const initialState = {
    product_id: '',
    title: '',
    price: '',
    description: '',
    content: '',
    category: '',
    _id: ''
}


function CreateProduct() {
    const classes  = useStyles();
    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const history = useHistory()
    const param = useParams()

    const [products] = state.productsAPI.products
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.productsAPI.callback
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    })
    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            products.forEach(product => {
                if(product._id === param.id) {
                    setProduct(product)
                    setImages(product.images)
                }
            })
        }else{
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    }, [param.id, products])

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return toast.error("You're not an admin")
            const file = e.target.files[0]
            
            if(!file) return  toast.error("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
                return  toast.error("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return  toast.error("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axiosInstance.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            if(!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axiosInstance.post('/api/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setProduct({...product, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return  toast.error("You're not an admin")
            if(!images) return  toast.error("No Image Upload")

            if(onEdit){
                const res =await axiosInstance.put(`/api/products/${product._id}`, {...product, images}, {
                    headers: {Authorization: token}
                })
                toast.success(res.data.msg)
            }else{
                const res = await axiosInstance.post('/api/products', {...product, images}, {
                    headers: {Authorization: token}
                })
                toast.success(res.data.msg)
            }
            setCallback(!callback)
            history.push("/")
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }
    return (
        <Container className={classes.container}>
            <Card className={classes.card}>
                <CardContent>
                    <ValidatorForm onSubmit={handleSubmit}>
                        <ToastContainer /> <CssBaseline/>
                        <div className="create_product">
                            <div className="col-md-6 my-5">
                                    <div className="input-group mb-4">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Upload Image</span>
                                        </div>
                                        <div className="custom-file border rounded">
                                            <input type="file" className="custom-file-input"
                                            onChange={handleUpload}/>
                                        </div>

                                    </div> 
                                    <div className="row img-up mx-0">
                                        {
                                            loading ? <div className="file_img my-1"><Loading /></div>

                                            :<div className="file_img my-1" style={styleUpload}>
                                                <img src={images ? images.url : ''} alt="" className="img-thumbnail rounded"style={{height: '450px'}}/>
                                                <span onClick={handleDestroy}>X</span>
                                            </div>
                                        }
                                    </div>       
                            </div>
                        </div>                        
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Product ID"
                                input type="text"
                                id="product_id"
                                onChange={handleChangeInput}
                                disabled={onEdit}
                                name="product_id"
                                value={product.product_id}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                autoComplete='off'
                                />
                            </Grid>
                                            
                        <Grid item xs={5}>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Title"
                                input type="text" 
                                onChange={handleChangeInput}
                                name="title"
                                id="title"
                                value={product.title}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                autoComplete='off'
                            />
                        </Grid>
                                    
                        <Grid item xs={5}>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Price"
                                input type="number"
                                onChange={handleChangeInput}
                                name="price"
                                id="price"
                                value={product.price}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                autoComplete='off'
                            />
                        </Grid>
                        
                        <Grid item xs={5}>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                select name="category"
                                label="Category"
                                value={product.category}
                                onChange={handleChangeInput}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            >
                            {
                                categories.map((category) => (
                                <MenuItem key={category._id}value={category._id}>
                                    {category.name}
                                </MenuItem>
                                ))
                            }
                        </TextValidator>

                        </Grid>
                        
                        <Grid item xs={5}>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Description"
                                textarea type="text" 
                                onChange={handleChangeInput}
                                name="description" 
                                id="description"
                                rows={8}
                                multiline
                                size='medium'
                                value={product.description}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                autoComplete='off'
                            />
                        </Grid>

                        <Grid item xs={5}>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Content"
                                textarea type="text"
                                onChange={handleChangeInput}
                                name="content"
                                id="content"
                                rows={8}
                                multiline
                                size='medium'
                                value={product.content}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                autoComplete='off'
                                />
                        <Button  
                            variant="contained"
                            type="submit" 
                            className={classes.button}
                            color="secondary">{onEdit ? "Update" : "Create"}</Button>  
                        </Grid>
                    </Grid> 
                </ValidatorForm>
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
export default CreateProduct


