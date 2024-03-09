import { Box, Divider, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ContentCopy } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import { deleteEventById } from '../api/event';
import { useNavigate } from 'react-router-dom';

interface IData {
    handleClose: () => void;
    eventId: string;
}

export default function HostEventMenu(props: IData) {
    const navigate = useNavigate();
    const handleCopyText = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Text copied to clipboard!');
    };

    const handleEndEvent = async (id: string) => {
        await deleteEventById(id);
        navigate('/host');
    };

    return (
        <>
            <Box sx={{
                background: "#D9D9D9", height: "200px", width: "430px", padding: "10px"
            }}>
                <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignContent: "center", alignItems: "center" }}>
                    <Typography color={"black"} fontSize={"32px"} sx={{ paddingLeft: "10px", paddingTop: "10px" }}>
                        FFF
                    </Typography>
                    <IconButton size="large" sx={{ width: "32px", height: "32px" }} onClick={props.handleClose} >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box textAlign={"left"} color={"#6C6C6C"} fontSize={"17px"} sx={{ paddingLeft: "10px", marginBottom: "10px" }}>
                    SDSDSD
                </Box>
                <Divider sx={{ border: "0.5px solid #9C9C9C", marginBottom: "20px" }} />
                <Box sx={{ display: "flex", justifyContent: "space-between", marginLeft: "10px", alignContent: "center", alignItems: "center", marginTop: "10px" }}>
                    <Box>
                        Code: {props.eventId}
                    </Box>
                    <IconButton onClick={() => handleCopyText(props.eventId)}>
                        <ContentCopy fontSize="small" />
                    </IconButton>
                </Box>
                <Box sx={{
                    display: "flex", alignContent: "center", alignItems: "center", marginTop: "10px", cursor: "pointer", color: "black", transition: "background-color 0.3s ease",
                    "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.1)"
                    }
                }}
                    onClick={() => handleEndEvent(props.eventId)}
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
