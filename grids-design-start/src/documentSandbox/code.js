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
// Get the Document Sandbox:
const { runtime } = addOnSandboxSdk.instance;

// ZAG: import sdk classes
// import { editor, colorUtils, constants } from "express-document-sdk";
import { editor } from "express-document-sdk";

// ZAG: import helper functions
import { addColumns, addRows } from "./shapeUtils";


function start() {
  const sandboxProxy = {
    addGrid({ columns, rows, gutter, columnColor, rowColor }) {
      addRows(rows, gutter, rowColor);
      addColumns(columns, gutter, columnColor);
      console.log("ZAG addGrid:", columns, rows, gutter, columnColor, rowColor);
    },
    deleteGrid() {
      // some code
    },
  };
  runtime.exposeApi(sandboxProxy);
}
start();
