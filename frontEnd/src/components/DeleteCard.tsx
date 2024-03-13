import { Box, Typography, Divider, Button } from '@mui/material'
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';
import { themeApp } from '../utils/Theme'

interface IData {
    handleClose: () => void;
    handleDeleteQuestion: (id: string) => void;
    id: string;
}

export default function DeleteCard(props: IData) {
  return (
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Box sx={{ display: "flex", flexDirection: "column", textAlign: "center", width: "100%" }}>
              <Box><EventBusyOutlinedIcon sx={{ width: "120px", height: "120px", marginTop: "60px" }} /></Box>
              <Typography sx={{ marginTop: "10px" }}>
                  Are you sure you want to delete this question?
              </Typography>
              <Divider sx={{ width: "100%", marginTop: "60px", border: "0.5px solid #1C1C1C" }} />
              <Box sx={{ display: "flex", flexDirection: "column", textAlign: "center", width: "100%" }}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        onClick={() => props.handleDeleteQuestion(props.id)}
                          sx={{
                              width: "95%", borderRadius: "8px", background: "black", color: "white", marginTop: "13px",
                              height: "49px", "&:hover": {
                                  background: "black",
                                  color: "white",
                              },
                              [themeApp.breakpoints.up('md')]: {
                                  width: "370px"
                              },
                          }}>Delete</Button>
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
  )
}
