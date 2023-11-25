import ReactEcharts from "echarts-for-react";
import DrawerWrapper from "../drawer_wrapper.jsx";
import {
  Box, Divider,
  FormControl,
  InputLabel,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  Toolbar,
} from "@mui/material";
import {useEffect, useState} from "react";
import BottomInfo from "./components/bottom_info.jsx";

const categories = [
  "Company Values & Exploitation","Discrimination in HR","Cross-cultural Communication","Migration Journey","Psychological burden","Bureaucratic Barriers","Lateral Career Development","Promotion","Career Transition"
];

const tagGroups = {
  Gender: {
    tags: ["Female","Male","Non-binary","Transgender"],
    links: ["Discrimination in HR", "Cross-cultural Communication", "Psychological burden"],
  },
  Age: {
    tags: ["40+ years old","Youthful Look"],
    links: ["Discrimination in HR", "Psychological burden", "Lateral Career Development", "Promotion", "Career Transition"],
  },
  Profession: {
    tags: ["Tech worker","Entrepreneurs","Linguist","Data people","Data science teachers","Data scientists","Mini-jobbers","Public Speakers","Job searchers","Non-technical but IT","PRODUCT MANAGERS","People Experience or EX People","HR people","Engineer","IT people","Unemployed","STARTUP EMPLOYEES"],
    links: ["Company Values & Exploitation", "Discrimination in HR", "Cross-cultural Communication", "Lateral Career Development", "Promotion", "Career Transition"]
  },
  Disability: {
    tags: ["Neurodivergent","ADHD","Dyslexia","Autism"],
    links: ["Discrimination in HR", "Cross-cultural Communication", "Psychological burden", "Bureaucratic Barriers"],
  },
  Ethnicity: {
    tags: ["Latin American","Eastern European","North American","South Asian","East Asian","Middle Eastern/West Asian","African"],
    links: ["Discrimination in HR", "Cross-cultural Communication", "Migration Journey", "Bureaucratic Barriers"],
  },
  Religion: {
    tags: ["Christian","Muslim","Jewish","Hindu","Buddhist"],
    links: ["Discrimination in HR", "Cross-cultural Communication", "Migration Journey", "Bureaucratic Barriers"],
  },
  Sexuality: {
    tags: ["LGBTIQ+","Heterosexual"],
    links: ["Discrimination in HR", "Cross-cultural Communication", "Migration Journey", "Bureaucratic Barriers"],
  },
  'Family Status': {
    tags: ["Mother","Father","Parent"],
    links: ["Discrimination in HR", "Cross-cultural Communication", "Psychological burden", "Bureaucratic Barriers", "Lateral Career Development", "Promotion", "Career Transition"],
  },
  'Professional level': {
    tags: ["Entry level","Mid level","Senior level","Executive","Freelancer","Business Owner","Consultants","Startup Founder"],
    links: ["Discrimination in HR", "Lateral Career Development", "Promotion", "Career Transition"],
  },
  'Migration & Residence Status': {
    tags: ["EU National","Non-EU National","Non-German","Permanent resident","Newcomer","Resident","Blue Card","Work Permit","Displaced or Stateless","Migrant"],
    links: ["Discrimination in HR", "Cross-cultural Communication", "Migration Journey", "Bureaucratic Barriers"],
  },
  'Language proficiency': {
    tags: ["Multilingual","English-speaker","German Level A1","German Level A2","German Level B1","German Level B2","Non-German speaker","Native English-speaker"],
    links: ["Discrimination in HR", "Cross-cultural Communication", "Bureaucratic Barriers"],
  },
  Education: {
    tags: ["Educated in EU","Educated outside of Germany","Educated in Germany"],
    links: ["Discrimination in HR", "Cross-cultural Communication", "Bureaucratic Barriers", "Lateral Career Development", "Promotion", "Career Transition"],
  },
  Name: {
    tags: ["Non-Western Name","Western name","Western name with Non-English Characters"],
    links: ["Discrimination in HR", "Cross-cultural Communication"],
  },
  Appearance: {
    tags: ["Person of Color","Caucasian White"],
    links: ["Discrimination in HR", "Cross-cultural Communication"],
  },
};

