import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Typography,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import { ChangeEvent, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";

interface IData {
    isUserLiked: boolean;
    likeNumber: number;
    context: string;
    openQueCard: boolean;
    comment: string;
    isSave: boolean;
    handleUnLike: () => void;
    handleLike: () => void;
    handleCloseCard: () => void;
    handleOpenQueCard: (context: string) => void;
    handleSetComment: (event: ChangeEvent<HTMLInputElement>) => void;
    handleAddComment: () => void;
    handleSaveQuestion: () => void;
    handleUnSaveQuestion: () => void;
}

export default function HostButton(props: IData) {
    const [hovered, setHovered] = useState(false);
    const [hoveredDelete, setHoveredDelete] = useState(false);
    const [hoveredSave, setHoveredSave] = useState(false);
    const [openComment, setOpenComment] = useState(false);
    const [saved, setSaved] = useState(props.isSave);

    const handleOpenComment = () => {
        setOpenComment(!openComment);
    };
    const handleSaved = () => {
        if (saved) {
            props.handleUnSaveQuestion();
        } else {
            props.handleSaveQuestion();
        }
        setSaved(!saved);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
                sx={{
                    display: "flex",
                    gap: "8px",
                    marginLeft: "16px",
                    marginBottom: "14px",
                }}>
                <Button
                    sx={{
                        width: "75px",
                        height: "38px",
                        borderRadius: "50px",
                        background: "#FFFFFF",
                        border: "1px solid #C9CCD0",
                        color: "black",
                        textTransform: "none",
                    }}>
                    <ThumbUpOutlinedIcon
                        sx={{
                            width: "20px",
                            height: "20px",
                        }}
                    />
                    <Typography fontSize={15}>
                        {props.likeNumber == 0 ? "" : props.likeNumber}
                    </Typography>
                </Button>
                <Button
                    onClick={handleOpenComment}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    sx={{
                        width: hovered || openComment ? "127px" : "52px",
                        height: "36px",
                        borderRadius: "50px",
                        background: "#FFFFFF",
                        border: "1px solid #C9CCD0",
                        color: "black",
                        textTransform: "none",
                    }}>
                    {hovered || openComment ? (
                        <>
                            <ChatBubbleOutlineOutlinedIcon
                                sx={{ color: "#2ECC71" }}
                            />
                            <Typography color={"#2ECC71"} fontSize={15}>
                                Comment
                            </Typography>
                        </>
                    ) : (
                        <>
                            <ChatBubbleOutlineOutlinedIcon />
                        </>
                    )}
                </Button>
                <Button
                    onClick={handleSaved}
                    onMouseEnter={() => setHoveredSave(true)}
                    onMouseLeave={() => setHoveredSave(false)}
                    sx={{
                        width: hoveredSave || saved ? "101px" : "52px",
                        height: "36px",
                        borderRadius: "50px",
                        background: "#FFFFFF",
                        border: "1px solid #C9CCD0",
                        color: "black",
                        textTransform: "none",
                    }}>
                    {hoveredSave || saved ? (
                        <>
                            <BookmarkAddedOutlinedIcon
                                sx={{ color: "#2ECC71" }}
                            />
                            <Typography color={"#2ECC71"} fontSize={15}>
                                Saved
                            </Typography>
                        </>
                    ) : (
                        <>
                            <BookmarkAddOutlinedIcon />
                        </>
                    )}
                </Button>
                <Button
                    onMouseEnter={() => setHoveredDelete(true)}
                    onMouseLeave={() => setHoveredDelete(false)}
                    onClick={props.handleCloseCard}
                    sx={{
                        width: hoveredDelete ? "103px" : "52px",
                        height: "36px",
                        borderRadius: "50px",
                        background: "#FFFFFF",
                        border: "1px solid #C9CCD0",
                        color: "black",
                        textTransform: "none",
                    }}>
                    {hoveredDelete ? (
                        <>
                            <DeleteOutlineOutlinedIcon
                                sx={{ color: "#FA6056" }}
                            />
                            <Typography color={"#FA6056"} fontSize={15}>
                                Delete
                            </Typography>
                        </>
                    ) : (
                        <>
                            <DeleteOutlineOutlinedIcon />
                        </>
                    )}
                </Button>
            </Box>
            {openComment && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}>
                    <FormControl
                        sx={{
                            width: "95%",
                            padding: 1,
                        }}
                        variant="outlined">
                        <OutlinedInput
                            placeholder="Add your comment..."
                            multiline
                            sx={{
                                background: "white",
                                borderRadius: "14px",
                                border: "1px solid #C9CCD0",
                                "&:hover": {
                                    border: "1px solid #2ECC71",
                                },
                                "&:action": {
                                    border: "1px solid #2ECC71",
                                },
                            }}
                            id="Event name"
                            value={props.comment}
                            onChange={props.handleSetComment}
                            endAdornment={
                                <InputAdornment position="end">
                                    {props.comment ? (
                                        <IconButton
                                            edge="end"
                                            sx={{
                                                border: "0px",
                                            }}
                                            onClick={props.handleAddComment}>
                                            <SendIcon />
                                        </IconButton>
                                    ) : (
                                        <></>
                                    )}
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Box>
            )}
        </Box>
    );
}
