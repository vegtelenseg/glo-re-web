import { useState } from "react";
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
import { gql, useQuery } from "@apollo/client";
import { CircularProgressbar } from "react-circular-progressbar";
import { RedeemPointsForm } from "../forms/RedeemPointsForm";

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

  const { data, error, loading, refetch } = useQuery(gql`
    {
      rewards {
        points
      }
    }
  `);
  if (loading) {
    return <CircularProgress />;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    // TODO: Find better way to refetch
    refetch();
    const totalRewards = data.rewards.reduce(
      (accumulator: any, currentValue: any) =>
        accumulator + currentValue.points,
      0
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
