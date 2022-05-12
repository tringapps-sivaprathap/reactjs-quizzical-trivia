import { useState } from "react";
import Quiz from "./components/Quiz";
import StartQuiz from "./components/StartQuiz";

const App = () => {
    const [StartQuizFlag, setStartQuizFlag] = useState(false);

    return (
        <div className="App">
            {!StartQuizFlag && <StartQuiz setStartQuizFlag={setStartQuizFlag} />}
            {StartQuizFlag && <Quiz />}
        </div>
    );
}

export default App;