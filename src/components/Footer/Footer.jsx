import React from "react";

import goImg from "/src/assets/go.png";
import reactImg from "/src/assets/react.png";
import echoImg from "/src/assets/echo.png";
import tailwindImg from "/src/assets/tailwind.svg";
import viteSvg from "/src/assets/vite.svg";

const Footer = () => {
	return (
		<div className='w-full min-h-[400px] bg-black text-white pb-12'>
			<div className='w-full xl:w-[1200px] lg:mx-auto'>
				<h1 className='text-lg md:text-2xl py-20 text-center w-full'>
					Этот сайт был построен с использованием этих технологий
				</h1>
				<div className='w-full flex justify-center border rounded-md p-4 py-12'>
					<a href='https://en.reactjs.org/'>
						<img src={reactImg} alt='react-logo' className='h-[60px]' />
					</a>
					<a href='https://vitejs.dev/'>
						<img src={viteSvg} alt='vite-logo' className='h-[60px]' />
					</a>

					<a href='https://tailwindcss.com/'>
						<img src={tailwindImg} alt='go-icon' className='h-[60px]' />
					</a>

					<a href='https://go.dev/'>
						<img src={goImg} alt='go-icon' className='h-[60px]' />
					</a>

					<a href='https://echo.labstack.com/'>
						<img src={echoImg} alt='go-icon' className='h-[60px]' />
					</a>
				</div>

				<h2 className='w-full text-center my-8 mt-20 text-lg md:text-xl'>
					Исходники
				</h2>

				<div className='w-full flex flex-wrap justify-evenly border rounded-md py-12'>
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
