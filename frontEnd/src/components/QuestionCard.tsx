import {
    Box,
    Button,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { useState } from "react";
import {
    deleteQuestionById,
    saveQuestion,
    unSaveQuestion,
} from "../api/question";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import DeleteCard from "./DeleteCard";

interface IData {
    name: string;
    timestamp: string;
    likeNumber: { userLikeId: string }[];
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
    const [openDeleteCard, setOpenDeleteCard] = useState(false);
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
    };
    const handleUnSaveQuestion = async (id: string) => {
        await unSaveQuestion(id);
        props.handleRefresh();
        handleClose();
    };
    const handleCloseDeleteCard = () => setOpenDeleteCard(false);
    const handleOpenDeleteCard = () => setOpenDeleteCard(true);

    const handleDeleteQuestion = async (id: string) => {
        await deleteQuestionById(id);
        props.handleRefresh();
        handleClose();
    };

    return (
        <Box
            sx={{
                background: "white",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "130px",
            }}>
            <Box
                sx={{
                    display: "flex",
                    paddingLeft: "20px",
                    paddingTop: "15px",
                    marginBottom: "5px",
                    fontSize: "13px",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignContent: "center",
                }}>
                <Box sx={{ width: "90%", display: "flex" }}>
                    <Box sx={{ color: "black", marginRight: "5px" }}>
                        {props.name}
                    </Box>
                    <Box sx={{ marginTop: "-3px" }}>.</Box>
                    <Box sx={{ color: "#6C6C6C", marginLeft: "5px" }}>
                        {props.timestamp}
                    </Box>
                </Box>
                <DeleteCard
                    handleClose={handleCloseDeleteCard}
                    id={props.questionId}
                    handleDeleteQuestion={handleDeleteQuestion}
                    open={openDeleteCard}
                />
                <IconButton
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    sx={{ marginRight: "16px" }}>
                    <MoreHorizOutlinedIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    sx={{ borderRadius: "100px" }}>
                    {props.isSave ? (
                        <MenuItem
                            sx={{
                                fontSize: "14px",
                                display: "flex",
                                alignContent: "center",
                                alignItems: "center",
                            }}
                            onClick={() =>
                                handleUnSaveQuestion(props.questionId)
                            }>
                            <ListItemIcon>
                                <RemoveCircleOutlineOutlinedIcon />
                            </ListItemIcon>
                            Discard
                        </MenuItem>
                    ) : (
                        <MenuItem
                            sx={{
                                fontSize: "14px",
                                display: "flex",
                                alignContent: "center",
                                alignItems: "center",
                            }}
                            onClick={() =>
                                handleSaveQuestion(props.questionId)
                            }>
                            <ListItemIcon>
                                <AddCircleOutlineOutlinedIcon />
                            </ListItemIcon>
                            <Box>Save</Box>
                        </MenuItem>
                    )}
                    <MenuItem
                        sx={{
                            fontSize: "14px",
                            alignContent: "center",
                            alignItems: "center",
                        }}
                        onClick={handleOpenDeleteCard}>
                        <ListItemIcon>
                            <DeleteOutlineOutlinedIcon />
                        </ListItemIcon>
                        Remove
                    </MenuItem>
                </Menu>
            </Box>
            <Box onClick={() => props.handleSelectQuestion(props.questionId)}>
                <Typography sx={{ paddingLeft: "20px" }} fontWeight={"mediums"}>
                    {props.questionText}
                </Typography>
            </Box>
            <Box
                sx={{
                    marginLeft: "20px",
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "10px",
                }}>
                {props.likeNumber.length == 0 ? (
                    <>
                        <Box
                            sx={{
                                width: "53px",
                                height: "24px",
                                color: "#6C6C6C",
                                borderRadius: "8px",
                            }}>
                            <ThumbUpOutlinedIcon sx={{ fontSize: "16px" }} />
                        </Box>
                    </>
                ) : (
                    <Button
                        sx={{
                            width: "53px",
                            height: "24px",
                            color: "#6C6C6C",
                            borderRadius: "8px",
                            background: "#F7F7F7",
                            fontSize: "16px",
                        }}
                        startIcon={
                            <ThumbUpOutlinedIcon
                                sx={{
                                    width: "16px",
                                    height: "16px",
                                }}
                            />
                        }>
                        <Typography fontSize={13}>
                            {props.likeNumber.length}
                        </Typography>
                    </Button>
                )}
                {props.isRead ? (
                    <Box
                        sx={{
                            marginRight: "20px",
                            display: "flex",
                            alignContent: "center",
                            alignItems: "center",
                            color: "#6C6C6C",
                            fontSize: "13px",
                        }}>
                        Read{" "}
                        <CheckOutlinedIcon
                            sx={{
                                color: "#6C6C6C",
                                width: "12px",
                                height: "12px",
                            }}
                        />
                    </Box>
                ) : (
                    <Box
                        sx={{
                            marginRight: "20px",
                            display: "flex",
                            alignContent: "center",
                            alignItems: "center",
                            color: "#6C6C6C",
                            fontSize: "13px",
                        }}></Box>
                )}
            </Box>
        </Box>
    );
}
