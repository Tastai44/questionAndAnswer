import { Box, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';
import { themeApp } from "../utils/Theme";
import { getEventById } from "../api/event";
import { Ievent } from "../interface/Ievent";
import { addUser } from "../api/audience";

export default function Event() {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const [eventData, setEventData] = useState<Ievent>();
    const [userName, setUsername] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const data = await getEventById(eventId ?? "");
            if (data) {
                setEventData(data);
            } else {
                navigate('/');
            }

        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventId]);

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleContinue = async () => {
        if (userName) {
            const user = {
                name: userName,
            };
            const response = await addUser(user);
            const responseBody = await response;
            const saveUser = {
                userId: responseBody.data,
                name: userName,
            };
            localStorage.setItem("user", JSON.stringify(saveUser));
            navigate(`/eventDetails/${eventId}/${userName}`);
        } else {
            setError("Please type your name!");
        }
    };

    function stringAvatar(name: string) {
        return {
            sx: {
                fontSize: "36px",
                bgcolor: "#D9D9D9",
                width: "100px",
                height: "100px",
                color: "black",
                border: "1px solid black"
            },
            children: `${name.slice(0, 2).toUpperCase()}`,
        };
    }

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
                [themeApp.breakpoints.down('sm')]: {
                    width: "90%"
                },
                [themeApp.breakpoints.up('md')]: {
                    width: "70%"
                },
                [themeApp.breakpoints.up('lg')]: {
                    width: "50%"
                }
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Avatar {...stringAvatar(`${eventData?.ownerName}`)} sx={{ background: "black", fontSize: "36px", width: "100px", height: "100px", color: "#2ECC71" }} />
            </Box>
            {eventData !== undefined && (
                <>
                    <Typography color={"black"} fontSize={"36px"} fontWeight={"bold"}>
                        {eventData?.title}
                    </Typography>
                    <Typography color={"#6C6C6C"} fontSize={"17px"}>
                        {eventData?.ownerName}
                    </Typography>
                </>
            )}
            <Box>
                <FormControl sx={{
                    width: '398px', marginTop: "32px", [themeApp.breakpoints.down('lg')]: {
                        width: "100%"
                    },
                }} variant="outlined">
                    <InputLabel htmlFor="What should everyone call you?">What should everyone call you?</InputLabel>
                    <OutlinedInput
                        sx={{ borderRadius: "14px" }}
                        value={userName}
                        onChange={handleName}
                        endAdornment={
                            <InputAdornment position="end">
                                {
                                    userName ? (
                                        <IconButton
                                            edge="end"
                                            sx={{ border: "0px" }}
                                            onClick={() => setUsername('')}
                                        >
                                            <CancelIcon />
                                        </IconButton>
                                    ) : (
                                        <></>
                                    )
                                }
                            </InputAdornment>
                        }
                        label="What should everyone call you?"
                    />
                </FormControl>
                {(error !== '' && !userName) && (
                    <Typography color={"red"}>
                        {error}
                    </Typography>
                )}
                <Button
                    sx={{
                        height: "61px",
                        width: '398px',
                        background: "#2ECC71",
                        color: "white",
                        borderRadius: "14px",
                        marginTop: "24px",
                        fontSize: "17px",
                        "&:hover": {
                            background: "black",
                        },
                        [themeApp.breakpoints.down('lg')]: {
                            width: "100%"
                        },
                        fontFamily: "Inter"
                    }}
                    onClick={handleContinue}
                >
                    Join the event
                </Button>
                <Button
                    variant="outlined"
                    sx={{
                        height: "61px",
                        fontSize: "17px",
                        width: "398px",
                        color: "black",
                        borderRadius: "14px",
                        marginTop: "14px",
                        border: "1px solid black",
                        "&:hover": {
                            background: "white",
                            color: "black",
                            border: "1px solid black"
                        },
                        [themeApp.breakpoints.down('lg')]: {
                            width: "100%"
                        },
                        fontFamily: "Inter"
                    }}
                    onClick={() => navigate('/')}
                >
                    Leave
                </Button>

            </Box>
        </Box>
    );
}
