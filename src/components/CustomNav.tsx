import styled from "styled-components";

interface ICustomNavProps {
	leftComponent?: React.ReactNode;
	centerComponent?: React.ReactNode;
	rightComponent?: React.ReactNode;
	hideShadow?: boolean;
}

const CustomNav = ({
	leftComponent = null,
	centerComponent = null,
	rightComponent = null,
	hideShadow = false,
}: ICustomNavProps) => {
	return (
		<>
			<NavBarContainer hideShadow={hideShadow}>
				<LeftContainer>{leftComponent}</LeftContainer>
				<CenterContainer>{centerComponent}</CenterContainer>
				<RightContainer>{rightComponent}</RightContainer>
			</NavBarContainer>
		</>
	);
};

const LeftContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
`;

const CenterContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

const RightContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
`;

const NavBarContainer = styled.div`
	display: flex;
	justify-content: space-between;
	position: absolute;
	top: 0;
	left: 0;
	padding-left: 1rem;
	padding-right: 1rem;
	z-index: 2;
	width: 100%;
	height: 50px;
	background-color: #fff;
	box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
	${(props: { hideShadow: boolean }) => props.hideShadow && `box-shadow: none`}
`;

export default CustomNav;
