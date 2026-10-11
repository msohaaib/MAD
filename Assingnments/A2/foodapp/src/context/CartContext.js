import { createContext, useContext, useMemo, useReducer } from 'react';
import { cartReducer, initialCartState } from '../reducers/cartReducer';
import { orderApi } from '../api/client';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const count = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function addItem(dish, quantity = 1) {
    dispatch({
      type: 'ADD',
      item: {
        menuItem: dish._id,
        name: dish.name,
        price: dish.price,
        image: dish.image,
        quantity,
      },
    });
  }

  async function placeOrder() {
    if (state.items.length === 0) {
      throw new Error('Your cart is empty');
    }
    const order = await orderApi.place({
      items: state.items.map(({ menuItem, quantity }) => ({ menuItem, quantity })),
      notes: state.notes,
    });
    dispatch({ type: 'CLEAR' });
    return order;
  }

  const value = useMemo(
    () => ({
      ...state,
      count,
      subtotal,
      addItem,
      removeItem: (menuItem) => dispatch({ type: 'REMOVE', menuItem }),
      setQty: (menuItem, quantity) => dispatch({ type: 'SET_QTY', menuItem, quantity }),
      setNotes: (notes) => dispatch({ type: 'SET_NOTES', notes }),
      clear: () => dispatch({ type: 'CLEAR' }),
      placeOrder,
    }),
    [state, count, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
