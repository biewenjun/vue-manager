/*
 * @Descripttion: 
 * @version: 
 * @Author: Mr.Cactus
 * @Date: 2020-05-12 20:03:43
 * @LastEditors: Mr.Cactus
 * @LastEditTime: 2020-05-17 22:04:21
 */
import Vue from 'vue'
import {
	Form,
	FormItem,
	Input,
	Button,
    Message,
    MessageBox,
	Container,
	Header,
	Aside,
	Main,
	Submenu,
	MenuItem,
	Menu,
	MenuItemGroup,
	Breadcrumb,
	BreadcrumbItem,
	Card,
	Row,
	Col,
	Table,
	TableColumn,
	Switch,
    Pagination,
    Tooltip,
    Dialog,
    Tag,
    Tree, 
    Cascader,
    Alert

} from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Menu)
Vue.use(MenuItemGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Pagination)
Vue.use(Tooltip)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Cascader)
Vue.use(Alert)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
