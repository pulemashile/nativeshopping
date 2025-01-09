// redux/actions.js

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const TOGGLE_ITEM = 'TOGGLE_ITEM';
export const SET_ITEMS = 'SET_ITEMS';
export const SET_PURCHASED_ITEMS = 'SET_PURCHASED_ITEMS';

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const removeItem = (id) => ({
  type: REMOVE_ITEM,
  payload: id,
});

export const editItem = (id, name, price) => ({
  type: EDIT_ITEM,
  payload: { id, name, price },
});

export const toggleItem = (id) => ({
  type: TOGGLE_ITEM,
  payload: id,
});

export const setItems = (items) => ({
  type: SET_ITEMS,
  payload: items,
});

export const setPurchasedItems = (items) => ({
  type: SET_PURCHASED_ITEMS,
  payload: items,
});
