import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
	const navigate = useNavigate();
	return (
		<div className='w-full h-[50px] sticky top-0 bg-white shadow-md'>
			<div className='w-full lg:w-[1200px] m-0 md:mx-auto h-full flex items-center justify-between px-4'>
				<h3
					onClick={() => navigate(-1)}
					className='text-2xl font-medium cursor-pointer'>
					назад
				</h3>
				<a href='https://elcat.kg/' className='text-2xl cursor-pointer'>
					ЭлКат
				</a>
				<button
					onClick={() => navigate("/admin")}
					className='text-2xl h-full p-2'>
					Настройки
				</button>
			</div>
		</div>
	);
};

export default Navbar;
