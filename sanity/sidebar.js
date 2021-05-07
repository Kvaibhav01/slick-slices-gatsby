import React from 'react';

import S from '@sanity/desk-tool/structure-builder';

// Build a custom Sidebar
export default function Sidebar() {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      // Create a new sub-item
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>🏠</strong>)
        .child(
          // Create an editor for `storeSettings` schema type and link it to the doc id
          S.editor()
            .schemaType('storeSettings')
            // Make a new doc id so we don't have a random string of numbers in the URL bar
            .documentId('downtown')
        ),
      // Add rest of the our defined doc items
      ...S.documentTypeListItems().filter(
        // Remove the settings item
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
