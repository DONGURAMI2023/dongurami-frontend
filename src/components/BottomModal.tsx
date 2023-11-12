import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

interface BottomModalProps {
	children: React.ReactNode;
	visible: boolean;
}

const BottomModal: React.FC<BottomModalProps> = ({ children, visible }) => {
	const [animate, setAnimate] = useState(false);
	const [localVisible, setLocalVisible] = useState(visible);

	useEffect(() => {
		if (localVisible && !visible) {
			setAnimate(true);
			setTimeout(() => setAnimate(false), 250);
		}
		setLocalVisible(visible);
	}, [localVisible, visible]);

	if (!animate && !localVisible) return null;

	return <ModalContainer disappear={!visible}>{children}</ModalContainer>;
};

const slideUp = keyframes`
  from {
    transform: translateY(500px);
  }
  to {
    transform: translateY(0px);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(500px);
  }
`;

const ModalContainer = styled.div<{ disappear?: boolean }>`
	border-top-left-radius: 2em;
	border-top-right-radius: 2em;

	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 60%;

	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: scroll;

	background-color: white;
	z-index: 2;

	animation-duration: 0.25s;
	animation-timing-function: ease-out;
	animation-name: ${({ disappear }) => (disappear ? slideDown : slideUp)};
	animation-fill-mode: forwards;
`;

export default BottomModal;
