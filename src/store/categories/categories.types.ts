export enum CATEGORIES_ACTION_TYPES {
  FETCH_CATEGORIES_START = "categories/FETCH_CATEGORIES_START",
  FETCH_CATEGORIES_SUCCESS = "categories/FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_FAILED = "categories/FETCH_CATEGORIES_FAILED",
}

export type Item = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

export type Category = {
  title: string;
  items: Item[];
};

export type CategoriesArray = Category[];
