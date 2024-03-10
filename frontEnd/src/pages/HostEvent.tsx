import { Box, Divider, IconButton, Modal, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import { getEventById } from "../api/event";
import { IQuestion, Ievent } from "../interface/Ievent";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { getQuesByEId } from "../api/question";
import HostEventMenu from "../components/HostEventMenu";

export default function HostEvent() {
    const [value, setValue] = useState(0);
    const { eventId } = useParams();
    const [eventData, setEventData] = useState<Ievent>();
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const fetch = async () => {
            const data = await getEventById(eventId ?? "");
            setEventData(data);
        };
        fetch();
    }, [eventId]);

    useEffect(() => {
        const fetch = async () => {
            const data = await getQuesByEId(eventId ?? "") as IQuestion[];

            setQuestions(data);
        };
        fetch();
    }, [eventId]);

    const handleChange = (newValue: number) => {
        setValue(newValue);
    };

    const handleCopyText = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Text copied to clipboard!');
    };
    return (
        <>
            {eventData !== undefined && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Modal
                        open={open}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <HostEventMenu handleClose={handleClose} eventId={eventId ?? ''} title={eventData.title} hostName={eventData.ownerName} />
                        </Box>
                    </Modal>
                    <Box sx={{
                        display: "flex", flexDirection: "column", marginTop: "-10px"
                    }}>
                        <Box sx={{
                            background: "#D9D9D9", height: "112px", width: "430px", padding: "10px"
                        }}>
                            <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignContent: "center", alignItems: "center" }}>
                                <Typography color={"black"} fontSize={"32px"} sx={{ paddingLeft: "16px", paddingTop: "10px" }}>
                                    {eventData.title}
                                </Typography>
                                <IconButton size="large" onClick={handleOpen} sx={{ width: "32px", height: "32px", marginRight: "10px" }}>
                                    <MenuIcon />
                                </IconButton>
                            </Box>
                            <Box textAlign={"left"} color={"#6C6C6C"} fontSize={"17px"} sx={{ paddingLeft: "16px" }} fontWeight={"100"}>
                                {eventData.ownerName}
                            </Box>
                        </Box>
                        <Box sx={{ width: '430px' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', fontSize: "16px", display: "flex", justifyContent: "space-between" }}>
                                <Box sx={{ display: "flex", alignContent: "center", alignItems: "center", marginLeft: "16px", marginRight: "16px" }}>
                                    <Box
                                        onClick={() => handleChange(0)}
                                        sx={{
                                            borderBottom: value == 0 ? "2px solid black" : "",
                                            fontWeight: value == 0 ? "bold" : "",
                                            borderRadius: "0px",
                                            color: "black",
                                            width: "87px",
                                            height: "47px",
                                            fontSize: "16px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        Live
                                    </Box>
                                    <Box
                                        onClick={() => handleChange(1)}
                                        sx={{
                                            borderBottom: value == 1 ? "2px solid black" : "",
                                            fontWeight: value == 1 ? "bold" : "",
                                            borderRadius: "0px",
                                            color: "black",
                                            width: "87px",
                                            height: "47px",
                                            fontSize: "16px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}>
                                        Popular
                                    </Box>
                                </Box>
                                <Box
                                    // onClick={() => handleChange(2)}
                                    sx={{
                                        // borderBottom: value == 2 ? "2px solid black" : "",
                                        // fontWeight: value == 2 ? "bold" : "",
                                        borderRadius: "0px",
                                        color: "black",
                                        width: "87px",
                                        height: "47px",
                                        fontSize: "16px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                    {`${questions.length} questions`}
                                </Box>
                            </Box>
                            {value == 0 ? (
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
                                            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
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
                            ) : value == 1 ? (
                                <>
                                    {questions !== undefined && (
                                        questions.map((item, index) => (
                                            <Box key={index}>
                                                <QuestionCard name={item.name} timestamp={item.timestamp} likeNumber={item.likeNumber} questionText={item.questionText} />
                                                <Divider />
                                            </Box>
                                        ))
                                    )}
                                </>
                            ) : (
                                <>
                                    {questions !== undefined && (
                                        questions.map((item, index) => (
                                            <Box key={index}>
                                                <QuestionCard name={item.name} timestamp={item.timestamp} likeNumber={item.likeNumber} questionText={item.questionText} />
                                                <Divider />
                                            </Box>
                                        ))
                                    )}
                                </>
                            )}
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
}
