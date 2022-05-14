import React, { useState } from "react";
import eyeImg from "/src/assets/eye.png";
const Login = ({ handleLogin }) => {
	const [form, setForm] = useState({
		username: "",
		password: "",
	});
	const [isInCorrect, setIsInCorrect] = useState(false);
	const [isVisiblePswd, setIsVisiblePswd] = useState(false);

	const handleLoginBtn = (username, password) => {
		setIsInCorrect(handleLogin(username, password));
	};
	return (
		<div className='w-screen h-screen flex justify-center items-center'>
			<div className='w-[400px] h-[200px] bg-blue-100 rounded-md p-2 pb-0 shadow-xl'>
				<input
					className='w-full rounded-md mb-2 p-2 outline-none'
					value={form.username}
					onChange={(e) =>
						setForm((prev) => ({ ...prev, username: e.target.value }))
					}
					type='text'
					placeholder='имя...'
				/>
				<div className='w-full flex bg-white rounded-md mt-2 items-center'>
					<input
						className='w-[85%] rounded-md p-2 outline-none'
						value={form.password}
						onChange={(e) =>
							setForm((prev) => ({ ...prev, password: e.target.value }))
						}
						type={isVisiblePswd ? "text" : "password"}
						placeholder='пароль...'
					/>
					<button
						onClick={() => setIsVisiblePswd(!isVisiblePswd)}
						className='w-[15%] h-full flex justify-center items-center'>
						<img src={eyeImg} alt='show-password' className='h-[30px]' />
					</button>
				</div>
				{isInCorrect && <h1 className='text-red-500'>неправильный пароль</h1>}
				<div className='w-full h-full flex justify-center items-start pt-7'>
					<button
						onClick={() => handleLoginBtn(form.username, form.password)}
						className='bg-white p-4 rounded-md shadow-md w-full'>
						Войти
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
