// import React from 'react';
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';
import { Box, Button, Divider, Typography } from "@mui/material";
import { deleteEventById } from "../api/event";
import { useNavigate } from "react-router-dom";

interface IData {
    handleClose: () => void;
    eventId: string;
}

export default function CloseEventCard(props: IData) {
    const navigate = useNavigate();
    const handleEndEvent = async (id: string) => {
        await deleteEventById(id);
        navigate('/host');
    };
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ display: "flex", flexDirection: "column", textAlign: "center", width: "100%" }}>
                <Box><EventBusyOutlinedIcon sx={{ width: "120px", height: "120px", marginTop: "60px" }} /></Box>
                <Typography sx={{ marginTop: "10px" }}>End this event?</Typography>
                <Box sx={{ marginTop: "10px" }}>
                    All of the question will be remove <br />
                    and no way to return it.
                </Box>
                <Divider sx={{ width: "100%", marginTop: "60px", border: "0.5px solid #1C1C1C" }} />
                <Box sx={{ display: "flex", flexDirection: "column", textAlign: "center", width: "100%" }}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            onClick={() => handleEndEvent(props.eventId)}
                            sx={{
                                width: "370px", borderRadius: "8px", background: "black", color: "white", marginTop: "10px", height: "49px", "&:hover": {
                                    background: "black",
                                    color: "white",
                                },
                            }}>End</Button>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button variant="outlined" sx={{
                            width: "370px", borderRadius: "8px",
                            background: "white", color: "black", marginTop: "10px", height: "49px", marginBottom: "10px", border: "1px solid black", "&:hover": {
                                background: "white",
                                color: "black",
                                border: "1px solid black"
                            },
                        }} onClick={props.handleClose}>Cancel</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
