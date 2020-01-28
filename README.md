![npm](https://img.shields.io/npm/v/rollup-plugin-fresh) 
![NPM](https://img.shields.io/npm/l/rollup-plugin-fresh)

# rollup-plugin-fresh
Remove all files or targeted files from a chosen directory at build time
<br/>


## Install

Using npm:

```console
npm install rollup-plugin-fresh --save-dev
```
<br/>


## Usage

Used as a plugin<br/>
Runs at build time, before generating files

```JavaScript
import startFresh from 'rollup-plugin-fresh';

plugins: [
  startFresh({
    chosenDir: "./public/",
    deleteAll: false,
    noDeleteOptions: ["global.css", ".html", ".png"],
    quiet: true
  }),
],
```
<br/>


## Options

```javascript

chosenDir: "./public/"

deleteAll: false

noDeleteOptions: ["global.css", ".html", ".png"]

quiet: true

```


### chosenDir - **Required**

Type: `String`<br/>
Default: `""`

Relative path starts at the root of your project<br/>
>You can check the logs if the directory or file(s) are not found<br/>

**Full relative path is required**<br/>
Incorrect - `"public"`<br/>
Correct - `"./public/"`

Other examples<br/>
`"./public/bundle/"`<br/>
`"./src/some/other/directory/"`



### deleteAll

Type: `Boolean`<br/>
Default: `true`

**true**<br/>
Deletes all files in the chosen directory<br/>
Skips `noDeleteOptions`<br/>

**false**<br/>
Deletes all files **except** files that match the `noDeleteOptions`<br/>
Requires `noDeleteOptions`<br/>
Uses `Array.prototype.includes()` under the hood to match files<br/>
(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)



### noDeleteOptions

Type: `Array[...String]`<br/>
Default: `[]`

Required when ```javascript deleteAll: false```<br/>
Since it is using `Array.prototype.includes()`, you can target files in different ways<br/>

```javascript

["global.css", ".html", ".png", "importantfile.js", "randomName", ".cjs.js"]

```



### quiet

Type: `Boolean`<br/>
Default: `false`

**true**<br/>
Removes activity logs - 'files removed' and 'files not found'(during removal process)<br/>
Error logs will still be active

**false**<br/>
logs all activity
