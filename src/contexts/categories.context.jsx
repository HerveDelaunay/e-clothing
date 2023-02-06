import { createContext, useEffect, useReducer } from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

const INITIAL_STATE = {
  categoriesMap: {}
}

const categoriesReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case 'SET_CATEGORIES_MAP':
      return {
        ...state,
        ...payload
      }
    default:
      throw new Error(`unhandled type of ${type} in categoriesReducer`)
  }
}

export const CategoriesProvider = ({ children }) => {
  const [{ categoriesMap }, dispatch] = useReducer(categoriesReducer, INITIAL_STATE)

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments('categories');
      setCategoriesMap(categoryMap);
    };

    getCategoriesMap();
  }, []);

  const setCategoriesMap = (categoryMap) => {
    dispatch({ type: 'SET_CATEGORIES_MAP', payload: { categoriesMap: categoryMap } })
  }

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
