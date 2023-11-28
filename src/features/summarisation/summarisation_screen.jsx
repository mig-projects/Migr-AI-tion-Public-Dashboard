import DrawerWrapper from "../drawer_wrapper.jsx";
import {
  Box,
  Card,
  CardContent,
  Chip, CircularProgress,
  IconButton,
  ListItem,
  ListItemButton,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import variables from "../../variables.module.scss";
import {ArrowForward, InfoOutlined} from "@mui/icons-material";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/scss';
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {searchExperiences} from "../supabse/database.js";
import {toast} from "react-toastify";
import {getSummary} from "../firebase/firebase.js";

const SummarisationScreen = () => {
  const location = useLocation();
  const {searchValue} = location.state || '';
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [summary, setSummary] = useState('');

  useEffect(() => {
    if (searchValue === null || searchValue === undefined) {
      navigate('/home');
      return;
    }

    setLoading(true);
    searchExperiences(searchValue).then( async ({data, error}) => {
      if (error) {
        toast.error(error.message);
      } else {
        setExperiences(data);
      }
      setLoading(false);

      if (data.length === 0) {
        return;
      }

      setLoadingSummary(true);
      await getSummary({
        experience_ids: data.map((experience) => experience.id)
      }).then((summary) => {
        setSummary(summary.data ?? '');
      });
      setLoadingSummary(false);
    });
  }, [navigate, searchValue]);

  return <div id={'summarisation-screen'}>
    <DrawerWrapper>
      <Box component="main" sx={{
        flexGrow: 1,
        minHeight: '100vh',
        overflow: 'hidden',
      }}
           className={`d-flex flex-column`}
      >
        <Toolbar
          sx={{
            height: variables.toolbarHeight,
          }}
        >
          <Typography>
            Search results for ‘{searchValue}’
          </Typography>
        </Toolbar>

        {
          loading ? <div className={`d-flex justify-content-center align-items-center flex-grow-1`}
          >
            <CircularProgress />
          </div> :
            experiences.length === 0 ? <div className={`d-flex justify-content-center align-items-center flex-grow-1`}
            >
              <Typography>
                No search results found! Please try another Query
              </Typography>
            </div> :
          <div className={`d-flex flex-column flex-grow-1 py-3`}>
            <Typography className={'px-4 mb-3'}>
              Sources:
            </Typography>

            <Swiper
              slidesPerView={2}
              spaceBetween={20}
              className={'w-100 px-4'}
            >
              {
                experiences.map((experience) => {
                  return <SwiperSlide
                    key={experience.id}
                    className={`swiper-slide`}
                    style={{

                    }}
                  >
                    <Card
                      variant="outlined"
                      sx={{
                        background: 'linear-gradient(to bottom right, rgba(116, 56, 226, 0.05), rgba(116, 56, 226, 0.13))',
                        border: '1.5px solid rgba(116, 56, 226, 0.1)',
                      }}
                    >
                      <CardContent
                        className={`d-flex flex-column`}
                      >
                        <Typography className={`fw-bold mb-2`}
                                    sx={{
                                      fontSize: '14px',
                                    }}
                        >
                          “{experience.headline}”
                        </Typography>

                        <div
                          className={`d-flex gap-1 mt-3 flex-wrap`}
                        >
                          {
                            experience.categories_list.map((category, i) => {
                              return <Chip
                                key={i}
                                label={category}
                              />
                            })
                          }
                        </div>

                        <div
                          className={`d-flex gap-1 mt-1 flex-wrap`}
                        >
                          {
                            experience.tags_list.map((tag, i) => {
                              return <Chip
                                key={i}
                                label={tag}
                              />
                            })
                          }
                        </div>

                        <Typography className={`mt-3`}
                                    sx={{
                                      fontSize: '13px',
                                      maxLines: 3,
                                    }}
                        >
                          {experience.text}
                        </Typography>

                      </CardContent>
                    </Card>
                  </SwiperSlide>
                })
              }
            </Swiper>

            <div className={`d-flex align-items-center justify-content-between mb-3 mx-4 mb-3`}>
              <Typography className={`me-2`}>
                Summary
              </Typography>

              <Tooltip title="This LLM-generated summary is a demo of an interesting idea. We'll let you know when its ready to be taken seriously. :)" arrow>
                <IconButton>
                  <InfoOutlined style={{
                    fontSize: '18px',
                  }} />
                </IconButton>
              </Tooltip>
            </div>

            <Card
              className={`mx-4 p-4 mb-4`}
              variant="outlined"
            >
              {loadingSummary ? <div className={`d-flex justify-content-center align-items-center`}
                  style={{
                    minHeight: '200px',
                  }}
                >
              <CircularProgress />
            </div> :
              <Typography paragraph>
                {summary}
              </Typography>}
            </Card>

          </div>
        }


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
              View Knowledge Graph {<ArrowForward sx={{fontSize: '15px', marginBottom: '2px'}} />}
            </Typography>
          </ListItemButton>
        </ListItem>

      </Box>
    </DrawerWrapper>
  </div>
}

export default SummarisationScreen;
