import { Box, Divider, IconButton, Tabs, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Tab from '@mui/material/Tab';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import { getEventById, getQuestions } from "../api/event";
import { IQuestion, Ievent } from "../interface/Ievent";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box color={"black"}>{children}</Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function HostEvent() {
    const [value, setValue] = useState(0);
    const { eventId } = useParams();
    const [eventData, setEventData] = useState<Ievent>()
    const [questions, setQuestions] = useState<IQuestion[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const data = await getEventById(eventId ?? "")
            setEventData(data);
        }
        fetch();
    }, [eventId])

    useEffect(() => {
        const fetch = async () => {
            const data = await getQuestions() as IQuestion[];
            
            setQuestions(data.filter((item) => item.eventId == eventId));
        }
        fetch();
    }, [eventId])

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const handleCopyText = (text:string) => {
        navigator.clipboard.writeText(text);
        // Optionally, you can provide feedback to the user that the text has been copied
        alert('Text copied to clipboard!');
    };
  return (
      <Box sx={{
          display: "flex", flexDirection:"column", marginLeft:"-10px", marginTop:"-10px"
      }}>
          {eventData !== undefined && (
          <><Box sx={{
                  background: "#D9D9D9", height: "112px", width: "430px", padding: "10px"
              }}>
                  <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                      <Typography color={"black"} fontSize={"32px"}>
                          {eventData.title}
                      </Typography>
                      <IconButton size="large">
                          <MenuIcon />
                      </IconButton>
                  </Box>
                  <Typography textAlign={"left"} color={"#6C6C6C"} fontSize={"17px"}>
                      {eventData.ownerName}
                  </Typography>
              </Box><Box sx={{ width: '430px' }}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider', fontSize: "16px" }}>
                          <Tabs value={value} onChange={handleChange} textColor="inherit">
                              <Tab label="Live" {...a11yProps(0)} />
                              <Tab label="Popular" {...a11yProps(1)} />
                              <Tab label={`${questions.length} questions`} {...a11yProps(2)} />
                          </Tabs>
                      </Box>
                      <CustomTabPanel value={value} index={0}>
                          <Box>
                              {questions.length !== 0 ? (
                                      questions.map((item, index) => (
                                          <Box key={index}>
                                              <QuestionCard name={item.name} timestamp={item.timestamp} likeNumber={item.likeNumber} questionText={item.questionText} />
                                              <Divider />
                                          </Box>
                                      ))
                              ) : (
                                <Box sx={{ textAlign: "center" }}>
                                    <Typography sx={{ marginTop: "50%" }}>
                                        Your event now live!
                                    </Typography>
                                    <Typography>
                                        Participant can send question at
                                    </Typography>
                                    <Box sx={{display:"flex", justifyContent:"center", alignContent:"center", alignItems:"center"}}>
                                        <Typography>
                                            Code: {eventId}
                                        </Typography>
                                              <IconButton onClick={() => handleCopyText(eventId ?? '')}>
                                            <ContentCopyOutlinedIcon />
                                        </IconButton>
                                    </Box>
                                    
                                </Box>
                              )}
                          </Box>
                      </CustomTabPanel>
                      <CustomTabPanel value={value} index={1}>
                          {questions !== undefined && (
                              questions.map((item, index) => (
                                  <Box key={index}>
                                      <QuestionCard name={item.name} timestamp={item.timestamp} likeNumber={item.likeNumber} questionText={item.questionText} />
                                      <Divider />
                                  </Box>
                              ))
                          )}
                      </CustomTabPanel>
                      <CustomTabPanel value={value} index={2}>
                          {questions !== undefined && (
                              questions.map((item, index) => (
                                  <Box key={index}>
                                      <QuestionCard name={item.name} timestamp={item.timestamp} likeNumber={item.likeNumber} questionText={item.questionText} />
                                      <Divider />
                                  </Box>
                              ))
                          )}
                      </CustomTabPanel>
                  </Box></>
          )}
    </Box>
  )
}
