import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { MdExpandMore, MdMessage } from "react-icons/md";
import { Link } from "react-router-dom";
import moment from "moment";
import { Collapse } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ImgMediaCard({ item, hide }) {
  const [expanded, setExpanded] = React.useState(false);
  const [add, setAdd] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addToCart = () => {
    setAdd(!add);
  };

  return (
    <Card
      sx={{
        width: "100%",
        minWidth: 200,
        maxWidth: 300,
        marginBottom: "1rem",
        transition: "all 0.3s ease-in-out",
      }}
    >
      {hide !== "hide" ? (
        <Link to={`/user/${item.from.username}`}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
            }
            title={item.from.username}
            subheader={item.location}
          />
        </Link>
      ) : (
        ""
      )}
      <CardMedia
        component="img"
        height={150}
        image={item.image}
        alt={item.image}
      />
      <CardContent>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            marginTop: "1rem",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body2"
            color="text.primary"
            component="p"
            sx={{
              fontSize: "0.8rem",
            }}
          >
            {/* with moment js */}
            {moment(parseInt(item.date)).fromNow()}
          </Typography>
        </div>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to={`/chat/${item.from.username}`}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <IconButton
            aria-label="add to box"
            style={{
              color: "#00f",
              fontSize: "1.4rem",
            }}
            onClick={addToCart}
          >
            <MdMessage />
          </IconButton>
        </Link>

        <Typography
          variant="body"
          color="text.primary"
          component={"h4"}
          sx={{
            width: "100%",
            textAlign: "center",
          }}
        >
          {item.price} {item.currency}
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <MdExpandMore />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography
            paragraph
            sx={{
              fontSize: "0.8rem",
              textAlign: "justify",
              width: "100%",
              whiteSpace: "break-spaces",
              wordBreak: "break-word",
            }}
          >
            {item.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
