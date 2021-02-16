import { graphql } from 'gatsby';
import Img from 'gatsby-image'
import React, {useState} from 'react';
import PizzaOrder from '../components/PizzaOrder';
import SEO from '../components/SEO';
import MenuItemStyles from '../styles/MenuItemStyles';
import OrderStyles from '../styles/OrderStyles';
import calculateOrderTotal from '../utils/calculateOrderTotal';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import useForm from '../utils/useForm';
import usePizza from '../utils/usePizza';

export default function OrderPage({ data }) {
  const pizzas = data.pizzas.nodes

  const { values, updateValue } = useForm({
    name: '',
    email: ''
  })

  const { order, addToOrder, removeFromOrder } = usePizza({
    pizzas,
    inputs: values
  })


  return (
    <>
      <SEO title="Order a Pizza!" />
      <OrderStyles>
        <fieldset>
          <legend>Your info</legend>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={updateValue}
            />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={updateValue}
            />
        </fieldset>

         <fieldset className="menu">
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
              <Img
                width="50"
                height="50"
                fluid={pizza.image.asset.fluid}
                alt={pizza.name}
              />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() => addToOrder({
                      id: pizza.id,
                      size
                    })}>
                    {size}
                    {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>

         <fieldset>
          <legend className="order">Order</legend>
          <PizzaOrder
            order={order}
            removeFromOrder={removeFromOrder}
            pizzas={pizzas}
            />
        </fieldset>
        <fieldset>
          <h3>Your total is {formatMoney(calculateOrderTotal(order, pizzas))}</h3>
          <button type="submit">Order Ahead</button>
        </fieldset>
      </OrderStyles>
    </>
  );
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug { current }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`