/** @format */

import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Invite from "./pages/Invite";
import Host from "./pages/Host";
import Event from "./pages/Event";
import HostEvent from "./pages/HostEvent";
import Page404 from "./pages/Page404";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={"/"} element={<Home />} />
				<Route path={"/invite"} element={<Invite />} />
				<Route path={"/host"} element={<Host />} />
				<Route path={"/event/:eventId"} element={<Event />} />
				<Route path={"/eventDetails/:eventId/:name"} element={<Event />} />
				<Route path={"/eventHostDetails/:eventId"} element={<HostEvent />} />
				<Route path={"/page404"} element={<Page404 />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
