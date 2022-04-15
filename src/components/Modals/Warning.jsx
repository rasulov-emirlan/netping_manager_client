import React from "react";

const Warning = ({ children, handleCancel }) => {
	return (
		<div
			className='fixed w-screen h-screen top-0 left-0 bg-bgWarning'
			onClick={() => handleCancel()}>
			<div
				onClick={(e) => e.stopPropagation()}
				className='absolute translate-x-1/2 -translate-y-1/2 right-1/2 top-1/2 w-[400px] h-[400px] bg-white rounded-md p-4'
				onCli>
				<div className='w-full h-[50px] bg-red-500 rounded-md text-white flex justify-center items-center'>
					<h1 className='text-2xl'>ВНИМАНИЕ</h1>
				</div>
				{children}
			</div>
		</div>
	);
};

export default Warning;
