import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import { themeApp } from "../utils/Theme";

export default function Home() {
    const navigate = useNavigate();
    const [invitedCode, setInvitedCode] = useState("");
    const [error, setError] = useState("");
    const userInfo = JSON.parse(localStorage.getItem("user") || "null");
    const handleContinue = () => {
        if (userInfo) {
            alert("Only one user can be logged in at a time!");
        } else {
            if (invitedCode) {
                navigate(`/event/${invitedCode}`);
            } else {
                setError("Please type the code!");
            }
        }
    };

    const handleTypeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInvitedCode(event.target.value);
    };

    return (
        <Box
            sx={{
                display: "flex",
                gap: "10px",
                flexDirection: "column",
                textAlign: "center",
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                [themeApp.breakpoints.down("sm")]: {
                    width: "90%",
                },
                [themeApp.breakpoints.up("md")]: {
                    width: "70%",
                },
                [themeApp.breakpoints.up("lg")]: {
                    width: "50%",
                },
            }}>
            <Typography
                fontFamily={"Inter"}
                color={"#2ECC71"}
                fontSize={"32px"}
                fontWeight={"bold"}>
                Invite code
            </Typography>
            <Typography
                fontFamily={"Inter"}
                color={"#6C6C6C"}
                fontSize={"17px"}>
                Enter invite code to participate.
            </Typography>
            <Box>
                <FormControl
                    sx={{
                        width: "100%",
                        marginTop: "24px",
                        [themeApp.breakpoints.up("sm")]: {
                            width: "398px",
                        },
                    }}
                    variant="outlined">
                    <InputLabel
                        sx={{ fontFamily: "Inter" }}
                        htmlFor="Enter code here">
                        Enter code here
                    </InputLabel>
                    <OutlinedInput
                        sx={{ borderRadius: "14px", background: "white" }}
                        id="Enter code here"
                        value={invitedCode}
                        onChange={handleTypeCode}
                        endAdornment={
                            <InputAdornment position="end">
                                {invitedCode ? (
                                    <IconButton
                                        edge="end"
                                        sx={{ border: "0px" }}
                                        onClick={() => setInvitedCode("")}>
                                        <CancelIcon />
                                    </IconButton>
                                ) : (
                                    <></>
                                )}
                            </InputAdornment>
                        }
                        label="Enter code here"
                    />
                </FormControl>
            </Box>

            {error !== "" && !invitedCode && (
                <Typography color={"red"}>{error}</Typography>
            )}
            <Box>
                <Button
                    sx={{
                        height: "61px",
                        width: "100%",
                        background: "black",
                        color: "white",
                        borderRadius: "14px",
                        marginTop: "24px",
                        "&:hover": {
                            background: invitedCode ? "white" : "black",
                            color: invitedCode ? "black" : "gray",
                            border: invitedCode ? "1px solid black" : "none",
                        },
                        [themeApp.breakpoints.up("md")]: {
                            width: "398px",
                        },
                        fontFamily: "Inter",
                    }}
                    onClick={handleContinue}>
                    Continue
                </Button>
            </Box>
            <Typography
                fontFamily={"Inter"}
                color={"#6C6C6C"}
                fontSize={"17px"}
                sx={{ marginTop: "32px" }}>
                Want to be a host?{" "}
                <u
                    style={{ cursor: "pointer", color: "#2ECC71" }}
                    onClick={() => navigate("/host")}>
                    Create
                </u>
            </Typography>
        </Box>
    );
}
