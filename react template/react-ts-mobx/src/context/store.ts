// Create store context
// /context/store.ts
import { createContext } from 'react';
import { RootStore } from "../store/RootStore";

export const StoreContext = createContext<RootStore>({} as RootStore);
export const StoreProvider = StoreContext.Provider;