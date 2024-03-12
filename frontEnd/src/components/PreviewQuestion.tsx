import { Box, Button, Divider, IconButton, Typography } from '@mui/material'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { IQuestion } from '../interface/Ievent';
import { useEffect, useState } from 'react';
import { deleteQuestionById, getQuesById, saveQuestion, unSaveQuestion } from '../api/question';
import { themeApp } from '../utils/Theme';

interface IData {
    questionId: string;
    handleCloseCard: () => void;
    handleRefresh: () => void;
}

export default function PreviewQuestion(props: IData) {
    const [questions, setQuestions] = useState<IQuestion>();

    useEffect(() => {
        const fetch = async () => {
            const data = await getQuesById(props.questionId ?? "");
            if (data) {
                setQuestions(data);
            }
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.questionId]);

    const handleSaveQuestion = async (id: string) => {
        await saveQuestion(id);
        props.handleRefresh();
        props.handleCloseCard();
    }
    const handleUnSaveQuestion = async (id: string) => {
        await unSaveQuestion(id);
        props.handleRefresh();
        props.handleCloseCard();
    }
    const handleDeleteQuestion = async (id: string) => {
        await deleteQuestionById(id);
        props.handleRefresh();
        props.handleCloseCard();
    }
    
  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        {questions !== undefined && (
            <Box sx={{ display: "flex", flexDirection: "column", textAlign: "center", width: "100%" }}>
                <Box sx={{
                    display: "flex",
                    paddingLeft: "20px", paddingTop: "10px",
                    marginBottom: "5px", fontSize: "13px", justifyContent: "space-between",
                    alignItems: "center", alignContent: "center"
                }}>
                    <Box sx={{ width: "50%", display: "flex" }}>
                        <Box sx={{ color: "black", marginRight: "5px", fontFamily:"Inter" }}>{questions.name}</Box>
                        <Box sx={{ marginTop: "-3px" }}>.</Box>
                        <Box sx={{ color: "#6C6C6C", marginLeft: "5px", fontFamily: "Inter" }}>{questions.timestamp}</Box>
                    </Box>
                      <Box sx={{ marginRight: "16px", display:"flex", alignContent:"center", alignItems:"center"}}>
                          <IconButton
                              sx={{ fontSize: "13px" }}
                          >
                              <ThumbUpOutlinedIcon sx={{ width: "20px", height: "20px" }} />
                          </IconButton>
                          {questions.likeNumber.length}
                    </Box>
                </Box>
                  <Typography fontSize={"16px"} textAlign={"left"} fontWeight={"mediums"} sx={{ marginLeft: "20px"}} fontFamily={"Inter"}>{questions.questionText}</Typography>
                  <Divider sx={{marginTop:"300px" }} />
                  <Box sx={{display:"flex", justifyContent:"space-between", marginBottom:"14px", marginLeft:"10px", marginRight:"10px"}}>
                      <Button
                          sx={{
                              height: "49px",
                              color: "black",
                              borderRadius: "14px",
                              marginTop: "24px",
                              border: "1px solid black",
                              "&:hover": {
                                  background: "white",
                                  color: "black",
                                  border: "1px solid black"
                              },
                              [themeApp.breakpoints.up('lg')]: {
                                  width: "94px"
                              },
                              fontFamily: "Inter"
                          }}
                          onClick={() => handleDeleteQuestion(props.questionId)}
                      >
                          Remove
                      </Button>
                      <Box sx={{display:"flex"}}>
                        {questions.isSave ? (
                            <Button
                                sx={{
                                    height: "49px",
                                    color: "black",
                                    borderRadius: "14px",
                                    marginTop: "24px",
                                    marginRight: "10px",
                                    border: "1px solid black",
                                    "&:hover": {
                                        background: "white",
                                        color: "black",
                                        border: "1px solid black"
                                    },
                                    [themeApp.breakpoints.up('lg')]: {
                                        width: "69px"
                                    },
                                    fontFamily: "Inter"
                                }}
                                onClick={() => handleUnSaveQuestion(props.questionId)}
                            >
                                Unsave
                            </Button>
                        ): (
                            <Button
                              sx = {{
                                      height: "49px",
                                      color: "black",
                                      borderRadius: "14px",
                                      marginTop: "24px",
                                      marginRight: "10px",
                                      border: "1px solid black",
                                      "&:hover": {
                                          background: "white",
                                          color: "black",
                                          border: "1px solid black"
                                      },
                                      [themeApp.breakpoints.up('lg')]: {
                                          width: "69px"
                                      },
                                      fontFamily: "Inter"
                                  }}
                            onClick={() => handleSaveQuestion(props.questionId)}
                            >
                                Save
                            </Button>
                        )}
                          
                          <Button
                              sx={{
                                  height: "49px",
                                  color: "white",
                                  borderRadius: "14px",
                                  marginTop: "24px",
                                  border: "1px solid black",
                                  background: "black",
                                  "&:hover": {
                                      background: "black",
                                      color: "black",
                                  },
                                  [themeApp.breakpoints.up('lg')]: {
                                      width: "69px"
                                  },
                                  fontFamily: "Inter"
                              }}
                              onClick={props.handleCloseCard}
                          >
                              Close
                          </Button>
                      </Box>
                  </Box>
            </Box>  
        )}
    </Box>
  )
}
