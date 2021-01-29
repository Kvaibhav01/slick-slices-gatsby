import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export default {
  siteMetadata: {
    title: `Slicks Slices`,
    siteUrl: `https://gatsby.pizza`,
    description: `The best pizza place in Hamilton!`,
    twitter: `@vaibhav_khulbe`
  },
  plugins: [
    // All the global plugins we need
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      // Name of the plugin you are adding i.e. connecting Sanity with Gatsby
      resolve: `gatsby-source-sanity`,

      // Sanity specific config
      options: {
        projectId: `n8nnj9bd`,
        dataset: `production`,
        watchmode: true,
        token: process.env.SANITY_TOKEN
      }
    }
  ]
}