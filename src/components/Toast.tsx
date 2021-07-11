import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Alert, { Color } from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

export const Toast = ({
  severity,
  message,
}: {
  severity: Color;
  message: string;
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert security={severity}>{message}</Alert>
    </div>
  );
};
