module.exports = function(config) {
	const karmaConfig = {
		frameworks: ["mocha", "chai", "sinon"],

		files: [
			"./node_modules/lite-fixture/index.js",
			//"./spec/*-spec.js"
			// to maintain order
			"./spec/api.axis-spec.js",
			"./spec/api.data-spec.js",
			"./spec/api.focus-spec.js",
			"./spec/api.grid-spec.js",
			"./spec/api.load-spec.js",
			"./spec/api.region-spec.js",
			"./spec/api.zoom-spec.js",
			"./spec/arc-spec.js",
			"./spec/axis-spec.js",
			"./spec/bb-spec.js",
			"./spec/class-spec.js",
			"./spec/core-spec.js",
			"./spec/data-spec.js",
			"./spec/domain-spec.js",
			"./spec/grid-spec.js",
			"./spec/interaction-spec.js",
			"./spec/legend-spec.js",
			"./spec/shape.bar-spec.js",
			"./spec/shape.line-spec.js",
			"./spec/title-spec.js",
			"./spec/tooltip-spec.js",
			"./spec/type-spec.js",
			"./spec/zoom-spec.js"
		],

		exclude: [
			// "./spec/[a-b]*-spec.js"
		],

		client: {
			mocha: {
				opts: "./mocha.opts"
			}
		},

		webpack: {
			devtool: "inline-source-map",
			module: {
				rules: [
					{
						test: /\.js$/,
						exclude: /node_modules/,
						loader: "babel-loader",
						options: {
							presets: [
								[
									"es2015",
									{
										"loose": true,
										"modules": false
									}
								]
							],
							plugins: ["add-module-exports"]
						}
					},
					{
						test: /\.scss$/,
						loaders: ["style-loader", "css-loader", "sass-loader"]
					}
				]
			}
		},

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			"./spec/*-spec.js": config.coverage ? ["webpack"] : ["webpack", "sourcemap"]
		},

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: [],

		reporters: ["mocha"],
		colors: true,
		webpackMiddleware: {
			noInfo: true
		},

		// https://github.com/karma-runner/karma/blob/master/docs/config/01-configuration-file.md#browsernoactivitytimeout
		browserNoActivityTimeout: 50000
	};

	karmaConfig.browsers.push(config.chrome ? "Chrome" : "ChromeHeadless");

	if (config.coverage) {
		karmaConfig.reporters.push("coverage-istanbul");

		karmaConfig.coverageIstanbulReporter = {
			reports: ["text-summary", "html", "lcovonly"],
			dir: "./coverage"
		};

		karmaConfig.webpack.module.rules.unshift({
			test: /\.js$/,
			exclude: /(node_modules|test)/,
			loader: "istanbul-instrumenter-loader"
		});

		karmaConfig.singleRun = true;
	}

	config.set(karmaConfig);
};
