// Load the config from yaml, since we prefer to read yaml. Use sync methods,
// since this module needs to export a full config.

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const eslintrcPath = path.resolve(__dirname, 'eslint', 'eslintrc-shared.yml');

module.exports = yaml.load(fs.readFileSync(eslintrcPath, 'utf8'));
