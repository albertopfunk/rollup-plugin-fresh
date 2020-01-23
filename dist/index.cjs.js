'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = require('fs');
var path = require('path');
var rimraf = _interopDefault(require('rimraf'));

async function asyncRimraf(path) {
  return new Promise((resolve, reject) => {
    resolve(rimraf(path, () => {
      resolve("Success");
    }));
  }) 
}


function index({deleteAll = true, chosenDir = "", noDeleteOptions = [], quiet = false} = {}) {
  
  const normPath = path.normalize(chosenDir);

  if (!fs.existsSync(normPath)) {
    quiet ? null : console.log("Dir Not Found");
    return;
  }

  async function asyncClearEach(items) {
    for (let i = 0; i < items.length; i++) {
      if (fs.existsSync(normPath + items[i])) {
        quiet ? null : console.log("File Removed:", items[i]);
        await asyncRimraf(normPath + items[i]);
      } else {
        quiet ? null : console.log("File Not Found:", items[i]);
      }
    }
  }
  
  fs.readdir(normPath, async function(err, items) {

    if (!deleteAll) {
      if (noDeleteOptions.length < 1) {
        quiet ? null : console.log("No Options Passed");
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
      return {
        name: "startFresh"
      }

      // return {
      //   name: "startFresh",
      //   async buildStart(options) {
      //     quiet ? null : console.log("OIOIOIOIOIOI")
      //     asyncClearEach(filteredItems);
      //   }
      // }
    }
    
    asyncClearEach(items);
    return {
      name: "startFresh"
    }

    // return {
    //   name: "startFresh",
    //   async buildStart(options) {
    //     quiet ? null : console.log("OIOIOIOIOIOI")
    //     asyncClearEach(items);
    //   }
    // }
  });
}

module.exports = index;
//# sourceMappingURL=index.cjs.js.map
