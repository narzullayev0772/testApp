import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function AvatarList({
  username,
  lastMessage,
  status,
  isNav,
  href,
}) {
  return (
    <ListItem
      alignItems="center"
      sx={
        !isNav
          ? {
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.08)",
              },
              "&:active": {
                backgroundColor: "rgba(0, 0, 0, 0.12)",
              },
            }
          : {}
      }
    >
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={href} />
      </ListItemAvatar>
      <ListItemText
        primary={username}
        secondary={
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "60%",
              wordBreak: "break-word",
            }}
            variant="body2"
            component="p"
            color={isNav ? "#00f" : "text.secondary"}
          >
            {lastMessage ? lastMessage : status}
          </Typography>
        }
      />
    </ListItem>
  );
}
