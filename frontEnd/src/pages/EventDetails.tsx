import { Box, Divider, IconButton, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById } from "../api/event";
import PreviewQuestion from "../components/PreviewQuestion";
// import QuestionCard from "../components/QuestionCard";
import { themeApp } from "../utils/Theme";
import { getQuesByEId, getQuesByOwnerId, readQuestion } from "../api/question";
import { IQuestion, Ievent } from "../interface/Ievent";
import MenuIcon from '@mui/icons-material/Menu';
import AudienceMenu from "../components/AudienceMenu";
import AddIcon from '@mui/icons-material/Add';
import AddQuestion from "../components/AddQuestion";
import ALQuestionCard from "../components/ALQuestionCard";
import AlerQuestion from "../components/AlerQuestion";

interface IData {
    refresh: number;
    handleRefresh: () => void;
}

export default function EventDetails(props: IData) {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("user") || "null");
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);
    const [openCard, setOpenCard] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [openQueCard, setOpenQueCard] = useState(false);
    const { eventId } = useParams();
    const [eventData, setEventData] = useState<Ievent>();
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [myQuestions, setMyQuestions] = useState<IQuestion[]>([]);
    const [selectedQId, setSelectedQId] = useState('');
    // const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        const fetch = async () => {
            const data = await getEventById(eventId ?? "");
            if (data) {
                setEventData(data);
            } else {
                navigate('/');
            }
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventId]);
    useEffect(() => {
        const fetch = async () => {
            const data = await getQuesByEId(eventId ?? "") as IQuestion[];
            setQuestions(data);
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.refresh]);
    useEffect(() => {
        const fetch = async () => {
            const data = await getQuesByOwnerId(userInfo.userId ?? "") as IQuestion[];
            setMyQuestions(data);
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.refresh]);

    const handleOpenCard = () => setOpenCard(true);
    const handleCloseCard = () => setOpenCard(false);
    const handleOpenAlert = () => setOpenAlert(true);
    const handleCloseAlert = () => setOpenAlert(false);
    const handleOpenQueCard = () => setOpenQueCard(true);
    const handleCloseQueCard = () => setOpenQueCard(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (newValue: number) => {
        setValue(newValue);
    };
    const handleSelectQuestion = async (id: string) => {
        await readQuestion(id);
        setSelectedQId(id);
        handleOpenCard();
        props.handleRefresh();
    };

    return (
        <>
            {eventData !== undefined && (
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",

                }}>
                    <Modal
                        open={open}
                    >
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <AudienceMenu handleClose={handleClose} eventId={eventId ?? ''} title={eventData.title} hostName={eventData.ownerName} />
                        </Box>
                    </Modal>
                    <Modal
                        open={openCard}
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: '40%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            borderRadius: "20px",
                            width: "90%",
                            [themeApp.breakpoints.up('md')]: {
                                width: "398px"
                            },
                        }}>
                            <PreviewQuestion questionId={selectedQId} handleCloseCard={handleCloseCard} handleRefresh={props.handleRefresh} />
                        </Box>
                    </Modal>
                    <Modal
                        open={openQueCard}
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: '40%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            borderRadius: "20px",
                            width: "90%",
                            [themeApp.breakpoints.up('md')]: {
                                width: "398px"
                            },
                        }}>
                            <AddQuestion handleClose={handleCloseQueCard}
                                handleRefresh={props.handleRefresh}
                                handleCloseAlert={handleCloseAlert}
                                handleOpenAlert={handleOpenAlert}
                            />
                        </Box>
                    </Modal>
                    <AlerQuestion open={openAlert} />
                    <Box sx={{
                        display: "flex", flexDirection: "column", width: "100%",
                        [themeApp.breakpoints.up('md')]: {
                            width: "430px"
                        },
                    }}>
                        <Box sx={{
                            background: "#2ECC71", height: "112px",
                            width: "100%",
                            [themeApp.breakpoints.up('md')]: {
                                width: "430px"
                            },
                        }}>
                            <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignContent: "center", alignItems: "center" }}>
                                <Typography fontFamily={"Inter"} fontWeight={"bold"} color={"#000000"} fontSize={"32px"} sx={{ paddingLeft: "16px", paddingTop: "10px" }}>
                                    {eventData.title}
                                </Typography>
                                <IconButton size="large" onClick={handleOpen} sx={{ width: "32px", height: "32px", marginRight: "10px", color: "black" }}>
                                    <MenuIcon />
                                </IconButton>
                            </Box>
                            <Box fontFamily={"Inter"} textAlign={"left"} color={"black"} fontSize={"17px"} sx={{ paddingLeft: "16px" }}>
                                {eventData.ownerName}
                            </Box>
                        </Box>
                        <Box sx={{
                            width: '100%',
                            [themeApp.breakpoints.up('lg')]: {
                                width: "430px"
                            },
                        }}>
                            <Box sx={{ fontSize: "16px", display: "flex", justifyContent: "space-between" }}>
                                <Box sx={{ display: "flex", alignContent: "center", alignItems: "center", marginLeft: "16px", marginRight: "16px" }}>
                                    <Box
                                        onClick={() => handleChange(0)}
                                        sx={{
                                            borderBottom: value == 0 ? "2px solid #2ECC71" : "",
                                            fontWeight: value == 0 ? "bold" : "",
                                            borderRadius: "0px",
                                            color: value == 0 ? "#2ECC71" : "#1C1C1C",
                                            width: "87px",
                                            height: "47px",
                                            fontSize: "16px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Live
                                        <Box sx={{
                                            display: "flex",
                                            fontSize: "12px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginLeft: "10px",
                                            borderRadius: "4px",
                                            color: value == 0 ? "white" : "#F7F7F7",
                                            background: value == 0 ? "#FA6056" : "#F7F7F7",
                                            width: "16px",
                                            height: "19px"
                                        }}>{questions.length}</Box>
                                    </Box>
                                    <Box
                                        onClick={() => handleChange(1)}
                                        sx={{
                                            borderBottom: value == 1 ? "2px solid #2ECC71" : "",
                                            fontWeight: value == 1 ? "bold" : "",
                                            borderRadius: "0px",
                                            color: value == 1 ? "#2ECC71" : "#1C1C1C",
                                            width: "87px",
                                            height: "47px",
                                            fontSize: "16px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            cursor: "pointer"
                                        }}>
                                        Popular
                                    </Box>
                                    <Box
                                        onClick={() => handleChange(2)}
                                        sx={{
                                            borderBottom: value == 2 ? "2px solid #2ECC71" : "",
                                            fontWeight: value == 2 ? "bold" : "",
                                            borderRadius: "0px",
                                            color: value == 2 ? "#2ECC71" : "#1C1C1C",
                                            width: "87px",
                                            height: "47px",
                                            fontSize: "16px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            cursor: "pointer",
                                        }}>
                                        My
                                        <Box sx={{
                                            display: "flex",
                                            fontSize: "12px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginLeft: "10px",
                                            borderRadius: "4px",
                                            color: value == 2 ? "#2ECC71" : "#F7F7F7",
                                            background: value != 2 ? "#F7F7F7" : "rgba(46, 204, 113, 0.2)",
                                            width: "16px",
                                            height: "19px"
                                        }}>{myQuestions.length}</Box>
                                    </Box>
                                </Box>
                            </Box>
                            {value == 0 ? (
                                <Box>
                                    {questions.length !== 0 ? (
                                        questions.sort((a, b) => (a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1)).map((item, index) => (
                                            <Box
                                                key={index}
                                            >
                                                <ALQuestionCard
                                                    name={item.name}
                                                    timestamp={item.timestamp}
                                                    likeNumber={item.likeNumber}
                                                    questionText={item.questionText}
                                                    questionId={item.questionId}
                                                    handleRefresh={props.handleRefresh}
                                                    handleSelectQuestion={handleSelectQuestion}
                                                />
                                                <Divider />
                                            </Box>
                                        ))
                                    ) : (
                                        <Box sx={{ textAlign: "center" }}>
                                            <Typography sx={{ marginTop: "50%" }}>
                                                There is no question to show!
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            ) : value == 1 ? (
                                <>
                                    {questions !== undefined && (
                                        questions
                                            .sort((a, b) => b.likeNumber.length - a.likeNumber.length)
                                            .map((item, index) => (
                                                <Box
                                                    key={index}
                                                    sx={{ cursor: "pointer" }}
                                                >
                                                    <ALQuestionCard
                                                        name={item.name}
                                                        timestamp={item.timestamp}
                                                        likeNumber={item.likeNumber}
                                                        questionText={item.questionText}
                                                        questionId={item.questionId}
                                                        handleRefresh={props.handleRefresh}
                                                        handleSelectQuestion={handleSelectQuestion}
                                                    />
                                                    <Divider />
                                                </Box>
                                            ))
                                    )}
                                </>
                            ) : (
                                <>
                                    {myQuestions !== undefined && (
                                        myQuestions.length !== 0 ? (
                                            myQuestions.map((item, index) => (
                                                <Box
                                                    key={index}
                                                    // onClick={() => handleSelectQuestion(item.questionId)}
                                                    sx={{ cursor: "pointer" }}
                                                >
                                                    <ALQuestionCard
                                                        name={item.name}
                                                        timestamp={item.timestamp}
                                                        likeNumber={item.likeNumber}
                                                        questionText={item.questionText}
                                                        questionId={item.questionId}
                                                        handleRefresh={props.handleRefresh}
                                                        handleSelectQuestion={handleSelectQuestion}
                                                    />
                                                    <Divider />
                                                </Box>
                                            ))
                                        ) : (
                                            <Box sx={{ textAlign: "center" }}>
                                                <Typography sx={{ fontFamily: "Inter", fontSize: "20px", marginTop: "50%", fontWeight: "bold" }}>
                                                    You have no question yet
                                                </Typography>
                                                <Box sx={{ fontFamily: "Inter", color: "#1C1C1C", margintTop: "14px" }}>
                                                    Start making question and <br />
                                                    all will be display here
                                                </Box>
                                            </Box>
                                        )
                                    )}
                                </>
                            )}
                        </Box>
                        <Box sx={{
                            display: "flex", justifyContent: "flex-end", position: "fixed",
                            bottom: 10, width: "100%"
                        }}>
                            <IconButton
                                onClick={handleOpenQueCard}
                                sx={{
                                    width: "60px",
                                    height: "60px",
                                    background: "#2AC75F",
                                    marginRight: "10px",
                                }}
                            >
                                <AddIcon sx={{ color: "black", width: "24px", height: "24px" }} />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
}
