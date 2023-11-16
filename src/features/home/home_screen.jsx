import LeftDrawer from "../../components/left_drawer/left_drawer.jsx";
import {Box, Link, Toolbar, Typography} from "@mui/material";
import variables from "../../variables.module.scss";
import {ArrowForward, ArrowRight, ArrowRightAlt, KeyboardArrowRight} from "@mui/icons-material";

const HomeScreen = () => {
  return <div id={`home-screen`}>
    <Box sx={{ display: 'flex' }}>
      <LeftDrawer />
      <Box component="main" sx={{
        flexGrow: 1,
        p: 3,
        height: '100vh',
      }}>
        <Toolbar
          sx={{
            height: variables.toolbarHeight,
          }}
        />

        <div className={`d-flex flex-column align-items-center justify-content-center`}>
          <Typography
            className={'fw-bold fs-1 mb-4'}
          >
            Explore Context Bias
          </Typography>
          <Typography paragraph
                      className={'text-center'}
                      sx={{
                        maxWidth: '800px',
                      }}
          >
            Lorem ipsum dolor sit amet consectetur. Vestibulum lectus volutpat amet non. Egestas morbi nisl massa dignissim. Sed et scelerisque feugiat habitant phasellus. Nulla sit in diam neque ac pretium eu elementum iaculis.
          </Typography>

          <Link
            className={`text-decoration-none`}
            href={'/about'}
          >
            <Typography paragraph
                        className={'text-center text-black'}
                        sx={{
                          maxWidth: '800px',
                        }}
            >
              Learn more {<ArrowForward sx={{fontSize: '15px', marginBottom: '2px'}} />}
            </Typography>
          </Link>
        </div>

      </Box>
    </Box>
  </div>
}

export default HomeScreen;
