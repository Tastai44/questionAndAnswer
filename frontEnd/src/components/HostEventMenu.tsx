import { Box, Divider, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ContentCopy } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';

interface IData {
    handleClose: () => void;
}

export default function HostEventMenu(props: IData) {

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
                        Code:
                    </Box>
                    <IconButton>
                        <ContentCopy fontSize="small" />
                    </IconButton>
                </Box>
                <Box sx={{
                    display: "flex", alignContent: "center", alignItems: "center", marginTop: "10px", cursor: "pointer", color: "black",
                }}>
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
