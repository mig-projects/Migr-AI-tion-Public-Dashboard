import {Circle, InfoOutlined} from "@mui/icons-material";
import {IconButton, Tooltip, Typography} from "@mui/material";
import PropTypes from "prop-types";

const BottomInfo = ({
  color,
  text,
  tooltipText,
}) => {
  return <div className={`d-flex gap-2 align-items-center`}>
    <Circle
      sx={{
        color: color,
      }}
    />
    <Typography>
      {text}
    </Typography>
    <Tooltip title={tooltipText} arrow>
      <IconButton>
        <InfoOutlined style={{
          color: 'black',
        }} />
      </IconButton>
    </Tooltip>
  </div>
}

BottomInfo.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  tooltipText: PropTypes.string,
};

export default BottomInfo;