const KnowledgeGraphScreen = () => {
  const tagsColor = '#bfe7c4';
  const tagGroupsColor = '#a8d1f7';
  const categoriesColor = '#bcabff';

  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const newNodes = [
      ...categories.map((category) => {
        return {
          z: 10,
          name: category,
          category: 0,
          symbolSize: 50,
          label: {
            fontSize: 12,
            fontWeight: '600',
          },
          itemStyle: {
            color: categoriesColor,
          }
        };
      }),

      ...Object.keys(tagGroups).map((tag) => {
        return {
          z: 5,
          name: tag,
          category: 1,
          symbolSize: 25,
          label: {
            fontSize: 12,
            fontWeight: '500',
          },
          itemStyle: {
            color: tagGroupsColor,
          }
        }
      }),
    ];

    Object.keys(tagGroups).map((tag) => {
      tagGroups[tag].tags.map((value) => {
        if (newNodes.find((node) => node.name === value)) {
          return;
        }
        newNodes.push({
          name: value,
          category: 2,
          symbolSize: 15,
          label: {
            fontSize: 10,
            color: '#657a68',
            opacity: 0.8,
          },
          itemStyle: {
            color: tagsColor,
          }
        });
      });
    });

    setNodes(newNodes);
  }, []);

  useEffect(() => {
    const newLinks = [];

    Object.keys(tagGroups).map((tagGroup) => {
      tagGroups[tagGroup].links.map((category) => {
        newLinks.push({
          source: category,
          target: tagGroup,
        });
      });
    });

    Object.keys(tagGroups).map((tagGroup) => {
      tagGroups[tagGroup].tags.map((tag) => {
        newLinks.push({
          source: tagGroup,
          target: tag,
        });
      });
    });

    setLinks(newLinks);
  }, []);

  const options = {
    title: {
      display: false,
    },
    tooltip: {},
    series: [
      {
        type: "graph",
        layout: "force",
        data: nodes,
        links: links,
        symbol: 'circle',
        roam: true,
        label: {
          show: true,
          position: 'right',
          formatter: '{b}'
        },
        emphasis: {
          focus: 'adjacency',
          scale: true,
        },
        lineStyle: {
          curveness: 0.02,
          width: 0.7,
        },
        edgeLabel: {
          formatter: '{c}',
        },
        force: {
          edgeLength: 30,
          repulsion: 1000,
          friction: 0.2,
        },
      },
    ],
  };

  const [selectedValue, setSelectedValue] = useState('');

  return (
    <div id={'knowledge-graph-screen'}>
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
              height: '80px',
            }}
          >
            <FormControl>
              <Select
                sx={{
                  '.MuiOutlinedInput-notchedOutline': { border: 0 },
                  minWidth: '200px',
                  height: '50px',
                  backgroundColor: '#eeeeee',
                }}
                value={selectedValue}
                onChange={(event) => {
                  setSelectedValue(event.target.value);
                }}
                displayEmpty
                inputProps={{ outline: "none" }}
                renderValue={(selected) => selected || 'Tags'}
                MenuProps={{
                  PaperProps: {
                    elevation: 0,
                  },
                }}
              >
                {
                  Object.keys(tagGroups).map((name) => (
                      [
                        <ListSubheader key={name}>{name}</ListSubheader >,
                        tagGroups[name].tags.map((tag) => (
                          <MenuItem key={tag} value={tag}>
                            <ListItemText primary={tag} className={`ps-3`}/>
                          </MenuItem>
                        ))
                        ]
                  ))
                }
              </Select>
            </FormControl>
          </Toolbar>

          <Divider
            color={'grey'}
          />

          <div className={`d-flex flex-column flex-grow-1`}>
            <ReactEcharts
              notMerge={true}
              lazyUpdate={true}
              option={options}
              className={'flex-grow-1'}
            />
          </div>

          <Divider
            color={'grey'}
          />

          <div className={`d-flex gap-5 align-items-center px-4`} style={{
            height: '70px',
          }}>
            <BottomInfo
              color={categoriesColor}
              text={'Categories'}
              tooltipText={'These are the main categories of the stories'}
            />

            <BottomInfo
              color={tagGroupsColor}
              text={'Tag Groups'}
              tooltipText={'These are the tags that are grouped together'}
            />

            <BottomInfo
              color={tagsColor}
              text={'Tags'}
              tooltipText={'These are the tags that are used in the stories'}
            />
          </div>
        </Box>
      </DrawerWrapper>
    </div>
  );
}

export default KnowledgeGraphScreen;
