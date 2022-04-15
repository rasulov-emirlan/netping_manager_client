import { Route, Routes } from "react-router-dom";
import Manager from "./components/Manager/Manager";

function App() {
	return (
		<>
			<Routes>
				<Route path='/*' element={<Manager />} />
			</Routes>
		</>
	);
}

export default App;
