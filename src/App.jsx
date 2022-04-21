import { Route, Routes } from "react-router-dom";
import SocketControl from "./components/Admin/SocketControl";
import Manager from "./components/Manager/Manager";
import Navbar from "./components/Navigation/Navbar";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/socket/:id' element={<Manager />} />
				<Route path='/admin' element={<SocketControl />} />
			</Routes>
		</>
	);
}

export default App;
