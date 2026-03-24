const fs = require("fs");
const path = require("path");

const assets = [
  {
    src: "node_modules/htmx.org/dist/htmx.min.js",
    dest: "public/js/htmx.min.js",
  },
  {
    src: "node_modules/vanilla-cookieconsent/dist/cookieconsent.umd.js",
    dest: "public/js/cookieconsent.umd.js",
  },
  {
    src: "node_modules/vanilla-cookieconsent/dist/cookieconsent.css",
    dest: "public/css/cookieconsent.css",
  },
];

for (const { src, dest } of assets) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`Copied ${src} → ${dest}`);
}
