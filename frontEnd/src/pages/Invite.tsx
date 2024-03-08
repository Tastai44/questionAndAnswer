import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

export default function Invite() {
    const [userName, setUsername] = useState("");
  return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography color={'black'}>
              Invite code
              </Typography>
          <TextField value={userName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setUsername(event.target.value);
              }} />
          <Button>Continue</Button>
    </Box>
  )
}
