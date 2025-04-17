export type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};
export type Resturant = {
  _id: string;
  user: string;
  name: string;
  city: string;
  country: string;
  delivaryTime: number;
  tags: string[];
  menus: MenuItem[];
  image: string;
};

export type SearchedResturant = {
  data: Resturant[];
};

export type RestaurantState = {
  loading: boolean;
  resturant: Resturant | null;
  searchedResturant: SearchedResturant | null;
  appliedFilter: string[];
  createResturant: (formData: FormData) => Promise<void>;
  getResturant: () => Promise<void>;
  updateResturant: (formData: FormData) => Promise<void>;
  searchResturant: (
    searchText: string,
    searchQuery: string,
    selectedTags: []
  ) => Promise<void>;
  addMenuToResturant: (menu: MenuItem) => void;
  updateMenuToResturant: (menu: MenuItem) => void;
  setAppliedFilter: (value: string) => void;
  resetAppliedFilter: () => void;
};
