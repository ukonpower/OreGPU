const info = require( './info.json' );
const typescript = require( "rollup-plugin-typescript" );
const { string } = require( "rollup-plugin-string" );

module.exports = {
	input: "./src/index.ts",
	output: {
		file: "",
		format: "",
		name: info.packageBuildName
	},
	plugins: [
		typescript(),
		string( {
			include: "**/*.wgsl",
		} )
	],
};
