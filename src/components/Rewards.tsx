import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { theme } from "../themes/theme";

const useStyles = makeStyles((them) => ({
  rewardsPanel: {
    top: "50%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
  },
  rewardsTitle: {
    textAlign: "center",
  },
}));
export const Rewards = () => {
  const classes = useStyles();
  return (
    <div className={classes.rewardsPanel}>
      <Box my={3} justifyContent='center' flex className={classes.rewardsTitle}>
        <Typography variant='subtitle1' color='primary'>
          Rewards Collected
        </Typography>
      </Box>
      <CircularProgressbar
        value={78}
        text={`78%`}
        strokeWidth={6}
        styles={{
          trail: {
            stroke: theme.palette.secondary.dark,
          },
          // path: {
          //   stroke: theme.palette.secondary.dark,
          // },
        }}
      />
    </div>
  );
};
