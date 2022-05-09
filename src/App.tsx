import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import { Stack } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Start from "./components/Start";

function App() {
    const [count, setCount] = useState(0);

    return (
        <Stack className="App">
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Stack>
    );
}

export default App;
