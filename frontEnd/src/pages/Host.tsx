import { Box, Typography, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { useState } from "react";
import { createEvent } from "../api/event";
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from "react-router-dom";

export default function Host() {
    const [eventName, setEventName] = useState("");
    const [hostName, setHostName] = useState("");
    const navigate = useNavigate();

    const handleCreateEvent = async () => {
        const event = {
            title: eventName,
            ownerName: hostName
        }
        const response = await createEvent(event);
        const responseBody = await response;
        navigate(`/eventHostDetails/${responseBody}`)
        setEventName("")
        setHostName("")
    }
    const handleEventName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEventName(event.target.value)
    }
    const handleHostName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHostName(event.target.value)
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
          }}
      >
        <Typography color={"black"} fontSize={"32px"} fontWeight={"bold"}>
            Fill your info
        </Typography>
        <Typography color={"#6C6C6C"} fontSize={"17px"}>
            Complete your event details.
        </Typography>
        <FormControl sx={{ width: '398px', marginTop: "24px" }} variant="outlined">
            <InputLabel htmlFor="Enter code here">Event name</InputLabel>
            <OutlinedInput
                id="Event name"
                value={eventName}
                onChange={handleEventName}
                endAdornment={
                    <InputAdornment position="end">
                        {
                            eventName ? (
                                <IconButton
                                    edge="end"
                                    sx={{ border: "0px" }}
                                    onClick={() => setEventName('')}
                                >
                                    <CancelIcon />
                                </IconButton>
                            ) : (
                                <></>
                            )
                        }
                    </InputAdornment>
                }
                label="Event name"
            />
        </FormControl>
        <FormControl sx={{ width: '398px', marginTop: "24px" }} variant="outlined">
            <InputLabel htmlFor="Enter code here">Host name</InputLabel>
            <OutlinedInput
                id="Host name"
                value={hostName}
                onChange={handleHostName}
                endAdornment={
                    <InputAdornment position="end">
                        {
                            eventName ? (
                                <IconButton
                                    edge="end"
                                    sx={{ border: "0px" }}
                                    onClick={() => setHostName('')}
                                >
                                    <CancelIcon />
                                </IconButton>
                            ) : (
                                <></>
                            )
                        }
                    </InputAdornment>
                }
                label="Host name"
            />
        </FormControl>
        {/* {(error !== '' && !eventName && hostName) && (
            <Typography color={"red"}>
                {error}
            </Typography>
        )} */}

        <Button
            sx={{
                height: "61px",
                width: "398px",
                background: "black",
                color: "white",
                borderRadius: "14px",
                marginTop: "24px",
                  "&:hover": {
                      background: "black",
                      color: "white",
                  },
            }}
              onClick={handleCreateEvent}
        >
            Continue
        </Button>
        <Button
            variant="outlined"
            sx={{
                height: "61px",
                width: "398px",
                color: "black",
                borderRadius: "14px",
                marginTop: "24px",
                border: "1px solid black",
                "&:hover": {
                    background: "white",
                    color: "black",
                    border: "1px solid black"
                },
            }}
            onClick={() => navigate('/')}
        >
            Cancel
        </Button>
    </Box>
  )
}
