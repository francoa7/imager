import "./App.css";
import { Stack } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";

function App() {
    return (
        <Stack className="App" fontFamily={"raleway"}>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Stack>
    );
}

export default App;
