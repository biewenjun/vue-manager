/*
 * @Descripttion: 
 * @version: 
 * @Author: Mr.Cactus
 * @Date: 2020-05-17 21:37:41
 * @LastEditors: Mr.Cactus
 * @LastEditTime: 2020-05-17 21:42:31
 */
export default {
	padDate (value) {
		return value >= 10 ? value : '0' + value;
	},
	formatDate (value) {
		var date = new Date(value);
		var year = date.getFullYear();
		var month = this.padDate(date.getMonth() + 1);
		var day = this.padDate(date.getDate());
		var hours = this.padDate(date.getHours());
		var minutes = this.padDate(date.getMinutes());
		var seconds = this.padDate(date.getSeconds());
		return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
	}
}
