import { Box, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/card";
import MyDialog from "../components/modal";
import Navbar from "../components/navbar";
import jsonTest from "../utils/test.exapmle";


const shuffle = (quiz) => {
  return quiz?.map((e, current) => {
    let { correct_answer, incorrect_answers } = quiz[current];
    let newArray = [...incorrect_answers, correct_answer];
    newArray = newArray.map((el, i) => {
      return {
        quizIndex: current,
        index: i,
        id: Math.floor(Math.random() * 30) * 90 + 6 + i,
        answer: el,
        isSubmit: false,
        isSelected: false,
        isTrue: false,
      };
    });
    return newArray.sort(() => Math.random() - 0.5);
  });
};

const Quiz = () => {
  
  const location = useLocation();
  const { categoryId, num, diff } = location.state
    ? location.state.data
    : { categoryId: 11, num: 15, diff: "medium" };
  const [quiz, setQuiz] = useState();

  const [variants, setVariants] = useState(shuffle(jsonTest));

  const [connection, setConntection] = useState("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const link = `https://opentdb.com/api.php?amount=${num}&category=${categoryId}&difficulty=${diff}&type=multiple`;
        const { data } = await axios(link);
        setQuiz(data.results);
        setVariants(shuffle(data.results));
      } catch (error) {
        setConntection("No Internet Connection!");
        alert("THIS IS OFFLINE MODE");
        setQuiz(jsonTest);
        setVariants(shuffle(jsonTest));
      }
    };
    fetchData();
  }, [categoryId, num, diff]);

  const [current, setCurrent] = useState(0);

  const [open, setOpen] = useState(false);
  const [countCorrectAnswers, setCountCorrectAnswers] = useState(0);

  const onEnd = () => {
    let count = 0;
    for (let i = 0; i < variants.length; i++) {
      let selectedIndex = variants[i].findIndex((e) => e.isSelected);
      let correctIndex = variants[i].findIndex(
        (e) => e.answer === quiz[i].correct_answer
      );
      variants[i][correctIndex] = {
        ...variants[i][correctIndex],
        isTrue: true,
        isSubmit: true,
      };
      variants[i][selectedIndex] = {
        ...variants[i][selectedIndex],
        isSubmit: true,
      };
      if (selectedIndex === correctIndex) {
        count++;
      }
    }
    return count;
  };

  useEffect(() => {
    if (open) setCountCorrectAnswers(onEnd());
  }, [open]);

  return quiz ? (
    <div className="quiz">
      <MyDialog
        open={open}
        toggle={setOpen}
        countQuizzes={quiz.length}
        countCorrectAnswers={countCorrectAnswers}
      />
      <Navbar len={quiz.length} current={current} setOpen={setOpen} />
      <div className="quiz__nav">
        {variants
          ? variants.map((e, i) => {
              let className = "";

              if (e.some((e) => e.isSelected)) {
                className = "active__answer";
                if (e.some((e) => e.isSubmit))
                  if (e.find((e) => e.isTrue && e.isSelected === true)) {
                    className = "correct__answer";
                  } else {
                    className = "incorrect__answer";
                  }
              } else if (e.some((e) => e.isSubmit)) {
                className = "incorrect__answer";
              }
              return (
                <Button
                  sx={{
                    color: "#000",
                    border: "1px solid rgba(0, 0, 0, 0.23)",
                    padding: "5px 15px",
                    borderRadius: 0,
                  }}
                  className={className}
                  variant={current === i ? "contained" : "outlined"}
                  key={i}
                  onClick={() => {
                    setCurrent(i);
                  }}
                >
                  {i + 1}
                </Button>
              );
            })
          : "Loading"}
      </div>
      <Card
        len={quiz.length}
        question={quiz[current].question}
        current={current}
        setCurrent={setCurrent}
        variants={variants}
        setVariants={setVariants}
      />
    </div>
  ) : (
    <Box
      className="error"
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#efefef",
      }}
    >
      {connection}
    </Box>
  );
};

export default Quiz;
