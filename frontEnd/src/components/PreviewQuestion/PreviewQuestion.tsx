import {
    Box,
    Button,
    Divider,
    FormControl,
    IconButton,
    InputAdornment,
    ListItemIcon,
    Menu,
    MenuItem,
    OutlinedInput,
    Typography,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { IQuestion } from "../../interface/Ievent";
import { useEffect, useState } from "react";
import {
    addComment,
    deleteQuestionById,
    getQuesById,
    saveQuestion,
    unSaveQuestion,
} from "../../api/question";
import DeleteCard from "../DeleteCard";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import Comment from "../Comment";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AddQuestion from "../AddQuestion";
import AlerQuestion from "../AlerQuestion";

interface IData {
    questionId: string;
    isHost: boolean;
    ownerId: string;
    ownerName: string;
    handleCloseCard: () => void;
    handleRefresh: () => void;
}

export default function PreviewQuestion(props: IData) {
    const [questions, setQuestions] = useState<IQuestion>();
    const [comment, setComment] = useState("");
    const [open, setOpen] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [openQueCard, setOpenQueCard] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const now = new Date().toISOString();

    useEffect(() => {
        const fetch = async () => {
            const data = await getQuesById(props.questionId ?? "");
            if (data) {
                setQuestions(data);
            }
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.questionId, refresh]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSaveQuestion = async (id: string) => {
        await saveQuestion(id);
        props.handleRefresh();
        handleClose();
    };
    const handleUnSaveQuestion = async (id: string) => {
        await unSaveQuestion(id);
        props.handleRefresh();
        handleClose();
    };
    const handleDeleteQuestion = async (id: string) => {
        await deleteQuestionById(id);
        props.handleRefresh();
        props.handleCloseCard();
    };
    const handleCloseCard = () => {
        setOpen(!open);
    };

    const handleSetComment = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const handleAddComment = async () => {
        const data = {
            ownerId: props.ownerId,
            name: props.ownerName,
            context: comment,
            timestamp: now,
        };
        try {
            await addComment(data, props.questionId);
            setComment("");
            setRefresh((pre) => pre + 1);
        } catch (error) {
            console.error(error);
        }
    };
    const handleOpenQueCard = () => setOpenQueCard(true);
    const handleCloseQueCard = () => setOpenQueCard(false);

    const handleOpenAlert = () => setOpenAlert(true);
    const handleCloseAlert = () => setOpenAlert(false);

    return (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <AddQuestion
                handleClose={handleCloseQueCard}
                handleRefresh={props.handleRefresh}
                handleCloseAlert={handleCloseAlert}
                handleOpenAlert={handleOpenAlert}
                isEdit={true}
                ownerName={props.ownerName}
                openQueCard={openQueCard}
                context={questions !== undefined ? questions.questionText : ""}
            />
            <AlerQuestion
                open={openAlert}
                context={"Your question has been edited!"}
            />
            <DeleteCard
                handleClose={handleCloseCard}
                id={props.questionId}
                handleDeleteQuestion={handleDeleteQuestion}
                open={open}
            />
            {questions !== undefined && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                        width: "100%",
                    }}>
                    <Box
                        sx={{
                            display: "flex",
                            paddingLeft: "10px",
                            paddingTop: "10px",
                            marginBottom: "5px",
                            fontSize: "13px",
                            justifyContent: "space-between",
                            alignItems: "center",
                            alignContent: "center",
                        }}>
                        <Box sx={{ width: "50%", display: "flex" }}>
                            <Box
                                sx={{
                                    color: "black",
                                    marginRight: "5px",
                                    fontFamily: "Inter",
                                    fontSize: "17px",
                                }}>
                                {questions.name}'s question
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                marginRight: "10px",
                                display: "flex",
                                alignContent: "center",
                                alignItems: "center",
                            }}>
                            <IconButton
                                aria-controls={
                                    openMenu ? "basic-menu" : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={openMenu ? "true" : undefined}
                                onClick={handleClick}>
                                <MoreHorizOutlinedIcon />
                            </IconButton>
                            {props.isHost ? (
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={openMenu}
                                    onClose={handleClose}>
                                    {questions.isSave ? (
                                        <MenuItem
                                            sx={{
                                                fontSize: "14px",
                                                display: "flex",
                                                alignContent: "center",
                                                alignItems: "center",
                                            }}
                                            onClick={() =>
                                                handleUnSaveQuestion(
                                                    props.questionId
                                                )
                                            }>
                                            <ListItemIcon>
                                                <RemoveCircleOutlineOutlinedIcon />
                                            </ListItemIcon>
                                            Discard
                                        </MenuItem>
                                    ) : (
                                        <MenuItem
                                            sx={{
                                                fontSize: "14px",
                                                display: "flex",
                                                alignContent: "center",
                                                alignItems: "center",
                                            }}
                                            onClick={() =>
                                                handleSaveQuestion(
                                                    props.questionId
                                                )
                                            }>
                                            <ListItemIcon>
                                                <AddCircleOutlineOutlinedIcon />
                                            </ListItemIcon>
                                            <Box>Keep</Box>
                                        </MenuItem>
                                    )}
                                    <MenuItem
                                        sx={{
                                            fontSize: "14px",
                                            alignContent: "center",
                                            alignItems: "center",
                                        }}
                                        onClick={() =>
                                            handleDeleteQuestion(
                                                props.questionId
                                            )
                                        }>
                                        <ListItemIcon>
                                            <DeleteOutlineOutlinedIcon />
                                        </ListItemIcon>
                                        Remove
                                    </MenuItem>
                                </Menu>
                            ) : (
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={openMenu}
                                    onClose={handleClose}>
                                    <MenuItem
                                        onClick={handleOpenQueCard}
                                        sx={{
                                            fontSize: "14px",
                                            display: "flex",
                                            alignContent: "center",
                                            alignItems: "center",
                                        }}>
                                        <ListItemIcon>
                                            <ModeEditOutlinedIcon />
                                        </ListItemIcon>
                                        Edit
                                    </MenuItem>
                                    <MenuItem
                                        sx={{
                                            fontSize: "14px",
                                            alignContent: "center",
                                            alignItems: "center",
                                        }}
                                        onClick={() =>
                                            handleDeleteQuestion(
                                                props.questionId
                                            )
                                        }>
                                        <ListItemIcon>
                                            <DeleteOutlineOutlinedIcon />
                                        </ListItemIcon>
                                        Remove
                                    </MenuItem>
                                </Menu>
                            )}
                            <IconButton
                                sx={{ fontSize: "13px" }}
                                onClick={props.handleCloseCard}>
                                <CancelIcon
                                    sx={{
                                        width: "20px",
                                        height: "20px",
                                        color: "black",
                                    }}
                                />
                            </IconButton>
                        </Box>
                    </Box>
                    <Divider sx={{ marginBottom: "10px" }} />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}>
                        <Box
                            sx={{
                                width: "90%",
                                display: "flex",
                                alignContent: "center",
                                alignItems: "center",
                                fontSize: "15px",
                            }}>
                            <Typography
                                color={"#1C1C1C"}
                                fontSize={"15px"}
                                textAlign={"left"}
                                fontWeight={"mediums"}
                                sx={{ marginLeft: "10px", marginRight: "3px" }}
                                fontFamily={"Inter"}>
                                {questions.name}
                            </Typography>
                            <Box sx={{ marginTop: "-4px" }}>.</Box>
                            <Box sx={{ color: "#6C6C6C", marginLeft: "5px" }}>
                                {questions.timestamp}
                            </Box>
                        </Box>
                        <Button
                            sx={{ color: "#6C6C6C" }}
                            startIcon={<ThumbUpOutlinedIcon />}>
                            {questions.likeNumber.length}
                        </Button>
                    </Box>
                    <Typography
                        color={"#1C1C1C"}
                        fontSize={"17px"}
                        textAlign={"left"}
                        fontWeight={"mediums"}
                        sx={{ marginLeft: "10px" }}
                        fontFamily={"Inter"}>
                        {questions.questionText}
                    </Typography>

                    <Box
                        sx={{
                            marginTop: "10px",
                            marginBottom: props.isHost ? "0px" : "200px",
                        }}>
                        {questions.comment.length != 0 &&
                            questions.comment.map((item, index) => (
                                <Box key={index}>
                                    <Comment
                                        ownerName={item.name}
                                        date={item.timestamp}
                                        context={item.context}
                                    />
                                </Box>
                            ))}
                    </Box>

                    {props.isHost && (
                        <>
                            <Divider sx={{ marginTop: "200px" }} />
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}>
                                <FormControl
                                    sx={{
                                        width: "95%",
                                        padding: 1,
                                    }}
                                    variant="outlined">
                                    <OutlinedInput
                                        multiline
                                        sx={{
                                            background: "white",
                                            borderRadius: "14px",
                                            border: "1px solid #C9CCD0",
                                            "&:hover": {
                                                border: "1px solid #2ECC71",
                                            },
                                            "&:action": {
                                                border: "1px solid #2ECC71",
                                            },
                                        }}
                                        id="Event name"
                                        value={comment}
                                        onChange={handleSetComment}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                {comment ? (
                                                    <IconButton
                                                        edge="end"
                                                        sx={{ border: "0px" }}
                                                        onClick={
                                                            handleAddComment
                                                        }>
                                                        <SendIcon />
                                                    </IconButton>
                                                ) : (
                                                    <></>
                                                )}
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Box>
                        </>
                    )}
                </Box>
            )}
        </Box>
    );
}
