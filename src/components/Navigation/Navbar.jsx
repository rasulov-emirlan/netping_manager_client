import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const Navbar = ({ handleLogout }) => {
	const user = useContext(UserContext);
	const navigate = useNavigate();
	return (
		<div className='w-full h-[50px] sticky top-0 bg-white shadow-md'>
			<div className='w-full lg:w-[1200px] m-0 md:mx-auto h-full flex items-center justify-between px-4'>
				<h3
					onClick={() => navigate(-1)}
					className='text-2xl font-medium cursor-pointer w-full'>
					назад
				</h3>
				<h1
					onClick={() => handleLogout()}
					className={`text-red-500 cursor-pointer w-full${
						user.isAdmin ? "text-center" : "text-right"
					}`}>
					выйти
				</h1>
				{user.isAdmin && (
					<button
						onClick={() => navigate("/admin")}
						className='text-2xl h-full p-2 w-full text-right'>
						админка
					</button>
				)}
			</div>
		</div>
	);
};

export default Navbar;
