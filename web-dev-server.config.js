const { rollupAdapter } = require('@web/dev-server-rollup');
const json              = require('@rollup/plugin-json');

module.exports = {
  appIndex:  'index.html',
  mimeTypes: {
    // serve all json files as js
    '**/*.json': 'js',
  },
  nodeResolve: true,
  open:        true,
  plugins:     [rollupAdapter(json())],
  port:        8000,
  watch:       true,
};
