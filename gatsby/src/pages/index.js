import React from 'react';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing() {
  return (
    <div>
      <p>CurrentlySlicing</p>
    </div>
  );
}

function HotSlices() {
  return (
    <div>
      <p>HotSlices</p>
    </div>
  );
}

export default function HomePage() {
  const { sliceMasters, hotSlices } = useLatestData();
  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11AM to 11PM Every Single Day</p>
      <div>
        <CurrentlySlicing sliceMasters={sliceMasters} />
        <HotSlices hotSlices={hotSlices} />
      </div>
    </div>
  );
}
