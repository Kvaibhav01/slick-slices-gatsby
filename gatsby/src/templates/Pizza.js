import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'
import SEO from '../components/SEO'

const PizzaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
`

export default function SinglePizzaPage({ data: { pizza }}) {
  return (
    <>
    {/* We add '?' so that it checks whether 'pizza.image' exists, then 'pizza.image.asset' exists & so on.
    This will make sure to render the JSX of image isn't found or is broken */}
    <SEO title={pizza.name} image={pizza.image?.asset?.fluid?.src} />
    <PizzaGrid>
      <Img fluid={pizza.image.asset.fluid} />
      <div>
        <h2 className="mark">{pizza.name}</h2>
        <ul>
          {pizza.toppings.map(topping => <li key={topping.id}>{topping.name}</li>)}
        </ul>
      </div>
    </PizzaGrid>
    </>
  )
}

// This needs to be dynamic based on the `slug` passed in via the `context` in `gatsby-node.js`
export const query = graphql`
# 'slug' needs to be 'String' type and '!' means it's required
  query($slug: String!) {
    pizza: sanityPizza(slug: {current: {eq: $slug}}) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`