import { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { withState } from "../chat-context";
import { makeStyles } from "@mui/styles";
import {
  Container,
  Typography,
  TextField,
  CssBaseline,
  Button,
} from "@mui/material";
import { AUTH_FAIL, AUTH_SUCCESS } from "../store/actionTypes";
import AuthService from "../services/AuthService";

const styles = makeStyles({
  container: {
    background: "#F0F0F0",
    margin: "50px auto",
    padding: "100px",
    "& h6": {
      fontSize: "16px",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gridGap: "10px",
    "& a": {
      color: "#1769aa",
      textDecoration: "none",
      "&:hover": {
        color: "black",
      },
    },
    "& button": {
      "&:hover": {
        background: "#F0F0F0",
        color: "#1769aa",
        border: "1px solid #1769aa",
      },
    },
  },
  invalid: {
    "&:hover .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "1px solid red",
      },
    },
    "& .Mui-focused": {
      "& fieldset": {
        border: "1px solid red !important",
      },
    },
    "& .MuiOutlinedInput-root ": {
      "& fieldset": {
        border: "1px solid red",
      },
    },
  },
});
const Signin = (props) => {
  const [formData, setFormData] = useState({
    email: {
      value: "",
      valid: false,
      validation: {
        required: true,
        isEmail: true,
      },
      touched: false,
    },
    password: {
      value: "",
      valid: false,
      validation: {
        required: true,
        minLength: 6,
        maxLength: 12,
      },
      touched: false,
    },
    valid: false,
  });

  const classes = styles();

  const _inputChangeHandler = (event) => {
    const updatedForm = {
      ...formData,
      [event.target.name]: {
        ...formData[event.target.name],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          formData[event.target.name].validation
        ),
        touched: true,
      },
    };
    setFormData(updatedForm);
  };

  const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  const _authHandler = (event) => {
    event.preventDefault();
    const { email, password } = formData;

    AuthService.login({
      email: email.value,
      password: password.value,
    })
      .then((res) => {
        props.dispatch({
          type: AUTH_SUCCESS,
          token: res.token,
          user: res.user,
        });
        props.history.push("/");
      })
      .catch((err) => {
        props.dispatch({ type: AUTH_FAIL, error: err });
      });
  };

  return (
    <Container maxWidth="sm">
      <CssBaseline>
        <div className={classes.container}>
          <Typography variant="h6">Fill in the details to sign in.</Typography>
          <form className={classes.form} onSubmit={_authHandler}>
            <TextField
              label="email"
              name="email"
              value={formData.email.value}
              className={
                formData.email.touched && !formData.email.valid
                  ? classes.invalid
                  : ""
              }
              type="email"
              onChange={_inputChangeHandler}
            />
            <TextField
              label="password"
              name="password"
              value={formData.password.value}
              className={
                formData.password.touched && !formData.password.valid
                  ? classes.invalid
                  : ""
              }
              type="password"
              onChange={_inputChangeHandler}
            />
            <Button type="submit" variant="contained">
              Sign In
            </Button>
          </form>
          <NavLink to="/signup">Don't have an account? Sign Up.</NavLink>
        </div>
      </CssBaseline>
    </Container>
  );
};

export default withState(withRouter(Signin));
