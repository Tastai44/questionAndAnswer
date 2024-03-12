import { Box, IconButton, Typography } from "@mui/material";
// import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

interface IData {
  name: string;
  timestamp: string;
  likeNumber: { userLikeId: string; }[];
  questionText: string;
}

export default function QuestionCard(props: IData) {
  return (
    <Box sx={{ background: "white", display: "flex", flexDirection: "column", width: "100%", height: "101px" }}>
      <Box sx={{ display: "flex", paddingLeft: "20px", paddingTop: "10px", marginBottom: "5px", fontSize: "13px" }}>
        <Box sx={{ marginRight: "10px", color: "black" }}>{props.name}</Box><Box sx={{ color: "#6C6C6C", }}>{props.timestamp}</Box>
      </Box>
      <Typography sx={{ paddingLeft: "20px" }} fontWeight={"mediums"}>{props.questionText}</Typography>
      <Box sx={{ marginLeft: "10px", display: "flex", alignContent: "center", alignItems: "center" }}>
        <IconButton>
          <ThumbUpOutlinedIcon />
        </IconButton>
        {props.likeNumber.length}
      </Box>
    </Box>
  );
}
