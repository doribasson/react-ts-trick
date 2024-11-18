import { useContext, createContext } from 'react';
import { listStore } from '@/stores/ListStore';

const ListStoreContext = createContext(listStore);

export const useListStore = () => useContext(ListStoreContext);
