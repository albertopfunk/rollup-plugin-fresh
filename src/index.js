import { existsSync, readdir } from "fs";
import { normalize } from "path";
import rimraf from "rimraf";

// rimraf recommends async
async function asyncRimraf(path) {
  return new Promise((resolve, reject) => {
    resolve(
      rimraf(path, err => {
        if (err) {
          reject(err);
        } else {
          resolve("Success");
        }
      })
    );
  });
}

export default function({
  chosenDir = "",
  deleteAll = true,
  noDeleteOptions = [],
  quiet = false
} = {}) {

  if (chosenDir === "") {
    console.log('chosenDir is required -- "./directory/"');
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
        try {
          await asyncRimraf(normPath + items[i]);
          quiet ? null : console.log("File Removed:", items[i]);
        } catch (err) {
          console.log(`Error removing file ${items[i]}. Error Message:`, err);
        }
      } else {
        console.log("File Not Found:", items[i]);
      }
    }
  }

  readdir(normPath, async function(err, items) {
    if (!deleteAll) {
      if (noDeleteOptions.length < 1) {
        console.log("No Options Passed");
        return;
      }

      let filteredItems = items.filter(
        item => !item.includes(noDeleteOptions[0])
      );

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
