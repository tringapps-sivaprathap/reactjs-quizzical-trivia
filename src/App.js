import { useState, useEffect } from "react";
import Quiz from "./components/Quiz";
import StartQuiz from "./components/StartQuiz";

const App = () => {
    const [StartQuizFlag, setStartQuizFlag] = useState(false);
    const [quizData, setQUizData] = useState([]);

useEffect(() => { // move fetch to quiz page
    fetch(`https://opentdb.com/api.php?amount=5&type=multiple`)
      .then((response) => response.json())
      .then((data) => {
            let tempQuizData = data.results.map((element) => {
            let options = [...element.incorrect_answers, element.correct_answer];
            for (let i = options.length -1; i > 0; i--) {
            let j = Math.floor(Math.random() * i)
            let k = options[i]
            options[i] = options[j]
            options[j] = k
            }
            return {
            question: element.question,
            correct_answer: element.correct_answer,
            options
            }
            });
            setQUizData(tempQuizData);
      })
}, [])

    return (
        <div className="App">
            {!StartQuizFlag && <StartQuiz setStartQuizFlag={setStartQuizFlag} />}
            {StartQuizFlag && <Quiz />}
            {/* {quizData.map((item) => (
                {renderHTML("<p>item.question</p>")}
            ))} */}
        </div>
    );
}

export default App;