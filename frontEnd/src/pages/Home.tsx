import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
// import { getEvent } from '../api/event';

export default function Home() {
    const navigate = useNavigate();
    const [invitedCode, setInvitedCode] = useState('');
    const [error, setError] = useState('');

    // const handleClick = async () =>{
    //     const question = await getEvent();
    //     console.log(question)
    // }
    const handleContinue = () => {
        if (invitedCode) {
            navigate(`/event/${invitedCode}`);
        } else {
            setError("Please type the code!");
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
            }}
        >
            <Typography color={"black"} fontSize={"32px"} fontWeight={"bold"}>
                Invite code
            </Typography>
            <Typography color={"#6C6C6C"} fontSize={"17px"}>
                Enter invite code to participate.
            </Typography>
            <FormControl sx={{ width: '398px', marginTop: "24px" }} variant="outlined">
                <InputLabel htmlFor="Enter code here">Enter code here</InputLabel>
                <OutlinedInput
                    id="Enter code here"
                    value={invitedCode}
                    onChange={handleTypeCode}
                    endAdornment={
                        <InputAdornment position="end">
                            {
                                invitedCode ? (
                                    <IconButton
                                        edge="end"
                                        sx={{ border: "0px" }}
                                        onClick={() => setInvitedCode('')}
                                    >
                                        <CancelIcon />
                                    </IconButton>
                                ) : (
                                    <></>
                                )
                            }
                        </InputAdornment>
                    }
                    label="Enter code here"
                />
            </FormControl>
            {(error !== '' && !invitedCode) && (
                <Typography color={"red"}>
                    {error}
                </Typography>
            )}

            <Button
                sx={{
                    height: "61px",
                    width: "398px",
                    background: "black",
                    color: "white",
                    borderRadius: "14px",
                    marginTop: "24px",
                    "&:hover": {
                        background: invitedCode ? "white" : "black",
                        color: invitedCode ? "black" : "gray",
                        border: invitedCode ? "1px solid black" : "none"
                    },
                }}
                onClick={handleContinue}
            >
                Continue
            </Button>

            <Typography color={"#6C6C6C"} fontSize={"17px"} sx={{ marginTop: "32px" }}>
                Want to be a host? <u style={{ cursor: "pointer" }} onClick={() => navigate("/host")}>Create</u>
            </Typography>
        </Box>
    );
}
