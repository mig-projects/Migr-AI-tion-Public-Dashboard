import DrawerWrapper from "../drawer_wrapper.jsx";
import {Box, ListItem, ListItemButton, Toolbar, Typography} from "@mui/material";
import variables from "../../variables.module.scss";
import {ArrowForward} from "@mui/icons-material";

const AboutScreen = () => {
  return <div id={`about-screen`}>
    <DrawerWrapper>
      <Box component="main" sx={{
        flexGrow: 1,
        minHeight: '100vh',
      }}
           className={`d-flex flex-column`}
      >
        <Toolbar
          sx={{
            height: variables.toolbarHeight,
          }}
        />

        <div className={`d-flex flex-column align-items-center justify-content-center flex-grow-1 p-3`}>

        </div>

        <ListItem disablePadding
          sx={{
            backgroundColor: variables.bottomBarPurple,
          }}
        >
          <ListItemButton
            sx={{
              height: '70px',
            }}
            className={`d-flex justify-content-center text-white`}
          >
            <Typography>
              Contribute to the Research {<ArrowForward sx={{fontSize: '15px', marginBottom: '2px'}} />}
            </Typography>
          </ListItemButton>
        </ListItem>
      </Box>
    </DrawerWrapper>
  </div>
}

export default AboutScreen;
