const withSass = require('@zeit/next-sass')
module.exports = withSass({
  cssModules: true
});
const withCSS = require('@zeit/next-css')
module.exports = withCSS();
// module.exports = {
//   webpack: (config, { dev }) => {
//     config.module.rules.push({ test: /\.scss$/, loader: ['style-loader', 'css-loader', 'sass-loader'] });
//     return config;
//   }
// }
