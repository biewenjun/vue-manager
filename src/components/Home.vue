<!--
 * @Descripttion: 
 * @version: 
 * @Author: Mr.Cactus
 * @Date: 2020-05-12 22:39:39
 * @LastEditors: Mr.Cactus
 * @LastEditTime: 2020-05-17 10:38:33
 -->
<template>
  <el-container class="home_container">
    <!--头部区域-->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="exit">退出</el-button>
    </el-header>
    <!--页面主题区域-->
    <el-container>
      <!--左侧栏-->
      <el-aside :width="isCollapse ? 64 +'px':200+'px'">
        <el-button class="toggle-btn" @click="handleCollapse">|||</el-button>
        <!--unique-opened : 只保持显示一个子菜单-->
        <el-menu :collapse-transition="false" :collapse="isCollapse" :default-active="activeIndex" router unique-opened background-color="#373D41" text-color="#fff" active-text-color="#409EFF">
          <!--一级菜单-->
          <!-- index属性用来绑定唯一的标识, 点击展开对应的子菜单-->
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName }}</span>
            </template>
            <!--二级菜单-->
            <!--设置router属性, 启用vueRouter模式会在激活导航时以 index 作为 path 进行路由跳转-->
            <el-menu-item :index="'/'+ subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="activeStatus('/'+ subItem.path)">
              <i class="el-icon-menu"></i>
              <span>{{ subItem.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--内容主体区域-->
      <el-main>
        <!--占位-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      menuList: [],
      // 由于一级菜单图标不一样, 通过id作为key值, 图标类作为value
      iconsObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      isCollapse: false,
      activeIndex: ''
    }
  },
  created() {
    this.getMenuList();
    // 加载用户已保存 选中的选项
    this.activeIndex = window.sessionStorage.getItem('activeIndex');
  },
  methods: {
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      // 成功则保存到data
      this.menuList = res.data
    },
    // 点击侧导航栏折叠
    handleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 选中侧导航栏选项高亮
    activeStatus(activeIndex) {
      this.activeIndex = activeIndex;
      //   存储选中选项
      window.sessionStorage.setItem('activeIndex', activeIndex);
    },
    // 退出登录
    exit() {
      // 保存token值
      window.sessionStorage.removeItem('token');
      // 通过编程式导航跳转到登录
      this.$router.push('/login')
    }

  }
}
</script>

<style scoped lang="less">
.home_container {
  height: 100%;
  .el-aside {
    overflow: hidden;
  }
  .el-menu {
    border: 0;
  }
  .el-submenu__title i {
    margin-right: 10px;
  }
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    color: white;
    font-size: 20px;
    align-items: center;
    > div {
      display: flex;
      align-items: center;
      img {
        width: 50px;
        margin-right: 20px;
      }
    }
  }
  .toggle-btn {
    width: 100%;
    height: 24px;
    background-color: #4a5064;
    font-size: 12px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    padding: 0;
    border: 0;
    display: block;
    border-radius: 0;
    cursor: pointer;
  }
}
</style>
