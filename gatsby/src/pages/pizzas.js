import { graphql } from 'gatsby';
import React from 'react';

import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';


export default function PizzasPage({ data }) {
  const pizzas = data.pizzas.nodes
  return (
    <>
      <ToppingsFilter />
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
            # To get fixed dimension image
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              # This is the Sanity GraphQL Fragment to give all possible image data
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }

  }
`