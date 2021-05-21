import { useEffect, useState } from 'react';

// Fake VSCode to think that we are actually importing GraphQL. This is done for formatting.
const gql = String.raw;
const deets = `
    name
    _id
    image {
      asset {
        url
        metadata {
          # lqip is Low Quality Image Placeholder
          lqip
        }
      }
    }
`;

export default function useLatestData() {
  const [hotSlices, setHotSlices] = useState();
  const [sliceMasters, setSliceMasters] = useState();

  // Use a side effect to fetch the data from GraphQL endpoint
  useEffect(function () {
    // Load the data when the component loads
    fetch(process.env.GATSBY_SANITY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO: Check for errors
        // Set the data to state
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSliceMasters(res.data.StoreSettings.slicemaster);
      });
  }, []);
  return {
    hotSlices,
    sliceMasters,
  };
}
