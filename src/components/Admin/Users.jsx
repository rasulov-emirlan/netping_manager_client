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
									password: v.password,
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
							<input
								placeholder='имя'
								className='border border-1 rounded-md w-full outline-none p-2 my-2'
								value={editingUserData.username}
								onChange={(e) =>
									setEditingUserData((prev) => ({
										...prev,
										username: e.target.value,
									}))
								}
								type='text'
							/>
							<input
								placeholder='пароль'
								className='border border-1 rounded-md w-full outline-none p-2 my-2'
								value={editingUserData.password}
								onChange={(e) =>
									setEditingUserData((prev) => ({
										...prev,
										password: e.target.value,
									}))
								}
								type='text'
							/>
							<button
								onClick={() =>
									setEditingUserData((prev) => ({
										...prev,
										isAdmin: !prev.isAdmin,
									}))
								}
								className='text-blue-500'>
								{editingUserData.isAdmin ? "админ" : "юзер"}
							</button>

							<div className='w-full flex justify-between'>
								<button
									onClick={() => handleUserDeletion(v.id)}
									className='text-red-500'>
									забанить
								</button>
								<button
									onClick={() => handleUserUpdate()}
									className='text-blue-500'>
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
