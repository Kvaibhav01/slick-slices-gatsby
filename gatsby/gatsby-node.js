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

//? `createPages` is a Gatsby extension point/Hook which tells plugins to add pages.
export async function createPages(params) {
  // Create pages dynamically
  await turnPizzasIntoPages(params)
}
