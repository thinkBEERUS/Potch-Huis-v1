import { useState, useContext, useEffect } from "react";
import { AppState } from "../AppState";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Typography,
  Paper,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Phone,
  Home,
  Lock,
  CheckCircle,
} from "@material-ui/icons";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { appState, setAppState } = useContext(AppState);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cell: "",
    streetAddress: "",
    suburb: "",
    city: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  });

  async function setMemberNumber() {
    const memNumUrl = process.env.REACT_APP_API_URL + "/Members/MemberNumber";
    const response = await fetch(memNumUrl).then((response) => response.json());
    const memberNumber = `PH${response}`;
    setAppState({
      ...appState,
      memberNumber: memberNumber,
    });
  }

  useEffect(() => {
    setMemberNumber();
  }, []);

  const [formErrors, setFormErrors] = useState({});

  const handlelogin = () => {
    navigate("/Login");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleClickShowPassword = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      showPassword: !prevFormData.showPassword,
    }));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("clicked");
    const errors = {};

    if (!formData.firstName) {
      errors.firstName = "First name is required";
    }

    if (!formData.lastName) {
      errors.lastName = "Last name is required";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    }

    if (!formData.cell) {
      errors.cell = "Cellphone number is required";
    }

    if (!formData.streetAddress) {
      errors.streetAddress = "Street Address is required";
    }

    if (!formData.suburb) {
      errors.suburb = "Suburb is required";
    }

    if (!formData.city) {
      errors.city = "City is required";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (Object.keys(errors).length === 0) {
      const memNum = await fetch(
        process.env.REACT_APP_API_URL + "/Members/MemberNumber"
      ).then((response) => response.json());
      const formDataToSend = {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        cellphone: formData.cell,
        streetAddress: formData.streetAddress,
        suburb: formData.suburb,
        city: formData.city,
        memberNumber: `PH${memNum}`,
        id: 0,
      };

      fetch(process.env.REACT_APP_API_URL + "/Members", {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Member Created!");

            fetch(
              `${process.env.REACT_APP_API_URL}/Members/Auth?password=${formData.password}&memberNumber=PH${memNum}`,
              {
                method: "POST",
                headers: {
                  accept: "*/*",
                  "Content-Type": "application/json",
                },
              }
            )
              .then((response) => {
                if (response.ok) {
                  console.log("Password Created!");
                  handlelogin();
                }
              })
              .catch((error) => console.error(error));
          }
        })
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 1000, width: "90%" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            defaultValue={formData.firstName}
            onChange={handleInputChange}
            error={!!formErrors.firstName}
            helperText={formErrors.firstName}
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            defaultValue={formData.lastName}
            onChange={handleInputChange}
            error={!!formErrors.lastName}
            helperText={formErrors.lastName}
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            defaultValue={formData.email}
            onChange={handleInputChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Cellphone Number"
            name="cell"
            defaultValue={formData.cell}
            onChange={handleInputChange}
            error={!!formErrors.cell}
            helperText={formErrors.cell}
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Street Address"
            name="streetAddress"
            defaultValue={formData.streetAddress}
            onChange={handleInputChange}
            error={!!formErrors.streetAddress}
            helperText={formErrors.streetAddress}
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Home />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Suburb"
            name="suburb"
            defaultValue={formData.suburb}
            onChange={handleInputChange}
            error={!!formErrors.suburb}
            helperText={formErrors.suburb}
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Home />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="City"
            name="city"
            defaultValue={formData.city}
            onChange={handleInputChange}
            error={!!formErrors.city}
            helperText={formErrors.city}
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Home />
                </InputAdornment>
              ),
            }}
          />
          <FormControl
            fullWidth
            variant="outlined"
            error={!!formErrors.password}
            margin="normal"
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              type={formData.showPassword ? "text" : "password"}
              defaultValue={formData.password}
              onChange={handleInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            <FormHelperText>{formErrors.password}</FormHelperText>
          </FormControl>
          <FormControl
            fullWidth
            variant="outlined"
            error={!!formErrors.confirmPassword}
            margin="normal"
          >
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirmPassword"
              name="confirmPassword"
              type={formData.showPassword ? "text" : "password"}
              defaultValue={formData.confirmPassword}
              onChange={handleInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
            <FormHelperText>{formErrors.confirmPassword}</FormHelperText>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              endIcon={<CheckCircle />}
              onClick={handleSubmit}
            >
              Register
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default RegistrationForm;
