import { Box, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button, Avatar } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';

export default function Event() {
  const navigate = useNavigate();
  const [userName, setUsername] = useState('');
	const [error, setError] = useState('');

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

	const handleContinue = () => {
		if (userName) {
			navigate(`/event/${userName}`)
		} else {
			setError("Please type your name!")
		}
	}
	
  function stringAvatar(name: string) {
    return {
      sx: {
        fontSize: "36px",
        bgcolor: "#D9D9D9",
        width: "100px", 
        height: "100px",
        color:"black",
        border:"1px solid black"
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  return (
    <Box sx={{ display: "flex", gap: "10px", flexDirection: "column" }}>
      <Box sx={{display:"flex", justifyContent:"center"}}>
        <Avatar {...stringAvatar('Kent Dodds')}/>
      </Box>
      <Typography color={"black"} fontSize={"36px"} fontWeight={"bold"}>
        CNX Tech Week
      </Typography>
      <Typography color={"#6C6C6C"} fontSize={"17px"}>
        Mr. Lorem polem
      </Typography>
      <FormControl sx={{ width: '398px', marginTop: "24px" }} variant="outlined">
        <InputLabel htmlFor="What should everyone call you?">What should everyone call you?</InputLabel>
        <OutlinedInput
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
        variant="outlined"
        sx={{
          height: "61px", width: "398px", background: "black",
          color: "white", borderRadius: "14px", marginTop: "24px",
          "&:hover": {
            background: "black",
            color: "white",
          },
        }}
        onClick={handleContinue}
        >
          Join the event
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
        Leave
      </Button>

      <Typography color={"#6C6C6C"} fontSize={"17px"} sx={{ marginTop: "32px" }}>
        Want to be a host? <u style={{ cursor: "pointer" }} onClick={() => navigate("/host")}>Create</u>
      </Typography>
    </Box>
  )
}
