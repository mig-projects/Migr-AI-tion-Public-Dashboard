import {
  fetchCategories,
  fetchExperienceHeadlinesFromTag,
  fetchLLMGeneratedLinks,
  fetchTagGroups,
  fetchTags
} from "../../supabse/database.js";
import {toast} from "react-toastify";
import PropTypes from "prop-types";

const tagsColor = '#bfe7c4';
const tagGroupsColor = '#a8d1f7';
const categoriesColor = '#bcabff';
const headlineColor = '#CECECE';

const fetchTagRelatedExperienceHeadlines = async (tag) => {
  return await fetchExperienceHeadlinesFromTag(tag).then(({data, error}) => {
    if (error) {
      toast.error(error.message);
      return [];
    } else {
      return data;
    }
  });
}

const getHeadlineNodesAndLinks = async (tag) => {
  const experiences = await fetchTagRelatedExperienceHeadlines(tag);
  const nodes = experiences.map((experience) => {
    return createHeadlineNode(experience);
  });
  const links = experiences.map((experience) => {
    return {
      source: tag,
      target: `${experience.id}`,
    };
  });
  return {
    nodes,
    links,
  };
}

const getHeadlineNodesAndLinksFromSearchedExperiences = (nodes, tags, experiences) => {
  const newNodes = experiences.map((experience) => {
    return createHeadlineNode(experience);
  });

  const newLinks = []
  experiences.map((experience) => {
    experience.tags_list.map((tag) => {
      newLinks.push({
        source: tag,
        target: `${experience.id}`,
      });
    });

    experience.categories_list.map((category) => {
      newLinks.push({
        source: category,
        target: `${experience.id}`,
      });
    });
  });

  const nodesToShow = new Set();
  newLinks.map((link) => {
    nodesToShow.add(link.source);
  });
  nodesToShow.forEach((node) => {
    try {
      nodesToShow.add(tags.find((e) => e.name === node).tag_group);
    } catch (e) { /* empty */ }
  });

  const filteredNodes = nodes.filter((node) => {
    return nodesToShow.has(node.name);
  });

  return {
    filteredNodes,
    newNodes,
    newLinks,
  };
}

const createHeadlineNode = (experience) => ({
  name: `${experience.id}`,
  category: 3,
  value: experience.headline,
  symbolSize: 10,
  label: {
    formatter: `{c}`,
    fontSize: 11,
  },
  itemStyle: {
    color: headlineColor,
  },
  tooltip: {
    formatter: `{c}`,
    extraCssText: 'width: 400px; text-overlow: wrap; white-space: normal; word-break: break-word;',
  },
});

const fetchGraphData = async () => {
  // First fetch categories
  let categories = [];
  await fetchCategories().then(({data, error}) => {
    if (error) {
      toast.error(error.message);
    } else {
      categories = data.map((category) => category.name);
    }
  });

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
  let tags = [];
  await fetchTags().then(({data, error}) => {
    if (error) {
      toast.error(error.message);
    } else {
      tags = data.map((tag) => {
        return {
          name: tag.name,
          tag_group: tag.tag_groups.name,
        };
      });
      data.map((tag) => {
        tagGroups[tag.tag_groups.name].push(tag.name);
      });
    }
  });

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

  return {
    categories,
    tagGroups,
    tags,
    relationships,
  };
}

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

  return {
    nodes: newNodes,
    links: newLinks,
  };
}

const filterGraph = async (nodes, links, tags, {
  tag,
  tagGroup,
  category,
}) => {
  const newNodes = [];
  const newLinks = [];

  const headlineNodes = [];
  const headlineLinks = [];
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

    await getHeadlineNodesAndLinks(tag).then(({nodes, links}) => {
      headlineNodes.push(...nodes);
      headlineLinks.push(...links);
    });
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

  return {
    nodes: newNodes,
    headlineNodes,
    headlineLinks,
  }
}

filterGraph.propTypes = {
  tag: PropTypes.string,
  tagGroup: PropTypes.string,
  category: PropTypes.string,
}

export {
  tagsColor,
  tagGroupsColor,
  categoriesColor,
  headlineColor,
  createHeadlineNode,
  fetchGraphData,
  graphSetup,
  filterGraph,
  fetchTagRelatedExperienceHeadlines,
  getHeadlineNodesAndLinks,
  getHeadlineNodesAndLinksFromSearchedExperiences,
}