import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { options } from "../devdata";

import { MdChevronLeft, MdChevronRight, MdMenu } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import RenderContents from "../renderContents/renderCotent";
import AccountMenu from "../appbar/appbarIcon";
import { useState } from "react";
import axios from "axios";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Dashboard({ children, socket }) {
  const [defaultProducts, setDefaultProducts] = useState([]);

  const [page, setPage] = useState("");

  const getAllProducts = async (type) => {
    try {
      let { data } = await axios.get(
        "http://localhost:5000/api/v1/products?type=" + type
      );
      setDefaultProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts(page);
  }, [page]);

  const userJson = localStorage.getItem("user");
  const user = JSON.parse(userJson)?.data;

  const navigate = useNavigate();
  const { type } = useParams();
  const param = useParams();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (socket) {
      socket.on("new product", (data) => {
        setDefaultProducts([...defaultProducts, data]);
      });
    }
  }, [socket, defaultProducts]);

  useEffect(() => {
    if (type) {
      setPage(type);
    }
  }, [type, setPage]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MdMenu />
          </IconButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" noWrap component="div">
              iSIMPLE
            </Typography>
            <AccountMenu socket={socket ? socket : ""} user={user} />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <MdChevronRight /> : <MdChevronLeft />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {options
            .filter((option) => user.products.includes(option.type))
            .map((category, index) => (
              <ListItemButton
                key={index}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => {
                  navigate(`/dashboard/${category.link}`);
                  // filter products by category
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    fontSize: "1.7rem",
                    color: "#0088cc",
                  }}
                >
                  {category.icon}
                </ListItemIcon>
                <ListItemText
                  primary={category.type}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          justifyContent: "space-between",
          width: "calc(100% - 64px)",
        }}
      >
        <DrawerHeader />

        {type ? (
          <>
            <RenderContents products={defaultProducts} page={type} />
          </>
        ) : (
          ""
        )}
        {param && children}
      </Box>
    </Box>
  );
}
