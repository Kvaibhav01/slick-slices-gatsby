import { useState } from "react";

export default function usePizza({pizzas, inputs}) {
  // 1. Create state to hold order
  const [order, setOrder] = useState([])

  // 2. Make a function which adds things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza])
  }

  // 3. Make a function to remove things from order
  function removeFromOrder(index) {
    setOrder([
      // Everything before the order we want to remove
      ...order.slice(0, index),
      // Everything after the order we want to remove
      ...order.slice(index + 1)
    ])
  }

  // TODO 4. Send this data to a serverless function when checkout is done

  return {
    order,
    addToOrder,
    removeFromOrder
  }
};
