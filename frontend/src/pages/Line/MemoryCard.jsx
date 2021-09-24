import React from "react";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
import { COLORS } from "../../utils/colors";

const getPaperStyle = () => ({
  padding: "6px 16px",
});

const getConnectorStyle = (color) => ({
  backgroundColor: color,
  width: "5px",
});

const CardConnector = (props) => {
  const { color, isFirst, isLast } = props;
  const lineColor = isFirst || isLast ? COLORS.TRANSPARENT : color;
  const connectorStyle = getConnectorStyle(lineColor);
  return <TimelineConnector style={connectorStyle} />;
};

const LineSeparator = (props) => {
  const { color, isFirst, isLast } = props;
  return (
    <TimelineSeparator color={color}>
      <CardConnector color={color} isFirst={isFirst} />
      <TimelineDot color="inherit" style={{ padding: 0 }}>
        <FiberManualRecordIcon
          style={{ color: color, width: "15px", height: "15px" }}
        />
      </TimelineDot>
      <CardConnector color={color} isLast={isLast} />
    </TimelineSeparator>
  );
};

const MemoryCard = (props) => {
  const { memoryId, isFirst, isLast, color, date, mediaUrl, title } = props;

  const history = useHistory();

  return (
    <TimelineItem>
      <LineSeparator color={color} isFirst={isFirst} isLast={isLast} />
      <Box width="100%">
        <TimelineContent>
          <Paper elevation={3} style={getPaperStyle()}>
            <Box display="flex" flexDirection="column">
              {mediaUrl && (
                <img
                  alt={title}
                  src={mediaUrl}
                  style={{ width: "100%", height: "100%" }}
                />
              )}
              <br />
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                width="100%"
              >
                <Box display="flex" flexDirection="column">
                  <Typography variant="h6" component="h1">
                    <strong>{title}</strong>
                  </Typography>
                  <Typography variant="body1">{date}</Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-around"
                >
                  <Button
                    onClick={() => history.push(`/memory/${memoryId}`)}
                    variant="outlined"
                  >
                    View
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        </TimelineContent>
      </Box>
    </TimelineItem>
  );
};

export default MemoryCard;
