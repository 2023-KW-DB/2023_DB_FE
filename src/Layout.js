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
  Link,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import PageRouter from "./Router";
import { RouterProvider, Link as RouterLink, Router, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/userSlice";

const drawerWidth = 240;
const navItems = [
  {
    name: "게시판 / 문의",
    path: "/board?id=notice",
    need_login: false,
  },
  {
    name: "이력 확인",
    path: "/history",
    need_login: true,
  },
  {
    name: "이용권 구매",
    path: "/ticket",
    need_login: true,
  },
  {
    name: "뉴스",
    path: "/news",
    need_login: false,
  },
  {
    name: "즐겨찾기",
    path: "/favorite",
    need_login: true,
  },
  {
    name: "랭킹",
    path: "/ranking",
    need_login: false,
  },
];

const guestNavItems = [
  {
    name: "로그인",
    path: "/login",
  },
  {
    name: "회원가입",
    path: "/register",
  },
];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["id"]);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies && cookies.id) {
      (async () => {
        try {
          const response = await fetch(process.env.REACT_APP_API_URL + `/users/get-userinfo?user_id=${cookies.id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          if (response.status !== 200) {
            throw new Error("로그인에 실패하였습니다.");
          }
          const jsonData = await response.json();
          dispatch(setUser(jsonData.result));
        } catch (error) {
          console.log(error);
          document.cookie = "";
          dispatch(setUser({}));
          document.location.href = "/";
        }
      })();
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    (async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + "/users/signout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
      } catch (error) {
        console.log(error);
      }
      // Remove all cookie
      document.cookie = "";
      dispatch(setUser({}));
      document.location.href = "/";
    })();
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }} component={RouterLink} to={"/"}>
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

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
            <ListIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              // display: { xs: "none", sm: "block" },
              underline: "none",
              justifyContent: "center",
              color: "#fff",
            }}
            component={RouterLink}
            to="/"
          >
            따릉이 시뮬레이터
            {user && user.username ? (
              <Link component={RouterLink} to="/userpage" underline="none" color="inherit" sx={{ pl: 3, justifyContent: "center" }}>
                <Typography variant="span" sx={{ fontSize: "14px" }}>
                  {user && user.username ? user.username + "님 " : "손님 "}
                  반갑습니다
                </Typography>
              </Link>
            ) : (
              <Link component={RouterLink} to="/login" underline="none" color="inherit" sx={{ pl: 3, justifyContent: "center" }}>
                <Typography variant="span" sx={{ fontSize: "14px" }}>
                  {user && user.username ? user.username + "님 " : "손님 "}
                  반갑습니다
                </Typography>
              </Link>
            )}
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map(
              (item) =>
                (!item.need_login || (item.need_login && cookies && cookies.id)) && (
                  <>
                    <Button
                      key={item.name}
                      sx={{
                        color: "#fff",
                        textTransform: "none",
                        // width: "100px",
                        mx: 1,
                      }}
                    >
                      <Link component={RouterLink} to={item.path} underline="none" color="inherit">
                        {item.name}
                      </Link>
                    </Button>
                  </>
                ),
            )}

            {cookies && cookies.id && (
              <>
                <Button sx={{ color: "#fff", mx: 1 }} onClick={handleLogout}>
                  로그아웃
                </Button>
                <Button sx={{ color: "#fff", textTransform: "none" }} style={{ textTransform: "none" }}>
                  <Link component={RouterLink} to="/userpage" underline="none" color="inherit">
                    <Typography variant="span">마이 페이지</Typography>
                  </Link>
                </Button>
              </>
            )}
            {(!user || !user.username) && (
              <>
                {guestNavItems.map((item) => (
                  <Button key={item.name} sx={{ color: "#fff", mx: 1 }}>
                    <Link component={RouterLink} to={item.path} underline="none" color="inherit">
                      {item.name}
                    </Link>
                  </Button>
                ))}
              </>
            )}
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
