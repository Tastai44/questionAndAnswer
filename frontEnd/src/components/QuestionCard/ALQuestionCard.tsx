import {
    Box,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import {
    deleteQuestionById,
    likeQuestion,
    unlikeQuestion,
} from "../../api/question";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AddQuestion from "../AddEditQuestion";
import { useState } from "react";
import AlerQuestion from "../AlerQuestion";
import DeleteCard from "../DeleteCard";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { IQuestion } from "../../interface/Ievent";
import Comment from "./Comment";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface IData {
    isMy?: boolean;
    questions: IQuestion;
    handleRefresh: () => void;
    handleSelectQuestion: (id: string) => void;
}

export default function ALQuestionCard(props: IData) {
    const userInfo = JSON.parse(localStorage.getItem("user") || "null");
    const [openQueCard, setOpenQueCard] = useState(false);
    const [openDeleteCard, setOpenDeleteCard] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const isUserLiked = props.questions.likeNumber.some(
        (item) => item.userLikeId === userInfo.userId
    );
    const [commentNumber, setCommentNumber] = useState(1);
    const [isExpandComment, setIsExpandComment] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLike = async () => {
        await likeQuestion(props.questions.questionId, userInfo.userId);
        props.handleRefresh();
    };
    const handleUnLike = async () => {
        await unlikeQuestion(props.questions.questionId, userInfo.userId);
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
        handleClose();
    };

    const handleExpandComment = () => {
        setIsExpandComment(true);
        setCommentNumber(props.questions.comment.length);
    };

    return (
        <Box
            sx={{
                background: "white",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "auto",
            }}>
            <AlerQuestion
                open={openAlert}
                context="Your question has been edited!"
            />
            <DeleteCard
                handleClose={handleCloseDeleteCard}
                id={props.questions.questionId}
                handleDeleteQuestion={handleDeleteQuestion}
                open={openDeleteCard}
            />
            <AddQuestion
                handleClose={handleCloseQueCard}
                handleRefresh={props.handleRefresh}
                handleCloseAlert={handleCloseAlert}
                handleOpenAlert={handleOpenAlert}
                isEdit={true}
                questionId={props.questions.questionId}
                context={props.questions.questionText}
                ownerName={props.questions.name}
                openQueCard={openQueCard}
            />
            <Box
                sx={{
                    display: "flex",
                    paddingLeft: "20px",
                    paddingTop: "15px",
                    fontSize: "13px",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignContent: "center",
                }}>
                <Box sx={{ width: "90%", display: "flex" }}>
                    <Box sx={{ color: "black", marginRight: "5px" }}>
                        {props.questions.name}
                    </Box>
                    <Box sx={{ marginTop: "-3px" }}>.</Box>
                    <Box
                        sx={{
                            color: "#6C6C6C",
                            marginLeft: "5px",
                            marginRight: "5px",
                        }}>
                        {props.questions.timestamp.toLocaleString()}
                    </Box>
                    {props.questions.isEdit && (
                        <>
                            <Box sx={{ marginTop: "-3px" }}>.</Box>
                            <Box sx={{ color: "#2ECC71", marginLeft: "5px" }}>
                                Edited
                            </Box>
                        </>
                    )}
                </Box>
                <IconButton
                    disabled={userInfo.userId !== props.questions.ownerId}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    sx={{ marginRight: "16px" }}>
                    <MoreHorizOutlinedIcon />
                </IconButton>
                <Menu
                    onClose={handleClose}
                    anchorEl={anchorEl}
                    open={open}
                    PaperProps={{
                        sx: {
                            borderRadius: "10px",
                        },
                    }}>
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
                onClick={() =>
                    props.handleSelectQuestion(props.questions.questionId)
                }
                sx={{ paddingLeft: "20px", cursor: "pointer" }}
                fontWeight={"mediums"}>
                {props.questions.questionText}
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
                    {props.questions.likeNumber.length == 0 ? (
                        <>
                            <Box
                                onClick={() => handleLike()}
                                sx={{
                                    width: "53px",
                                    height: "24px",
                                    color: "#1C1C1C",
                                    display: "flex",
                                    fontSize: "13px",
                                    alignContent: "center",
                                    alignItems: "center",
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
                                <Box
                                    onClick={() => handleUnLike()}
                                    sx={{
                                        width: "53px",
                                        height: "24px",
                                        color: "#1C1C1C",
                                        borderRadius: "8px",
                                        display: "flex",
                                        fontSize: "13px",
                                        alignContent: "center",
                                        alignItems: "center",
                                        gap: "3px",
                                    }}>
                                    <ThumbUpIcon
                                        sx={{
                                            width: "16px",
                                            height: "16px",
                                        }}
                                    />
                                    {props.questions.likeNumber.length}
                                </Box>
                            ) : (
                                <Box
                                    onClick={() => handleLike()}
                                    sx={{
                                        width: "53px",
                                        height: "24px",
                                        color: "#1C1C1C",
                                        borderRadius: "8px",
                                        display: "flex",
                                        fontSize: "13px",
                                        alignContent: "center",
                                        alignItems: "center",
                                        gap: "3px",
                                    }}>
                                    <ThumbUpOutlinedIcon
                                        sx={{
                                            width: "16px",
                                            height: "16px",
                                        }}
                                    />
                                    {props.questions.likeNumber.length}
                                </Box>
                            )}
                        </>
                    )}
                </Box>
            </Box>
            <Box
                sx={{
                    padding: "10px 14px 0px 14px",
                }}>
                {props.questions.comment.length != 0 &&
                    props.questions.comment
                        .slice(0, commentNumber)
                        .sort((a, b) => {
                            const timestampA =
                                a.timestamp instanceof Date
                                    ? a.timestamp.getTime()
                                    : 0;
                            const timestampB =
                                b.timestamp instanceof Date
                                    ? b.timestamp.getTime()
                                    : 0;
                            return timestampB - timestampA;
                        })
                        .map((item, index) => (
                            <Box key={index} sx={{ marginBottom: "16px" }}>
                                <Comment
                                    isHost={false}
                                    ownerName={item.name}
                                    date={item.timestamp.toLocaleString()}
                                    context={item.context}
                                    commentId={item.commentId}
                                    questionId={props.questions.questionId}
                                    handleRefresh={props.handleRefresh}
                                />
                            </Box>
                        ))}
            </Box>
            {props.questions.comment.length > 1 && !isExpandComment && (
                <Box
                    onClick={handleExpandComment}
                    sx={{
                        padding: "0px 14px 10px 14px",
                        display: "flex",
                        alignContent: "center",
                        alignItems: "center",
                        gap: "5px",
                        cursor: "pointer",
                    }}>
                    <AddCircleOutlineIcon sx={{ color: "#2ECC71" }} />
                    <Box
                        sx={{
                            color: "#6C6C6C",
                            fontSize: "15px",
                            fontFamily: "Inter",
                        }}>
                        {props.questions.comment.length - 1} more comment
                    </Box>
                </Box>
            )}
        </Box>
    );
}
