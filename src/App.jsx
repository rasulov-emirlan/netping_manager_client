import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SocketControl from "./components/Admin/SocketControl";
import Login from "./components/Auth/Login";
import Manager from "./components/Manager/Manager";
import Navbar from "./components/Navigation/Navbar";

function App() {
	const [user, setUser] = useState({
		token: "",
		isLoggedIn: false,
	});
	return (
		<>
			{user.isLoggedIn ? (
				<>
					<Navbar />
					<Routes>
						<Route path='/socket/:id' element={<Manager />} />
						<Route path='/admin' element={<SocketControl />} />
					</Routes>
				</>
			) : (
				<Login />
			)}
		</>
	);
}

export default App;
