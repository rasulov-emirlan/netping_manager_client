import React from "react";

const types = ["", "неизвестно", "охлаждение", "обогрев", "генератор"];

const Socket = ({
	socket,
	isEditing,
	handleDeleteBtn,
}) => {
	return (
		<div
			className={`w-full h-[200px] my-4 rounded-md text-black flex p-4 border border-1 justify-between`}>
			{isEditing === socket.id ? (
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
					<h3 className='text-lg'>Тип: {types[socket.objectType]}</h3>
					<h3 className='text-lg'>MIB адрес: {socket.snmpMib}</h3>
				</div>
			)}
			<div className='h-full flex items-end gap-2'>
				<button
					onClick={() => handleDeleteBtn(socket.id)}
					className='h-[50px] text-red-600'>
					удалить
				</button>
				{/* <button
					onClick={() => handleChangeBtn(socket, locationID)}
					className='h-[50px] text-blue-500'>
					{isEditing ? "отменить" : "изменить"}
				</button> */}
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
