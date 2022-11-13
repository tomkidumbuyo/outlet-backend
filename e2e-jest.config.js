module.exports = {
	rootDir: 'src',
	transform: {
		'^.+\\.tsx?$': [
			'@swc/jest',
			{
				jsc: {
					parser: {
						syntax: 'typescript',
						tsx: false,
						decorators: true,
						dynamicImport: true,
					},
					transform: {
						legacyDecorator: true,
						decoratorMetadata: true,
					},
					target: 'es2019',
				},
				module: {
					type: 'commonjs',
					noInterop: true,
				},
				sourceMaps: true,
			},
		],
	},
	testRegex: '.*e2e.spec.js$',
	moduleFileExtensions: ['js', 'json', 'ts'],
	testEnvironment: 'node',
	testTimeout: 600000,
	reporters: ['default', '../node_modules/jest-html-reporters', '../node_modules/jest-stare'],
};
