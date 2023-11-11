import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

interface ModalProps {
  title: string;
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  visible: boolean;
}

function Modal({
  title,
  children,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
  visible,
}: ModalProps) {
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
  return (
    <DarkBackground disappear={!visible}>
      <ModalBlock disappear={!visible}>
        <Title>{title}</Title>
        {children && <p>{children}</p>}

        <ButtonGroup>
          {onCancel && <Button onClick={onCancel}>{cancelText}</Button>}
          {onConfirm && <Button onClick={onConfirm}>{confirmText}</Button>}
        </ButtonGroup>
      </ModalBlock>
    </DarkBackground>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1
  }
  to {
    opacity: 0
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(200px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const slideDown = keyframes`
  from {
    opacity: 1;
    transform: translateY(0px);
  }
  to {
    opacity: 0;
    transform: translateY(200px);
  }
`;

const DarkBackground = styled.div<{ disappear?: boolean }>`
  position: absolute;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;
  z-index: 3;

  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);

  /* animation */
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${(props) => (props.disappear ? fadeOut : fadeIn)};
  animation-fill-mode: forwards;
`;

const ModalBlock = styled.div<{
  disappear?: boolean;
  width?: string;
  height?: string;
}>`
  z-index: 4;
  width: 250px;
  height: 150px;

  padding: 1rem;
  background: white;
  border-radius: 0.2rem;

  position: relative;

  /* animation */
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${(props) => (props.disappear ? slideDown : slideUp)};
  animation-fill-mode: forwards;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 1.2rem;
`;

const ButtonGroup = styled.div`
  width: 50%;
  height: 30px;
  background-color: blue;

  display: flex;
  justify-content: flex-end;

  position: absolute;
  bottom: 1.2rem;
  right: 1.2rem;
`;

const Button = styled.button`
  width: 50%;
  height: 30px;
  background-color: red;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  /* 버튼들 사이 간격 */
  & + & {
    margin-left: 0.5rem;
  }
`;

export default Modal;
