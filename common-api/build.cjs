// @ts-check
const shelljs = require('shelljs');

shelljs.exec('npm run build-cjs', { fatal: true });
shelljs.exec('npm run build-es', { fatal: true });