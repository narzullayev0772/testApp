import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

const MyDialog = ({ open, toggle, countQuizzes, countCorrectAnswers }) => {
  return (
    <Dialog
      open={open}
      maxWidth={"sm"}
      fullWidth={true}
      onClose={() => {
        toggle(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Your results"}</DialogTitle>
      <DialogContent>
        <Typography className="text-center" variant="h4">
          {countCorrectAnswers} / {countQuizzes}
        </Typography>
        <Typography className="text-center" variant="h5">
          or
        </Typography>
        <Typography className="text-center" variant="h4">
          {Math.round((countCorrectAnswers / countQuizzes) * 100)} %
        </Typography>
      </DialogContent>
      <DialogActions className="d-flex">
        <Button
          onClick={() => {
            toggle(false);
          }}
          variant={"outlined"}
          color="primary"
          autoFocus
        >
          Ok
        </Button>
        <Button
          className="col"
          onClick={() => {
            window.location.href = "/";
          }}
          variant={"outlined"}
          color="secondary"
          autoFocus
        >
          Go Home
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default MyDialog;
