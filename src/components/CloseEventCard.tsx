import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';
import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import { themeApp } from '../utils/Theme';

interface IData {
    handleClose: () => void;
    handleDelete: (id: string) => void;
    id: string;
    open: boolean;
}

export default function CloseEventCard(props: IData) {

    return (
        <>
            <Modal open={props.open}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "40%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        borderRadius: "20px",
                        width: "90%",
                        [themeApp.breakpoints.up("md")]: {
                            width: "398px",
                        },
                    }}>
                    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
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
                                        onClick={() => props.handleDelete(props.id)}
                                        sx={{
                                            width: "95%", borderRadius: "8px", background: "#FA6056", color: "white", marginTop: "13px",
                                            height: "49px", "&:hover": {
                                                background: "#FA6056",
                                                color: "white",
                                            },
                                            [themeApp.breakpoints.up('md')]: {
                                                width: "370px"
                                            },
                                        }}>End</Button>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                    <Button variant="outlined" sx={{
                                        width: "95%", borderRadius: "8px",
                                        background: "white", color: "black", marginTop: "10px", height: "49px", marginBottom: "10px", border: "1px solid black", "&:hover": {
                                            background: "white",
                                            color: "black",
                                            border: "1px solid black"
                                        }, [themeApp.breakpoints.up('md')]: {
                                            width: "370px"
                                        },
                                    }} onClick={props.handleClose}>Cancel</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal >
        </>
    );
}
