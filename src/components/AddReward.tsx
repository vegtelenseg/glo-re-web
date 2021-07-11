import React from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../contexts/auth/AuthController";
import { useCreateUserPurchaseMutation } from "../generated/graphql";
import { Toast } from "./Toast";
import { Color } from "@material-ui/lab/Alert";

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

export const AddReward = () => {
  const { handleSubmit, errors, control } = useForm();
  const [createdPurchase, setCreatedPurchase] = React.useState(false);
  const { auth } = React.useContext(AuthContext);
  const [createPurchase] = useCreateUserPurchaseMutation({
    onCompleted: () => setCreatedPurchase(true),
    onError: () => setCreatedPurchase(false),
  });
  const classes = useStyles();
  const onSubmit = async (data: any) => {
    if (!auth.authenticated) {
      throw Error("Unauthorized to make this request");
    }

    await createPurchase({
      variables: {
        input: {
          name: data.name,
          total: Number(data.total),
          userEmail: data.email,
          refNumber: data.refNumber,
        },
      },
    });
  };

  const toastContent = () => {
    let severity: Color = "warning";
    let message: string = "";
    if (createdPurchase) {
      severity = "success";
      message = "Successfully added purchase";
    } else {
      severity = "error";
      message = "Could not add purchase";
    }
    return {
      severity,
      message,
    };
  };

  return (
    <Paper variant='elevation' className={classes.paper} component='div'>
      <Box mb={2}>
        <Typography>Create a purchase</Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Controller
              name='name'
              control={control}
              as={(props) => (
                <TextField
                  {...props}
                  variant='outlined'
                  size='small'
                  name='name'
                  label='Item Purchased'
                  className={classes.inputField}
                />
              )}
            />
            {errors.username && "Purchase name cannot be blank."}
          </Grid>
          <Grid item xs={12} md={12}>
            <Controller
              name='total'
              control={control}
              as={(props) => (
                <TextField
                  {...props}
                  variant='outlined'
                  size='small'
                  name='name'
                  label='Total spent'
                  className={classes.inputField}
                />
              )}
            />
            {errors.username && "Total spent cannot be blank."}
          </Grid>
          <Grid item xs={12} md={12}>
            <Controller
              name='refNumber'
              control={control}
              as={(props) => (
                <TextField
                  {...props}
                  variant='outlined'
                  size='small'
                  label='Reference or Barcode No.'
                  className={classes.inputField}
                  name='refNumber'
                />
              )}
            />
            {errors.password && "Ref. No. cannot be blank."}
          </Grid>
          <Grid item xs={12} md={12}>
            <Controller
              name='email'
              control={control}
              as={(props) => (
                <TextField
                  {...props}
                  variant='outlined'
                  size='small'
                  label='Customer email'
                  className={classes.inputField}
                  name='email'
                />
              )}
            />
            {errors.password && "Customer email cannot be blank."}
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              size='large'
              className={classes.submitButton}
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
      {createdPurchase && <Toast {...toastContent()} />}
    </Paper>
  );
};
