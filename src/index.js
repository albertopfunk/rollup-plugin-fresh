import {existsSync, readdir} from 'fs';
import {normalize} from 'path';
import rimraf from 'rimraf';


async function asyncRimraf(path) {
  return new Promise((resolve, reject) => {
    resolve(rimraf(path, () => {
      resolve("Success")
    }))
  }) 
}


export default function({deleteAll = true, chosenDir = "", noDeleteOptions = [], quiet = false} = {}) {
  console.log("Run Check1")
  const normPath = normalize(chosenDir);

  if (!existsSync(normPath)) {
    quiet ? null : console.log("Dir Not Found")
    return;
  }

  async function asyncClearEach(items) {
    for (let i = 0; i < items.length; i++) {
      if (existsSync(normPath + items[i])) {
        quiet ? null : console.log("File Removed:", items[i]);
        await asyncRimraf(normPath + items[i]);
      } else {
        quiet ? null : console.log("File Not Found:", items[i]);
      }
    }
  }
  
  readdir(normPath, async function(err, items) {

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

      console.log("Run Check2")

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
