// SWC imports
import "@spectrum-web-components/styles/typography.css";
import "@spectrum-web-components/theme/src/themes.js";
import "@spectrum-web-components/theme/theme-light.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/sp-theme.js";

import "@spectrum-web-components/status-light/sp-status-light.js";
import "@spectrum-web-components/table/elements.js";
import "@spectrum-web-components/button/sp-button.js";

import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Wait until the addOnUISdk has been loaded
addOnUISdk.ready.then(async () => {
// ZAG:
  console.log("addOnUISdk is ready for use.");

  // API to expose to the Document Sandbox
  const iframeApi = {
    createTable(documentData) {
      /* ... */
    },
    toggleStatus(sdk) {
      /* ... */
    },
  };
  runtime.exposeApi(iframeApi);

  // Toggle the iframe SDK status light
  iframeApi.toggleStatus("iframe");

  // Import the Document Sandbox API proxy
  const { runtime } = addOnUISdk.instance;

  // ZAG: validate if the name needs to match the folder name
  const sandboxProxy = await runtime.apiProxy("documentSandbox");
  // Exposing the iFrame API to the Document Sandbox.

  // Set the button's click handler
  const statsButton = document.getElementById("stats");
  statsButton.addEventListener("click", async () => {
    // Invoke the Document API via Document Sandbox proxy
    // to get the document metadata and initiate the table creation process
    await sandboxProxy.getDocumentData(); // 👈 mind the await
  });

  // Enable the button only when the addOnUISdk is ready
  statsButton.disabled = false;
});
