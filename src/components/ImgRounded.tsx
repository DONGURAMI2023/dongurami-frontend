import clsx from "clsx";
import Flex from "./Flex";

type TypeSize = "sm" | "md" | "lg";

const ImgRounded = ({ src, size = "md" }: { src: string; size?: TypeSize }) => {
	const sizeMap = {
		sm: "w-8 h-8",
		md: "w-[68px] h-[68px]",
		lg: "w-32 h-32",
	};

	return (
		<Flex
			type="verticalCenter"
			className={clsx([
				"rounded-[50%] bg-white border border-gray-300 overflow-clip p-[2px] shadow-md z-0 cursor-pointer",
				sizeMap[size],
			])}
		>
			<Flex
				type="verticalCenter"
				className="rounded-[50%] p-[2px] z-10 bg-gradient-to-tr from-yellow-400 via-red-500 to-pink-500"
			>
				<Flex
					type="verticalCenter"
					className="rounded-[50%] bg-white p-[2px] z-20"
				>
					<img className="w-full h-full rounded-[50%] z-30" src={src} />
				</Flex>
			</Flex>
		</Flex>
	);
};

export default ImgRounded;
