/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { editor, colorUtils, constants } from "express-document-sdk";

// Utility to create a rectangle and fill it with a color.
// this is private to this module, not need to export
const createRect = (width, height, color) => {
  const rect = editor.createRectangle();
  rect.width = width;
  rect.height = height;
  // Fill the rectangle with the color.
  const col = colorUtils.fromHex(color);
  const rectangleFill = editor.makeColorFill(col);
  rect.fill = rectangleFill;
  return rect;
};

// create rows
const addRows = (rowsNumber, gutter, color) => {
  const page = editor.context.currentPage;
  var rows = [];

  const rowHeight = (page.height - (rowsNumber + 1) * gutter) / rowsNumber;
  for (let i = 0; i < rowsNumber; i++) {
    let r = createRect(page.width, rowHeight, color);

    // moving the rows
    r.translation = { x: 0, y: gutter + (gutter + rowHeight) * i };
    rows.push(r);
  }
  // adding the rows to the page
  rows.forEach((row) => page.artboards.first.children.append(row));

  // Group rows to group the indiviual rectangle layers
  const rowsGroup = editor.createGroup(); // creating a rowsGroup
  page.artboards.first.children.append(rowsGroup); // appending to the page
  rowsGroup.children.append(...rows); // appending rectangles '...' is the spread operator
  // should change the opacity to set some transparency
  // other way is to use BlendMode property
  // see docs Document APIs > Constants > BlendMode
  rowsGroup.blendMode = constants.BlendMode.multiply;
  return rowsGroup;
};

// create columns to group the indiviual rectangle layers
const addColumns = (columNumber, gutter, color) => {
  const page = editor.context.currentPage;
  var cols = [];
  const colWidth = (page.width - (columNumber + 1) * gutter) / columNumber;
  for (let i = 0; i < columNumber; i++) {
    let r = createRect(colWidth, page.height, color);
    r.translation = { x: gutter + (gutter + colWidth) * i, y: 0 };
    cols.push(r);
  }
  cols.forEach((col) => page.artboards.first.children.append(col));

  //Group Columns
  const colsGroup = editor.createGroup();
  page.artboards.first.children.append(colsGroup);
  colsGroup.children.append(...cols);
  colsGroup.blendMode = constants.BlendMode.multiply;
  return colsGroup;
};

export { addColumns, addRows };
