import LeftDrawer from "../components/left_drawer/left_drawer.jsx";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

const DrawerWrapper = ({children}) => {
  return <Box sx={{ display: 'flex' }}>
    <LeftDrawer />

    {children}

  </Box>;
}

DrawerWrapper.propTypes = {
  children: PropTypes.node,
};

export default DrawerWrapper;
