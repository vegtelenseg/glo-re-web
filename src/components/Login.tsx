import React from "react";
import { Box, Button, Grid, Paper, TextField } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../contexts/auth/AuthController";
import gloLo from "../assets/img/glo-lo.png";
export interface UserInfo {
  username: string;
  password: string;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)",
    backgrounColor: " #fff",
    width: "70%",
    maxWidth: "400px",
    margin: "0 auto",
    marginTop: "20px",
    padding: "10px 20px",
    border: "1px solid rgb(204, 204, 204)",
    borderRadius: "2.5px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, .2)",
  },
  inputField: {
    width: "100%",
  },
  gloLo: {
    width: "100%",
  },
  submitButton: {
    width: "100%",
    marginBottom: theme.spacing(1.6),
  },
}));

export const Login = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  }); // initialize the hook
  const { handleLogin } = React.useContext(AuthContext);
  const classes = useStyles();
  const onSubmit = async (data: any) => {
    handleLogin(data);
  };

  return (
    <Paper variant='elevation' className={classes.paper}>
      <Box mb={2}>
        <img src={gloLo} className={classes.gloLo} alt='logo' />
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Controller
              name='username'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant='outlined'
                  size='small'
                  name='username'
                  className={classes.inputField}
                />
              )}
            />
            {errors.username && "Password is a required field"}
          </Grid>
          <Grid item xs={12} md={12}>
            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant='outlined'
                  size='small'
                  className={classes.inputField}
                  name='password'
                />
              )}
            />
            {errors.password && "Password is a required field"}
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              size='large'
              className={classes.submitButton}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
