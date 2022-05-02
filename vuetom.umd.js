(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.vuetom = {}));
})(this, (function (exports) { 'use strict';

  // English [en]
  // We don't need weekdaysShort, weekdaysMin, monthsShort in en.js locale
  var en = {
    name: 'en',
    weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_')
  };

  var name = "vuetom";
  var version = "0.2.0";
  var description = "A JS library with little function";
  var main = "vuetom.umd.js";
  var module = "vuetom.esm.js";
  var types = "index.d.ts";
  var scripts = {
  	b: "export NODE_DEBUG=false && rollup -c build/rollup.m.js",
  	test: "TZ=Pacific/Auckland npm run test-tz && TZ=Europe/London npm run test-tz && TZ=America/Whitehorse npm run test-tz && npm run test-tz && jest",
  	"test-tz": "date && jest test/timezone.test --coverage=false",
  	"test-v": "jest test/plugin.test  --coverage=false",
  	lint: "./node_modules/.bin/eslint src/* test/* build/*",
  	prettier: "prettier --write \"docs/**/*.md\"",
  	esm: "export NODE_DEBUG=false && cross-env BABEL_ENV=build babel src --out-dir esm --copy-files && node build/esm",
  	umd: "export NODE_DEBUG=false && cross-env BABEL_ENV=build node build",
  	pub: "npm publish"
  };
  var jest = {
  	roots: [
  		"test"
  	],
  	testRegex: "test/(.*?/)?.*test.js$",
  	testURL: "http://localhost",
  	coverageDirectory: "./coverage/",
  	collectCoverage: true,
  	collectCoverageFrom: [
  		"src/**/*"
  	]
  };
  var keywords = [
  	"vuetom",
  	"js",
  	"dom",
  	"date"
  ];
  var author = "lauset";
  var license = "MIT";
  var homepage = "https://github.com/lauset/vuetom-js";
  var repository = {
  	type: "git",
  	url: "https://github.com/lauset/vuetom-js.git"
  };
  var devDependencies = {
  	"@babel/cli": "^7.0.0-beta.44",
  	"@babel/core": "^7.0.0-beta.44",
  	"@babel/node": "^7.0.0-beta.44",
  	"@babel/plugin-transform-modules-umd": "^7.16.7",
  	"@babel/plugin-transform-runtime": "^7.17.10",
  	"@babel/preset-env": "^7.7.1",
  	"@rollup/plugin-babel": "^5.3.1",
  	"babel-core": "^7.0.0-bridge.0",
  	"babel-jest": "^22.4.3",
  	"babel-plugin-external-helpers": "^6.22.0",
  	"babel-plugin-transform-runtime": "^6.23.0",
  	"cross-env": "^5.1.6",
  	eslint: "^4.19.1",
  	"eslint-config-airbnb-base": "^12.1.0",
  	"eslint-plugin-import": "^2.10.0",
  	"eslint-plugin-jest": "^21.15.0",
  	"jasmine-core": "^2.99.1",
  	jest: "^22.4.3",
  	mockdate: "^2.0.2",
  	ncp: "^2.0.0",
  	"pre-commit": "^1.2.2",
  	prettier: "^1.16.1",
  	react: "^18.1.0",
  	"react-dom": "^18.1.0",
  	rollup: "^2.45.1",
  	"rollup-plugin-babel": "^4.4.0",
  	"rollup-plugin-commonjs": "^10.1.0",
  	"rollup-plugin-json": "^4.0.0",
  	"rollup-plugin-node-polyfills": "^0.2.1",
  	"rollup-plugin-node-resolve": "^5.2.0",
  	"rollup-plugin-replace": "^2.2.0",
  	"rollup-plugin-terser": "^7.0.2",
  	stream: "^0.0.2",
  	typescript: "^4.6.4"
  };
  var dependencies = {
  	needle: "^3.1.0"
  };
  var pkg = {
  	name: name,
  	version: version,
  	description: description,
  	main: main,
  	module: module,
  	types: types,
  	scripts: scripts,
  	jest: jest,
  	keywords: keywords,
  	author: author,
  	license: license,
  	homepage: homepage,
  	repository: repository,
  	devDependencies: devDependencies,
  	dependencies: dependencies
  };

  var Lang = 'en';
  var Langs = {};
  Langs[Lang] = en;

  var parseLocale = (preset, object, isLocal) => {
    var l;
    if (!preset) return Lang;

    if (typeof preset === 'string') {
      var presetLower = preset.toLowerCase();

      if (Langs[presetLower]) {
        l = presetLower;
      }

      if (object) {
        Langs[presetLower] = object;
        l = presetLower;
      }

      var presetSplit = preset.split('-');

      if (!l && presetSplit.length > 1) {
        return parseLocale(presetSplit[0]);
      }
    } else {
      var {
        name
      } = preset;
      Langs[name] = preset;
      l = name;
    }

    if (!isLocal && l) Lang = l;
    return l || !isLocal && Lang;
  };

  class Vuetom {
    constructor(cfg) {
      this.$L = parseLocale(cfg.locale, null, true);
      this.version = pkg.version;
      this.options = cfg;
    }

    $locale() {
      return Langs[this.$L];
    }

    use(plugin, option) {
      if (!plugin.$i) {
        plugin(option, Vuetom);
        plugin.$i = true;
      }

      return this;
    }

  }

  var isVuetom = d => d instanceof Vuetom;

  var vuetom = function vuetom(v) {
    var options = typeof v === 'object' ? v : {};
    options.args = arguments; // eslint-disable-line prefer-rest-params

    return new Vuetom(options);
  };

  vuetom.locale = parseLocale;
  vuetom.prototype = Vuetom.prototype;

  exports.createVuetom = vuetom;
  exports.isVuetom = isVuetom;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
