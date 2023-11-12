import React from "react";
import styled from "styled-components";
import CustomNav from "components/CustomNav";
import Flex from "components/Flex";
import IconButton from "components/IconButton";
import { IoPersonCircleOutline, IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Point = () => {
  const navigate = useNavigate();

  const handleClickCancelBtn = () => {
    navigate(-1);
  };

  return (
    <MapContainer>
      <CustomNav
        hideShadow
        leftComponent={
          <Flex type="horizontalCenter" className="gap-3">
            <IconButton>
              <IoPersonCircleOutline size="24" />
            </IconButton>
            내 포인트
          </Flex>
        }
        rightComponent={
          <IconButton onClick={() => handleClickCancelBtn()}>
            <IoClose size="24"></IoClose>
          </IconButton>
        }
      />
    </MapContainer>
  );
};

const MapContainer = styled.div`
  padding-top: 50px;
`;

export default Point;
