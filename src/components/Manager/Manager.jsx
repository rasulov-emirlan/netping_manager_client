import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Warning from "../Modals/Warning";

const Manager = () => {
	const [search, setSearch] = useSearchParams();
	const [station, setStation] = useState({
		domain: null,
		community: null,
		port: null,
	});
	const [warning, setWarning] = useState({
		check: false,
		btn: 0,
	});
	const [btns, setBtns] = useState([
		{ id: 1, text: "Кондиционер", isOn: false, color: "bg-blue-400" },
		{ id: 2, text: "Кондиционер 2", isOn: true, color: "bg-blue-400" },
		{ id: 3, text: "Обогреватель", isOn: false, color: "bg-red-400" },
		{ id: 4, text: "Генератор", isOn: false, color: "bg-purple-400" },
		{ id: 4, text: "Генератор", isOn: false, color: "bg-purple-400" },
		{ id: 2, text: "Кондиционер 2", isOn: true, color: "bg-blue-400" },
		{ id: 2, text: "Кондиционер 2", isOn: true, color: "bg-blue-400" },
		{ id: 4, text: "Генератор", isOn: false, color: "bg-purple-400" },
		{ id: 2, text: "Кондиционер 2", isOn: true, color: "bg-blue-400" },
		{ id: 2, text: "Кондиционер 2", isOn: true, color: "bg-blue-400" },
		{ id: 2, text: "Кондиционер 2", isOn: true, color: "bg-blue-400" },
		{ id: 2, text: "Кондиционер 2", isOn: true, color: "bg-blue-400" },
		{ id: 4, text: "Генератор", isOn: false, color: "bg-purple-400" },
		{ id: 4, text: "Генератор", isOn: false, color: "bg-purple-400" },
		{ id: 4, text: "Генератор", isOn: false, color: "bg-purple-400" },
		{ id: 4, text: "Генератор", isOn: false, color: "bg-purple-400" },
	]);

	const handleBtn = (id) => {
		setWarning({ check: true, btn: id });
		console.log(netpingAddress);
	};

	const handleToggle = () => {
		setBtns((prev) => {
			let items = [...prev];
			let item = { ...items[warning.btn] };
			item.isOn = !item.isOn;
			items[warning.btn] = item;
			return items;
		});
		setWarning({ check: false, btn: null });
	};

	useEffect(() => {
		let domain = search.get("domain");
		let community = search.get("community");
		let port = search.get("port");
		setStation({ domain: domain, community: community, port: port });
	}, []);

	if (
		station.domain == null ||
		station.community == null ||
		station.port == null
	) {
		return (
			<div className='w-full md:w-[1000px] mx-auto text-3xl text-center'>
				Не хватает параметров в адресной строке
			</div>
		);
	}

	return (
		<div className='w-full min-h-full bg-white'>
			<div className='w-full sm:-[600px] md:-[800px] lg:w-[1200px] mx-0 md:mx-auto overflow-hidden'>
				<div className=' bg-red-500 m-4 py-12 rounded-xl text-yellow-200 font-medium'>
					{" "}
					<h1 className='w-full flex justify-center pb-12 text-2xl'>
						Убедитесь что это правильный домен: {station.domain}
					</h1>
					<h2 className='w-full flex justify-center text-xl text-center'>
						Кнопки снизу отвечают за управление оборудованием в этой станции{" "}
						<br />
						Будьте осторожны
					</h2>
				</div>
				<div className='grid md:flex md:flex-wrap text-white text-xl justify-center py-12 w-full'>
					{btns.map((v, i) => (
						<div
							key={i}
							className={`my-4 md:m-4 rounded-md overflow-hidden w-[250px] h-[140px] p-2 ${
								v.isOn ? "bg-green-500" : "bg-gray-500"
							}`}>
							<h2 className={` flex w-full justify-center`}>
								{v.isOn ? "on" : "off"}
							</h2>
							<button
								onClick={() => handleBtn(i)}
								className={`${
									v.isOn ? v.color : "bg-gray-500"
								} w-full h-[77%] break-all rounded-md`}>
								{v.text}
							</button>
						</div>
					))}
				</div>
			</div>

			{warning.check ? (
				<Warning handleCancel={() => setWarning({ check: false, btn: null })}>
					<div className='w-full h-full pt-12'>
						<h1 className='text-center text-xl'>
							Вы уверены что хотите{" "}
							{btns[warning.btn].isOn ? "отключить" : "включить"}{" "}
							{btns[warning.btn].text}?
						</h1>
						<div className='flex w-full absolute justify-center text-white-600 bottom-12 left-0'>
							<button
								onClick={() => handleToggle()}
								className='bg-red-500 px-8 py-4 rounded-md mr-4 font-extrabold'>
								YES
							</button>
							<button
								onClick={() => setWarning({ check: false, btn: null })}
								className='bg-green-400 px-8 py-4 rounded-md ml-4 font-extrabold'>
								NO
							</button>
						</div>
					</div>
				</Warning>
			) : (
				<></>
			)}
		</div>
	);
};

export default Manager;
