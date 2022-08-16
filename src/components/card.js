import { Button, List, ListItem } from "@mui/material";
import { useState } from "react";

const Card = ({
  current,
  setCurrent,
  variants,
  setVariants,
  question,
  len,
}) => {
  const [currentAnswer, setCurrentAnswer] = useState({});

  const checkAnswer = (el) => {
    if (el?.id % 9 === 0) {
      return true;
    }
    return false;
  };

  return (
    <div className="card">
      <div className="card__header">
        <h5
          style={{
            fontSize: "1.25rem",
            marginBottom: "0.5rem",
            fontWeight: 500,
            lineHeight: 1.2,
          }}
        >
          {question}
        </h5>
      </div>
      <List className="card__body">
        {variants &&
          variants[current].map((el, index) => {
            let className = "";

            if (el.isTrue) {
              className = "correct__answer";
            } else if (el.isSelected) {
              className = "active__answer";
              if (el.isSubmit) className = "incorrect__answer";
            }

            return (
              <ListItem
                button
                key={index}
                className={className}
                onClick={() => {
                  if (!variants[current].some((e) => e.isSubmit)) {
                    variants[current].map((e, i) =>
                      e.answer === el.answer
                        ? (e.isSelected = true)
                        : (e.isSelected = false)
                    );
                    setVariants(variants);
                    setCurrentAnswer({ ...el, isSelected: true });
                  }
                }}
              >
                {el.answer}
              </ListItem>
            );
          })}
      </List>

      <div className="card__header card__footer">
        <Button
          variant="contained"
          disabled={current === 0}
          onClick={() => {
            setCurrent((prev) => prev - 1);
          }}
        >
          Previus
        </Button>
        <Button
          variant="contained"
          disabled={
            !variants[current].some((e) => e.isSelected) ||
            variants[current].some((e) => e.isSubmit)
          }
          onClick={() => {
            variants[current].map((e, i) => (e.isSubmit = true));
            variants[current].map((e, i) =>
              e.answer === currentAnswer.answer
                ? (e.isTrue = checkAnswer(e))
                : (e.isTrue = checkAnswer(e))
            );
            setVariants(variants);
            setCurrentAnswer({
              ...currentAnswer,
              isSubmit: true,
            });
          }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          disabled={current === len - 1}
          onClick={() => {
            setCurrent((prev) => prev + 1);
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Card;
