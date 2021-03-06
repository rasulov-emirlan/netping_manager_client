import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	addSocket,
	deleteSocket,
	listSockets,
	updateSocket,
} from "../../api/sockets";
import Socket from "./Socket";

const SocketControl = () => {
	const navigate = useNavigate();
	const [locations, setLocations] = useState([]);
	const [newSocket, setNewSocket] = useState({
		locationID: null,
		name: "",
		mib: "",
		type: 1,
	});
	const [isNewSocket, setIsNewSocket] = useState(0);
	const [isEditingSocket, setIsEditingSocket] = useState(0);

	const loadLocations = async () => {
		const list = await listSockets();
		console.log(list);
		setLocations(list);
	};

	const handleDeleteBtn = async (id) => {
		const result = await deleteSocket(id);
		loadLocations();
	};

	const handleAddNewSocketBtn = async (locationID) => {
		setIsNewSocket(locationID);
		setNewSocket((prev) => ({ ...prev, locationID: locationID }));
	};

	const handleSendNewSocketBtn = async () => {
		if (newSocket.mib === "" || newSocket.name === "") {
			return;
		}
		const result = await addSocket(
			newSocket.mib,
			newSocket.name,
			Number(newSocket.locationID),
			Number(newSocket.type)
		);
		setIsNewSocket(0);
		setNewSocket({ locationID: null, name: "", type: 1, mib: "" });
		loadLocations();
	};

	const handleCancelNewSocket = () => {
		setIsNewSocket(0);
		setNewSocket({
			locationID: null,
			name: "",
			mib: "",
			type: 1,
		});
	};

	useEffect(() => {
		loadLocations();
	}, []);

	return (
		<div className='w-full lg:w-[1200px] mx-auto min-h-screen'>
			{locations.map((vv, ii) => (
				<div
					key={ii}
					className='w-full my-6 pb-1 p-4 border border-gray-200 shadow-sm rounded-md'>
					<h2
						onClick={() => navigate(`/socket/${vv.id}`)}
						className='px-4 text-xl font-medium hover:text-blue-500 cursor-pointer'>
						{vv.name}
					</h2>
					<h2 className='px-4 font-medium'>{vv.snmpAddress}</h2>
					{vv.sockets !== null ? (
						<>
							{vv.sockets.map((v, i) => (
								<Socket
									key={i}
									socket={v}
									handleDeleteBtn={handleDeleteBtn}
									editingSocket={isEditingSocket}
								/>
							))}
						</>
					) : (
						<></>
					)}
					{isNewSocket === vv.id ? (
						<div className='w-full grid border border-gray-400 rounded-md mb-4'>
							<div className='m-2 text-xl flex'>
								<label className='w-[10%]' htmlFor='title'>
									????????????????:{" "}
								</label>
								<input
									id='title'
									onChange={(e) =>
										setNewSocket((prev) => ({ ...prev, name: e.target.value }))
									}
									placeholder='?????????????? ???????????????? ???????? ????????????'
									type='text'
									className='w-[90%] outline-none border p-1 rounded-md'
								/>
							</div>
							<div className='m-2 text-xl flex'>
								<label className='w-[10%]' htmlFor='mib'>
									MIB:{" "}
								</label>
								<input
									id='mib'
									onChange={(e) =>
										setNewSocket((prev) => ({ ...prev, mib: e.target.value }))
									}
									placeholder='?????????????? snmp mib ???????? ????????????'
									type='text'
									className='w-[90%] outline-none border p-1 rounded-md'
								/>
							</div>
							<div className='flex flex-wrap items-center m-2'>
								<label className='w-[10%] text-lg' htmlFor='objectType'>
									?????? ????????????:{" "}
								</label>
								<select
									placeholder='?????? ????????????'
									onChange={(e) =>
										setNewSocket((prev) => ({
											...prev,
											type: Number(e.target.value),
										}))
									}
									name='objectType'
									id='objectType'
									className='border p-2 rounded-md'>
									<option value={1}>????????????????????</option>
									<option value={2}>??????????????????????</option>
									<option value={3}>??????????????</option>
									<option value={4}>??????????????????</option>
								</select>
							</div>

							<div className='w-full flex justify-center gap-2'>
								<button
									onClick={() => handleSendNewSocketBtn()}
									className='w-[100px] rounded-xl p-2 mb-4 border border-1 border-gray-400'>
									??????????????
								</button>
								<button
									onClick={() => handleCancelNewSocket()}
									className='w-[100px] rounded-xl p-2 mb-4 border border-1 border-gray-400'>
									????????????
								</button>
							</div>
						</div>
					) : (
						<div className='w-full flex justify-center mb-3'>
							<button
								onClick={() => handleAddNewSocketBtn(vv.id)}
								className='rounded-full shadow-sm text-blue-500 border border-1 text-xl w-[100px] h-[40px]'>
								+
							</button>
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default SocketControl;
