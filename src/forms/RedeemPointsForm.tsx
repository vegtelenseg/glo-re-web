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
import { useRedeemRewardsMutation } from "../generated/graphql";
import { Toast } from "../components/Toast";
import { Color } from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  paper: {
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

interface AddPurchaseProps {
  username: string;
  password: string;
  amount: number;
}

export const RedeemPointsForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<AddPurchaseProps>({
    defaultValues: {
      amount: 0,
      password: "",
      username: "",
    },
  });

  const [redeemedRewards, setRedeemedRewards] = React.useState(false);
  const { auth } = React.useContext(AuthContext);
  const [redeemRewards] = useRedeemRewardsMutation({
    onCompleted: () => setRedeemedRewards(true),
    onError: () => setRedeemedRewards(false),
  });
  const classes = useStyles();
  const onSubmit = async (data: any) => {
    if (!auth.authenticated) {
      throw Error("Unauthorized to make this request");
    }

    await redeemRewards({
      variables: {
        input: {
          username: data.username,
          password: data.password,
          amount: Number(data.amount),
        },
      },
    });
  };

  const toastContent = () => {
    let severity: Color = "warning";
    let message: string = "";
    if (redeemedRewards) {
      severity = "success";
      message = "Successfully redeemed rewards";
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
        <Typography>Redeem Rewards</Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Controller
              name='amount'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant='outlined'
                  size='small'
                  label='Rewards amount'
                  className={classes.inputField}
                />
              )}
            />
            {errors.amount && "Reward amount cannot be blank."}
          </Grid>

          <Grid item xs={12} md={12}>
            <Controller
              name='username'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant='outlined'
                  size='small'
                  label='Username'
                  className={classes.inputField}
                />
              )}
            />
            {errors.username && "Username cannot be blank."}
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
                  label='Password'
                  className={classes.inputField}
                />
              )}
            />
            {errors.password && "Password cannot be blank."}
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              size='large'
              className={classes.submitButton}
            >
              Redeem
            </Button>
          </Grid>
        </Grid>
      </form>
      {redeemedRewards && <Toast {...toastContent()} />}
    </Paper>
  );
};
