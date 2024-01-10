import {
  Box,
  Button, Checkbox, Container,
  FormControlLabel, Grid,
  Link,
  TextField,
  Typography
} from "@mui/material";
import {useFormik} from "formik";
import React from "react";
import * as Yup from "yup";

function LoginPage() {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberLogIn: false
    },
    onSubmit: ((values) => {
      console.log('On submit formik', values);
    }),
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required').email('Invalid email'),
      password: Yup.string().required('Password is required').min(6)
    })
  })

  return (
      <>
        <Container component="main" maxWidth="xs">
          <Typography component="h1" variant="h5">
            Sign in
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


              {/*{formik.errors.password}*/}

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
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>

        </Container>
      </>

  )
}

export default LoginPage
