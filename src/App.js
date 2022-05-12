import { useState } from "react";
import Start from "./components/Start";
import Container from "./components/Container";

const App = () => {
    const [startFlag, setStartFlag] = useState(false);

    return (
        <>
            {!startFlag && <Start setStartFlag={setStartFlag} />}
            {startFlag && <Container />}
        </>
    );
}

export default App;