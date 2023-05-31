import { terser } from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import replace from '@rollup/plugin-replace';

export default {
	input: 'src/index.js',
	output: {
		file: 'dist/dgrmjs/index.js',
		format: 'umd',
		name: 'DgrmJS',
		plugins: [
			terser({
				mangle: {
					keep_classnames: true,
					keep_fnames: true,
					properties: {
						regex: /^_/
					}
				}
			})]
	},
	plugins: [
		minifyHTML({
			options: {
				shouldMinify(template) {
					return (
						template.parts.some(part => {
							return (
								part.text.includes('<style') ||
								part.text.includes('<div') ||
								part.text.includes('<circle') ||
								part.text.includes('<path') ||
								part.text.includes('<svg')
							);
						})
					);
				},
				minifyOptions: {
					collapseWhitespace: true,
					minifyCSS: true,
					removeComments: true,
					keepClosingSlash: true
				}
			}
		}),
		replace({ preventAssignment: true, 'https://localhost:7156/api': 'https://dgrm.boyko.tech/api' })
	]
};
