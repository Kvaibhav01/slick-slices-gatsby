var plugins = [{
      plugin: require('/Users/vaibhavkhulbe/Web Projects/slick-slices-gatsby/gatsby/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/vaibhavkhulbe/Web Projects/slick-slices-gatsby/gatsby/node_modules/gatsby-source-sanity/gatsby-ssr'),
      options: {"plugins":[],"projectId":"n8nnj9bd","dataset":"production","watchmode":true,"token":"skyAdflFOibWF9RTBmhYyhnDka4pxEaCFcvMVdAe91o0DwFFok48MyGNJMV9x9rXJCU53DPIvP9Rd6l2IS3jBPzerwTsxhtGNo2CbjQD3ohxo3PKEYMmfp3NMnwnM4hf8X6Skrt13AKe3WZlB6IyESb6pgPxEadO8pMpmiAVKQX29hgSxQAG"},
    },{
      plugin: require('/Users/vaibhavkhulbe/Web Projects/slick-slices-gatsby/gatsby/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
