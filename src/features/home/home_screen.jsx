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
import {useState} from "react";

const HomeScreen = () => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('');

  return <div id={`home-screen`}>
    <DrawerWrapper>
      <Box component="main" sx={{
        flexGrow: 1,
        minHeight: '100vh',
      }}
        className={`d-flex flex-column align-items-center`}
      >
        <Toolbar
          sx={{
            height: variables.toolbarHeight,
          }}
        />

        <div className={`d-flex flex-column align-items-center flex-grow-1 p-4`}
          style={{
            maxWidth: '1000px',
          }}
        >
          <Typography
            className={'fw-bold fs-1 mb-4 text-center'}
          >
            Learn more about how societal bias can influence HR systems
          </Typography>
          <Typography paragraph
                      className={'text-center'}
                      sx={{
                        maxWidth: '800px',
                      }}
          >
            Government structures, organizational processes, societal norms and interpersonal biases can influence opportunities for diverse job-seekers in the German tech ecosystem.
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
              navigate('/summarisation', {
                state: {
                  search_value: searchValue,
                },
              });
            }}
          >
            <TextField
              value={searchValue}
              required
              sx={{
                marginInline: '15px',
              }}
              className={`mb-4`}
              label="Search"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
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
                navigate('/summarisation', {
                  state: {
                    search_value: 'Women',
                  },
                });
              }}
            />
            <Chip
              label="Migrant"
              onClick={() => {
                navigate('/summarisation', {
                  state: {
                    search_value: 'Migrant',
                  },
                });
              }}
            />
            <Chip
              label="Parent"
              onClick={() => {
                navigate('/summarisation', {
                  state: {
                    search_value: 'Parent',
                  },
                });
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
