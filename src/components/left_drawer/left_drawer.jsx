import {
  Box,
  Drawer, IconButton, InputAdornment, Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Toolbar, Typography
} from "@mui/material";
import {Search} from "@mui/icons-material";
import {useLocation, useNavigate} from "react-router-dom";
import DiscordIcon from "../../assets/images/discord.svg";
import Logo from "../../assets/images/logo.svg";
import variables from "../../variables.module.scss";
import {useState} from "react";

const LeftDrawer = () => {
  const width = 300;
  const location = useLocation();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('');

  const routes = {
    'Home': '/home',
    'Knowledge Graph': '/knowledge-graph',
    'About': '/about',
  }

  return <Drawer
    sx={{
      width: width,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: width,
        boxSizing: 'border-box',
      },
    }}
    className={`d-flex flex-column`}
    variant="permanent"
    anchor="left"
  >
    <Toolbar
      sx={{
        height: variables.toolbarHeight,
      }}
    >
      <Link
        className={`d-flex align-items-center flex-grow-1 text-decoration-none`}
        href={'/'}
      >
        <img src={Logo} alt="logo" height={40} width={40} className={'me-4'}/>
        <Typography
          color={variables.primaryPurple}
          className={'fw-bold'}
        >
          MIGR-AI-TION
        </Typography>
      </Link>
    </Toolbar>
    <Box
      component="form"
      onSubmit={() => {
        navigate('/summarisation/' + searchValue);
      }}
    >
      <TextField
        sx={{
          marginInline: '15px',
          marginBottom: '15px',
        }}
        required
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
        label="Search"
        InputProps={{
          style: {
            borderRadius: '12px',
          },
          endAdornment: <InputAdornment position="end">
            <IconButton
              edge="end"
              type="submit"
            >
              <Search />
            </IconButton>
          </InputAdornment>,
        }}
      />
    </Box>
    <List className={`flex-grow-1`}>
      {Object.keys(routes).map((routeName) => (
        <ListItem key={routeName} disablePadding>
          <ListItemButton
            sx={{
              height: '50px',
              paddingInline: '30px',
            }}
            onClick={() => {
              navigate(routes[routeName]);
            }}
          >
            <ListItemText>
              <Typography
                className={`${location.pathname === routes[routeName] ? 'fw-bold' : ''}`}
              >
                {routeName}
              </Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>

    <ListItem disablePadding>
      <ListItemButton
        sx={{
          height: '70px',
          paddingInline: '20px',
        }}
        className={`d-flex align-items-center justify-content-between`}
      >
        <Typography
        >
          Join Discord Community
        </Typography>
        <img src={DiscordIcon} alt="Discord Icon"/>
      </ListItemButton>
    </ListItem>
  </Drawer>
}

export default LeftDrawer;
