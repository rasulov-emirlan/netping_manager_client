import React from "react";

const Footer = () => {
	return (
		<div className='w-full min-h-[400px] bg-black text-white'>
			<div className='w-full lg:w-[1200px] mx-auto flex flex-wrap'>
				<h1 className='text-lg md:text-2xl my-6 text-center w-full'>
					Этот сайт был построен с использованием этих технологий
				</h1>
				<div className='w-full flex flex-wrap justify-evenly items-center sm:border rounded-md p-4 py-12'>
					<a href='https://en.reactjs.org/'>
						<img
							src='/src/assets/react.png'
							alt='react-logo'
							className='h-[60px]'
						/>
					</a>
					<a href='https://vitejs.dev/'>
						<img
							src='/src/assets/vite.svg'
							alt='vite-logo'
							className='h-[60px]'
						/>
					</a>

					<a href='https://tailwindcss.com/'>
						<img
							src='/src/assets/tailwind.svg'
							alt='go-icon'
							className='h-[60px]'
						/>
					</a>

					<a href='https://go.dev/'>
						<img src='/src/assets/go.png' alt='go-icon' className='h-[60px]' />
					</a>

					<a href='https://echo.labstack.com/'>
						<img
							src='/src/assets/echo.png'
							alt='go-icon'
							className='h-[60px]'
						/>
					</a>
				</div>

				<h2 className='w-full text-center my-8 mt-20 text-lg md:text-xl'>
					Исходники
				</h2>

				<div className='w-full flex flex-wrap justify-evenly md:border rounded-md py-12 mb-12'>
					<a
						className='text-lg md:text-xl hover:text-blue-300'
						href='https://github.com/rasulov-emirlan/netping_manager_client'>
						frontend🚀
					</a>
					<a
						className='text-lg md:text-xl hover:text-blue-300'
						href='https://github.com/rasulov-emirlan/netping_manager'>
						backend🔥
					</a>
				</div>
			</div>
		</div>
	);
};

export default Footer;
