import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import {
  ActionWithPayload,
  isMatchable,
} from "../../utils/reducer/reducer.utils";
import { Item } from "../categories/categories.types";

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type CartActions = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setIsCartOpen = isMatchable(
  (boolean: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)
);

const addCartItem = (cartItems: CartItem[], productToAdd: Item): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
): CartItem[] => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem?.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const clearCartItem = (
  cartItems: CartItem[],
  cartItemToClear: CartItem
): CartItem[] =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const setCartItems = isMatchable(
  (
    newCartItems: CartItem[]
  ): ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]> =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
);

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: Item
): CartActions => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  // updateCartItemsReducer(newCartItems);
  return setCartItems(newCartItems);
};

export const removeItemToCart = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
): CartActions => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  // updateCartItemsReducer(newCartItems);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (
  cartItems: CartItem[],
  cartItemToClear: CartItem
): CartActions => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  // updateCartItemsReducer(newCartItems);
  return setCartItems(newCartItems);
};
