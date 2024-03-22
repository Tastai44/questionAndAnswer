import { Box, Button, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { useState } from "react";

interface IData {
    isUserLiked: boolean;
    likeNumber: number;
    context: string;
    openQueCard: boolean;
    handleUnLike: () => void;
    handleLike: () => void;
    handleCloseCard: () => void;
    handleOpenQueCard: (context: string) => void;
}

export default function AudienceButton(props: IData) {
    const [hovered, setHovered] = useState(false);
    const [hoveredDelete, setHoveredDelete] = useState(false);
    const [hoveredLike, setHoveredLike] = useState(false);

    return (
        <Box
            sx={{
                display: "flex",
                gap: "8px",
                marginLeft: "16px",
                marginBottom: "14px",
            }}>
            {props.isUserLiked ? (
                <Button
                    startIcon={
                        <ThumbUpIcon
                            sx={{
                                width: "20px",
                                height: "20px",
                            }}
                        />
                    }
                    onClick={() => props.handleUnLike()}
                    sx={{
                        width: "75px",
                        height: "38px",
                        borderRadius: "50px",
                        background: "#FFFFFF",
                        color: "black",
                        border: "1px solid #C9CCD0",
                    }}>
                    <Typography fontSize={15} color={"black"}>
                        {props.likeNumber}
                    </Typography>
                </Button>
            ) : (
                <Button
                    onClick={() => props.handleLike()}
                    onMouseEnter={() => setHoveredLike(true)}
                    onMouseLeave={() => setHoveredLike(false)}
                    sx={{
                        width: "75px",
                        height: "38px",
                        borderRadius: "50px",
                        background: "#FFFFFF",
                        border: "1px solid #C9CCD0",
                        color: "black",
                        textTransform: "none",
                    }}
                    startIcon={
                        <ThumbUpOutlinedIcon
                            sx={{
                                width: "20px",
                                height: "20px",
                            }}
                        />
                    }>
                    {hoveredLike ? (
                        <Typography fontSize={15}>Like</Typography>
                    ) : (
                        <Typography fontSize={15}>
                            {props.likeNumber}
                        </Typography>
                    )}
                </Button>
            )}
            <Button
                onClick={() => props.handleOpenQueCard(props.context)}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                sx={{
                    width: hovered ? "84px" : "52px",
                    height: "36px",
                    borderRadius: "50px",
                    background: "#FFFFFF",
                    border: "1px solid #C9CCD0",
                    color: "black",
                    textTransform: "none",
                }}>
                {hovered ? (
                    <>
                        <ModeEditOutlinedIcon sx={{ color: "#2ECC71" }} />
                        <Typography color={"#2ECC71"} fontSize={15}>
                            Edit
                        </Typography>
                    </>
                ) : (
                    <>
                        <ModeEditOutlinedIcon />
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
                        <DeleteOutlineOutlinedIcon sx={{ color: "#FA6056" }} />
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
    );
}
