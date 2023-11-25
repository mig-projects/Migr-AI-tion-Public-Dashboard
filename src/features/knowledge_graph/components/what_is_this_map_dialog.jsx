import PropTypes from "prop-types";
import {Dialog, DialogContent, DialogTitle, Typography} from "@mui/material";

const WhatIsThisMapDialog = ({ open, setOpen }) => {
  return <Dialog onClose={() => {
    setOpen(false)
  }} open={open}>
    <DialogTitle className={`text-center fs-4`}>What&apos;s in this map?</DialogTitle>
    <DialogContent>
      <Typography
        paragraph
      >
        The knowledge graph visualizes the central research <span className={`fw-bold`}>categories</span> and descriptive <span className={`fw-bold`}>tags</span> in relation to a growing dataset of qualitative inputs. <span className={`fw-bold`}>Tags</span> are organized into <span className={`fw-bold`}>tag groups</span>.
      </Typography>
      <Typography
        paragraph
      >
        → Click on a <span className={`fw-bold`}>category</span> to understand systemic or societal challenges in relation to different marginalized communities.
      </Typography>
      <Typography
        paragraph
      >
        → Click on <span className={`fw-bold`}>tag</span> to view detailed inputs from diverse contributors.
      </Typography>
      <Typography
        paragraph
      >
        → Filter the <span className={`fw-bold`}>tags</span> to see relationships between intersectional groups.
      </Typography>
      <Typography
        paragraph
      >
        → Study the <span className={`fw-bold`}>AI Groupings</span> legend for deeper insights into how LLM segmentation contributed to naming research <span className={`fw-bold`}>categories</span>.
      </Typography>
      <Typography
        paragraph
      >
        Check back at a later date to see updates in the visualization.
      </Typography>
    </DialogContent>
  </Dialog>;
}

WhatIsThisMapDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
}

export default WhatIsThisMapDialog;