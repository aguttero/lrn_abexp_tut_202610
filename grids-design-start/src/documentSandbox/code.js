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
// ZAG: import sdk classes
// import { editor, colorUtils, constants } from "express-document-sdk";
import { editor } from "express-document-sdk";

// ZAG: import helper functions
import { addColumns, addRows } from "./shapeUtils";

// Get the Document Sandbox:
const { runtime } = addOnSandboxSdk.instance;

// ZAG V2: global variable to call gridGroup that resides in addGrid fn from delteGrid fn
// initialize global var as null;
// there is a fallback structure in deleteGrid fn
let gridRef = null;

function start() {
  const sandboxProxy = {
    addGrid({ columns, rows, gutter, columnColor, rowColor }) {
      console.log("ZAG addGrid:", columns, rows, gutter, columnColor, rowColor);

      // Get the active page
      const mainPage = editor.context.currentPage;

      // Crate the Grid
      // To group both columns and rows groups together
      // v1: addRows(rows, gutter, rowColor);
      // v2: const rowGroup gets the return value of the group from shapeUtils
      const rowGroup = addRows(rows, gutter, rowColor);
      const columnGroup = addColumns(columns, gutter, columnColor);

      // Create the grid's group
      // v2: parent outer group that groups both groups:
      const gridGroup = editor.createGroup();
      mainPage.artboards.first.children.append(gridGroup);
      gridGroup.children.append(rowGroup, columnGroup);

      // lock the group to prevent the user to accidentally shifting the grid around
      gridGroup.locked = true;

      // pass to global var to call it formo deleteGrid fn
      gridRef = gridGroup;
    },
    deleteGrid() {
      // some code
      console.log("Deleting the grid ...");

      // v1 simple delete without validations:
      // gridRef.removeFromParent(); //

      if (gridRef) {
        console.log("ZAG: gridRef is not null :-)");
        try {
          gridRef.removeFromParent();
          gridRef = null;
        } catch (error) {
          console.log("ZAG: error catched");
          console.error(error);
          return "Error: the Grid could not be deleted";
        }
      }
    },
  };
  runtime.exposeApi(sandboxProxy);
}
start();
