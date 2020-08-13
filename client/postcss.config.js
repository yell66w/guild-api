const tailwindcss = require("tailwindcss");
module.exports = {
  important: true,
  plugins: [
    tailwindcss("./tailwind.js"),
    require("autoprefixer"),
    require("postcss-import"),
  ],
};
