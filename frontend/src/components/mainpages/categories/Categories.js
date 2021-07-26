 import React, {useState, useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import {Typography,Grid,Card,Container,CardContent,DialogContent, IconButton,makeStyles,Button,CssBaseline} from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { AddCircle, Edit, Delete } from '@material-ui/icons';

function Categories() {
    const classes  = useStyles();
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = useState('')
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    }) 
  
    const [token] = state.token
    const [callback, setCallback] = state.categoriesAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')



    const createCategory = async e =>{
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axiosInstance.put(`/api/category/${id}`, {name: category}, {
                    headers: {Authorization: token}
                })
                toast.success(res.data.msg)
            }else{
                const res = await axiosInstance.post('/api/category', {name: category}, {
                    headers: {Authorization: token}
                })
                toast.success(res.data.msg)
            }
            setOnEdit(false)
            setCategory('')
            setCallback(!callback)
            
        } catch (err) {
            toast.error('Please Add Category Name')
        }
    }


    const editCategory = async (id, name) =>{
        setID(id)
        setCategory(name)
        setOnEdit(true)
    }

    const deleteCategory = async id =>{
        try {
            const res = await axiosInstance.delete(`/api/category/${id}`, {
                headers: {Authorization: token}
            })
            toast.success(res.data.msg)
            setCallback(!callback)
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }
    const handleChangeInput = e => {setCategory(e.target.value)}

    return (
        <Container className={classes.container}>
            <Card className={classes.card}>
                <CardContent>
                    <ToastContainer/>
                        <CssBaseline/>
                            <Typography className={classes.title} variant="h6" component="div">
                                Create category
                            </Typography> 
                            <ValidatorForm onSubmit={createCategory}>
                            <DialogContent>   
                                <Grid container spacing={3}> 
                                <Grid item xs={5}>
                                    <TextValidator
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        label="Category"
                                        input type="text"
                                        id="category"
                                        onChange={handleChangeInput}
                                        name="category"
                                        value={category}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                        autoComplete='off'
                                    />
                                </Grid>   
                                <Grid item xs={4}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={createCategory}
                                        className={classes.button}
                                        startIcon={<AddCircle/>}
                                    >{onEdit? "Update" : "Add"}</Button>
                                </Grid>   
                                
                        </Grid>
                            {
                                categories.map(category => (
                                    <div key={category._id} className="card my-2 text-capitalize">
                                        <div className="d-flex justify-content-between" style={{paddingLeft:"10px",marginTop:"5px",marginBottom:'-10px'}}>
                                            {category.name}
                                            <div style={{cursor: 'pointer'}}>
                                                <IconButton onClick={() => editCategory(category._id, category.name)} color="primary" aria-label="update customer">
                                                    <Edit/>
                                                </IconButton>
                                                <IconButton  onClick={() => deleteCategory(category._id)} color="secondary" aria-label="delete customer">
                                                    <Delete/>
                                                </IconButton>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }      
                    </DialogContent>
                </ValidatorForm>
            </CardContent>
        </Card>
    </Container>
)
}


const useStyles = makeStyles((theme) => ({ 
    title: {
        flex: '1 1 100%',
        padding: '-10px',
        textAlign: 'center',
        fontWeightMedium: 500,
        fontSize: 32
    },
    container: {
        marginTop: '80px',
    }, 
    card: {
        marginTop: '30px',
        paddingLeft: '70px',
        paddingRight: '70px',
        paddingBottom: '30px',
    },
    button: {
        margin: theme.spacing(3),
       
    },
}));
export default Categories

