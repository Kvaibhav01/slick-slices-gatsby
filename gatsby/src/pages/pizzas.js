import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';


export default function PizzasPage({ data }) {
  const pizzas = data.pizzas.nodes
  return (
    <>
      <PizzaList pizzas={pizzas}/>
    </>
  );
}

export const query = graphql`
  query PizzaQuery {
    # Rename allSanityPizza to pizzas
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              # This is the Sanity GraphQl Fragment to give all possible image data
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }

  }
`