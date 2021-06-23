import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import SEO from '../components/SEO';

export default function SlicemasterPage({ data: { person } }) {
  return (
    <>
      <SEO title={person.name} image={person.image.asset.src} />
      <div className='center'>
        <Img
          fluid={person.image.asset.fluid}
          style={{ border: '2px dashed #ffc600', borderRadius: '5px' }}
        />
        <h2 style={{ marginTop: '3rem' }}>
          <span className='mark' style={{ padding: '.5rem' }}>
            {person.name}
          </span>
        </h2>
        <p style={{ padding: '0 5rem', marginTop: '4rem' }}>
          {person.description}
        </p>
      </div>
    </>
  );
}

export const query = graphql`
  query($slug: String!) {
    person: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
