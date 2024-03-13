import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

export default function EventDetails() {
  const { eventId, name } = useParams();
  return (
    <Box>
      {eventId} And {name}
    </Box>
  )
}
