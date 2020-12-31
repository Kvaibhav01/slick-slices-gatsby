import { graphql, Link, useStaticQuery } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;

  a {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;

    .count {
      background: #fff;
      padding: 2px 5px;
    }

    .active {
      background: var(--yellow);
    }
  }
`

// Return the pizzas with counts
// `flat()` is used to turn this into one big array
// `reduce()` is used to count number of pizzas in one topping
function countPizzasInToppings(pizzas) {
  const counts = pizzas.map((pizza) => pizza.toppings).flat().reduce((acc, topping) => {
    // Check if this is an existing topping. If it is, then increment by 1, else create a new entry in `acc` & set it to 1
    const existingTopping = acc[topping.id]
    if (existingTopping) {
      existingTopping.count += 1
    } else {
      acc[topping.id] = {
        id: topping.id,
        name: topping.name,
        count: 1
    }
    }
    return acc
  }, {})

  // Sort them based on their count
  const sortedToppings = Object.values(counts).sort((a, b) => b.count - a.count)
  return sortedToppings
}

export default function ToppingsFilter() {
  // Get a list of all toppings
  const {toppings, pizzas} = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `)

  // Count how many pizzas are in each topping
  // Loop over each of the toppings, display the topping and count of the pizzas in that topping
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes)
  return (
  <ToppingsStyles>
      { toppingsWithCounts.map((topping) => (
        <Link to={`/topping/${topping.name}`} key={topping.id}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
      </Link>))}
  </ToppingsStyles>
  )
}