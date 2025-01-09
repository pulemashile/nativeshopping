// redux/reducers.js

import {
  ADD_ITEM,
  REMOVE_ITEM,
  EDIT_ITEM,
  TOGGLE_ITEM,
  SET_ITEMS,
  SET_PURCHASED_ITEMS,
} from './actions';

const initialState = {
  items: [],
  purchasedItems: []
};

const shoppingListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, items: [...state.items, action.payload] };
    case REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        purchasedItems: state.purchasedItems.filter(item => item.id !== action.payload),
      };
    case EDIT_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, name: action.payload.name, price: action.payload.price }
            : item
        ),
      };
    case TOGGLE_ITEM: {
      const itemToToggle = state.items.find(item => item.id === action.payload);
      if (!itemToToggle) return state;

      const updatedItem = { ...itemToToggle, checked: !itemToToggle.checked };

      const updatedItems = state.items.map(item =>
        item.id === action.payload ? updatedItem : item
      );

      const updatedPurchasedItems = updatedItem.checked
        ? [...state.purchasedItems, updatedItem]
        : state.purchasedItems.filter(item => item.id !== action.payload);

      return {
        ...state,
        items: updatedItems,
        purchasedItems: updatedPurchasedItems
      };
    }
    case SET_ITEMS:
      return { ...state, items: action.payload || [] };
    case SET_PURCHASED_ITEMS:
      return { ...state, purchasedItems: action.payload || [] };
    default:
      return state;
  }
};

export default shoppingListReducer;
