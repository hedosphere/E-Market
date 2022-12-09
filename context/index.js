import { createContext, useReducer } from "react";
import { UserSuccess, LoadingState, RemoveUser } from "./UserConstant";
import { AddToCart, RemoveFromCart, DeleteCart } from "./CartConstant";
import {
  AddToShippingSteps,
  RemoveFromShippingSteps,
  AddToShippingInfo,
} from "./shippingConstant";

const generalContext = createContext();

const initialState = {
  user: null,
  Loading: false,
  ShippingInfo:
    process.browser && localStorage.getItem("shippinInfo")
      ? JSON.parse(localStorage.getItem("shippinInfo"))
      : null,
  ShippingSteps:
    process.browser && localStorage.getItem("shippinSteps")
      ? JSON.parse(localStorage.getItem("shippinSteps"))
      : ["Shipping"],
  cartItems:
    process.browser && localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case AddToShippingInfo:
      return { ...state, Loading: false, ShippingInfo: action.payload };

    case AddToShippingSteps:
      return { ...state, Loading: false, ShippingSteps: action.payload };

    case DeleteCart:
      localStorage.removeItem("cartItems");

      return { ...state, Loading: false, cartItems: [] };

    case RemoveFromCart:
      const deleteItemId = action.payload;
      let filtered =
        state.cartItems &&
        state.cartItems.filter((e) => e._id !== deleteItemId);
      // console.log(removeItem);
      localStorage.setItem("cartItems", JSON.stringify(filtered));

      return { ...state, Loading: false, cartItems: filtered };

    case AddToCart:
      let cart = action.payload;
      let itemExist = state.cartItems.find((e) => e._id === cart._id);
      let localCart = [];

      if (itemExist) {
        localCart = state.cartItems.map((it) =>
          it._id === cart._id ? cart : it
        );
        localStorage.setItem("cartItems", JSON.stringify(localCart));
        return {
          ...state,
          Loading: false,
          cartItems: state.cartItems.map((it) =>
            it._id === cart._id ? cart : it
          ),
        };
      } else {
        localCart = [...state.cartItems, cart];
        localStorage.setItem("cartItems", JSON.stringify(localCart));

        return {
          ...state,
          Loading: false,
          cartItems: [...state.cartItems, cart],
        };
      }

    case RemoveUser:
      return { ...state, Loading: false, user: null };

    case LoadingState:
      return { ...state, Loading: true };

    case UserSuccess:
      return { ...state, Loading: false, user: action.payload };

    default:
      return state;
  }
};

const MyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <generalContext.Provider value={{ state, dispatch }}>
        {children}
      </generalContext.Provider>
    </>
  );
};

module.exports = { MyProvider, generalContext };
