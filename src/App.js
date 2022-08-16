import "./styles.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Quiz from "./pages/quiz";
import Root from "./pages/root";
import Tests from "./pages/tests";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Root />}></Route>
        <Route path="/quiz" element={<Quiz />}></Route>
        <Route path="/tests" element={<Tests />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
