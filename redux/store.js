// redux/store.js

import { createStore } from 'redux';
import shoppingListReducer from './reducers';
import { setItems, setPurchasedItems } from './actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create Redux store
const store = createStore(shoppingListReducer);

// Persist state to AsyncStorage
store.subscribe(async () => {
  const state = store.getState();
  try {
    await AsyncStorage.setItem('shoppingList', JSON.stringify(state.items));
    await AsyncStorage.setItem('purchasedItems', JSON.stringify(state.purchasedItems));
  } catch (error) {
    console.error('Error saving state to AsyncStorage:', error);
  }
});

// Load persisted items on app start
const loadSavedState = async () => {
  try {
    const savedItems = await AsyncStorage.getItem('shoppingList');
    const savedPurchasedItems = await AsyncStorage.getItem('purchasedItems');

    if (savedItems) store.dispatch(setItems(JSON.parse(savedItems)));
    if (savedPurchasedItems) store.dispatch(setPurchasedItems(JSON.parse(savedPurchasedItems)));
  } catch (error) {
    console.error('Error loading state from AsyncStorage:', error);
  }
};

// Load state on app start
loadSavedState();

export default store;
