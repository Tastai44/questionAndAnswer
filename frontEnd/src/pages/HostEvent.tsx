import { Box, Divider, IconButton, Modal, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import { getEventById } from "../api/event";
import { IQuestion, Ievent } from "../interface/Ievent";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { getQuesByEId, readQuestion } from "../api/question";
import HostEventMenu from "../components/HostEventMenu";
import PopupAlert from "../components/PopupAlert";
import { themeApp } from "../utils/Theme";
import PreviewQuestion from "../components/PreviewQuestion/PreviewQuestion";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

interface IData {
    refresh: number;
    handleRefresh: () => void;
}

export default function HostEvent(props: IData) {
    const [value, setValue] = useState(0);
    const navigatorPath = useNavigate();
    const { eventId } = useParams();
    const [eventData, setEventData] = useState<Ievent>();
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [open, setOpen] = useState(false);
    const [openCard, setOpenCard] = useState(false);
    const [selectedQId, setSelectedQId] = useState("");
    const patch = window.location.pathname;

    useEffect(() => {
        const fetch = async () => {
            const data = await getEventById(eventId ?? "");
            if (data) {
                setEventData(data);
            } else {
                PopupAlert("Sorry, there are no that event page", "warning");
                navigatorPath("/");
            }
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.refresh]);

    useEffect(() => {
        const fetch = async () => {
            const data = (await getQuesByEId(eventId ?? "")) as IQuestion[];
            setQuestions(data);
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.refresh]);

    const handleChange = (newValue: number) => {
        setValue(newValue);
    };

    const handleCopyText = (text: string) => {
        navigator.clipboard.writeText(text);
        alert("Text copied to clipboard!");
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenCard = () => setOpenCard(true);
    const handleCloseCard = () => setOpenCard(false);
    const handleSelectQuestion = async (id: string) => {
        await readQuestion(id);
        setSelectedQId(id);
        handleOpenCard();
        props.handleRefresh();
    };

    return (
        <>
            {eventData !== undefined && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                    }}>
                    <Modal open={open}>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <HostEventMenu
                                handleClose={handleClose}
                                eventId={eventId ?? ""}
                                title={eventData.title}
                                hostName={eventData.ownerName}
                            />
                        </Box>
                    </Modal>
                    <Modal open={openCard}>
                        <Box
                            sx={{
                                position: "absolute",
                                top: "40%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                bgcolor: "background.paper",
                                borderRadius: "20px",
                                width: "90%",
                                [themeApp.breakpoints.up("md")]: {
                                    width: "398px",
                                },
                            }}>
                            <PreviewQuestion
                                questionId={selectedQId}
                                handleCloseCard={handleCloseCard}
                                handleRefresh={props.handleRefresh}
                                isHost={true}
                                ownerId={eventData.eventId}
                                ownerName={eventData.ownerName}
                            />
                        </Box>
                    </Modal>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            [themeApp.breakpoints.up("md")]: {
                                width: "430px",
                            },
                        }}>
                        <Box
                            sx={{
                                background: "black",
                                height: "112px",
                                width: "100%",
                                [themeApp.breakpoints.up("md")]: {
                                    width: "430px",
                                },
                            }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "space-between",
                                    alignContent: "center",
                                    alignItems: "center",
                                }}>
                                <Typography
                                    fontFamily={"Inter"}
                                    fontWeight={"bold"}
                                    color={"#2ECC71"}
                                    fontSize={"32px"}
                                    sx={{
                                        paddingLeft: "16px",
                                        paddingTop: "10px",
                                    }}>
                                    {eventData.title}
                                </Typography>
                                <IconButton
                                    size="large"
                                    onClick={handleOpen}
                                    sx={{
                                        width: "32px",
                                        height: "32px",
                                        marginRight: "10px",
                                        color: "white",
                                    }}>
                                    <MenuIcon />
                                </IconButton>
                            </Box>
                            <Box
                                fontFamily={"Inter"}
                                textAlign={"left"}
                                color={"white"}
                                fontSize={"17px"}
                                sx={{ paddingLeft: "16px" }}>
                                {eventData.ownerName}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                [themeApp.breakpoints.up("lg")]: {
                                    width: "430px",
                                },
                            }}>
                            <Box
                                sx={{
                                    fontSize: "16px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignContent: "center",
                                        alignItems: "center",
                                        marginLeft: "16px",
                                        marginRight: "16px",
                                    }}>
                                    <Box
                                        onClick={() => handleChange(0)}
                                        sx={{
                                            borderBottom:
                                                value == 0
                                                    ? "2px solid #2ECC71"
                                                    : "",
                                            fontWeight:
                                                value == 0 ? "bold" : "",
                                            borderRadius: "0px",
                                            color:
                                                value == 0
                                                    ? "#2ECC71"
                                                    : "#1C1C1C",
                                            width: "87px",
                                            height: "47px",
                                            fontSize: "16px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            cursor: "pointer",
                                        }}>
                                        <FiberManualRecordIcon
                                            sx={{
                                                color: "red",
                                                width: "8px",
                                                height: "8px",
                                                marginRight: "8px",
                                            }}
                                        />
                                        Live
                                        <Box
                                            sx={{
                                                display: "flex",
                                                fontSize: "12px",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginLeft: "10px",
                                                borderRadius: "4px",
                                                color:
                                                    value == 0
                                                        ? "#2ECC71"
                                                        : "#000000",
                                                background:
                                                    value != 0
                                                        ? "rgba(201, 204, 208, 0.2)"
                                                        : "rgba(46, 204, 113, 0.2)",
                                                width: "16px",
                                                height: "19px",
                                            }}>
                                            {questions.length}
                                        </Box>
                                    </Box>
                                    <Box
                                        onClick={() => handleChange(1)}
                                        sx={{
                                            borderBottom:
                                                value == 1
                                                    ? "2px solid #2ECC71"
                                                    : "",
                                            fontWeight:
                                                value == 1 ? "bold" : "",
                                            borderRadius: "0px",
                                            color:
                                                value == 1
                                                    ? "#2ECC71"
                                                    : "#1C1C1C",
                                            width: "87px",
                                            height: "47px",
                                            fontSize: "16px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            cursor: "pointer",
                                        }}>
                                        Popular
                                    </Box>
                                    <Box
                                        onClick={() => handleChange(2)}
                                        sx={{
                                            borderBottom:
                                                value == 2
                                                    ? "2px solid #2ECC71"
                                                    : "",
                                            fontWeight:
                                                value == 2 ? "bold" : "",
                                            borderRadius: "0px",
                                            color:
                                                value == 2
                                                    ? "#2ECC71"
                                                    : "#1C1C1C",
                                            width: "87px",
                                            height: "47px",
                                            fontSize: "16px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            cursor: "pointer",
                                        }}>
                                        Saved
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginLeft: "10px",
                                                borderRadius: "4px",
                                                color:
                                                    value == 2
                                                        ? "#2ECC71"
                                                        : "#000000",
                                                background:
                                                    value != 2
                                                        ? "rgba(201, 204, 208, 0.2)"
                                                        : "rgba(46, 204, 113, 0.2)",
                                                width: "19px",
                                                height: "21px",
                                            }}>
                                            {
                                                questions.filter(
                                                    (que) => que.isSave == true
                                                ).length
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            {value == 0 ? (
                                <Box>
                                    {questions.length !== 0 ? (
                                        questions
                                            .sort(
                                                (a, b) =>
                                                    Number(
                                                        new Date(b.timestamp)
                                                    ) -
                                                    Number(
                                                        new Date(a.timestamp)
                                                    )
                                            )
                                            .sort((a, b) =>
                                                a.isRead === b.isRead
                                                    ? 0
                                                    : a.isRead
                                                    ? 1
                                                    : -1
                                            )
                                            .filter(
                                                (que) => que.isSave == false
                                            )
                                            .map((item, index) => (
                                                <Box
                                                    key={index}
                                                    sx={{ cursor: "pointer" }}>
                                                    <QuestionCard
                                                        name={item.name}
                                                        timestamp={
                                                            item.timestamp
                                                        }
                                                        likeNumber={
                                                            item.likeNumber
                                                        }
                                                        questionText={
                                                            item.questionText
                                                        }
                                                        isRead={item.isRead}
                                                        isSave={item.isSave}
                                                        isEdit={item.isEdit}
                                                        questionId={
                                                            item.questionId
                                                        }
                                                        handleRefresh={
                                                            props.handleRefresh
                                                        }
                                                        handleSelectQuestion={
                                                            handleSelectQuestion
                                                        }
                                                    />
                                                    <Divider />
                                                </Box>
                                            ))
                                    ) : (
                                        <Box
                                            sx={{
                                                textAlign: "center",
                                            }}>
                                            <Box sx={{ marginBottom: "10px" }}>
                                                <Typography
                                                    sx={{
                                                        marginTop: "50%",
                                                        fontSize: "20px",
                                                        fontWeight: "bold",
                                                    }}>
                                                    Your event now live!
                                                </Typography>
                                            </Box>
                                            <Box sx={{ marginBottom: "10px" }}>
                                                <Typography>
                                                    Participant can send
                                                    question at
                                                </Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignContent: "center",
                                                    alignItems: "center",
                                                }}>
                                                Code: {eventId}
                                                <IconButton
                                                    onClick={() =>
                                                        handleCopyText(
                                                            eventId ?? ""
                                                        )
                                                    }>
                                                    <ContentCopyOutlinedIcon />
                                                </IconButton>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignContent: "center",
                                                    alignItems: "center",
                                                }}>
                                                Link: {patch}
                                                <IconButton
                                                    onClick={() =>
                                                        handleCopyText(
                                                            "http://localhost:5173" +
                                                                patch
                                                        )
                                                    }>
                                                    <ContentCopyOutlinedIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    )}
                                </Box>
                            ) : value == 1 ? (
                                <>
                                    {questions.length !== 0 ? (
                                        questions
                                            .sort((a, b) =>
                                                a.isRead === b.isRead
                                                    ? 0
                                                    : a.isRead
                                                    ? 1
                                                    : -1
                                            )
                                            .sort((a, b) => {
                                                return (
                                                    b.likeNumber.length -
                                                    a.likeNumber.length
                                                );
                                            })
                                            .filter(
                                                (que) => que.isSave == false
                                            )
                                            .map((item, index) => (
                                                <Box
                                                    key={index}
                                                    sx={{ cursor: "pointer" }}>
                                                    <QuestionCard
                                                        name={item.name}
                                                        timestamp={
                                                            item.timestamp
                                                        }
                                                        likeNumber={
                                                            item.likeNumber
                                                        }
                                                        questionText={
                                                            item.questionText
                                                        }
                                                        isRead={item.isRead}
                                                        isSave={item.isSave}
                                                        isEdit={item.isEdit}
                                                        questionId={
                                                            item.questionId
                                                        }
                                                        handleRefresh={
                                                            props.handleRefresh
                                                        }
                                                        handleSelectQuestion={
                                                            handleSelectQuestion
                                                        }
                                                    />
                                                    <Divider />
                                                </Box>
                                            ))
                                    ) : (
                                        <Box sx={{ textAlign: "center" }}>
                                            <Typography
                                                fontWeight={"bold"}
                                                fontSize={20}
                                                sx={{
                                                    marginTop: "50%",
                                                    marginBottom: "10px",
                                                }}>
                                                No question yet
                                            </Typography>
                                            <Typography>
                                                Start making question and all{" "}
                                                <br />
                                                will be display here
                                            </Typography>
                                        </Box>
                                    )}
                                </>
                            ) : (
                                <>
                                    {questions !== undefined &&
                                        (questions.filter(
                                            (que) => que.isSave == true
                                        ).length !== 0 ? (
                                            questions
                                                .filter(
                                                    (que) => que.isSave == true
                                                )
                                                .map((item, index) => (
                                                    <Box
                                                        key={index}
                                                        sx={{
                                                            cursor: "pointer",
                                                        }}>
                                                        <QuestionCard
                                                            name={item.name}
                                                            timestamp={
                                                                item.timestamp
                                                            }
                                                            likeNumber={
                                                                item.likeNumber
                                                            }
                                                            questionText={
                                                                item.questionText
                                                            }
                                                            isRead={item.isRead}
                                                            isSave={item.isSave}
                                                            isEdit={item.isEdit}
                                                            questionId={
                                                                item.questionId
                                                            }
                                                            handleRefresh={
                                                                props.handleRefresh
                                                            }
                                                            handleSelectQuestion={
                                                                handleSelectQuestion
                                                            }
                                                        />
                                                        <Divider />
                                                    </Box>
                                                ))
                                        ) : (
                                            <Box sx={{ textAlign: "center" }}>
                                                <Typography
                                                    fontWeight={"bold"}
                                                    fontSize={20}
                                                    sx={{
                                                        marginTop: "50%",
                                                        marginBottom: "10px",
                                                    }}>
                                                    No question yet
                                                </Typography>
                                                <Typography>
                                                    Start making question and
                                                    all <br />
                                                    will be display here
                                                </Typography>
                                            </Box>
                                        ))}
                                </>
                            )}
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
}
