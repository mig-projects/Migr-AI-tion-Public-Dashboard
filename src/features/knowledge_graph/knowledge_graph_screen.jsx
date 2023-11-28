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
import PropTypes from "prop-types";

const KnowledgeGraphScreen = () => {
  const tagsColor = '#bfe7c4';
  const tagGroupsColor = '#a8d1f7';
  const categoriesColor = '#bcabff';

  const [categories, setCategories] = useState([]);
  const [tagGroups, setTagGroups] = useState({});
  const [tags, setTags] = useState([]);
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
        setTags(data.map((tag) => {
          return {
            name: tag.name,
            tag_group: tag.tag_groups.name,
          };
        }));
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

    filterGraph({
      justNodes: newNodes,
    });
  }

  const filterGraph = ({
    tag,
    tagGroup,
    category,
    justNodes,
  }) => {
    const newNodes = [];
    const newLinks = [];

    if (justNodes) {
      setFilteredNodes(justNodes);
      return;
    }

    if (tag) {
      // Add the tag
      newNodes.push(...nodes.filter((node) => {
        return node.name === tag;
      }));

      // Add all links that have the tag_group (that this tag belongs to) as a source
      const tag_group_name = tags.find((e) => e.name === tag).tag_group;
      newLinks.push(...links.filter((link) => {
        return link.target === tag_group_name;
      }));

      // Add all nodes filtered above, using set to have unique values
      const nodesSet = new Set();
      newLinks.map((link) => {
        nodesSet.add(link.source);
        nodesSet.add(link.target);
      });
      newNodes.push(...nodes.filter((node) => nodesSet.has(node.name)));
    } else if (tagGroup) {
      // Add all links that have the tag_group as a source or target
      newLinks.push(...links.filter((link) => {
        return link.target === tagGroup || link.source === tagGroup;
      }));

      // Add all nodes filtered above, using set to have unique values
      const nodesSet = new Set();
      newLinks.map((link) => {
        nodesSet.add(link.source);
        nodesSet.add(link.target);
      });
      newNodes.push(...nodes.filter((node) => nodesSet.has(node.name)));
    } else if (category) {
      // Add all links that have the category as a source
      newLinks.push(...links.filter((link) => {
        return link.source === category;
      }));

      // Add all nodes filtered above, using set to have unique values
      const nodesSet = new Set();
      newLinks.map((link) => {
        nodesSet.add(link.target);
        nodesSet.add(link.source);
      });

      // Add all links that have the nodes filtered above as a source
      newLinks.push(...links.filter((link) => {
        return nodesSet.has(link.source);
      }));

      // Add all nodes filtered above, using set to have unique values
      newLinks.map((link) => {
        nodesSet.add(link.target);
        nodesSet.add(link.source);
      });

      newNodes.push(...nodes.filter((node) => nodesSet.has(node.name)));
    }

    setFilteredNodes(newNodes);
  }

  filterGraph.propTypes = {
    tag: PropTypes.string,
    tagGroup: PropTypes.string,
    category: PropTypes.string,
    none: PropTypes.bool,
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
                  filterGraph({
                    tag: event.target.value,
                  });
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
              {
                nodes.length !== filteredNodes.length && <Button
                  variant="outlined"
                  color="inherit"
                  sx={{
                    border: '2px solid #D9D9D9',
                    borderRadius: '8px',
                    height: '50px',
                  }}
                  onClick={() => {
                    filterGraph({
                      justNodes: nodes,
                    })
                    setSelectedValue('');
                  }}
                >
                  Back to full view
                </Button>
              }

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
              onEvents={{
                click: (params) => {
                  if (params.data.category === 0) {
                    filterGraph({
                      category: params.data.name,
                    });
                  } else if (params.data.category === 1) {
                    filterGraph({
                      tagGroup: params.data.name,
                    });
                  } else if (params.data.category === 2) {
                    filterGraph({
                      tag: params.data.name,
                    });
                  }
                }
              }}
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

            <div className={`flex-grow-1`} />

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
          </div>
        </Box>
      </DrawerWrapper>

      <WhatIsThisMapDialog open={isDialogOpen} setOpen={setIsDialogOpen} />
    </div>
  );
}

export default KnowledgeGraphScreen;
