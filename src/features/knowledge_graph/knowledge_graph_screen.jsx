import ReactEcharts from "echarts-for-react";
import variables from "../../variables.module.scss";
import DrawerWrapper from "../drawer_wrapper.jsx";
import {Box, FormControl, InputLabel, ListItemText, ListSubheader, MenuItem, Select, Toolbar} from "@mui/material";
import {useEffect, useState} from "react";

const categories = [
  'Company Values & Exploitation',
  'Discrimination in HR',
  'Cross-cultural Communication',
  'Migration Journey',
  'Psychological burden',
  'Bureaucratic Barriers',
];

const tagCategories = {
  Gender: {
    tags: ['Female', 'Male', 'Non-binary', 'Transgender'],
    links: ['Psychological burden', 'Discrimination in HR'],
  },
  Age: {
    tags: ['40+ years old', 'Youthful Look'],
    links: ['Psychological burden', 'Discrimination in HR', 'Bureaucratic Barriers'],
  },
  Profession: {
    tags: ['Tech worker', 'Entrepreneurs', 'Linguist', 'Data people', 'Data science teachers', 'Data scientists', 'Mini-jobbers', 'Public Speakers',
      'Job searchers', 'Non-technical but IT', 'PRODUCT MANAGERS', 'People Experience or EX People', 'Data scientists', 'PRODUCT MANAGERS', 'HR people',
      'Engineer', 'IT people', 'Unemployed', 'Consultants', 'STARTUP EMPLOYEES'],
    links: ['Company Values & Exploitation', 'Discrimination in HR', 'Cross-cultural Communication']
  },
  Disability: {
    tags: ['Neurodivergent', 'ADHD', 'Dyslexia', 'Autism'],
    links: ['Psychological burden', 'Discrimination in HR', 'Bureaucratic Barriers'],
  },
  Ethnicity: {
    tags: ['Latin American', 'Eastern European', 'North American', 'South Asian', 'East Asian', 'Middle Eastern/West Asian', 'African'],
    links: ["Discrimination in HR", "Cross-cultural Communication", "Migration Journey"],
  },
  Religion: {
    tags: ['Christian', 'Muslim', 'Jewish', 'Hindu', 'Buddhist'],
    links: ["Discrimination in HR", "Cross-cultural Communication", "Migration Journey"],
  },
  Sexuality: {
    tags: ['LGBTIQ+', 'Heterosexual'],
    links: ["Discrimination in HR", "Psychological burden"],
  },
  'Family Status': {
    tags: ['Mother', 'Father', 'Parent'],
    links: ["Discrimination in HR", "Migration Journey", "Psychological burden"],
  },
  'Professional level': {
    tags: ['Entry level', 'Mid level', 'Senior level', 'Executive', 'Freelancer', 'Business Owner', 'Consultants', 'Startup Founder'],
    links: ["Company Values & Exploitation", "Discrimination in HR"],
  },
  'Migration & Residence Status': {
    tags: ['EU National', 'Non-EU National', 'Non-German', 'Permanent resident', 'Newcomer', 'Resident', 'Blue Card', 'Work Permit', 'Displaced or Stateless', 'Migrant'],
    links: ["Discrimination in HR", "Migration Journey", "Bureaucratic Barriers"],
  },
  'Language proficiency': {
    tags: ['Multilingual', 'English-speaker', 'German Level A1', 'German Level A2', 'German Level B1', 'German Level B2', 'Non-German speaker', 'Native English-speaker'],
    links: ["Discrimination in HR", "Cross-cultural Communication", "Migration Journey"],
  },
  Education: {
    tags: ['Educated in EU', 'Educated outside of Germany', 'Educated in Germany'],
    links: ["Discrimination in HR", "Cross-cultural Communication", "Bureaucratic Barriers"],
  },
  Name: {
    tags: ['Non-Western Name', 'Western name', 'Western name with Non-English Characters'],
    links: ["Discrimination in HR", "Cross-cultural Communication"],
  },
  Appearance: {
    tags: ['Person of Color', 'Caucasian White'],
    links: ["Discrimination in HR", "Cross-cultural Communication"],
  },
};

const KnowledgeGraphScreen = () => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const newNodes = [
      ...categories.map((category) => {
        return {
          name: category,
          symbol: "circle",
          category: 0,
          symbolSize: [60, 60],
        };
      }),

      ...Object.keys(tagCategories).map((tag) => {
        return {
          name: tag,
          symbol: "circle",
          category: 1,
          symbolSize: [30, 30],
        }
      }),
    ];

    Object.keys(tagCategories).map((tag) => {
      tagCategories[tag].tags.map((value) => {
        if (newNodes.find((node) => node.name === value)) {
          return;
        }
        newNodes.push({
          name: value,
          symbol: "circle",
          category: 2,
          symbolSize: [15, 15],
        });
      });
    });

    setNodes(newNodes);
  }, []);

  useEffect(() => {
    const newLinks = [];

    Object.keys(tagCategories).map((tag) => {
      tagCategories[tag].links.map((link) => {
        newLinks.push({
          source: tag,
          target: link,
        });
      });
    });

    Object.keys(tagCategories).map((tag) => {
      tagCategories[tag].tags.map((value) => {
        newLinks.push({
          source: tag,
          target: value,
        });
      });
    });

    setLinks(newLinks);
  }, []);

  const options = {
    animation: false,
    title: {
      display: false,
    },
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        return params.data.type + ": " + params.data.name;
      },
    },
    series: [
      {
        type: "graph",
        layout: "force",
        data: nodes,
        links: links,
        categories: [
          {
            name: "Category",
          },
          {
            name: "Tag",
          },
          {
            name: "Value",
          }
        ],
        roam: true,
        label: {
          show: true,
          position: "right",
          formatter: "{b}",
        },
        force: {
          initLayout: null,
          repulsion: 500,
          edgeLength: [100, 100],
          friction: 0.1,
          gravity: 0.1,
        },
        selectedMode: "single",
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
              height: '130px',
            }}
          >
            <FormControl>
              <InputLabel>Tag</InputLabel>
              <Select
                label="Tag"
                sx={{
                  '.MuiOutlinedInput-notchedOutline': { border: 0 },
                  minWidth: '200px',
                }}
                value={selectedValue}
                onChange={(event) => {
                  console.log(event.target.value);
                  setSelectedValue(event.target.value);
                }}
                displayEmpty
                inputProps={{ outline: "none" }}
                renderValue={(selected) => selected}
                MenuProps={{
                  PaperProps: {
                    elevation: 0,
                  },
                }}
              >
                {
                  Object.keys(tagCategories).map((name) => (
                      [
                        <ListSubheader key={name}>{name}</ListSubheader >,
                        tagCategories[name].tags.map((tag) => (
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

          <div className={`d-flex flex-column flex-grow-1`}>
            <ReactEcharts
              option={options}
              className={'flex-grow-1 h-100 w-100'}
            />
          </div>

        </Box>
      </DrawerWrapper>
    </div>
  );
}

export default KnowledgeGraphScreen;
