import { Box, Typography } from "@mui/material";

export default function Comment() {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    background: "#F7F7F7",
                    textAlign: "left",
                    padding: "10px",
                    flexDirection: "column",
                    fontSize: "15px",
                }}>
                <Box
                    sx={{
                        display: "flex",
                        alignContent: "center",
                        alignItems: "center",
                    }}>
                    <Typography
                        color={"#2ECC71"}
                        fontSize={"15px"}
                        textAlign={"left"}
                        fontWeight={"mediums"}
                        sx={{ marginRight: "3px" }}
                        fontFamily={"Inter"}>
                        Host
                    </Typography>
                    <Box sx={{ marginTop: "-4px" }}>.</Box>
                    <Box sx={{ color: "#6C6C6C", marginLeft: "5px" }}>
                        a few seconds ago
                    </Box>
                </Box>
                <Typography
                    color={"#1C1C1C"}
                    fontFamily={"Inter"}
                    fontSize={"17px"}>
                    Its mean catch me if u can.
                </Typography>
            </Box>
        </>
    );
}
