import { Link } from 'gatsby'
import React from 'react'

function SinglePizza({pizza}) {
  return (
    <div>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2 className="mark"><span>{pizza.name}</span></h2>
        <p>{pizza.toppings.map(topping => topping.name).join(',  ')}</p>
      </Link>
    </div>
  )
}

export default function PizzaList({pizzas}) {
  return (
    <div>
      {pizzas.map((pizza) => (<SinglePizza pizza={pizza} key={pizza.id}/>))}
    </div>
  )
}
