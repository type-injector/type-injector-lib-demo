API_PACKAGE='not-yet-build'

function buildCommonApi {
  set -e
  cd common-api
  npm ci
  npm run build
  npm pack
  API_PACKAGE=`ls -1 type-injector-lib-demo-common-api-*.tgz`
  cd ..
}

function buildNodeJsDemo {
  cd nodejs
  npm i ../common-api/$API_PACKAGE
  node index.js
  npm run test
  cd ..
}

function buildNestJsDemo {
  cd nestjs
  npm i ../common-api/$API_PACKAGE
  npm run build
  npm run test
  cd ..
}

function buildBrowserDemo {
  cd browser
  npm i ../common-api/$API_PACKAGE
  npm run build
  cd ..
}

function buildAngularDemo {
  cd angular
  npm i ../common-api/$API_PACKAGE
  npm run build -- -c production
  npm run test -- --code-coverage --browsers ChromeHeadless --watch false
  cd ..
}

function buildReactDemo {
  cd react-demo
  npm i ../common-api/$API_PACKAGE
  npm run build
  CI=true npm run test
  cd ..
}

function buildVueDemo {
  cd vue-demo
  npm i ../common-api/$API_PACKAGE
  npm run build
  npm run coverage
  cd ..
}
