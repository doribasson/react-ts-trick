import { makeAutoObservable } from "mobx";

class ListStore {
  items: string[] = [];
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchItems() {
    this.isLoading = true;
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      this.items = await response.json();
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      this.isLoading = false;
    }
  }
}

export const listStore = new ListStore();
