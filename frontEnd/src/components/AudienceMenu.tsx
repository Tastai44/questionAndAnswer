import { Box, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { ContentCopy } from "@mui/icons-material";
import { themeApp } from "../utils/Theme";
import LeaveCard from "./LeaveCard";

interface IData {
    handleClose: () => void;
    eventId: string;
    title: string;
    hostName: string;
    roomId: string;
}

export default function AudienceMenu(props: IData) {
    const [open, setOpen] = useState(false);

    const handleCloseCard = () => {
        setOpen(!open);
    };
    const handleCopyText = (text: string) => {
        navigator.clipboard.writeText(text);
        alert("Text copied to clipboard!");
    };

    return (
        <>
            <Modal open={open}>
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
                    <LeaveCard handleCloseCard={handleCloseCard} />
                </Box>
            </Modal>
            <Box
                sx={{
                    background: "#2ECC71",
                    height: "auto",
                    width: "100%",
                    [themeApp.breakpoints.up("md")]: {
                        width: "430px",
                    },
                }}>
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        alignContent: "center",
                        alignItems: "center",
                    }}>
                    <Typography
                        fontWeight={"bold"}
                        fontFamily={"Inter"}
                        color={"#000000"}
                        fontSize={"32px"}
                        sx={{ marginLeft: "16px", marginTop: "10px" }}>
                        {props.title}
                    </Typography>
                    <IconButton
                        size="large"
                        sx={{
                            width: "32px",
                            height: "32px",
                            marginRight: "16px",
                            color: "black",
                        }}
                        onClick={props.handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box
                    fontFamily={"Inter"}
                    textAlign={"left"}
                    color={"black"}
                    fontSize={"17px"}
                    sx={{ marginBottom: "10px", marginLeft: "16px" }}>
                    {props.hostName}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignContent: "center",
                        alignItems: "center",
                        marginTop: "20px",
                        marginLeft: "16px",
                        color: "black",
                    }}>
                    <Box>Code: {props.roomId}</Box>
                    <IconButton
                        onClick={() => handleCopyText(props.roomId)}
                        sx={{ marginRight: "16px", color: "black" }}>
                        <ContentCopy fontSize="small" />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        width: "95%",
                        display: "flex",
                        alignContent: "center",
                        height: "48px",
                        alignItems: "center",
                        marginTop: "10px",
                        cursor: "pointer",
                        color: "black",
                        transition: "background-color 0.3s ease",
                        marginLeft: "10px",
                        marginBottom: "10px",
                        "&:hover": {
                            borderRadius: "10px",
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                        },
                    }}
                    onClick={handleCloseCard}>
                    <IconButton sx={{ color: "black" }}>
                        <LogoutIcon fontSize="small" />
                    </IconButton>
                    <Box sx={{ color: "black" }}>Leave</Box>
                </Box>
            </Box>
        </>
    );
}
