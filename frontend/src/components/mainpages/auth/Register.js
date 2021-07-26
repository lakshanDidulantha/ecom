import React, {useState} from 'react';
import {Container, CssBaseline, Avatar, Typography, 
    Button, Grid, makeStyles, Card, CardContent} from '@material-ui/core';
import {LockRounded} from '@material-ui/icons';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import axios from 'axios'
import {Link} from 'react-router-dom'


const Register=(props)=> {
    const classes = useStyles();
    const [user, setUser] = useState({
        name:'', email:'', password: ''
    })
    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    })

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            await axiosInstance.post('/user/register', {...user})
            window.location.href = "/";
            toast.success('User Registered Successfully');
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Card className={classes.card}>
                <CardContent>
                    <ToastContainer/>
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockRounded/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        <ValidatorForm 
                         onSubmit={registerSubmit}
                         className={classes.form}>
                        <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Name"
                                onChange={onChangeInput}
                                name="name"
                                value={user.name}
                                validators={['required']}
                                errorMessages={['this field is required', 'Name is not valid']}
                                autoComplete='off'
                            />
                            <br/>
                            <TextValidator
                               variant="outlined"
                               margin="normal"
                               fullWidth
                               label="Email"
                               onChange={onChangeInput}
                               name="email"
                               value={user.email}
                               validators={['required', 'isEmail']}
                               errorMessages={['this field is required', 'email is not valid']}
                               autoComplete='off'
                            />
                            <br/>
                            <TextValidator
                                 variant="outlined"
                                 fullWidth
                                 label="Password"
                                 onChange={onChangeInput}
                                 name="password"
                                 type="password"
                                 value={user.password}
                                 validators={['required']}
                                 errorMessages={['this field is required']}
                                 autoComplete="off"
                            />
                             <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={classes.submit}
                            >
                                Sign Up
                            </Button>
                            <Grid container>
                                <Grid item>
                                <Link  to="/login" onClick={props.toggle} className={classes.pointer} variant="body2">
                                    {"Already have an account? Sign In"}
                                </Link>
                                </Grid>
                            </Grid>
                        </ValidatorForm>
                    </div>
                </CardContent>
            </Card>
        </Container>
    )
}
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          margin: theme.spacing(3, 0, 2),
          color: '#fff'
      },
      card: {
          marginTop: '60px',
          paddingLeft: '20px',
          paddingRight: '20px',
          paddingBottom: '20px',
      },
      pointer: {
          cursor: 'pointer',
          color: 'red'
      }
}))
export default Register
