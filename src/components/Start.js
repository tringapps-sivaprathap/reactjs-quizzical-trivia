const Start = ({ setStartFlag }) => {
    return (
        <div className="start-page">
            <button onClick={() => setStartFlag(true)}>Start Quiz</button>
        </div>
    );
}

export default Start;