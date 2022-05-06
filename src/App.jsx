import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { login } from "./api/users";
import SocketControl from "./components/Admin/SocketControl";
import Login from "./components/Auth/Login";
import Manager from "./components/Manager/Manager";
import Navbar from "./components/Navigation/Navbar";
import { setInterceptors } from "./api";
import AdminPage from "./components/Admin/AdminPage";

export const UserContext = createContext({});
const tokenKey = "jwttoken";

function App() {
	const [user, setUser] = useState({
		username: "",
		token: "",
		isAdmin: false,
		isLoggedIn: false,
	});

	const handleLogin = async (username, password) => {
		const data = await login(username, password);
		if (data.status === 200) {
			const decoded = jwt_decode(data.data.accessToken);
			setUser({
				username: username,
				token: data.data.accessToken,
				isAdmin: decoded.isAdmin,
				isLoggedIn: true,
			});
			setInterceptors(data.data.accessToken);
		}
		console.log(data);
	};

	return (
		<UserContext.Provider value={user}>
			{user.isLoggedIn ? (
				<>
					<Navbar />
					<Routes>
						<Route path='/socket/:id' element={<Manager />} />
						{user.isAdmin ? (
							<Route path='/admin' element={<AdminPage />} />
						) : <></>}
					</Routes>
				</>
			) : (
				<Login handleLogin={handleLogin} />
			)}
		</UserContext.Provider>
	);
}

export default App;
