import clsx from "clsx";
import React, { ComponentPropsWithoutRef } from "react";

import { useState } from "react";

interface SvgProps extends ComponentPropsWithoutRef<"img"> {
	icon: string;
	className?: string;
}

const Svg: React.FC<SvgProps> = ({ icon, className = "", ...props }) => {
	const [svgPath, setSvgPath] = useState<string | undefined>(undefined);

	import(`../assets/${icon}.svg`)
		.then((module) => module.default)
		.then(setSvgPath);

	return svgPath ? (
		<img
			{...props}
			className={clsx([
				" max-w-[1.5rem] max-h-[1.5rem] min-w-[1.5rem] min-h-[1.5rem]",
				className,
			])}
			src={svgPath}
			alt={icon}
		/>
	) : null;
};

export default Svg;
