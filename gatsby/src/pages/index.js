import React from 'react';
import ItemGrid from '../components/ItemGrid';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing({ sliceMasters }) {
  return (
    <div>
      <h2 className='center'>
        <span className='mark tilt'>Slicemasters On</span>
      </h2>
      <p style={{ marginBottom: '4rem' }}>
        Standing by, ready to 'slice' you up 😈
      </p>
      {!sliceMasters && <LoadingGrid count={4} />}
      {sliceMasters && !sliceMasters?.length && (
        <p>No one is working right now</p>
      )}
      {sliceMasters?.length && <ItemGrid items={sliceMasters} />}
    </div>
  );
}

function HotSlices({ hotSlices }) {
  return (
    <div>
      <h2 className='center'>
        <span className='mark tilt'>Hot Slices On</span>
      </h2>
      <p style={{ marginBottom: '4rem' }}>Come on by, 'buy' the slice 😌</p>
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices?.length && <p>Nothin' in the case...</p>}
      {hotSlices?.length && <ItemGrid items={hotSlices} />}
    </div>
  );
}

export default function HomePage() {
  const { sliceMasters, hotSlices } = useLatestData();
  return (
    <div className='center'>
      <h1>🍕 The Best Pizza Downtown! 🍕</h1>
      <p style={{ marginBottom: '5rem' }}>Open 11AM to 11PM Every Single Day</p>
      <HomePageGrid>
        <CurrentlySlicing sliceMasters={sliceMasters} />
        <HotSlices hotSlices={hotSlices} />
      </HomePageGrid>
    </div>
  );
}
