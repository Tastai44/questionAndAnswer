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
import {
    deleteQuestionById,
    likeQuestion,
    unlikeQuestion,
} from "../api/question";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AddQuestion from "./AddQuestion";
import { useState } from "react";
import AlerQuestion from "./AlerQuestion";
import DeleteCard from "./DeleteCard";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

interface IData {
    name: string;
    timestamp: string;
    likeNumber: { userLikeId: string }[];
    questionText: string;
    questionId: string;
    isMy?: boolean;
    handleRefresh: () => void;
    handleSelectQuestion: (id: string) => void;
}

export default function ALQuestionCard(props: IData) {
    const userInfo = JSON.parse(localStorage.getItem("user") || "null");
    const [openQueCard, setOpenQueCard] = useState(false);
    const [openDeleteCard, setOpenDeleteCard] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const isUserLiked = props.likeNumber.some(
        (item) => item.userLikeId === userInfo.userId
    );
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLike = async () => {
        await likeQuestion(props.questionId, userInfo.userId);
        props.handleRefresh();
    };
    const handleUnLike = async () => {
        await unlikeQuestion(props.questionId, userInfo.userId);
        props.handleRefresh();
    };
    const handleOpenQueCard = () => {
        handleClose();
        setOpenQueCard(true);
    };
    const handleCloseQueCard = () => setOpenQueCard(false);
    const handleOpenAlert = () => setOpenAlert(true);

    const handleCloseDeleteCard = () => setOpenDeleteCard(false);
    const handleOpenDeleteCard = () => setOpenDeleteCard(true);

    const handleCloseAlert = () => setOpenAlert(false);
    const handleDeleteQuestion = async (id: string) => {
        await deleteQuestionById(id);
        props.handleRefresh();
        handleCloseDeleteCard();
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
            <AlerQuestion
                open={openAlert}
                context="Your question has been edited!"
            />
            <DeleteCard
                handleClose={handleCloseDeleteCard}
                id={props.questionId}
                handleDeleteQuestion={handleDeleteQuestion}
                open={openDeleteCard}
            />

            <AddQuestion
                handleClose={handleCloseQueCard}
                handleRefresh={props.handleRefresh}
                handleCloseAlert={handleCloseAlert}
                handleOpenAlert={handleOpenAlert}
                isEdit={true}
                questionId={props.questionId}
                context={props.questionText}
                ownerName={props.name}
                openQueCard={openQueCard}
            />

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
                    <Box
                        sx={{
                            color: "#6C6C6C",
                            marginLeft: "5px",
                            marginRight: "5px",
                        }}>
                        {props.timestamp}
                    </Box>
                    <Box sx={{ marginTop: "-3px" }}>.</Box>
                    <Box sx={{ color: "#2ECC71", marginLeft: "5px" }}>
                        Edited
                    </Box>
                </Box>
                <IconButton
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    sx={{ marginRight: "16px" }}>
                    <MoreHorizOutlinedIcon />
                </IconButton>
                <Menu
                    onClose={handleClose}
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}>
                    <MenuItem
                        onClick={handleOpenQueCard}
                        sx={{
                            fontSize: "14px",
                            display: "flex",
                            alignContent: "center",
                            alignItems: "center",
                        }}>
                        <ListItemIcon>
                            <ModeEditOutlinedIcon />
                        </ListItemIcon>
                        Edit
                    </MenuItem>
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
            <Typography
                onClick={() => props.handleSelectQuestion(props.questionId)}
                sx={{ paddingLeft: "20px", cursor: "pointer" }}
                fontWeight={"mediums"}>
                {props.questionText}
            </Typography>
            <Box
                sx={{
                    marginLeft: "20px",
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "10px",
                }}>
                <Box
                    sx={{
                        display: "flex",
                        alignContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        color: "#6C6C6C",
                        cursor: "pointer",
                    }}>
                    {props.likeNumber.length == 0 ? (
                        <>
                            <Box
                                onClick={() => handleLike()}
                                sx={{
                                    width: "53px",
                                    height: "24px",
                                    color: "#6C6C6C",
                                    borderRadius: "8px",
                                }}>
                                <ThumbUpOutlinedIcon
                                    sx={{ fontSize: "16px" }}
                                />
                            </Box>
                        </>
                    ) : (
                        <>
                            {isUserLiked ? (
                                <Button
                                    startIcon={
                                        <ThumbUpIcon
                                            sx={{
                                                width: "16px",
                                                height: "16px",
                                            }}
                                        />
                                    }
                                    onClick={() => handleUnLike()}
                                    sx={{
                                        width: "53px",
                                        height: "24px",
                                        color: "#2ECC71",
                                        borderRadius: "8px",
                                        background: "black",
                                    }}>
                                    <Typography fontSize={13} color={"white"}>
                                        {props.likeNumber.length}
                                    </Typography>
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => handleLike()}
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
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
