import ReactEcharts from "echarts-for-react";
import DrawerWrapper from "../drawer_wrapper.jsx";
import {
  Box, Button, Divider,
  FormControl,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  Toolbar,
} from "@mui/material";
import {useEffect, useState} from "react";
import BottomInfo from "./components/bottom_info.jsx";
import {InfoOutlined} from "@mui/icons-material";
import WhatIsThisMapDialog from "./components/what_is_this_map_dialog.jsx";
import {fetchCategories, fetchLLMGeneratedLinks, fetchTagGroups, fetchTags} from "../supabse/database.js";
import {toast} from "react-toastify";

const KnowledgeGraphScreen = () => {
  const tagsColor = '#bfe7c4';
  const tagGroupsColor = '#a8d1f7';
  const categoriesColor = '#bcabff';

  const [categories, setCategories] = useState([]);
  const [tagGroups, setTagGroups] = useState({});
  const [relationships, setRelationships] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchAllData = async () => {
    setLoading(true);

    // First fetch categories
    let categories = [];
    await fetchCategories().then(({data, error}) => {
      if (error) {
        toast.error(error.message);
      } else {
        categories = data.map((category) => category.name);
      }
    });
    setCategories(categories);

    // Then fetch tag groups
    const tagGroups = {};
    await fetchTagGroups().then(({data, error}) => {
      if (error) {
        toast.error(error.message);
      } else {
        data.map((tagGroup) => {
          tagGroups[tagGroup.name] = [];
        });
      }
    });

    // Then fetch tags
    await fetchTags().then(({data, error}) => {
      if (error) {
        toast.error(error.message);
      } else {
        data.map((tag) => {
          tagGroups[tag.tag_groups.name].push(tag.name);
        });
      }
    });
    setTagGroups(tagGroups);

    // Now fetch the relationships
    let relationships = [];
    await fetchLLMGeneratedLinks().then(({data, error}) => {
      if (error) {
        toast.error(error.message);
      } else {
        relationships = data.map((relationship) => {
          return {
            category: relationship.categories.name,
            tag_group: relationship.tag_groups.name,
          };
        });
      }
    });
    setRelationships(relationships);

    setLoading(false);
    graphSetup(categories, tagGroups, relationships);
  }

  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

  const [filteredNodes, setFilteredNodes] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);

  const graphSetup = (categories, tagGroups, relationships) => {
    // First create the nodes
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
      tagGroups[tag].map((value) => {
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


    // Then create the links
    const newLinks = [];

    relationships.map((relationship) => {
      newLinks.push({
        source: relationship.category,
        target: relationship.tag_group,
      });
    });

    Object.keys(tagGroups).map((tagGroup) => {
      tagGroups[tagGroup].map((tag) => {
        newLinks.push({
          source: tagGroup,
          target: tag,
        });
      });
    });

    setLinks(newLinks);

    filterGraph('');
  }

  const filterGraph = (value) => {
    const newNodes = [];
    const newLinks = [];

    if (value === '') {
      setFilteredNodes(nodes);
      setFilteredLinks(links);
      return;
    }

    nodes.map((node) => {
      if (node.name === value) {
        newNodes.push(node);
      }
    });

    links.map((link) => {
      if (link.source === value || link.target === value) {
        newLinks.push(link);
      }
    });

    setFilteredNodes(newNodes);
    setFilteredLinks(newLinks);
  }

  useEffect(() => {
    fetchAllData().then(() => {});
  }, []);

  const [selectedValue, setSelectedValue] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [viewingLLVMRelationships, setViewingLLMRelationships] = useState(false);

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
            className={`d-flex justify-content-between align-items-center`}
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
                        tagGroups[name].map((tag) => (
                          <MenuItem key={tag} value={tag}>
                            <ListItemText primary={tag} className={`ps-3`}/>
                          </MenuItem>
                        ))
                      ]
                  ))
                }
              </Select>
            </FormControl>

            <div className={`d-flex gap-2`}>
              <Button
                variant="outlined"
                color="inherit"
                sx={{
                  border: '2px solid #D9D9D9',
                  borderRadius: '8px',
                  height: '50px',
                }}
                onClick={() => {
                  setViewingLLMRelationships(!viewingLLVMRelationships);
                }}
              >
                {
                  viewingLLVMRelationships ? 'View LLM-generated relationships' : 'View Research Oriented relationships'
                }
              </Button>

              <Button
                variant="outlined"
                color="inherit"
                sx={{
                  border: '2px solid #D9D9D9',
                  borderRadius: '8px',
                  height: '50px',
                }}
                onClick={() => {
                  setIsDialogOpen(true);
                }}
              >
                {<InfoOutlined sx={{fontSize: '16px'}} className={`me-2`}/>}What it this Map?
              </Button>
            </div>
          </Toolbar>

          <Divider
            color={'grey'}
          />

          <div className={`d-flex flex-column flex-grow-1`}>
            <ReactEcharts
              showLoading={loading}
              notMerge={true}
              lazyUpdate={true}
              option={{
                title: {
                  display: false,
                },
                tooltip: {},
                series: [
                  {
                    type: "graph",
                    layout: "force",
                    data: filteredNodes,
                    links: filteredLinks,
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
              }}
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

      <WhatIsThisMapDialog open={isDialogOpen} setOpen={setIsDialogOpen} />
    </div>
  );
}

export default KnowledgeGraphScreen;
