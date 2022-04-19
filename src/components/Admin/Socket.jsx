import React from "react";

const Socket = ({
	ii,
	i,
	editing,
	editingSocket,
	setEditingSocket,
	socket,
	handleDeleteBtn,
	handleEditBtn,
	handleSaveBtn,
}) => {
	return (
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
					<h3 className='text-xl'>Название: {socket.text}</h3>
					<h3 className='text-lg'>Тип: {socket.type}</h3>
					<h3 className='text-lg'>MIB адрес: {socket.mib}</h3>
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
	);
};

export default Socket;
