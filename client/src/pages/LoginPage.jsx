import {
  Box,
  Button, Checkbox, Container,
  FormControlLabel, Grid,
  Link,
  TextField,
  Typography
} from "@mui/material";
import {useFormik} from "formik";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import * as Yup from "yup";
import {loginWithEmailAndPassword, registerWithEmailAndPassword} from "../api/profileApi";
import Authentication from "../authentication";
import {auth} from "../firebase";

function LoginPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    setIsAuthenticated(Authentication.isAuthenticated());
  }, []);


  const [isSignInMode, setIsSignInMode] = useState(true);
  const navigate = useNavigate();

  const toggleSignInMode = () => {
    setIsSignInMode((prevMode) => !prevMode);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberLogIn: false
    },
    onSubmit: (({email, password}) => {
      console.log('On submit formik', email, password);

      if (isSignInMode) {
        loginWithEmailAndPassword(auth, email, password)
            .then(user => {
              // Authentication.login();
              Authentication.login( navigate("/classes"));
              console.log('Signed in', user);
              console.log('auth: ', Authentication.isAuthenticated());
            })
            .catch(error => { console.log(error)})
      } else {
        registerWithEmailAndPassword(auth, email, password).then(user => {
          Authentication.login(()=> console.log('Created user', user))
        }).catch(err => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error('Authentication error:', errorCode, errorMessage);
        })
      }
    }),
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required').email('Invalid email'),
      password: Yup.string().required('Password is required').min(6)
    })
  })

  return (
      <>
        {'isAuthenticated'+ isAuthenticated}
        <Container component="main" maxWidth="xs">
          <Typography component="h1" variant="h5">
            {isSignInMode ? "Sign In" : "Sign Up"}
          </Typography>

          <Box component="form" noValidate sx={{mt: 1}} onSubmit={formik.handleSubmit}>
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
                control={<Checkbox color="primary"
                    checked={formik.values.rememberLogIn}
                    onChange={formik.handleChange}
                    name='rememberLogIn'
                />}

                label="Remember me"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
                disabled={!formik.isValid}
            >
              {isSignInMode ? "Sign In" : "Sign Up"}
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
                      : "Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>

        </Container>
      </>

  )
}

export default LoginPage
