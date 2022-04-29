import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { MdLockOutline } from "react-icons/md";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import LimitTags from "./chip";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [type, setType] = React.useState("");
  const [city, setCity] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [api, setApi] = React.useState("");
  const [products, setProducts] = React.useState([]);

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleChangeCity = (event) => {
    setCity(event.target.value);
    // navigator.geolocation.getCurrentPosition(function (position) {
    // });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUser = {
      type,
      city,
      name,
      email,
      password,
      products: products.map((e) => e.type),
    };
    try {
      if (password === confirmPassword) {
        let { data } = await authService.register(newUser);
        if (data.status === "success") {
          navigate("/dashboard");
        }
        setApi(data.message);
      }
    } catch (err) {
      setApi(err.response.data.message);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <MdLockOutline />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Typography
            component="h5"
            variant="body2"
            color={"red"}
            bgcolor="InfoBackground"
          >
            {api}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Your Name: "
                  autoFocus
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  error={name.length < 6}
                  helperText={name.length < 5 ? "minimal 6 character" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  error={
                    email.length > 0 &&
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
                  }
                  helperText={
                    email.length > 0 &&
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
                      ? "Invalid email address"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Type"
                    onChange={handleChangeType}
                    required={true}
                    defaultValue="buyer"
                  >
                    <MenuItem value={"seller"}>Seller</MenuItem>
                    <MenuItem value={"buyer"}>Buyer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label-city">
                    City
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label-city"
                    id="demo-simple-select-city"
                    value={city}
                    label="Joylashuv"
                    onChange={handleChangeCity}
                  >
                    <MenuItem value={"Toshkent shahri"}>
                      Toshkent shahri{" "}
                    </MenuItem>
                    <MenuItem value={"Toshkent viloyati"}>
                      Toshkent viloyat
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {type === "seller" && (
                <Grid item xs={12}>
                  <LimitTags setProducts={setProducts} />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  error={password.length < 6}
                  helperText={password.length < 5 ? "minimal 6 character" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password-confirm"
                  label="Password Confirm"
                  type="password"
                  id="password-confirm"
                  autoComplete="new-password"
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                  }}
                  error={password !== confirmPassword}
                  helperText={password !== confirmPassword ? "not match" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
