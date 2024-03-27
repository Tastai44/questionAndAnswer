import {
    Box,
    Typography,
    Divider,
    Button,
    Modal,
    IconButton,
} from "@mui/material";
import { themeApp } from "../utils/Theme";

import CloseIcon from "@mui/icons-material/Close";

interface IData {
    open: boolean;
    discard: boolean;
    buttonWord: string;
    title: string;
    context: string;
    handleClose: () => void;
    handleDeleteDiscard: () => void;
}

export default function ConfirmModalCard(props: IData) {
    return (
        <Modal open={props.open}>
            <Box
                sx={{
                    position: "absolute",
                    top: "40%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    border: "0px",
                    borderRadius: "20px",
                    width: "90%",
                    [themeApp.breakpoints.up("md")]: {
                        width: "398px",
                    },
                }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                    }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            alignContent: "center",
                            paddingTop: "10px",
                            marginLeft: "14px",
                            marginRight: "14px",
                        }}>
                        <Typography
                            sx={{
                                marginTop: "14px",
                                textAlign: "left",
                                fontWeight: "medium",
                                fontSize: "17px",
                            }}>
                            {/* {props.discard
                                ? "Unsaved Change"
                                : "Delete question?"} */}
                            {props.title}
                        </Typography>
                        <IconButton
                            onClick={props.handleClose}
                            sx={{
                                color: "black",
                                bgcolor: "#F7F7F7",
                                alignItems: "center",
                            }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Divider
                        sx={{
                            width: "100%",
                            marginTop: "14px",
                            border: "0.5px solid #C9CCD0",
                        }}
                    />

                    <Box
                        sx={{
                            marginTop: "24px",
                            textAlign: "left",
                            marginLeft: "14px",
                        }}>
                        {props.context}
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            textAlign: "left",
                            width: "100%",
                        }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "8px",
                                width: "90%",
                            }}>
                            <Button
                                onClick={props.handleClose}
                                sx={{
                                    textTransform: "none",
                                    width: "100%",
                                    borderRadius: "8px",
                                    background: "white",
                                    color: "black",
                                    marginTop: "24px",
                                    marginBottom: "16px",
                                    height: "49px",
                                    border: "1px solid #C9CCD0",
                                    "&:hover": {
                                        background: "white",
                                        color: "black",
                                        border: "1px solid black",
                                    },
                                    [themeApp.breakpoints.up("md")]: {
                                        width: "181px",
                                    },
                                }}>
                                {props.discard ? "Keep editing" : "Cancel"}
                            </Button>
                            <Button
                                onClick={props.handleDeleteDiscard}
                                sx={{
                                    textTransform: "none",
                                    width: "100%",
                                    borderRadius: "8px",
                                    background: props.discard
                                        ? "#2ECC71"
                                        : "#FA6056",
                                    color: props.discard ? "black" : "white",
                                    marginTop: "24px",
                                    marginBottom: "16px",
                                    height: "49px",

                                    border: props.discard ? "none" : "none",
                                    "&:hover": {
                                        background: "white",
                                        color: "black",
                                        border: "1px solid black",
                                    },
                                    [themeApp.breakpoints.up("md")]: {
                                        width: "181px",
                                    },
                                }}>
                                {/* {props.discard ? "Discard" : "Delete"} */}
                                {props.buttonWord}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}
