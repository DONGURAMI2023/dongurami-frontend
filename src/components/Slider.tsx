import React from "react";
import Flex from "./Flex";
import clsx from "clsx";
import styled from "styled-components";

interface ISliderProps {
	datas: React.ReactNode[];
	className?: string;
}

const Slider = ({ datas = [], className }: ISliderProps) => {
	return (
		<StyledFlex
			type="horizontal"
			className={clsx([
				"min-h-fit overflow-x-auto w-[calc(100vw-3rem)] p-4",
				className,
			])}
		>
			{datas.map((item, i) => (
				<div key={`slider-${i}`}>{item}</div>
			))}
		</StyledFlex>
	);
};

const StyledFlex = styled(Flex)`
	&::-webkit-scrollbar {
		width: 6px;
		height: 6px;
	}
	&::-webkit-scrollbar-track {
		background: #f1f1f1;
	}
	&::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: 10px;
	}
`;

export default Slider;
