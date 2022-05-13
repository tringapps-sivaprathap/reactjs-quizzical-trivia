const Start = ({ setStartFlag }) => {
    return (
        <div className="start-page">
            <p>Play This Wonderful Quiz!</p>
            <button onClick={() => setStartFlag(true)}>Start Quiz</button>
        </div>
    );
}

export default Start;