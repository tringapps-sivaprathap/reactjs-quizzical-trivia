const StartQuiz = ({ setStartQuizFlag }) => {
  return (
    <div>
        <button onClick={() => setStartQuizFlag(true)}>Start Quiz</button>
    </div>
  )
}

export default StartQuiz;