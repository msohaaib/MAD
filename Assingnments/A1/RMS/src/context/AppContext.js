import React, { createContext, useState } from 'react';
import menuData from '../data/MenuData';
import tableData from '../data/TableData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [menu, setMenu] = useState(menuData);
  const [tables, setTables] = useState(tableData);
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);

  return (
    <AppContext.Provider
      value={{
        menu,
        setMenu,
        tables,
        setTables,
        orders,
        setOrders,
        reservations,
        setReservations,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
