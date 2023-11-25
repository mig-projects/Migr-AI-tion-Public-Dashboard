import DrawerWrapper from "../drawer_wrapper.jsx";
import {Box, Link, ListItem, ListItemButton, Toolbar, Typography} from "@mui/material";
import variables from "../../variables.module.scss";
import {ArrowForward} from "@mui/icons-material";
import EuFounded from "../../assets/images/eu_founded.png";
import FindHr from "../../assets/images/findhr.png";

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
            Fair AI Hiring: A Contextual Analysis Tool
          </Typography>

          <Typography paragraph>
            Welcome to the MIGR-AI-TION Research App, our Contextual Analysis Tool for Fair AI Hiring, part of the FINDHR project (funded by Horizon Europe). Our aim is to shed light on biases in AI-driven hiring processes, providing insights crucial for various stakeholders.
          </Typography>

          <Typography paragraph>
            Our pilot project is grounded in the experiences of seven intersectional, migrant tech workers based in Berlin, Germany. Their diverse backgrounds and personal experiences in navigating the tech industry provide a unique lens through which we examine AI hiring practices. This inclusion of real-world perspectives ensures that our analysis and recommendations are rooted in the lived experiences of those most affected by these systems.
          </Typography>

          <Typography paragraph>
            <span className={`fw-bold`}>To Researchers and Watchdogs</span>: Engage with our platform for a detailed view of AI hiring practices, enriched by personal narratives and intersectional challenges. Your collaboration is essential in co-creating a comprehensive fairness ontology, offering a structured understanding of fairness in AI hiring.
          </Typography>

          <Typography paragraph>
            <span className={`fw-bold`}>To Policymakers</span>: Utilize our analyses to inform policy decisions. Our app offers nuanced insights into AI hiring, aiding in the development of ethical and inclusive workforce policies.
          </Typography>

          <Typography paragraph>
            <span className={`fw-bold`}>To Journalists</span>: Access information on AI hiring trends and implications. Our app supports your reporting with data-driven insights.
          </Typography>

          <Typography paragraph>
            <span className={`fw-bold`}>To HR Companies</span>: Understand the impact of AI hiring practices through our findings. Use our app to ensure your AI tools align with fairness and equity standards.
          </Typography>

          <Typography paragraph>
            Your engagement helps build a comprehensive understanding of intersectional challenges in AI hiring. Join us in shaping the future of AI hiring, contributing to a more ethical and transparent landscape in employment.
          </Typography>

          <Link
            href={''}
            className={`text-decoration-underline text-black`}
          >
            Download our Expert Report
          </Link>

          <div className={`flex-grow-1`} style={{
            minHeight: '100px',
          }}/>

          <div className={`d-flex justify-content-end`}>
            <img src={EuFounded} alt=""/>
            <img src={FindHr} alt=""/>
          </div>
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
