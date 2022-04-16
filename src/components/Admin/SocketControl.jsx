import { useState } from "react";

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

	return (
		<div className='w-full lg:w-[1200px] mx-auto h-full'>
			{locations.map((vv, ii) => (
				<div key={ii} className='w-full my-6 pb-1 p-4 shadow-md rounded-md'>
					Станция:<h2 className='px-4 font-medium'>{vv.name}</h2>
					Домен: <h2 className='px-4 font-medium'>{vv.domain}</h2>
					Порт: <h2 className='px-4 font-medium'>{vv.port}</h2>
					{vv.sockets.map((v, i) => (
						<div
							key={i}
							className={`w-full h-[200px] my-4 rounded-md text-black flex p-4 border border-1 justify-between`}>
							{editing.locationID === ii && editing.socketID === i ? (
								<div className='grid items-center'>
									<input
										value={editingSocket.text}
										onChange={(e) =>
											setEditingSocket((prev) => ({
												...prev,
												text: e.target.value,
											}))
										}
										type='text'
										className='border rounded-md text-xl'
									/>
									<input
										value={editingSocket.type}
										onChange={(e) =>
											setEditingSocket((prev) => ({
												...prev,
												type: e.target.value,
											}))
										}
										type='text'
										className='border rounded-md text-xl'
									/>
									<input
										value={editingSocket.mib}
										onChange={(e) =>
											setEditingSocket((prev) => ({
												...prev,
												mib: e.target.value,
											}))
										}
										type='text'
										className='border rounded-md text-xl'
									/>
								</div>
							) : (
								<div className='grid items-center'>
									<h3 className='text-xl'>Название: {v.text}</h3>
									<h3 className='text-lg'>Тип: {v.type}</h3>
									<h3 className='text-lg'>MIB адрес: {v.mib}</h3>
								</div>
							)}
							<div className='h-full flex items-end gap-2'>
								<button
									onClick={() => handleDeleteBtn(ii, i)}
									className='h-[50px] text-red-600'>
									удалить
								</button>
								<button
									onClick={() => handleEditBtn(ii, i)}
									className='h-[50px] text-blue-500'>
									{editing.locationID === ii && editing.socketID === i
										? "отменить"
										: "изменить"}
								</button>
								{editing.locationID === ii && editing.socketID === i ? (
									<button
										onClick={() => handleSaveBtn()}
										className='h-[50px] text-red-600'>
										сохранить
									</button>
								) : (
									<></>
								)}
							</div>
						</div>
					))}
					<div className='w-full flex justify-center mb-3'>
						<button className='rounded-full shadow-sm text-blue-500 border border-1 text-xl w-[100px] h-[40px]'>
							+
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default SocketControl;
