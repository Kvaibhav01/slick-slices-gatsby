import path from 'path'
import fetch from 'isomorphic-fetch'

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

async function fetchBeersAndTurnIntoNodes({ actions, createNodeId, createContentDigest }) {
  // 1. Fetch a list of beers
  const res = await fetch('https://api.sampleapis.com/beers/ale')
  const beers = await res.json()

  // 2. Loop over each one
  for (const beer of beers) {
    // Create a node for each beer. This is where the data for our new `node` in GraphQL will be.
    const nodeContent = JSON.stringify()
    // This is the metadata of our node.
    const nodeMeta = {
      // `createNodeId` allows us to generate a random ID number.
      id: createNodeId(`beer-${beer.name}`),
      // We don't have a relational data here like `parentBeer` so we leave it as `null`.
      parent: null,
      // Same thing with `children`.
      children: [],
      // The internal sub-object scheme of our data.
      internal: {
        // Specify query name. GraphQL will automatically add `all` in front of it.
        type: 'Beer',
        // What type of data we're pulling in from the beer API.
        mediaType: 'application/json',
        // `contentDigest` is to know whether data has changed or not.
        contentDigest: createContentDigest(beer)
      }
    }
    // 3. Create a node for that beer
    actions.createNode({
      ...beer,
      ...nodeMeta,
      ...nodeContent
    })
  }
}


async function turnSlicemastersIntoPages({ graphql, actions }) {
  // 1. Query all Slicemasters
  const { data } = await graphql(`
    query {
      sliceMasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `)

  //TODO 2. Turn each Slicemaster into their own page

  // 3. Figure out how many pages are there based on the number of Slicemasters and how many per page
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE)
  const pageCount = Math.ceil(data.sliceMasters.totalCount / pageSize)

  // 4. Loop from 1 to n and create pages for each of them
  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),

      //? This data is passed to the template when we create it
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize
      }
    })
  })
}

// ? `sourceNodes` tells Gatsby plugins to source `nodes` for Graphql. We can make new GraphQL nodes.
export async function sourceNodes(params) {
  // Fetch a list of beers and source them on our own GraphQL API
  await Promise.all([fetchBeersAndTurnIntoNodes(params)])
}

//? `createPages` is a Gatsby extension point/Hook which tells plugins to add pages.
export async function createPages(params) {
  // Create pages dynamically and this will concurrently at the same time
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params)
  ])
}
