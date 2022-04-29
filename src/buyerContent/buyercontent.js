import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function BuyerContent({ image, type, comment, cost, time }) {
  return (
    <Card sx={{ maxWidth: 300, margin: "2% auto" }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="160"
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Kerak: {type}
        </Typography>
        <Typography gutterBottom variant="subtitle1" component="div">
          Narx: {cost}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {comment}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {time}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          size="small"
          color="error"
          variant="contained"
          onClick={() => {}}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
