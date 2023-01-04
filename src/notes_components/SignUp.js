import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import LockIcon from '@mui/icons-material/Lock';
import useStyles from '../styles/styles';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate,Navigate } from 'react-router-dom'
import { useState } from 'react';
import { register } from '../reducers/accountReducer';

import CircularProgress from '@mui/material/CircularProgress';


const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const { isLoggedIn } = useSelector((state) => state.account);

    const navigate = useNavigate()
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = useSelector(state => state)
    const handleSignup = (event) => {
        event.preventDefault()
        setSuccessful(false);
        const userCredentials = {
            firstname: event.target.firstname.value,
            lastname: event.target.lastname.value,
            email: event.target.email.value,
            password: event.target.password.value,
        }
        
        dispatch(register(userCredentials))
        .unwrap()
        .then(() => {
            setSuccessful(true);
            event.target.firstname.value = ''
            event.target.lastname.value =  ''
            event.target.email.value = ''
            event.target.password.value = ''
            navigate("/login");
            window.location.reload();
        })
        .catch(() => {
            setSuccessful(false);
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
    <CssVarsProvider>
      <main>
          <div style={{textAlign:'center', padding: '0', margin: '60px 0 20px 0'}}>
            <LockIcon className={classes.LoginIcon}/>
          </div>
        <form onSubmit={handleSignup}>
        <Sheet
          sx={{
            width: 300,
            mx: 'auto', // margin left & right
            // my: 4, // margin top & botom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body2">Sign up to continue.</Typography>
          </div>
          <TextField
            // html input attribute
            name="firstname"
            type="text"
            placeholder="john"
            // pass down to FormLabel as children
            label="First name"
            required
          />
          <TextField
            // html input attribute
            name="lastname"
            type="text"
            placeholder="doe"
            // pass down to FormLabel as children
            label="Last name"
            required
          />
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
            type="contained" 
            className={classes.chosenColor} 
            sx={{ mt: 1 /* margin top */ }}>
                Sign Up
            </Button>

          <Typography
            endDecorator={<Link href="/login">Sign in</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Already have an account?
          </Typography>
        </Sheet>
        </form>

      </main>
    </CssVarsProvider>
  );
}

export default SignUp