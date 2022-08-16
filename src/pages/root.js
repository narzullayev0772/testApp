import { Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ComboBox from "../components/combobox";
import Navbar from "../components/navbar";

const Root = () => {
  const [category, setCategory] = useState([]);

  const numbersOfQuestion = [
    { label: "10", value: 10 },
    { label: "15", value: 15 },
    { label: "20", value: 20 },
    { label: "25", value: 25 },
    { label: "30", value: 30 },
  ];

  const difficulties = [
    { label: "easy", value: "easy" },
    { label: "medium", value: "medium" },
    { label: "hard", value: "hard" },
  ];

  useEffect(() => {
    const linkCategory = "https://opentdb.com/api_category.php";
    fetch(linkCategory)
      .then((res) => res.json())
      .then((data) => {
        setCategory(
          data.trivia_categories.map((item) => ({
            label: item.name,
            value: item.id,
          }))
        );
      })
      .catch((err) => console.log("err connection"));
  }, [setCategory]);

  const [num, getNum] = useState(10);
  const [diff, getDiff] = useState("easy");
  const [categoryId, getCategoryId] = useState(11);

  return (
    <>
      <Navbar />
      <div className="root">
        <ComboBox
          label={"Number Of Questions:"}
          options={numbersOfQuestion}
          getValue={getNum}
        />
        <ComboBox
          label={"Select Category:"}
          options={category ? category : [{ label: "Loading", value: 0 }]}
          getValue={getCategoryId}
        />
        <ComboBox
          label={"Select Difficulty:"}
          options={difficulties}
          getValue={getDiff}
        />
        <Link
          to="/quiz"
          state={{
            data: {
              categoryId,
              num,
              diff,
            },
          }}
        >
          <Button
            fullWidth
            variant="contained"
            color="success"
            style={{
              padding: "10px",
            }}
          >
            Start
          </Button>
        </Link>
        <Button
          fullWidth
          variant="contained"
          color="info"
          style={{
            padding: "10px",
          }}
          href="/tests"
        >
          Test
        </Button>
      </div>
    </>
  );
};

export default Root;
