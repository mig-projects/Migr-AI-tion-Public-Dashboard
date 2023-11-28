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
import {
  categoriesColor,
  fetchGraphData,
  filterGraph,
  graphSetup,
  tagGroupsColor, tagsColor
} from "./components/knowledge_graph_components.js";

const KnowledgeGraphScreen = () => {
  const [categories, setCategories] = useState([]);
  const [tagGroups, setTagGroups] = useState({});
  const [tags, setTags] = useState([]);
  const [relationships, setRelationships] = useState([]);

  const [loading, setLoading] = useState(false);

  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [filteredNodes, setFilteredNodes] = useState([]);

  const [headlineNodes, setHeadlineNodes] = useState([]);
  const [headlineLinks, setHeadlineLinks] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchGraphData().then(({
      categories,
      tagGroups,
      tags,
      relationships,
    }) => {
      setCategories(categories);
      setTagGroups(tagGroups);
      setTags(tags);
      setRelationships(relationships);

      const {
        nodes,
        links,
      } = graphSetup(
        categories,
        tagGroups,
        relationships,
      );

      setNodes(nodes);
      setLinks(links);

      setFilteredNodes(nodes);

      setLoading(false);
    });
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
                onChange={async (event) => {
                  setLoading(true);

                  setSelectedValue(event.target.value);
                  const result = await filterGraph(nodes, links, tags, {
                    tag: event.target.value,
                  });
                  setFilteredNodes(result.nodes);
                  setHeadlineNodes(result.headlineNodes);
                  setHeadlineLinks(result.headlineLinks);

                  setLoading(false);
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
                    setFilteredNodes(nodes);
                    setHeadlineNodes([]);
                    setHeadlineLinks([]);
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
                click: async (params) => {
                  let result;
                  if (params.data.category === 0) {
                    result = await filterGraph(nodes, links, tags, {
                      category: params.data.name,
                    });
                  } else if (params.data.category === 1) {
                    result = await filterGraph(nodes, links, tags, {
                      tagGroup: params.data.name,
                    });
                  } else if (params.data.category === 2) {
                    setLoading(true);
                    result = await filterGraph(nodes, links, tags, {
                      tag: params.data.name,
                    });
                  }

                  setFilteredNodes(result.nodes);
                  setHeadlineNodes(result.headlineNodes);
                  setHeadlineLinks(result.headlineLinks);

                  setLoading(false);
                }
              }}
              option={{
                title: {
                  display: false,
                },
                tooltip: {
                  show: true,
                  position: 'bottom',
                },
                series: [
                  {
                    type: "graph",
                    layout: "force",
                    data: [...filteredNodes, ...headlineNodes],
                    links: [...links, ...headlineLinks],
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
