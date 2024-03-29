import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { loginWithEmailAndPassword, registerWithEmailAndPassword } from '../api/profileApi';
import { AuthContext } from '../AuthContext';
import { auth } from '../firebase';
import { User, UserCredential } from 'firebase/auth';
import WrapperWithNavbar from '../components/WrapperWithNavbar';

function LoginPage() {
  const { userValue, setUserValue } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userValue) {
      navigate('/classes');
    }
  }, [userValue]);

  const [isSignInMode, setIsSignInMode] = useState(true);

  const toggleSignInMode = () => {
    setIsSignInMode(prevMode => !prevMode);
    formik.resetForm();
  };

  const onLoggedIn = (user: User) => {
    setUserValue(user);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberLogIn: false,
    },
    onSubmit: ({ email, password }) => {
      if (isSignInMode) {
        loginWithEmailAndPassword(auth, email, password)
          .then(({ user }: UserCredential) => {
            onLoggedIn(user);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        registerWithEmailAndPassword(auth, email, password)
          .then(({ user }: UserCredential) => {
            onLoggedIn(user);
          })
          .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Authentication error:', errorCode, errorMessage);
          });
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required').email('Invalid email'),
      password: Yup.string().required('Password is required').min(6),
    }),
  });

  return (
    <WrapperWithNavbar>
      <Container component="main" maxWidth="xs" sx={{ mt: 4 }}>
        <Typography component="h1" variant="h5">
          {isSignInMode ? 'Sign In' : 'Sign Up'}
        </Typography>

        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={formik.handleSubmit}>
          <TextField
            value={formik.values.email}
            onChange={formik.handleChange}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={!!formik.errors.email}
          />

          <TextField
            value={formik.values.password}
            onChange={formik.handleChange}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!formik.errors.password}
          />

          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={formik.values.rememberLogIn}
                onChange={formik.handleChange}
                name="rememberLogIn"
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!formik.isValid}>
            {isSignInMode ? 'Sign In' : 'Sign Up'}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link onClick={toggleSignInMode} variant="body2">
                {isSignInMode
                  ? "Don't have an account? Sign Up"
                  : 'Already have an account? Sign In'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </WrapperWithNavbar>
  );
}

export default LoginPage;
