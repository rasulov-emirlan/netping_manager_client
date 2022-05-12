import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { login, logout, refresh } from "./api/users";
import Login from "./components/Auth/Login";
import Manager from "./components/Manager/Manager";
import Navbar from "./components/Navigation/Navbar";
import { setInterceptors } from "./api";
import AdminPage from "./components/Admin/AdminPage";
import Footer from "./components/Footer/Footer";

export const UserContext = createContext({});

const MINUTE_MS = 900000; // 15 minutes

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
			return true;
		}
		return false;
	};

	const handleLogout = async () => {
		const result = await logout();
		setUser({
			username: "",
			token: "",
			isAdmin: false,
			isLoggedIn: false,
		});
	};

	useEffect(() => {
		const temp = async () => {
			const result = await refresh();
			if (result.status !== 200 || result.data.accessToken === null) {
				return;
			}
			const decoded = jwt_decode(result.data.accessToken);
			setUser({
				token: result.data.accessToken,
				isAdmin: decoded.isAdmin,
				isLoggedIn: true,
			});
			setInterceptors(result.data.accessToken);
		};
		temp();
	}, []);

	useEffect(() => {
		if (user.isLoggedIn) {
			const interval = setInterval(async () => {
				const result = await refresh();
				if (result.status !== 200) {
					setUser({
						username: "",
						token: "",
						isAdmin: false,
						isLoggedIn: false,
					});
				}
				if (result.data.accessToken !== null) {
					const decoded = jwt_decode(data.data.accessToken);
					setUser({
						username: username,
						token: data.data.accessToken,
						isAdmin: decoded.isAdmin,
						isLoggedIn: true,
					});
					setInterceptors(data.data.accessToken);
				}
			}, MINUTE_MS);

			return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
		}
	}, [user]);

	return (
		<UserContext.Provider value={user}>
			{user.isLoggedIn ? (
				<>
					<Navbar handleLogout={handleLogout} />
					<Routes>
						<Route path='/socket/:id' element={<Manager />} />
						{user.isAdmin ? (
							<Route path='/admin' element={<AdminPage />} />
						) : (
							<></>
						)}
					</Routes>
					<Footer />
				</>
			) : (
				<Login handleLogin={handleLogin} />
			)}
		</UserContext.Provider>
	);
}

export default App;
