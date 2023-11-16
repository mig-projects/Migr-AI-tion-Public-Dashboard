import {
  Drawer, IconButton, InputAdornment,
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

const LeftDrawer = () => {
  const width = 300;
  const location = useLocation();
  const navigate = useNavigate();

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
      <img src={Logo} alt="Migration logo" height={40} width={40} className={'me-4'} />

      <Typography
        color={variables.primaryPurple}
        className={'fw-bold flex-grow-1'}
      >
        MIGR-AI-TION
      </Typography>
    </Toolbar>
    <TextField
      sx={{
        marginInline: '15px',
        marginBottom: '15px',
      }}
      label="Search"
      InputProps={{
        style: {
          borderRadius: '12px',
        },
        endAdornment: <InputAdornment position="end">
          <IconButton
            edge="end"
          >
            <Search />
          </IconButton>
        </InputAdornment>,
      }}
    />
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
