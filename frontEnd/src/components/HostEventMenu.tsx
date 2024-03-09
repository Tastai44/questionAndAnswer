import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function HostEventMenu() {
    return (
        <Box sx={{
            background: "#D9D9D9", height: "112px", width: "430px", padding: "10px"
        }}>
            <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                <Typography color={"black"} fontSize={"32px"} sx={{ paddingLeft: "10px", paddingTop: "10px" }}>
                    FFF
                </Typography>
                <IconButton size="large">
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box textAlign={"left"} color={"#6C6C6C"} fontSize={"17px"} sx={{ paddingLeft: "10px" }}>
                SDSDSD
            </Box>
        </Box>
    );
}
