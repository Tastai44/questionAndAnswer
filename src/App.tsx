import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Host from "./pages/Host";
import Event from "./pages/Event";
import Page404 from "./pages/Page404";
import { useState } from "react";
import EventRoom from "./pages/EventRoom";

function App() {
    const [reFresh, setRefresh] = useState(0);

    const handleRefresh = () => {
        setRefresh((pre) => pre + 1);
    };
    return (
        <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/host"} element={<Host />} />
            <Route path={"/event/:eventId"} element={<Event />} />
            <Route path={"/page404"} element={<Page404 />} />
            <Route
                path={"/eventRoom/:eventId/:isHost"}
                element={
                    <EventRoom
                        refresh={reFresh}
                        handleRefresh={handleRefresh}
                    />
                }
            />
        </Routes>
    );
}

export default App;
