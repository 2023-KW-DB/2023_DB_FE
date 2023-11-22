import * as React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Link
} from "@mui/material";
import ListIcon from '@mui/icons-material/List';
import PageRouter from "./Router";
import { RouterProvider, Link as RouterLink, Router } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/userSlice";


const drawerWidth = 240;
const navItems = [{
  name: "공지사항",
  path: "/board/notice"
},{
  name: "지도 확인",
  path: "/",
}, {
  name: "이력 확인",
  path: "/history",
}]

const guestNavItems = [{
  name: "로그인",
  path: "/login",
}, {
  name: "회원가입",
  path: "/register"
}]

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['id']);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  
  useEffect(() => {
    (async() => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/users/get-userinfo?user_id=${cookies.id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.status !== 200) {
          throw new Error("로그인에 실패하였습니다.");
        }
        const jsonData = await response.json();
        console.log(jsonData);
        dispatch(setUser(jsonData.result));
      } catch (error) {
        console.log(error);
      }
      
    })();
  }, [])

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        따릉이 시뮬레이터
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Link component={RouterLink} to={item.path} underline="none" color="inherit">
                <ListItemText primary={item.name} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <ListIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" }, underline: "none", color: "#fff"}}
            component={RouterLink}
            to="/"
          >
            따릉이 시뮬레이터
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item.name} sx={{ color: "#fff" }}>
                <Link component={RouterLink} to={item.path} underline="none" color="inherit">
                  {item.name}
                </Link>
              </Button>
            ))}
            {(!user || !user.username) && guestNavItems.map((item) => (
              <Button key={item.name} sx={{ color: "#fff" }}>
                <Link component={RouterLink} to={item.path} underline="none" color="inherit">
                  {item.name}
                </Link>
              </Button>
            ))}
            <Button sx={{ color: "#fff" }}>
              <Link component={RouterLink} to="/userpage" underline="none" color="inherit">
                <Typography variant="span">
                  {user && user.username ? user.username + "님 " : "손님 "}
                  반갑습니다.
                </Typography>
              </Link>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ width: "100%" }}>
        <Toolbar />
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <PageRouter />
        </Box>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
