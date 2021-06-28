const { resolve, join } = require('path')
const { LoaderOptionsPlugin } = require('webpack')
const HappyPack = require('happypack')
const TerserPlugin = require('terser-webpack-plugin')

const DIST = resolve(__dirname, '..', '..', 'dist')
const SRC = resolve(__dirname, '..', '..', 'src')

module.exports = {
	profile: true,
	devtool: 'eval-source-map',

	mode: 'production',
	target: 'node',
	context: SRC,

	entry: `${SRC}/index.ts`,

	output: {
		filename: 'index.js',
		path: DIST,
		pathinfo: true,
		libraryTarget: 'umd',
	},

	resolve: {
		alias: {
			application: join(SRC, 'application'),
			domain: join(SRC, 'domain'),
			infrastructure: join(SRC, 'infrastructure'),
			resources: join(SRC, 'resources'),

			api: join(SRC, 'app', 'api'),
			app: join(SRC, 'app'),
			configs: join(SRC, 'configs'),
			helpers: join(SRC, 'helpers'),
			lib: join(SRC, 'lib'),
		},
		extensions: ['.ts', '.js'],
	},

	optimization: {
		minimize: true,
		namedModules: false,
		namedChunks: false,
		noEmitOnErrors: true,
		removeAvailableModules: true,
		removeEmptyChunks: true,
		mergeDuplicateChunks: true,
		flagIncludedChunks: true,
		occurrenceOrder: true,
		providedExports: true,
		usedExports: true,
		concatenateModules: true,
		sideEffects: true,
		minimizer: [
			new TerserPlugin({
				cache: true,
				parallel: true,
				sourceMap: true,
				extractComments: true,
			}),
		],
	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'happypack/loader',
						options: {
							id: 'ts',
						},
					},
				],
			},
		],
	},

	plugins: [
		new HappyPack({
			id: 'ts',
			threads: 1,
			loaders: [
				{
					path: 'ts-loader',
					query: { happyPackMode: true },
				},
			],
		}),

		new LoaderOptionsPlugin({
			debug: true,
			minimize: true,
		}),
	],
}
