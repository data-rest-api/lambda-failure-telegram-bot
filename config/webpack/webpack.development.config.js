const { resolve, join } = require('path')
const HappyPack = require('happypack')

const DIST = resolve(__dirname, '..', '..', 'dist')
const SRC = resolve(__dirname, '..', '..', 'src')

module.exports = {
	profile: false,

	mode: 'development',
	target: 'node',
	context: SRC,

	entry: `${SRC}/index-test.ts`,

	output: {
		filename: 'index.js',
		path: DIST,
		pathinfo: false,
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
	],
}
