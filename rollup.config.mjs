// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import css from 'rollup-plugin-css-only';
import alias from '@rollup/plugin-alias';
import path from 'path';

// Получаем абсолютный путь к директории проекта
const projectRootDir = path.resolve(process.cwd());

export default {
	input: 'src/main.js',
	output: {
		file: 'dist/bundle.js',
		format: 'iife',
		name: 'bundle',
	},
	plugins: [
		// Настройка алиасов
		alias({
			entries: [
				// Алиас для модулей
				{
					find: '@modules',
					replacement: path.resolve(projectRootDir, 'src/modules')
				},
				// Алиас для анимаций
				{
					find: '@animation',
					replacement: path.resolve(projectRootDir, 'src/animation')
				}
			]
		}),
		resolve(),
		commonjs(),
		css({ output: 'bundle.css' }),
		//terser()
	]
};