import React, { useEffect, useState } from "react";
import {
	deleteUser,
	listUsers,
	registerUser,
	updateUser,
} from "../../api/users";

const Users = () => {
	const [users, setUsers] = useState([]);
	const [newUser, setNewUser] = useState({
		username: "",
		password: "",
	});
	const [editingUser, setEditingUser] = useState(0);
	const [editingUserData, setEditingUserData] = useState({
		username: "",
		password: "",
		isAdmin: false,
	});

	const loadUsers = () => {
		listUsers().then((v) => setUsers(v.data));
	};

	const handleUserUpdate = async () => {
		if (editingUserData.username === "" || editingUserData.password === "") {
			return;
		}
		const result = await updateUser(
			editingUser,
			editingUserData.username,
			editingUserData.password,
			editingUserData.isAdmin
		);
		if (result.status === 200) {
			setEditingUser(0);
			setEditingUserData({
				username: "",
				password: "",
				isAdmin: false,
			});
			loadUsers();
		}
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
		<div className='min-h-screen'>
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
					className='w-full items-center border border-1 rounded-md p-3 my-4 text-lg'
					key={i}>
					<div className='flex justify-between w-full'>
						<h1
							onClick={() => {
								setEditingUser((prev) => (prev === 0 ? v.id : 0));
								setEditingUserData({
									username: v.name,
									password: "",
									isAdmin: v.isAdmin,
								});
							}}
							className='hover:text-blue-600 cursor-pointer'>
							{v.name}
						</h1>
						{v.isAdmin && <h1 className='text-xl font-bold'>😎 я админ</h1>}
					</div>

					{editingUser === v.id && (
						<div className=''>
							<label className='text-gray-400' htmlFor='username'>
								новое имя
							</label>
							<input
								id='username'
								placeholder='имя'
								className='border border-blue-500 rounded-md w-full outline-none p-2 mb-2'
								value={editingUserData.username}
								onChange={(e) =>
									setEditingUserData((prev) => ({
										...prev,
										username: e.target.value,
									}))
								}
								type='text'
							/>
							<label className='text-gray-400' htmlFor='password'>
								новой пароль
							</label>
							<input
								id='password'
								placeholder='пароль'
								className='border border-blue-500 rounded-md w-full outline-none p-2 mb-2'
								value={editingUserData.password}
								onChange={(e) =>
									setEditingUserData((prev) => ({
										...prev,
										password: e.target.value,
									}))
								}
								type='password'
							/>
							<label className='text-gray-400' htmlFor='role'>
								новая роль
							</label>
							<button
								id='role'
								onClick={() =>
									setEditingUserData((prev) => ({
										...prev,
										isAdmin: !prev.isAdmin,
									}))
								}
								className='bg-blue-500 text-white rounded-md p-2 w-full'>
								{editingUserData.isAdmin ? "😎 админ" : "😢 простолюдин"}
							</button>

							<div className='w-full flex justify-between'>
								<button
									onClick={() => handleUserDeletion(v.id)}
									className='bg-red-500 w-[80px] rounded-md text-white p-2 mt-4'>
									удалить
								</button>
								<button
									onClick={() => handleUserUpdate()}
									className='bg-blue-500 p-2 rounded-md text-white mt-4'>
									сохранить
								</button>
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default Users;
