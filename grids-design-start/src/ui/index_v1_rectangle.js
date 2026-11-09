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

import "@spectrum-web-components/styles/typography.css";

import "@spectrum-web-components/theme/src/themes.js";
import "@spectrum-web-components/theme/theme-light.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/sp-theme.js";

// these imports addedd for the tutorial
import "@spectrum-web-components/button/sp-button.js";

import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  console.log("addOnUISdk is ready for use.");
  const createShapeButton = document.getElementById("createShape");

  // Get the UI runtime.
  const { runtime } = addOnUISdk.instance;
  const sandboxProxy = await runtime.apiProxy("documentSandbox");
  sandboxProxy.log("Document sandbox up and running.");

  // add your code here
  // ZAG: V1 Rectangle
  createShapeButton.onclick = async () => {
  // console.log("button clicked");
  // ZAG: console.log to chrome browser console
    sandboxProxy.createShape({ width: 100, height: 100 });
  };

  // above same as:
  // createShapeButton.addEventListener("click", async () => {
  // sandboxProxy.createShape({ width: 200, height: 100 });
  // });


  // ZAG: V1 Rectangle create createShapeButton
  // Enabling CTA elements only when the addOnUISdk is ready
  createShapeButton.disabled = false;
  // createGridBtn.disabled = false;
});
