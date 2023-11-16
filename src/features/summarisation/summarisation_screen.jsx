import DrawerWrapper from "../drawer_wrapper.jsx";
import {Box, Card, CardContent, Chip, ListItem, ListItemButton, Toolbar, Typography} from "@mui/material";
import variables from "../../variables.module.scss";
import {ArrowForward} from "@mui/icons-material";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/scss';

const SummarisationScreen = () => {
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
            Search results for ‘Woman’
          </Typography>
        </Toolbar>

        <div className={`d-flex flex-column flex-grow-1 py-3`}
        >
          <Typography className={'px-4 mb-3'}>
            Sources:
          </Typography>

          <Swiper
            slidesPerView={'auto'}
            spaceBetween={20}
            className={'w-100 px-4'}
          >
            {
              Array(10).fill(0).map((_, i) => {
                return <SwiperSlide
                  key={i}
                  className={`swiper-slide`}
                  style={{
                    width: '350px',
                  }}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      backgroundColor: '#faf7ff',
                      border: '1.5px solid rgba(116, 56, 226, 0.10)',
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
                        “Fired twice within 6 months of moving to Germany”
                      </Typography>

                      <Typography className={``}
                                  sx={{
                                    fontSize: '14px',
                                  }}
                      >
                        Category
                      </Typography>

                      <div
                       className={`d-flex gap-1 my-3`}
                      >
                        {
                          Array(3).fill(0).map((_, i) => {
                            return <Chip
                              key={i}
                              label={'Women'}
                            />
                          })
                        }
                      </div>

                      <Typography className={``}
                                  sx={{
                                    fontSize: '13px',
                                  }}
                      >
                        Tellus quis condimentum egestas id habitant adipiscing vel massa placerat. Quis tincidunt faucibus diam nunc eu in. Sed nam eget dictum porttitor ullamcorper ultricies.
                      </Typography>

                    </CardContent>
                  </Card>
                </SwiperSlide>
              })
            }
          </Swiper>
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
              View Knowledge Graph {<ArrowForward sx={{fontSize: '15px', marginBottom: '2px'}} />}
            </Typography>
          </ListItemButton>
        </ListItem>

      </Box>
    </DrawerWrapper>
  </div>
}

export default SummarisationScreen;
