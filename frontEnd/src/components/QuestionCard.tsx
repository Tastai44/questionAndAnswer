import { Box, IconButton, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { useState } from "react";
import { deleteQuestionById, saveQuestion, unSaveQuestion } from "../api/question";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
interface IData {
	name: string;
	timestamp: string;
	likeNumber: { userLikeId: string; }[];
	questionText: string;
	isRead: boolean; 
	isSave?: boolean;
	questionId: string;
	isMy?: boolean;
	handleRefresh: () => void;
	handleSelectQuestion: (id: string) => void;
}

export default function QuestionCard(props: IData) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleSaveQuestion = async (id: string) => {
		await saveQuestion(id);
		props.handleRefresh();
		handleClose();
	}
	const handleUnSaveQuestion = async (id: string) => {
		await unSaveQuestion(id);
		props.handleRefresh();
		handleClose();
	}
	const handleDeleteQuestion = async (id: string) => {
		await deleteQuestionById(id);
		props.handleRefresh();
		handleClose();
	}

  return (
	<Box sx={{ background: "white", display: "flex", flexDirection: "column", width: "100%", height: "130px" }}>
		<Box sx={{ display: "flex", 
		paddingLeft: "20px", paddingTop: "15px", 
		marginBottom: "5px", fontSize: "13px", justifyContent:"space-between",
		alignItems:"center", alignContent:"center" }}>
			<Box sx={{width:"90%", display:"flex"}}>
				<Box sx={{ color: "black", marginRight: "5px" }}>{props.name}</Box>
				<Box sx={{marginTop:"-3px"}}>.</Box>
				<Box sx={{ color: "#6C6C6C", marginLeft:"5px" }}>{props.timestamp}</Box>
			</Box>
			<IconButton
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
				{props.isSave ? (
					<MenuItem sx={{
						fontSize: "14px", display: "flex", alignContent:"center", alignItems:"center"
						}} onClick={() => handleUnSaveQuestion(props.questionId)}>
						<ListItemIcon>
							<RemoveCircleOutlineOutlinedIcon />
						</ListItemIcon>
						Discard
					</MenuItem>
				) : (
					<MenuItem sx={{ fontSize: "14px", display: "flex", alignContent: "center", alignItems: "center" }} onClick={() => handleSaveQuestion(props.questionId)}>
						<ListItemIcon>
							<AddCircleOutlineOutlinedIcon />
						</ListItemIcon>
						<Box>Keep</Box>
					</MenuItem>
				)}
				<MenuItem sx={{ fontSize: "14px", alignContent: "center", alignItems: "center" }} onClick={() => handleDeleteQuestion(props.questionId)}>
					<ListItemIcon>
						<DeleteOutlineOutlinedIcon />
					</ListItemIcon>
					Remove
				</MenuItem>
			</Menu>
	</Box>	
	<Box onClick={() => props.handleSelectQuestion(props.questionId)} >
		<Typography sx={{ paddingLeft: "20px" }} fontWeight={"mediums"}>{props.questionText}</Typography>
	</Box>
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
