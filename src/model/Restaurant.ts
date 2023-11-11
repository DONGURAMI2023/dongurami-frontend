export type Restaurant = {
  name: string;
  category: string;
  address: Address;
  menu: Menu[];
};

export type Address = {
  city: string;
  detail: string;
  zipcode: number;
};

export type AddressWithoutZipcode = Omit<Address, "zipcode">;
export type RestaurantonlyCategory = Pick<Restaurant, "category">;

export type Menu = {
  name: string;
  price: number;
  category: string;
};

// api data type
export type ApiResponse<T> = {
  data: T[];
  total: number;
  page: number;
};

export type RestuartResponse = ApiResponse<Restaurant>;
export type MenuResponse = ApiResponse<Menu>;
