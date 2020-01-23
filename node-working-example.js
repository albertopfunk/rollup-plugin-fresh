/*

node example

you can copy this file to your project, and simple configure the user input options

*/


const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const rimraf = promisify(require('rimraf'))


//! USER INPUT OPTIONS
const deleteAll = false;
const chosenDir = "./public/";
const noDeleteOptions = ["global.css", ".html", ".png"];


function clearFiles() {
  const normPath = path.normalize(chosenDir);

  if (!fs.existsSync(normPath)) {
    console.log("Dir Not Found");
    return;
  }

  async function asyncClearEach(items) {
    for (let i = 0; i < items.length; i++) {
      if (fs.existsSync(normPath + items[i])) {
        console.log("File Removed:", items[i]);
        await rimraf(normPath + items[i]);
      } else {
        console.log("File Not Found:", items[i]);
      }
    }
  }
  
  fs.readdir(normPath, async function(err, items) {
    if (!deleteAll) {
      if (noDeleteOptions.length < 1) {
        console.log("No Options Passed");
        return;
      }

      let filteredItems = [];
      items = items.filter(item => !item.includes(noDeleteOptions[0]));
      filteredItems.push(...items);

      if (noDeleteOptions.length > 1) {
        for (let i = 1; i < noDeleteOptions.length; i++) {
          filteredItems = filteredItems.filter(item => !item.includes(noDeleteOptions[i]));
        }
      }

      asyncClearEach(filteredItems);
      return;
    }
  
    asyncClearEach(items);
  });
}


clearFiles();
