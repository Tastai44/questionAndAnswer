import { Box, Divider, IconButton, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ContentCopy } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import { style } from '../utils/BoxStyle';
import { useState } from 'react';
import CloseEventCard from './CloseEventCard';

interface IData {
    handleClose: () => void;
    eventId: string;
    title: string;
    hostName: string;
}

export default function HostEventMenu(props: IData) {
    const [open, setOpen] = useState(false);

    const handleCopyText = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Text copied to clipboard!');
    };

    const handleCloseCard = () => {
        setOpen(!open);
        // handleEndEvent(props.eventId);
    };

    return (
        <>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CloseEventCard handleClose={handleCloseCard} eventId={props.eventId} />
                </Box>
            </Modal>
            <Box sx={{
                background: "#D9D9D9", height: "200px", width: "430px",
            }}>
                <Box sx={{ display: "flex", width: "100%", 
                    justifyContent: "space-between", alignContent: "center", 
                    alignItems: "center"}}
                    >
                    <Typography color={"black"} fontSize={"32px"} sx={{marginLeft:"16px", marginTop:"8px"}}>
                        {props.title}
                    </Typography>
                    <IconButton size="large" sx={{ width: "32px", height: "32px", marginRight:"16px" }} onClick={props.handleClose} >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box textAlign={"left"} color={"#6C6C6C"} fontSize={"17px"} sx={{ marginBottom: "10px", marginLeft:"16px" }}>
                    {props.hostName}
                </Box>
                <Divider sx={{ border: "0.5px solid #9C9C9C", marginBottom: "20px" }} />
                <Box sx={{ display: "flex", justifyContent: "space-between", alignContent: "center", alignItems: "center", marginTop: "10px", marginLeft: "16px" }}>
                    <Box>
                        Code: {props.eventId}
                    </Box>
                    <IconButton onClick={() => handleCopyText(props.eventId)} sx={{marginRight:"16px"}}>
                        <ContentCopy fontSize="small" />
                    </IconButton>
                </Box>
                <Box sx={{
                    display: "flex", alignContent: "center", 
                    alignItems: "center", marginTop: "10px", cursor: "pointer", 
                    color: "black", transition: "background-color 0.3s ease", marginLeft: "10px",
                    "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.1)"
                    }
                }}
                    onClick={handleCloseCard}
                >
                    <IconButton>
                        <LogoutIcon fontSize="small" />
                    </IconButton>
                    <Box>
                        End this event
                    </Box>
                </Box>
            </Box>
        </>

    );
}
