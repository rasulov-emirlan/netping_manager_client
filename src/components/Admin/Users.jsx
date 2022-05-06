import React, { useEffect, useState } from "react";
import { deleteUser, listUsers, registerUser } from "../../api/users";

const Users = () => {
	const [users, setUsers] = useState([]);
	const [newUser, setNewUser] = useState({
		username: "",
		password: "",
	});

	const loadUsers = () => {
		listUsers().then((v) => setUsers(v.data));
	};

	const handleUserRegistration = () => {
		if (newUser.username === "" || newUser.password === "") {
			return;
		}
		registerUser(newUser.username, newUser.password).then(() => loadUsers());
	};

	const handleUserDeletion = (userID) => {
		deleteUser(userID).then((v) => loadUsers());
	};

	useEffect(() => {
		loadUsers();
	}, []);

	return (
		<div className=' min-h-screen'>
			<div className='w-full shadow-custom my-12 p-2 rounded-md'>
				<h2 className='text-center text-xl m-2'>Добавление нового юзера</h2>
				<input
					value={newUser.username}
					onChange={(e) =>
						setNewUser((prev) => ({ ...prev, username: e.target.value }))
					}
					className='w-full outline-none border rounded-md px-4 py-2 my-1'
					placeholder='имя...'
					type='text'
				/>
				<input
					value={newUser.password}
					onChange={(e) =>
						setNewUser((prev) => ({ ...prev, password: e.target.value }))
					}
					className='w-full outline-none border rounded-md px-4 py-2 my-1'
					placeholder='пароль...'
					type='text'
				/>

				<div className='w-full flex justify-center'>
					<button
						onClick={() => handleUserRegistration()}
						className='rounded-full shadow-sm text-blue-500 my-2 px-4 border border-1 text-xl h-[40px]'>
						добавить
					</button>
				</div>
			</div>
			{users.map((v, i) => (
				<div
					className='w-full flex justify-between items-center border border-1 rounded-md p-3 my-4 text-lg'
					key={i}>
					<h1>{v.name}</h1>
					{v.isAdmin ? (
						<h1 className='text-xl font-bold'>😎 я админ</h1>
					) : (
						<button
							onClick={() => handleUserDeletion(v.id)}
							className='text-red-500'>
							Забанить
						</button>
					)}
				</div>
			))}
		</div>
	);
};

export default Users;
