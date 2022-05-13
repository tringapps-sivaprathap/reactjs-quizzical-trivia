import {decode} from 'html-entities';

const Questions = ({ quizData, setQUizData, score, setScore, submitted, setSubmitted, playAgain, setPlayAgain, setLoaded, setFetched }) => {

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
            <div>
                {quizData.map(item => {
                    return (
                        <div key={quizData.indexOf(item)} className='question-container'>
                            <div className='question'>
                                <p>{decode(item.question)}</p>
                            </div>

                            <div className='options'>
                                {item.options.map(option => {
                                    return (
                                        submitted ? (
                                            <span key={item.options.indexOf(option)}
                                                value = {option}
                                                className={option === item.correct_answer ? 'correct-option' : option === item.clickedOption ? 'wrong-option': 'other-option'}
                                            >
                                                {decode(option)}
                                            </span>
                                        )
                                        : (
                                            <button key={item.options.indexOf(option)} 
                                                value = {option}
                                                onClick={(event) => {handleClick(event, item.question)}}                                             
                                                style={{backgroundColor: option === item.clickedOption && 'yellow'}}
                                            >
                                                {decode(option)}
                                            </button>
                                        )
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className={submitted ? 'playagain-button' : 'submit-button'}>
                {!submitted && <button onClick={() => {setSubmitted(true)}}>Check answer</button>}
                {submitted && <p>You scored {score}/5 correct answers.</p>}
                {submitted && <button onClick={() => {setPlayAgain(!playAgain); setSubmitted(false); setScore(0); setLoaded(false); setFetched(false)}}>Play again</button>}
            </div>
        </>
    );
}

export default Questions;