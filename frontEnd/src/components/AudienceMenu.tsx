import { Box, Divider, IconButton, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
// import CloseEventCard from './CloseEventCard';
import { themeApp } from '../utils/Theme';

interface IData {
    handleClose: () => void;
    eventId: string;
    title: string;
    hostName: string;
}

export default function AudienceMenu(props: IData) {
    const [open, setOpen] = useState(false);

    const handleCloseCard = () => {
        setOpen(!open);
    };

    return (
        <>
            {/* <Modal
                open={open}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '40%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        borderRadius: "20px",
                        width: "90%",
                        [themeApp.breakpoints.up('md')]: {
                            width: "398px"
                        },
                    }}
                >
                    <CloseEventCard handleClose={handleCloseCard} eventId={props.eventId} />
                </Box>
            </Modal> */}
            <Box sx={{
                background: "black", height: "160px", width: "100%",
                [themeApp.breakpoints.up('md')]: {
                    width: "430px"
                },
            }}>
                <Box sx={{
                    display: "flex", width: "100%",
                    justifyContent: "space-between", alignContent: "center",
                    alignItems: "center"
                }}
                >
                    <Typography fontWeight={"bold"} fontFamily={"Inter"} color={"#2ECC71"} fontSize={"32px"} sx={{ marginLeft: "16px", marginTop: "10px" }}>
                        {props.title}
                    </Typography>
                    <IconButton size="large" sx={{ width: "32px", height: "32px", marginRight: "16px", color: "white" }} onClick={props.handleClose} >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box fontFamily={"Inter"} textAlign={"left"} color={"white"} fontSize={"17px"} sx={{ marginBottom: "10px", marginLeft: "16px" }}>
                    {props.hostName}
                </Box>
                <Divider sx={{ border: "0.5px solid #9C9C9C", marginBottom: "20px" }} />
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
                    <IconButton sx={{ color: "white" }}>
                        <LogoutIcon fontSize="small" />
                    </IconButton>
                    <Box sx={{ color: "white" }}>
                        Leave
                    </Box>
                </Box>
            </Box>
        </>

    );
}
