/*
 * @Descripttion: 
 * @version: 
 * @Author: Mr.Cactus
 * @Date: 2020-05-11 16:04:14
 * @LastEditors: Mr.Cactus
 * @LastEditTime: 2020-05-12 10:58:47
 */
module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/essential',

	],
	parserOptions: {
		parser: 'babel-eslint'
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
	}
}
