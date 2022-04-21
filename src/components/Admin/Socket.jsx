import React, { useState } from "react";

const Socket = ({ socket, setEditingSocket, handleDeleteBtn }) => {
	const [isEditing, setIsEditing] = useState(false);

	return (
		<div
			className={`w-full h-[200px] my-4 rounded-md text-black flex p-4 border border-1 justify-between`}>
			{isEditing ? (
				<div className='grid items-center'>
					<input type='text' className='border rounded-md text-xl' />
					<input type='text' className='border rounded-md text-xl' />
					<input
						onChange={() => setIsEditing(true)}
						type='text'
						className='border rounded-md text-xl'
					/>
				</div>
			) : (
				<div className='grid items-center'>
					<h3 className='text-xl'>Название: {socket.name}</h3>
					<h3 className='text-lg'>Тип: {socket.objectType}</h3>
					<h3 className='text-lg'>MIB адрес: {socket.snmpMib}</h3>
				</div>
			)}
			<div className='h-full flex items-end gap-2'>
				<button
					onClick={() => handleDeleteBtn(socket.id)}
					className='h-[50px] text-red-600'>
					удалить
				</button>
				<button className='h-[50px] text-blue-500'>
					{isEditing ? "отменить" : "изменить"}
				</button>
				{isEditing ? (
					<button className='h-[50px] text-red-600'>сохранить</button>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Socket;
