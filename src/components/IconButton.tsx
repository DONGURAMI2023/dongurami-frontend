import { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";

interface IIconButtonProps extends ComponentPropsWithoutRef<"div"> {
	children: React.ReactNode;
}

const IconButton = ({ children, ...props }: IIconButtonProps) => {
	return <IconButtonContainer {...props}>{children}</IconButtonContainer>;
};

const IconButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 1.8rem;
	height: 1.8rem;
	border-radius: 50%;
	background-color: transparent;
	cursor: pointer;
	&:hover {
		background-color: #efefef;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
	}
`;

export default IconButton;
