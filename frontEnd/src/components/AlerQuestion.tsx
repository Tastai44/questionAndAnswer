import { Box, IconButton, Modal, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { themeApp } from "../utils/Theme";

interface IData {
    open: boolean;
    context: string;
}

export default function AlerQuestion(props: IData) {
    return (
        <Box>
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
                        width: "80%",
                        [themeApp.breakpoints.up("md")]: {
                            width: "398px",
                        },
                    }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: "100px",
                            paddingBottom: "100px",
                        }}>
                        <Box
                            sx={{
                                flexDirection: "column",
                                textAlign: "center",
                            }}>
                            <IconButton
                                sx={{
                                    marginBottom: "10px",
                                    background: "#2ECC71",
                                    width: "100px",
                                    height: "100px",
                                }}>
                                <CheckIcon
                                    sx={{ color: "white", fontSize: "70px" }}
                                />
                            </IconButton>
                            <Typography
                                fontFamily={"Inter"}
                                sx={{ fontWeight: "bold", fontSize: "20px" }}>
                                {props.context}
                            </Typography>
                            <Typography
                                fontFamily={"Inter"}
                                sx={{ fontSize: "17px" }}>
                                Thank you for being a part of this show.
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}
