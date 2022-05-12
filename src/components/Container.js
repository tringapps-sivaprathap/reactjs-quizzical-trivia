import { useEffect, useState } from "react";
import Questions from "./Questions";

const Container = () => {
    const [quizData, setQUizData] = useState([]);
    const [score, setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [playAgain, setPlayAgain] = useState(false);

    const [loaded, setLoaded] = useState(false);
    const [fetched, setFetched] = useState(false);
    const { REACT_APP_DOMAIN_NAME } = process.env;

    useEffect(() => {
        fetch(`${REACT_APP_DOMAIN_NAME}?amount=5&type=multiple`)
          .then((response) => response.json())
          .then((data) => {
                setQUizData(data.results.map((element) => {
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
                        options,
                        clickedOption: '',
                        result: false
                    }
                }));
                setLoaded(true);
                setFetched(true);
          })
          .catch(() => setLoaded(true))
    }, [REACT_APP_DOMAIN_NAME, playAgain])

    const showQuestions = () => {
        if(fetched) {
            if(quizData.length !== 0) {
                return (
                    <Questions
                        quizData={quizData} setQUizData={setQUizData}
                        score={score} setScore={setScore}
                        submitted={submitted} setSubmitted={setSubmitted}
                        setPlayAgain={setPlayAgain}
                    />
                );
            }
            else
                return <p className="empty-error">No Users Available</p>
        }
        else {
            return <p className="fetch-error">Failed to fetch</p>
        }
    }

    return (
        <div className="quiz-container">
            {loaded ? showQuestions() : <p>Loading...</p>}
        </div>
    );
}

export default Container;