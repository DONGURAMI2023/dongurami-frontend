import React from "react";
import styled from "styled-components";
import CustomNav from "components/CustomNav";
import Flex from "components/Flex";
import IconButton from "components/IconButton";
import { IoPersonCircleOutline, IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Badge = () => {
  const navigate = useNavigate();

  const handleClickCancelBtn = () => {
    navigate(-1);
  };

  return (
    <MapContainer>
      <CustomNav
        hideShadow
        leftComponent={
          <Flex type="horizontalCenter" className="gap-3 whitespace-nowrap">
            <IconButton>
              <IoPersonCircleOutline size="24" />
            </IconButton>
            나의 뱃지 획득 현황
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

export default Badge;
