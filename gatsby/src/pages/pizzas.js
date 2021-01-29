import { graphql } from 'gatsby';
import React from 'react';

import PizzaList from '../components/PizzaList';
import SEO from '../components/SEO';
import ToppingsFilter from '../components/ToppingsFilter';


export default function PizzasPage({ data, pageContext }) {
  const pizzas = data.pizzas.nodes
  return (
    <>
      <SEO title={pageContext.topping ? `Pizzas with ${pageContext.topping}` : 'All Pizzas'} />
      <ToppingsFilter activeTopping={pageContext.topping}/>
      <PizzaList pizzas={pizzas}/>
    </>
  );
}

export const query = graphql`
  query PizzaQuery($toppingRegex: String) {
    # Rename allSanityPizza to pizzas
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } }
    ) {
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