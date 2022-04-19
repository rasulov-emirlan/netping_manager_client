import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { listSocketsByLocation, toggleSocket } from "../../api/sockets";
import Loader from "../Loager/Loader";
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
		socketID: 0,
		socketIndex: 0,
	});
	const [loading, setLoading] = useState(false);
	const [sockets, setSockets] = useState([]);
	const socketColors = [
		"bg-green-500",
		"bg-blue-500",
		"bg-red-500",
		"bg-purple-500",
	];

	const handleBtn = (id, i) => {
		console.log(id);
		setWarning({ check: true, socketID: id, socketIndex: i });
	};

	const delay = (ms) => new Promise((res) => setTimeout(res, ms));

	const handleToggle = async (id, turnOn) => {
		toggleSocket(id, !turnOn);
		setWarning({ check: false, socketID: null, socketIndex: null });
		setLoading(true);
		await delay(5000);
		loadSockets(station.domain);
		setLoading(false);
	};

	const loadSockets = async (domain) => {
		const data = await listSocketsByLocation(domain);
		setSockets(data);
		console.log(data);
	};

	useEffect(() => {
		let domain = search.get("domain");
		let community = search.get("community");
		let port = search.get("port");
		loadSockets(domain);
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
				{loading ? (
					<Loader />
				) : (
					<div className='grid md:flex md:flex-wrap text-white text-xl justify-center py-12 w-full'>
						{sockets.map((v, i) => (
							<div
								key={i}
								className={`my-4 md:m-4 rounded-md overflow-hidden w-[250px] h-[140px] p-2 ${
									v.isON ? "bg-green-500" : "bg-gray-500"
								}`}>
								<h2 className={` flex w-full justify-center`}>
									{v.isON ? "on" : "off"}
								</h2>
								<button
									onClick={() => handleBtn(v.id, i)}
									className={`${
										v.isON ? socketColors[v.objectType] : "bg-gray-500"
									} w-full h-[77%] break-all rounded-md`}>
									{v.name}
								</button>
							</div>
						))}
					</div>
				)}
			</div>

			{warning.check ? (
				<Warning handleCancel={() => setWarning({ check: false, btn: null })}>
					<div className='w-full h-full pt-12'>
						<h1 className='text-center text-xl'>
							Вы уверены что хотите{" "}
							{sockets[warning.socketIndex].isON ? "отключить" : "включить"}{" "}
							{sockets[warning.socketIndex].name}?
						</h1>
						<div className='flex w-full absolute justify-center text-white-600 bottom-12 left-0'>
							<button
								onClick={() =>
									handleToggle(
										warning.socketID,
										sockets[warning.socketIndex].isON
									)
								}
								className='bg-red-500 px-8 py-4 rounded-md mr-4 font-extrabold'>
								YES
							</button>
							<button
								onClick={() =>
									setWarning({
										check: false,
										socketID: null,
										socketIndex: null,
									})
								}
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
