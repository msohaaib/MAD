export const initialCartState = {
  items: [],
  notes: '',
};

export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find((item) => item.menuItem === action.item.menuItem);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.menuItem === action.item.menuItem
              ? { ...item, quantity: item.quantity + action.item.quantity }
              : item
          ),
        };
      }
      return { ...state, items: [...state.items, action.item] };
    }
    case 'REMOVE':
      return {
        ...state,
        items: state.items.filter((item) => item.menuItem !== action.menuItem),
      };
    case 'SET_QTY':
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.menuItem === action.menuItem ? { ...item, quantity: action.quantity } : item
          )
          .filter((item) => item.quantity > 0),
      };
    case 'SET_NOTES':
      return { ...state, notes: action.notes };
    case 'CLEAR':
      return initialCartState;
    default:
      return state;
  }
}
