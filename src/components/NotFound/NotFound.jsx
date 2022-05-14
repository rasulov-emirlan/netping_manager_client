import React from "react";
import notfountImg from "/src/assets/404.gif";
const NotFound = () => {
	return (
		<div className='w-full min-h-screen'>
			<div className='w-full flex justify-center bg-gray-200'>
				<img
					src={notfountImg}
					alt='404'
					className='h-[200px] sm:h-[400px] md:h-[500px]'
				/>
				<h1 className='text-2xl font-light mt-20'>
					404 <br /> Page not found
				</h1>
			</div>

			<div className='w-full grid sm:flex justify-center mt-20 gap-4'>
				<h2 className='text-xl'>Here is a list of routes we have</h2>
				<ul className='grid'>
					<li>/website/admin</li>
					<li>/website/socket/:id</li>
					<li>/website/login</li>
				</ul>
			</div>
		</div>
	);
};

export default NotFound;
