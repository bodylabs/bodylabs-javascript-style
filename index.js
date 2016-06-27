// Load the config from yaml, since we prefer to read yaml. Use sync methods,
// since this module needs to export a full config.

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const loadConfig = (name) => {
    const configPath = path.resolve(__dirname, 'eslint', `${ name }.yml`);
    return yaml.load(fs.readFileSync(configPath, 'utf8'));
};

module.exports = {
    configs: {
        common: loadConfig('common'),
    },
};
