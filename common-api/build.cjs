// @ts-check
const shelljs = require('shelljs');

shelljs.exec('./node_modules/.bin/tsc -P tsconfig.cjs.json', { fatal: true });
shelljs.exec('./node_modules/.bin/tsc -P tsconfig.es2020.json', { fatal: true });
