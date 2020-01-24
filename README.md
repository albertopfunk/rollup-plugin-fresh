# rollup-plugin-fresh
clear all files or targeted files from a chosen directory at build time


## Install

Using npm:

```console
npm install rollup-plugin-fresh --save-dev
```


## Usage

Used as a plugin
Runs at build time, before generating files

```JavaScript
import startFresh from 'rollup-plugin-fresh';

plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      
      // extract any component CSS out into a separate file
      css: css => {
        css.write('public/bundle.css');
      }
    }),

    // removes files from a chosen directory, does not remove matching options
    startFresh({
      chosenDir: "./public/",
      deleteAll: false,
      noDeleteOptions: ["global.css", ".html", ".png"],
      quiet: true
    }),

    // used for external dependencies installed from npm
    resolve(),
    commonjs(),

    // live reload when not in production
    !production && livereload('public'),

    // building for production, minify
    production && terser()
  ],
```


## Options

```javascript

startFresh({
  chosenDir: "./public/",
  deleteAll: false,
  noDeleteOptions: ["global.css", ".html", ".png"],
  quiet: true
})

```


### `chosenDir` - **Required**

Type: `String`
Default: `""`

Path starts at the root of your project
Note if rollup.config file is somewhere other than root, the path might be off
You can check the logs to see if the directory or file are not found
**Full path is required**
`No - "public"`
`Yes - "./public/"`

Other examples
`"./public/bundle/"`
`"./src/some/other/directory/"`


### `deleteAll`

Type: `Boolean`
Default: `true`

`true`
Deletes all files in the chosen directory
Skips `noDeleteOptions`

`false`
Deletes files except files that match noDeleteOptions
Requires `noDeleteOptions`
Uses `Array.prototype.includes()` under the hood to match files with inputs
(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)


### `noDeleteOptions`

Type: `Array[...String]`
Default: `[]`

Required when `deleteAll:false`
Since it is using `Array.prototype.includes()`, you can target files in different ways
Familiarize yourself with this method if you are not already to avoid accidentally removing files

Few examples
```javascript

["global.css", ".html", ".png", "importantfile.js", "randomName", ".cjs.js"]

```


### `quiet`

Type: `Boolean`
Default: `false`

`true`
Removes activity logs - *files removed* and *files not found(during removal process)*
Error logs will still be active

`false`
logs all activity
