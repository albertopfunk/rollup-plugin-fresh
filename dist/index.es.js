import { existsSync, readdir } from 'fs';
import { normalize } from 'path';
import rimraf from 'rimraf';

async function asyncRimraf(path) {
  return new Promise(resolve => {
    resolve(
      rimraf(path, () => {
        resolve("Success");
      })
    );
  });
}

function index({
  chosenDir = "",
  deleteAll = true,
  noDeleteOptions = [],
  quiet = false
} = {}) {

  if (chosenDir === "") {
    console.log("chosenDir is required -- string:directory");
    return;
  }

  const normPath = normalize(chosenDir);

  if (!existsSync(normPath)) {
    console.log(`Directory ${chosenDir} Not Found`);
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
        console.log("No Options Passed");
        return;
      }

      let filteredItems = [];
      items = items.filter(item => !item.includes(noDeleteOptions[0]));
      filteredItems.push(...items);

      if (noDeleteOptions.length > 1) {
        for (let i = 1; i < noDeleteOptions.length; i++) {
          filteredItems = filteredItems.filter(
            item => !item.includes(noDeleteOptions[i])
          );
        }
      }

      asyncClearEach(filteredItems);
      return {
        name: "startFresh"
      };
    }

    asyncClearEach(items);
    return {
      name: "startFresh"
    };
  });
}

export default index;
//# sourceMappingURL=index.es.js.map
