import React from "react";
import { Address, Restaurant } from "./model/Restaurant";

interface OwnProps {
  info: Restaurant;
  changeAdress: (address: Address) => void;
}

const Store: React.FC<OwnProps> = ({ info }) => {
  return <div>{info.name}</div>;
};

export default Store;
