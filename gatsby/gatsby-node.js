import path from 'path'

export async function turnPizzasIntoPages({graphql, actions}) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js')
  // 2. Query all pizzas
  const { data } = await graphql(
    `query {
        pizzas: allSanityPizza {
          nodes {
            name
            slug {
              current
            }
          }
        }
      }
    `
  )
  // 3. Loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach(pizza => {
    actions.createPage({
      // The URL of a new page
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current
      }
    })
  })
}

async function turnToppingsIntoPages({graphql, actions}) {
  // 1. Get the template
  const toppingTemplate = path.resolve('./src/pages/pizzas.js')
  // 2. Query all toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name,
          id
        }
      }
    }
  `)
  // 3. Create pages for each topping
  data.toppings.nodes.forEach(topping => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`
      }
    })
  })
}

//? `createPages` is a Gatsby extension point/Hook which tells plugins to add pages.
export async function createPages(params) {
  // Create pages dynamically and this will concurrently at the same time
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params)
  ])
}
