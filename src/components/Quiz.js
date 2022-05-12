import { useEffect, useState } from "react";

const Quiz = () => {
    const [quizData, setQUizData] = useState([]);
    const [points, setPoints] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
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
                        options,
                        clickedOption: '',
                        result: false
                    }
                });
                setQUizData(tempQuizData);
          })
    }, [])

    const handleClick = (event, item) => {
        // console.log(event.target.value, '---', item.correct_answer);

        setQUizData(quizData.map((element) => {
            if(event.target.value === item.correct_answer) return ({...element, clickedOption: event.target.value, result: true});
            else return ({...element});
        }));

        console.log(quizData);
    }

    return (
        <div>
            {quizData.map(item => {
                return (
                    <div key={quizData.indexOf(item)}>
                        <p>{item.question}</p>
                        {item.options.map(option => {
                            return (
                                submitted ?
                                (<span key={item.options.indexOf(option)} value = {option}>{option}</span>) :
                                (<button key={item.options.indexOf(option)} value = {option} onClick={(event) => {handleClick(event, item)}}>{option}</button>)
                            )
                        })}
                    </div>
                )
            })}

            <button onClick={() => {setSubmitted(true)}}>Submit</button>

            <p>{JSON.stringify(quizData)}</p>
        </div>
    );
}

export default Quiz;