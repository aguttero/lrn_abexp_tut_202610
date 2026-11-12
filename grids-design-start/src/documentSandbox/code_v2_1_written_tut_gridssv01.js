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

import addOnSandboxSdk from "add-on-sdk-document-sandbox";
const { runtime } = addOnSandboxSdk.instance;

// ZAG: import sdk classes
import { editor, colorUtils, constants } from "express-document-sdk";

function start() {
  runtime.exposeApi({
    log(...args) {
      console.log(...args);
    },
    // other properties will go here...
    addGrid({ columns, rows, gutter, columnColor, rowColor }) {
      const page = editor.context.currentPage;
      const rowWidht = page.width;
      const rowHeight = (page.height - (rowsNumber + 1) * gutter) / rowsNumber;
      console.log("addGrid", columns, rows, gutter, columnColor, rowColor);
      this.log("addGrid", columns, rows, gutter, columnColor, rowColor);
      this.log("ZAG:grid added");
    },
  });

  // create rows: draw page wide rectangles
  var rowsRect = []:
  for (let i = 0; i < rows; i++) {
    let r = editor.createRectangle();
    r.width = page.width;
    r.height = page.height;

    // moving the row in compliance
    r.translation = { x: 0, y: gutter + (gutter + rowHeight) * i };
    rowsRect.push(r);
  }
  // adding the rows to the page
  rowsRect.forEach((rect) => page.artboards.first.children.append(rect));

  // create columns: draw page-height rectangles
  const page = editor.context.currentPage;
  var colsRect = [];
  const colWidth = (page.width - (cols + 1) * gutter) / cols;
  for (let i = 0; i < cols; i++) {
    let r = editor.createRectangle();
    r.width = colWidth;
    r.height = page.height;
    r.translation = { x: gutter + (gutter + colWidth) * i, y: 0 };
    cols.push(r);
  }
  cols.forEach((rect) => page.artboards.first.children.append(rect));
}

// Video tutorial way to set the context:
function start2() {
  runtime.exposeApi({
    addGrid({ columns, rows, gutter, columnColor, rowColor }) {
      console.log(columns, rows, gutter, columnColor, rowColor);

      // this is the context assignment:
      let currentNode = editor.context.insertionParent;
      let page = null;

      while (currentNode) {
        if (currentNode.type === constants.SceneNodeType.page) {
          page = currentNode;
          break;
        }
        currentNode = currentNode.parent;
      }
      // Rows => rows becomes rowsNumber in the addRows function in shapeutils
      const rowHeight = (page.height - (rows + 1) * gutter) / rows;
      var rowsRect = [];
      for (let i = 0; i < rows; i++) {
        let r = editor.createRectangle();
        r.width = page.width;
        r.height = rowHeight;
        r.translation = { x: 0, y: gutter + (gutter + rowHeight) * i };
        rowsRect.push(r);
      }
      rowsRect.forEach((rect) => page.artboards.first.children.append(rect));
      // Columns => colums becomes columNumber in the addColumns function in shapeuitls
      var colsRect = [];
      const colWidth = (page.width - (columns + 1) * gutter) / columns;
      for (let i = 0; i < columns; i++) {
        let r = editor.createRectangle();
        r.width = colWidth;
        r.height = page.height;
        r.translation = { x: gutter + (gutter + colWidth) * i, y: 0 };
        colsRect.push(r);
      }
      colsRect.forEach((rect) => page.artboards.first.children.append(rect));
    },
    deleteGrid() {
      console.log("Deleting the grid..");
    },
  });
}



start();
