### Version 1.9.2

#### Minor

* replace deprecated node-sass by sass
* add jest-sinon assertions
* add eslint tests plugins
* reorg eslint configuration

### Version 1.9.1

#### Fix

* fix vulnerabilities

### Version 1.9.0

#### Features

* update to react version 18
* update to jest version 29
* replace enzyme by react testing library

#### Removed

* remove chai assertions

#### Minor

* update polyfills
* update sinon dependency

### Version 1.8.0

#### Features

* update eslint to version 8
* add eslint jest plugin
* update stylelint to version 15
* replace stylelint-config-sass-guidelines by stylelint-config-standard-scss

#### Removed

* remove plato dashboard

#### Minor

* update autoprefixer, browser-sync dependencies
* update miscellaneous utilities

### Version 1.7.0

#### Features

* tested with node 18
* update webpack to version 5
* replace webpack hash by contenthash
* update wedriverio to version 7
* migrate wedriverio tests to async await
* update cucumber to version 9
* update & re-configure husky

#### Minor

* webpack file loader no longer useful in webpack 5
* babel plugin proposal-class-properties no longer useful in ES2022
* update babel dependencies
* update chai dependency

### Version 1.6.0

#### Features

* add multiple cucumber html reporter

#### Minor

* reorganize reports directories

### Version 1.5.1

#### Minor

* update outdated dependencies
* update tooling dependencies
* fix warns on peer dependencies

### Version 1.5.0

#### Features

* update react dependencies
* update chai, sinon, enzyme dependencies

### Version 1.4.0

#### Features

* update node-sass, postcss, autoprefixer dependencies
* remove deprecated sass-lint
* add stylelint css, sass linter

### Version 1.3.0

#### Features

* update babel to version 7
* remove deprecated babel-polyfill
* remove polyfill bundle
* add only necessary core-js polyfills
* update eslint to version 6
* update husky
* update jest

### Version 1.2.0

#### Features

* update webpack to version 4
* replace webpack ExtractTextPlugin by MiniCssExtractPlugin
* add hot module replace for sass files

### Version 1.1.0

#### Features

* update wedriverio dependencies to version 5
* update cucumber to version 6
* update cucumber example step definition

### Version 1.0.2

#### Features

* add es object-rest-spread and class-properties support

### Version 1.0.1

#### Features

* clean build directory with clean-webpack-plugin

### Version 1.0.0

#### Features

* directory layout (src, test, ...)
* npm scripts for tasks
* webpack loaders config (jsx, styles, fonts, images)
* webpack plugins config (index html, extract css, sourcemaps)
* webpack dev server
* check production build with browser-sync
* postcss config with autoprefixer plugin
* jest config (coverage, mocks assets)
* setup tests fwk (globals, adapter, node polyfill)
* webdriverio e2e runner config (wdio)
* babel config (es next, react)
* eslint config (airbnb, react, jsx, es imports, globals)
* sass lint rules
* sample hello react app
* sample hello tests (unit, e2e)
* .gitignore
* .editorconfig
