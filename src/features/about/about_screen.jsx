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
            minHeight: variables.toolbarHeight,
          }}
        />

        <div className={`d-flex flex-column flex-grow-1 py-5`}
          style={{
            paddingInline: '100px',
          }}
        >
          <Typography
            className={'fw-bold fs-1 mb-4'}
          >
            A Context Explorer for Fair Hiring Algorithms
          </Typography>

          <Typography paragraph>
            Lorem ipsum dolor sit amet consectetur. Tellus maecenas in pharetra pharetra volutpat id. Egestas elit risus urna feugiat eleifend mattis sed. Tellus quis condimentum egestas id habitant adipiscing vel massa placerat. Quis tincidunt faucibus diam nunc eu in. Sed nam eget dictum porttitor ullamcorper ultricies volutpat. Mi eleifend aliquam varius id tellus diam nulla odio adipiscing. Diam vitae a neque proin mattis viverra. Integer nec eget in turpis velit porta vestibulum. Dolor sit id sit quam egestas ut.
          </Typography>

          <Typography paragraph>
            Lorem ipsum dolor sit amet consectetur. Tellus maecenas in pharetra pharetra volutpat id. Egestas elit risus urna feugiat eleifend mattis sed. Tellus quis condimentum egestas id habitant adipiscing vel massa placerat. Quis tincidunt faucibus diam nunc eu in. Sed nam eget dictum porttitor ullamcorper ultricies volutpat. Mi eleifend aliquam varius id tellus diam nulla odio adipiscing. Diam vitae a neque proin mattis viverra. Integer nec eget in turpis velit porta vestibulum. Dolor sit id sit quam egestas ut.
          </Typography>

          <Typography paragraph>
            Methodology
          </Typography>

          <Typography paragraph>
            Mission
          </Typography>
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
