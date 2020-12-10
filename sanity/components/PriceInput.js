import React from 'react';

import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

function createPatchFromValue(value) {
  // ? If there is a value in the input field then 'set' it to Sanity else 'unset' it
  return PatchEvent.from(value === '' ? unset() : set(Number(value)));
}

const formatMoney = Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
}).format;

export default function PriceInput({ type, value, onChange, inputComponent }) {
  return (
    <div>
      <h2>
        {type.title} - {value ? formatMoney(value / 100) : ''}
      </h2>
      <p>{type.description}</p>
      <input
        type={type.name}
        value={value}
        onChange={(event) => onChange(createPatchFromValue(event.target.value))}
        ref={inputComponent}
      />
    </div>
  );
}

PriceInput.focus = function () {
  this._inputElement.focus();
};
