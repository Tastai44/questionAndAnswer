import { Box, Typography } from "@mui/material";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

interface IData {
	name: string;
	timestamp: string;
	likeNumber: { userLikeId: string; }[];
	questionText: string;
	isRead: boolean;
	questionId: string;
	isMy?: boolean;
	handleRefresh: () => void;
}

export default function QuestionCard(props: IData) {
  
  return (
    <Box sx={{ background: "white", display: "flex", flexDirection: "column", width: "100%", height: "102px" }}>
      <Box sx={{ display: "flex", 
        paddingLeft: "20px", paddingTop: "15px", 
        marginBottom: "5px", fontSize: "13px", justifyContent:"space-between",
        alignItems:"center", alignContent:"center" }}>
        <Box sx={{width:"90%", display:"flex"}}>
			<Box sx={{ color: "black", marginRight: "5px" }}>{props.name}</Box>
			<Box sx={{marginTop:"-3px"}}>.</Box>
			<Box sx={{ color: "#6C6C6C", marginLeft:"5px" }}>{props.timestamp}</Box>
        </Box>
        {/* <IconButton
			aria-controls={open ? 'basic-menu' : undefined}
			aria-haspopup="true"
			aria-expanded={open ? 'true' : undefined}
			onClick={handleClick}
			sx={{marginRight:"16px"}}
        >
            <MoreHorizOutlinedIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          
        >
            {props.isSave == true ? (
				<MenuItem sx={{ fontSize: "14px", display: "flex" }} onClick={() => handleUnSaveQuestion(props.questionId)}>
					<BookmarkOutlinedIcon />
					Unsave
				</MenuItem>
			) : (
				<MenuItem sx={{ fontSize: "14px", display: "flex" }} onClick={() => handleSaveQuestion(props.questionId)}>
					<BookmarkBorderOutlinedIcon />
					Save
				</MenuItem>
			)}
			<MenuItem sx={{ fontSize: "14px" }} onClick={() => handleDeleteQuestion(props.questionId)}>
                <DeleteOutlineOutlinedIcon />
                Delete
            </MenuItem>
        </Menu> */}
      </Box>
      <Typography sx={{ paddingLeft: "20px" }} fontWeight={"mediums"}>{props.questionText}</Typography>
      <Box sx={{ marginLeft: "20px", display: "flex", alignContent: "center", alignItems: "center", justifyContent:"space-between", marginTop:"10px" }}>
		<Box sx={{ display: "flex", alignContent: "center", alignItems: "center", gap: "10px", color: "#6C6C6C" }}>
			<ThumbUpOutlinedIcon sx={{ color: "#6C6C6C" }} />
			{props.likeNumber.length}
		</Box>
		{props.isRead ? (
			<Box sx={{ marginRight: "20px", display: "flex", alignContent: "center", alignItems: "center", color:"#6C6C6C", fontSize:"13px" }} >
				Readed <CheckOutlinedIcon sx={{ color: "#6C6C6C", width:"12px", height:"12px" }}/>
			</Box>
		) : (
			<Box sx={{ marginRight: "20px", display: "flex", alignContent: "center", alignItems: "center", color: "#6C6C6C", fontSize:"13px" }}>
				UnRead <CloseOutlinedIcon sx={{ color: "#6C6C6C", width: "12px", height: "12px" }} />
			</Box>
		)}
		
      </Box>
    </Box>
  );
}
