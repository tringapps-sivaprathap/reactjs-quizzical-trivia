const Questions = ({ quizData, setQUizData, score, setScore, submitted, setSubmitted, setPlayAgain }) => {

    const handleClick = (event, clickedQuestion) => {
    let clickedOption = event.target.value;

    setQUizData(quizData.map((element) => {
        if(clickedQuestion === element.question) {
            if(clickedOption === element.correct_answer) {
                setScore((prevScore) => prevScore + 1);
                return {...element, clickedOption, result: true};
            }
            else
                return {...element, clickedOption, result: false};
        }
        else {
            return {...element};
        }
        }));
    }

    return (
        <>
            <div className="quiz-questions">
                {quizData.map(item => {
                    return (
                        <div key={quizData.indexOf(item)}>
                            <p>{item.question}</p>

                            {item.options.map(option => {
                                return (
                                    submitted ? (
                                        <span key={item.options.indexOf(option)}
                                            value = {option}
                                            style={{color: option === item.correct_answer ? 'green' : option === item.clickedOption && 'orange'}}
                                        >
                                            {option}
                                        </span>
                                    )
                                    : (
                                        <button key={item.options.indexOf(option)} 
                                            value = {option}
                                            onClick={(event) => {handleClick(event, item.question)}}
                                        >
                                            {option}
                                        </button>
                                    )
                                );
                            })}
                        </div>
                    );
                })}
            </div>

            {!submitted && <button onClick={() => {setSubmitted(true)}}>Check answer</button>}

            {submitted && <p>You scored {score}/5 correct answers.</p>}
            {submitted && <button onClick={() => {setPlayAgain(true); setSubmitted(false); setScore(0);}}>Play again</button>}
        </>
    );
}

export default Questions;