import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { options } from "../devdata";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Upload({ socket, user }) {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState("Smartphone");
  const [description, setDescription] = React.useState("");
  const [cost, setCost] = React.useState("");
  const [currency, setCurrency] = React.useState("sum");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          background:
            "repeating-linear-gradient(45deg, #000, transparent 100px)",
        }}
      >
        <Typography color={"#fff"}>E'lon berish</Typography>
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"E'lon berish "}</DialogTitle>
        <DialogContent>
          <InputLabel id="product-type">Mahsulot Turi</InputLabel>
          <Select
            fullWidth
            labelId="product-type"
            id="product"
            onChange={(e) => setType(e.target.value)}
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
            color="primary"
            required
            defaultValue={options[0].type}
          >
            {options.map((category, index) => (
              <MenuItem key={index} value={category.type}>
                {category.type}
              </MenuItem>
            ))}
          </Select>
          <TextField
            id="standard-basic"
            label="Mahsulot narxi"
            required
            onChange={(e) => setCost(e.target.value)}
          />
          <Select
            sx={{
              mx: "10px",
            }}
            required
            defaultValue={"sum"}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value={"sum"}>sum</MenuItem>
            <MenuItem value={"$"}>$</MenuItem>
          </Select>
          <TextField
            fullWidth
            id="standard-basic"
            label="Qo'shimcha"
            multiline
            sx={{
              my: "10px",
            }}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color={"error"}>
            Bekor qilmoq
          </Button>
          <Button
            onClick={() => {
              if (socket) {
                socket.emit("new product", {
                  type,
                  description,
                  cost,
                  currency,
                  date: Date.now(),
                  from: {
                    username: user.username,
                  },
                  location: user.location,
                });
              }
              handleClose();
            }}
          >
            E'lon qilmoq
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
