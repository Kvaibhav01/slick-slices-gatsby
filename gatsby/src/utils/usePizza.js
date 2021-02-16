import { useContext, useState } from "react";
import OrderContext from "../components/OrderContext";

export default function usePizza({pizzas, inputs}) {
  // 1. Create state to hold order
  //? This line was commented because we moved `useState` up to the
  //? `Provider`
  // const [order, setOrder] = useState([])
  //? Now we can access both our state and updater function (`setOrder`)
  //? via context
  const [order, setOrder] = useContext(OrderContext)

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
