const Start = ({ setStartFlag }) => {
    return (
        <>
            <button onClick={() => setStartFlag(true)}>Start Quiz</button>
        </>
    );
}

export default Start;