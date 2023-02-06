import { useReducer } from 'react';
import { createContext, useEffect } from 'react';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

import { createAction } from '../utils/reducer/reducer.utils';

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const INITIAL_STATE = {
  currentUser: null
}

const userReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default:
      throw new Error(`unhandled type of ${type} in userReducer`)
  }
}

export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE)

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user })
  }

  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
