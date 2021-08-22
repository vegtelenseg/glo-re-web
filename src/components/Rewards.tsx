import { useContext, useState } from "react";
import {
  Box,
  makeStyles,
  Typography,
  CircularProgress,
  Button,
  Modal,
} from "@material-ui/core";
import "react-circular-progressbar/dist/styles.css";
import { theme } from "../themes/theme";
import { CircularProgressbar } from "react-circular-progressbar";
import { RedeemPointsForm } from "../forms/RedeemPointsForm";
import { useGetRewardsQuery } from "../generated/graphql";
import { AuthContext } from "../contexts/auth/AuthController";

const useStyles = makeStyles((them) => ({
  rewardsPanel: {
    top: "50%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  rewardsTitle: {
    textAlign: "center",
  },
}));

export const Rewards = () => {
  const classes = useStyles();
  const [open, setModalIsOpen] = useState(false);
  const { auth } = useContext(AuthContext);
  const { data, error, loading, refetch } = useGetRewardsQuery({
    variables: {
      userId: auth.authenticated ? auth.id : "",
    },
  });
  if (loading) {
    return <CircularProgress />;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    // TODO: Find better way to refetch
    refetch();
    // Sums up points, fixes them to two decimal places and convert to string
    const totalRewards = Number(
      (
        data?.purchases?.reduce(
          (accumulator: any, currentValue: any) =>
            accumulator + currentValue.points,
          0
        ) as number
      ).toFixed(2)
    );
    return (
      <div className={classes.rewardsPanel}>
        <Box
          my={3}
          justifyContent='center'
          flex
          className={classes.rewardsTitle}
        >
          <Typography variant='subtitle1' color='primary'>
            Rewards Collected
          </Typography>
        </Box>
        <CircularProgressbar
          value={totalRewards}
          text={`${totalRewards}`}
          // TODO: Get max points value from the back end
          maxValue={3000}
          strokeWidth={6}
          styles={{
            trail: {
              stroke: theme.palette.secondary.dark,
            },
          }}
        />
        <Box mt={6}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setModalIsOpen(true)}
          >
            Redeem Points
          </Button>
          <Modal
            open={open}
            onClose={() => setModalIsOpen(false)}
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
          >
            <Box>
              <RedeemPointsForm />
            </Box>
          </Modal>
        </Box>
      </div>
    );
  }
};
