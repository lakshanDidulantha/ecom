import React, {useState} from 'react';
import {Container, CssBaseline, Avatar, Typography, FormControlLabel, 
    Button, Checkbox, Grid, makeStyles, Card, CardContent} from '@material-ui/core';
import {LockRounded} from '@material-ui/icons';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {ToastContainer, toast} from 'react-toastify';
import {ScaleLoader} from 'react-spinners';
import 'react-toastify/dist/ReactToastify.css'
import {Link} from 'react-router-dom'
import axios from 'axios'



function Login() {
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const [rememberme, setRememberMe] = useState(false);
    const [user, setUser] = useState({
        email:'', password: ''
    })
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    })
    const override = `
        display: block;
        margin-left: 100px;
        border-color: red;
    `;
    const onChangeInput = error =>{
        const {name, value} = error.target;
        setUser({...user, [name]:value})
    }
    const handleCheck = (event) => {
        setRememberMe(event.target.checked);
    }

    const loginSubmit = async error =>{
        setLoading(true);
        error.preventDefault()
        try {
            await axiosInstance.post('/user/login', {...user})
            window.location.href = "/";
        } catch (err) {
            toast.error(err.response.data.msg)
            setLoading(false);
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
                            Sign In
                        </Typography>
                        <ValidatorForm 
                            onSubmit={loginSubmit}
                            onError={errors => {
                                for (const err of errors) {
                                  console.log(err.props.errorMessages[0])
                                }
                                }}
                                className={classes.form}>
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
                         autoComplete='off' />
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
                        <FormControlLabel
                            control={<Checkbox value={rememberme} onChange={(e) => handleCheck(e)}  color="primary" />}
                            label="Remember me"
                        />
                        {loading ? (
                            <ScaleLoader
                            css={override}
                            size={150}
                            color={"#eb4034"}
                            loading={loading}/>
                        ) : (
                             <Button
                             type="submit"
                             fullWidth
                             variant="contained"
                             className={classes.submit}
                         >
                             Sign In
                         </Button>
                        )}
                        
                            <Grid container>
                                <Grid item>
                                    <Link  to = "/register" className={classes.pointer} variant="body2">
                                        {"Don't have an account? Sign Up"}
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
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%',
        marginTop: theme.spacing(1),
      },
      submit: {
          background: 'linear-gradient(45deg, #FE6B8B 20%, #FF8E53 90%)',
          margin: theme.spacing(3, 0, 2),
          color: '#fff'
      },
      card: {
          marginTop: '60px',
          paddingLeft: '20px',
          paddingRight: '20px',
          paddingBottom: '30px',
      },
      pointer: {
          cursor: 'pointer',
          color: 'red'
      }
}));

export default Login
