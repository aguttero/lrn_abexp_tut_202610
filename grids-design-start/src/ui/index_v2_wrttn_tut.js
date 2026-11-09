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
// Create Rectangle Tutorial:
import "@spectrum-web-components/button/sp-button.js";

import "@spectrum-web-components/button-group/sp-button-group.js";
import "@spectrum-web-components/field-label/sp-field-label.js";
import "@spectrum-web-components/number-field/sp-number-field.js";
import "@spectrum-web-components/slider/sp-slider.js";
import "@spectrum-web-components/swatch/sp-swatch.js";

// Import the ColorPicker components
import addOnUISdk, {
  ColorPickerEvent,
  ColorPickerPlacement,
} from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Ref to the <sp-swatch> TEST
const rowsColorSwatch = document.getElementById("rowsColorSwatch");

// Initialize color and store current value
let rowsColor = "#ccccff";
rowsColorSwatch.color = rowsColor;

// The <sp-swatch> click shows Adobe Express Color Picker
rowsColorSwatch.addEventListener("click", function () {
  addOnUISdk.app.showColorPicker(rowsColorSwatch, {
    title: "Row Grid Color",
    initialColor: rowsColor,
    placement: ColorPickerPlacement.right,
  });
});

// Listen for color change events from the Color Picker
rowsColorSwatch.addEventListener(ColorPickerEvent.colorChange, function (event) {
  rowsColor = event.detail.color;
  rowsColorSwatch.setAttribute("color", rowsColor);
});

// Listen for color picker close events
rowsColorSwatch.addEventListener(ColorPickerEvent.close, function (event) {
  console.log("Color picker closed");
});
