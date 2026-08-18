import * as React from 'react';
import { Button, Link, Paper, TextField, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import useStyles from '../styles/styles';
import { useDispatch, useSelector } from "react-redux"
import {
  useNavigate,
  Navigate
} from 'react-router-dom'
import { useState } from 'react';
import { login } from '../reducers/accountReducer';

import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {
    const [loading, setLoading] = useState(false);
    
    const { isLoggedIn } = useSelector((state) => state.account);
    
    const navigate = useNavigate()
    const classes = useStyles()
    const dispatch = useDispatch()

    const handleLogin = (event) => {
        event.preventDefault()
        setLoading(true);

        const userCredentials = {
            email: event.target.email.value,
            password: event.target.password.value,
        }
        dispatch(login(userCredentials))
        .unwrap()
        .then(() => {
          event.target.email.value = ''
          event.target.password.value = ''
          navigate("/", {replace: true});
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    }
    if (isLoggedIn) {
      return <Navigate to="/" />;
    }
    
  return loading === true 
  ? (<div className={classes.loadingBtn}>
    <CircularProgress className={classes.LoginIcon}/>
  </div>) 
  :(
    <>
      <main>
          <div style={{textAlign:'center', padding: '0', margin: '60px 0 20px 0'}}>
            <LockIcon className={classes.LoginIcon}/>
          </div>
        <form onSubmit={handleLogin}>
        <Paper
          sx={{
            width: 300,
            mx: 'auto', // margin left & right
            // my: 4, // margin top & botom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 1,
          }}
          variant="outlined"
        >
          <div>
            <Typography variant="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography variant="body2">Sign in to continue.</Typography>
          </div>
          <TextField
            // html input attribute
            name="email"
            type="email"
            placeholder="johndoe@email.com"
            // pass down to FormLabel as children
            label="Email"
            required
          />
          <TextField
            name="password"
            type="password"
            placeholder="password"
            label="Password"
            required
          />
            <Button 
            variant="contained" 
            type="submit"
            className={classes.chosenColor} 
            sx={{ mt: 1 /* margin top */ }}>
                Log in
            </Button>

          <Typography variant="body2" sx={{ alignSelf: 'center' }}>
            Don&apos;t have an account? <Link href="/sign-up">Sign up</Link>
          </Typography>
        </Paper>
        </form>

      </main>
    </>
  );
}

export default Login
