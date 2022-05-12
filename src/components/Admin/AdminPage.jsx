import { useState } from "react";
import SocketControl from "./SocketControl";
import Users from "./Users";

const AdminPage = () => {
	// mode 1 is for users
	// and mode 2 is for locations
	const [currentMode, setCurrentMode] = useState(1);
	return (
		<div className='w-full lg:w-[1200px] mx-auto h-full'>
			<div className='w-full flex my-4 rounded-md overflow-hidden justify-between bg-gray-400 text-gray-300 text-xl'>
				<button
					onClick={() => setCurrentMode(1)}
					className={`w-1/2 p-2 ${
						currentMode === 1 ? "bg-blue-600 text-white" : ""
					}`}>
					пользователи
				</button>
				<button
					onClick={() => setCurrentMode(2)}
					className={`w-1/2 p-2 ${
						currentMode === 2 ? "bg-blue-600 text-white" : ""
					}`}>
					локации
				</button>
			</div>

			{currentMode === 1 && <Users />}
			{currentMode === 2 && <SocketControl />}
		</div>
	);
};

export default AdminPage;
