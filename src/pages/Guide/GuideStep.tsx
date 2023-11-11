import { splitByNewLine } from "../../utils";

import { motion } from "framer-motion";

interface IGuideStepProps {
	title: string;
	desc: string;
	img: any;
}

export default function GuideStep({ title, desc, img }: IGuideStepProps) {
	return (
		<motion.div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "1.5rem",
			}}
			initial={{ opacity: 0, x: 100 }}
			animate={{ opacity: 100, x: 0 }}
		>
			<h1 className="font-bold text-2xl">{title}</h1>
			<p className="flex flex-col items-center">{splitByNewLine(desc)}</p>
			<div className="w-full flex justify-center">{img}</div>
		</motion.div>
	);
}
