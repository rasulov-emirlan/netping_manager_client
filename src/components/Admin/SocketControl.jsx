import { useEffect, useState } from "react";
import Socket from "./Socket";

const SocketControl = () => {
	const [editing, setEditing] = useState({
		locationID: null,
		socketID: null,
	});
	const [editingSocket, setEditingSocket] = useState({
		text: "",
		type: "",
		mib: "",
	});
	const [locations, setLocations] = useState([
		{
			id: 1,
			name: "Ошская станция",
			domain: "192.168.0.100",
			port: 161,
			community: "SWITCH",
			sockets: [
				{
					id: 1,
					type: "кондиционер",
					text: "Кондиционер",
					isOn: false,
					color: "bg-blue-400",
					mib: "1.1.2.23323.323.232",
				},
				{
					id: 2,
					type: "кондиционер",
					text: "Кондиционер 2",
					isOn: true,
					color: "bg-blue-400",
					mib: "1.1.2.23323.323.232",
				},
				{
					id: 3,
					type: "обогреватель",
					text: "Обогреватель",
					isOn: false,
					color: "bg-red-400",
					mib: "1.1.2.23323.323.232",
				},
				{
					id: 4,
					type: "генератор",
					text: "Генератор",
					isOn: false,
					color: "bg-purple-400",
					mib: "1.1.2.23323.323.232",
				},
			],
		},
		{
			id: 2,
			name: "БлаБлаБла станция",
			domain: "192.168.0.100",
			port: 161,
			community: "SWITCH",
			sockets: [
				{
					id: 1,
					type: "кондиционер",
					text: "Кондиционер",
					isOn: false,
					color: "bg-blue-400",
					mib: "1.1.2.23323.323.232",
				},
				{
					id: 2,
					type: "кондиционер",
					text: "Кондиционер 2",
					isOn: true,
					color: "bg-blue-400",
					mib: "1.1.2.23323.323.232",
				},
				{
					id: 3,
					type: "обогреватель",
					text: "Обогреватель",
					isOn: false,
					color: "bg-red-400",
					mib: "1.1.2.23323.323.232",
				},
				{
					id: 4,
					type: "генератор",
					text: "Генератор",
					isOn: false,
					color: "bg-purple-400",
					mib: "1.1.2.23323.323.232",
				},
			],
		},
	]);

	const handleEditBtn = (locationID, socketID) => {
		if (editing.locationID !== locationID && editing.socketID !== socketID) {
			setEditingSocket({ ...locations[locationID].sockets[socketID] });
			setEditing({ locationID: locationID, socketID: socketID });
			return;
		}
		setEditingSocket(null);
		setEditing({ locationID: null, socketID: null });
	};

	const handleSaveBtn = () => {
		if (editingSocket.text === "" || editingSocket.mib === "") {
			return;
		}
		setLocations((prev) => {
			let l = [...prev];
			let items = [l[editing.locationID].sockets];
			let item = items[editing.socketID];
			item.text = editingSocket.text;
			item.type = editingSocket.type;
			item.mib = editingSocket.mib;
			l[editing.locationID].sockets[editing.socketID] = item;
			return l;
		});
		setEditing({ locationID: null, socketID: null });
	};

	const handleDeleteBtn = (lid, sid) => {
		setLocations((prev) => {
			let l = [...prev];
			l[lid].sockets.splice(sid, 1);
			return l;
		});
	};

	const handleNewSocket = (lid) => {
		console.log("pressed");
		setLocations((prev) => {
			let l = [...prev];
			l[lid].sockets = [
				...l[lid].sockets,
				{
					id: 1,
					type: "",
					text: "",
					isOn: false,
					color: "bg-green-500",
					mib: "",
				},
			];
			return l;
		});

		setEditingSocket({
			...locations[lid].sockets[locations[lid].sockets.length - 1],
		});
		setEditing({
			locationID: lid,
			socketID: locations[lid].sockets.length - 1,
		});
	};

	useEffect(() => {}, [locations]);

	return (
		<div className='w-full lg:w-[1200px] mx-auto h-full'>
			{locations.map((vv, ii) => (
				<div key={ii} className='w-full my-6 pb-1 p-4 shadow-md rounded-md'>
					Станция:<h2 className='px-4 font-medium'>{vv.name}</h2>
					Домен: <h2 className='px-4 font-medium'>{vv.domain}</h2>
					Порт: <h2 className='px-4 font-medium'>{vv.port}</h2>
					{vv.sockets.map((v, i) => (
						<Socket
							key={i}
							i={i}
							ii={ii}
							socket={v}
							editing={editing}
							editingSocket={editingSocket}
							setEditingSocket={setEditingSocket}
							handleDeleteBtn={handleDeleteBtn}
							handleSaveBtn={handleSaveBtn}
							handleEditBtn={handleEditBtn}
						/>
					))}
					<div className='w-full flex justify-center mb-3'>
						<button
							onClick={() => handleNewSocket(ii)}
							className='rounded-full shadow-sm text-blue-500 border border-1 text-xl w-[100px] h-[40px]'>
							+
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default SocketControl;
