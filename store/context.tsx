import { CoffeeStoreTypes } from "@/pages";
import React, { ReactNode, createContext, useContext, useReducer } from "react";

type InitialState = {
  latlong: string;
  coffeeStores: CoffeeStoreTypes[];
};

const initialState: InitialState = {
  latlong: "",
  coffeeStores: [],
};

const StoreContext = createContext<{
  state: InitialState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

// creating the useStore context function
function useStoreContext() {
  return useContext(StoreContext);
}

type Props = {
  children: ReactNode;
};

export const ACTION_TYPES = {
  SET_LATLONG: "SET_LATLONG",
  SET_COFFEE_STORES: "SET_COFFEE_STORES",
};

// creating the store reducer function
const storeReducer = (state: InitialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.SET_LATLONG: {
      return { ...state, latlong: payload.latlong };
    }
    case ACTION_TYPES.SET_COFFEE_STORES: {
      return { ...state, coffeeStores: payload.coffeeStores };
    }

    default:
      // return state;
      throw new Error(`Invalid action ${action.type}`);
  }
};

// creating the store Provider function
const StoreProvider = ({ children }: Props) => {
  const [storeState, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state: storeState, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider, StoreContext, storeReducer, useStoreContext };
