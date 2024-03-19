import { Box, Divider, Button, Modal } from "@mui/material";
import { themeApp } from "../utils/Theme";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { createQuestion, updateQuestion } from "../api/question";
// import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

interface IData {
    handleClose: () => void;
    handleRefresh: () => void;
    handleCloseAlert: () => void;
    handleOpenAlert: () => void;
    isEdit: boolean;
    questionId?: string;
    context: string;
    ownerName: string;
    openQueCard: boolean;
}

export default function AddQuestion(props: IData) {
    const userInfo = JSON.parse(localStorage.getItem("user") || "null");
    const { eventId } = useParams();
    const [text, setText] = useState(props.context);

    const now = new Date().toISOString();

    const handleAddQuestion = async () => {
        try {
            const addData = {
                questionText: text,
                ownerId: userInfo.userId,
                name: userInfo.name,
                eventId: eventId || "",
                timestamp: `${now}`,
            };
            const editData = {
                questionText: text,
                timestamp: `${now}`,
            };
            if (props.isEdit) {
                await updateQuestion(props.questionId ?? "", editData);
            } else {
                await createQuestion(addData);
                props.handleOpenAlert();
                setTimeout(() => {
                    props.handleCloseAlert();
                }, 2000);
            }

            props.handleRefresh();
            props.handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal open={props.openQueCard}>
            <Box
                sx={{
                    position: "absolute",
                    top: "40%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    borderRadius: "20px",
                    width: "90%",
                    [themeApp.breakpoints.up("md")]: {
                        width: "398px",
                    },
                }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                    }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "center",
                            width: "100%",
                        }}>
                        <Box
                            sx={{
                                display: "flex",
                                paddingLeft: "20px",
                                paddingTop: "10px",
                                marginBottom: "5px",
                                fontSize: "13px",
                                justifyContent: "space-between",
                                alignItems: "center",
                                alignContent: "center",
                            }}>
                            <Box
                                sx={{
                                    width: "50%",
                                    display: "flex",
                                    paddingTop: "10px",
                                    marginBottom: "5px",
                                }}>
                                <Box
                                    sx={{
                                        fontSize: "13px",
                                        color: "black",
                                        marginRight: "5px",
                                        fontFamily: "Inter",
                                    }}>
                                    {props.ownerName}
                                </Box>
                                {/* <Box sx={{ marginTop: "-3px" }}>.</Box>
                        <Box sx={{ color: "#6C6C6C", marginLeft: "5px", fontFamily: "Inter" }}>Tas</Box> */}
                            </Box>
                            {/* <Box sx={{ marginRight: "16px", display: "flex", alignContent: "center", alignItems: "center" }}>
                        <IconButton
                            sx={{ fontSize: "13px" }}
                        >
                            <ThumbUpOutlinedIcon sx={{ width: "20px", height: "20px" }} />
                        </IconButton>
                    </Box> */}
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    background: "#F7F7F7",
                                    borderRadius: "14px",
                                    width: "95%",
                                }}>
                                <Box
                                    sx={{
                                        width: "100%",
                                        borderRadius: "14px",
                                        marginTop: "20px",
                                    }}>
                                    <textarea
                                        value={text}
                                        onChange={(e) =>
                                            setText(e.target.value)
                                        }
                                        style={{
                                            borderRadius: "14px",
                                            fontSize: "17px",
                                            background: "#F7F7F7",
                                            width: "95%",
                                            border: "none",
                                            outline: "none",
                                            color: "black",
                                            resize: "none",
                                            fontFamily: "Inter",
                                            height: "250px",
                                        }}
                                        placeholder="What is in your mind?"
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Divider sx={{ marginTop: "20px", color: "#9C9C9C" }} />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginBottom: "14px",
                                marginLeft: "10px",
                                marginRight: "10px",
                                gap: "10px",
                            }}>
                            <Button
                                sx={{
                                    height: "49px",
                                    color: "#000000",
                                    borderRadius: "14px",
                                    marginTop: "24px",
                                    border: "1px solid #9C9C9C",
                                    width: "86px",
                                    textTransform: "none",
                                    "&:hover": {
                                        background: "white",
                                        color: "black",
                                        border: "1px solid #000000",
                                    },
                                    [themeApp.breakpoints.up("lg")]: {
                                        width: "86px",
                                    },
                                    fontFamily: "Inter",
                                }}
                                onClick={props.handleClose}>
                                Cancel
                            </Button>
                            <Button
                                sx={{
                                    height: "49px",
                                    color: "black",
                                    borderRadius: "14px",
                                    marginTop: "24px",
                                    border: "1px solid #2ECC71",
                                    background: "#2ECC71",
                                    width: "147px",
                                    "&:hover": {
                                        background: "#2ECC71",
                                        color: "black",
                                    },
                                    [themeApp.breakpoints.up("lg")]: {
                                        width: "147px",
                                    },
                                    fontFamily: "Inter",
                                    textTransform: "none",
                                }}
                                onClick={handleAddQuestion}>
                                {props.isEdit ? "Save" : "Send question"}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}
