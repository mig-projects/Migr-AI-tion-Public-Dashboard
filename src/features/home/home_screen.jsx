import {
  Box, Chip,
  IconButton,
  InputAdornment,
  Link,
  ListItem,
  ListItemButton,
  TextField,
  Toolbar,
  Typography
} from "@mui/material";
import variables from "../../variables.module.scss";
import {ArrowForward, Search} from "@mui/icons-material";
import DrawerWrapper from "../drawer_wrapper.jsx";
import {useNavigate} from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();

  return <div id={`home-screen`}>
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

        <div className={`d-flex flex-column align-items-center flex-grow-1 p-4`}>
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
            className={`text-decoration-none mb-5`}
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

          <Box
            component="form"
            onSubmit={() => {
              navigate('/summarisation');
            }}
          >
            <TextField
              required
              sx={{
                marginInline: '15px',
              }}
              className={`mb-4`}
              label="Search"
              InputProps={{
                style: {
                  borderRadius: '12px',
                  width: '400px',
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
          </Box>

          <div className={`d-flex gap-2`}>
            <Chip
              label="Women"
              onClick={() => {
                navigate('/summarisation');
              }}
            />
            <Chip
              label="Migrant"
              onClick={() => {
                navigate('/summarisation');
              }}
            />
            <Chip
              label="Parent"
              onClick={() => {
                navigate('/summarisation');
              }}
            />
          </div>
        </div>


        <ListItem disablePadding>
          <ListItemButton
            sx={{
              height: '70px',
            }}
            className={`d-flex justify-content-center`}
          >
            <Typography>
              Want to be part of the research? Contribute {<ArrowForward sx={{fontSize: '15px', marginBottom: '2px'}} />}
            </Typography>
          </ListItemButton>
        </ListItem>
      </Box>
    </DrawerWrapper>
  </div>
}

export default HomeScreen;
