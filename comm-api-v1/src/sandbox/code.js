import addOnSandboxSdk from "add-on-sdk-document-sandbox";
// import { editor } from "express-document-sdk";

// Get the document sandbox runtime.
const { runtime } = addOnSandboxSdk.instance;

async function start() {
  const panelUIProxy = await runtime.apiProxy("panel");

  // expose api to UI
  runtime.exposeApi({
    async getDocumentData() {
      // 👈 async keyword, because 👇
      // Get the document's metadata
      let documentData;
      // ... TODO
      // ... then, directly invoke the iframe method
      await panelUIProxy.createTable(documentData); // 👈 the Communication API is async 👆
    },
  });
  // switch the Framework Status light to green
  panelUIProxy.toggleStatus("document");
}
start();
