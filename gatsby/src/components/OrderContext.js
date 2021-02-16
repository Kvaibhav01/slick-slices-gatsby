import React, { useState } from 'react'

// Create an Order context
const OrderContext = React.createContext()

export function OrderProvider({ children }) {
  // Stick the state in here
  const [order, setOrder] = useState([])
  return <OrderContext.Provider value={[order, setOrder]}>{children}</OrderContext.Provider>
}

export default OrderContext