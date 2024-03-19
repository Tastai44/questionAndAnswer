/** @format */

import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Invite from "./pages/Invite";
import Host from "./pages/Host";
import Event from "./pages/Event";
import HostEvent from "./pages/HostEvent";
import Page404 from "./pages/Page404";
import EventDetails from "./pages/EventDetails";
import { useState } from "react";

function App() {
    const [reFresh, setRefresh] = useState(0);

    const handleRefresh = () => {
        setRefresh((pre) => pre + 1);
    };
    return (
        <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/invite"} element={<Invite />} />
            <Route path={"/host"} element={<Host />} />
            <Route path={"/event/:eventId"} element={<Event />} />
            <Route
                path={"/eventDetails/:eventId/:name"}
                element={
                    <EventDetails
                        refresh={reFresh}
                        handleRefresh={handleRefresh}
                    />
                }
            />
            <Route
                path={"/eventHostDetails/:eventId"}
                element={
                    <HostEvent
                        refresh={reFresh}
                        handleRefresh={handleRefresh}
                    />
                }
            />
            <Route path={"/page404"} element={<Page404 />} />
        </Routes>
    );
}

export default App;
