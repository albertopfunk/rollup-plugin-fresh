# rollup-plugin-fresh
clear targeted files from chosen directory at build time



```JavaScript
import startFresh from 'rollup-plugin-fresh';

startFresh({
  deleteAll: false,
  chosenDir: "./public/",
  noDeleteOptions: ["global.css", ".html", ".png"],
  quiet: false
}),
```
