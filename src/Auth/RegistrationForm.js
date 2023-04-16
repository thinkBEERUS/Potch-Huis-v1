import { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  });

  const [formErrors, setFormErrors] = useState({});

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = {};

    if (!formData.firstName) {
      errors.firstName = "First name is required";
    }

    if (!formData.lastName) {
      errors.lastName = "Last name is required";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
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
      // Handle form submission
      console.log("Form submitted");
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="firstName"
        name="firstName"
        label="First Name"
        value={formData.firstName}
        onChange={handleInputChange}
        error={!!formErrors.firstName}
        helperText={formErrors.firstName}
        sx={{ marginBottom: "16px" }}
        fullWidth
      />

      <TextField
        id="lastName"
        name="lastName"
        label="Last Name"
        value={formData.lastName}
        onChange={handleInputChange}
        error={!!formErrors.lastName}
        helperText={formErrors.lastName}
        sx={{ marginBottom: "16px" }}
        fullWidth
      />

      <TextField
        id="email"
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        error={!!formErrors.email}
        helperText={formErrors.email}
        sx={{ marginBottom: "16px" }}
        fullWidth
      />

      <FormControl variant="outlined" fullWidth sx={{ marginBottom: "16px" }}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          name="password"
          type={formData.showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleInputChange}
          error={!!formErrors.password}
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
        {formErrors.password && (
          <FormHelperText error>{formErrors.password}</FormHelperText>
        )}
      </FormControl>
      <FormControl variant="outlined" fullWidth sx={{ marginBottom: "16px" }}>
        <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
        <OutlinedInput
          id="confirm-password"
          name="confirmPassword"
          type={formData.showPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={!!formErrors.confirmPassword}
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
        {formErrors.confirmPassword && (
          <FormHelperText error>{formErrors.confirmPassword}</FormHelperText>
        )}
      </FormControl>

      <Button variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default RegistrationForm;
