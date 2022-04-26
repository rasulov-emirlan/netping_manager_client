import { useEffect, useState } from "react";
import {
	addSocket,
	deleteSocket,
	listSockets,
	updateSocket,
} from "../../api/sockets";
import Socket from "./Socket";

const SocketControl = () => {
	const [locations, setLocations] = useState([]);
	const [newSocket, setNewSocket] = useState({
		locationID: null,
		name: "",
		mib: "",
		type: 1,
	});
	const [editingSocket, setEditingSocket] = useState({
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
		console.log(result);
		loadLocations();
	};

	const handleAddNewSocketBtn = async (locationID) => {
		setIsNewSocket(locationID);
		setNewSocket((prev) => ({ ...prev, locationID: locationID }));
	};

	const handleSendNewSocketBtn = async () => {
		console.log(newSocket);
		const result = await addSocket(
			newSocket.mib,
			newSocket.name,
			Number(newSocket.locationID),
			Number(newSocket.type)
		);
		console.log(result);
		setIsNewSocket(0);
		setNewSocket({ locationID: null, name: "", type: 1, mib: "" });
		loadLocations();
	};

	// This function starts the changing process of a socket
	const handleChangeBtn = (socket, locationID) => {
		console.log(socket.id);
		setIsEditingSocket(socket.id);
		setEditingSocket({
			locationID: locationID,
			name: socket.name,
			mib: socket.snmpMib,
			type: socket.type,
		});
	};

	// This function saves all the changes that were made after
	// call of 'handleChangeBtn()'
	const handleSaveChangesBtn = async () => {
		const result = await updateSocket(
			isEditingSocket.id,
			editingSocket.name,
			editingSocket.type,
			editingSocket.mib
		);
		console.log(result);
		setIsEditingSocket(null);
	};

	useEffect(() => {
		loadLocations();
	}, []);

	return (
		<div className='w-full lg:w-[1200px] mx-auto h-full'>
			{locations.map((vv, ii) => (
				<div
					key={ii}
					className='w-full my-6 pb-1 p-4 border border-gray-200 shadow-sm rounded-md'>
					ID:<h2 className='px-4 font-medium'>{vv.id}</h2>
					Станция:<h2 className='px-4 font-medium'>{vv.name}</h2>
					Домен: <h2 className='px-4 font-medium'>{vv.snmpAddress}</h2>
					{vv.sockets !== null ? (
						<>
							{vv.sockets.map((v, i) => (
								<Socket
									key={i}
									socket={v}
									handleDeleteBtn={handleDeleteBtn}
									handleChangeBtn={handleChangeBtn}
									editingSocket={isEditingSocket}
									setEditingSocket={setEditingSocket}
								/>
							))}
						</>
					) : (
						<></>
					)}
					{isNewSocket == vv.id ? (
						<div className='w-full grid border border-gray-400 rounded-md mb-4'>
							<div className='m-2 text-xl'>
								Название:{" "}
								<input
									onChange={(e) =>
										setNewSocket((prev) => ({ ...prev, name: e.target.value }))
									}
									placeholder='введите название этой машины'
									type='text'
									className='w-[60%]'
								/>
							</div>
							<div className='m-2 text-xl'>
								MIB:{" "}
								<input
									onChange={(e) =>
										setNewSocket((prev) => ({ ...prev, mib: e.target.value }))
									}
									placeholder='введите snmp mib этой машины'
									type='text'
									className='w-[60%]'
								/>
							</div>
							<div className='flex flex-wrap items-center m-2'>
								Тип машины:
								<select
									placeholder='тип машины'
									onChange={(e) =>
										setNewSocket((prev) => ({
											...prev,
											type: Number(e.target.value),
										}))
									}
									name='objectType'
									id='objectType'
									className='border border-1 p-2 rounded-md m-2'>
									<option value={1}>незивестно</option>
									<option value={2}>кондиционер</option>
									<option value={3}>обогрев</option>
									<option value={4}>генератор</option>
								</select>
							</div>

							<div className='w-full flex justify-center'>
								<button
									onClick={() => handleSendNewSocketBtn()}
									className='w-[100px] rounded-xl p-2 mb-4 border border-1 border-gray-400'>
									создать
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
