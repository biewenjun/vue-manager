<template>
  <div>
    <!-- 面包屑导航区域 -->
    <Breadcrumb :firstmenu="'商品管理'" :secmenu="'商品列表'"></Breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddpage">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- table表格区域 -->
      <el-table :data="goodslist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="商品数量" prop="goods_number"></el-table-column>
        <el-table-column label="商品价格(元)" prop="goods_price" width="95px"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" width="70px"></el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="140px">
          <template slot-scope="scope">
            {{scope.row.add_time|formatDate}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.goods_id)"></el-button>
            <el-button type=" danger" icon="el-icon-delete" size="mini" @click="removeById(scope.row.goods_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total" background>
      </el-pagination>

      <!--修改商品的对话框-->
      <el-dialog title="修改商品" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
        <!--表单结构-->
        <el-form :model="editForm" :rules="editFormRules" ref="editRef" label-width="70px" hide-required-asterisk>
          <!--prop="username" : 验证规则的属性-->
          <el-form-item label="商品名" prop="goods_name">
            <el-input v-model="editForm.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="数量" prop="goods_number">
            <el-input v-model="editForm.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="goods_price">
            <el-input v-model="editForm.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="重量" prop="goods_weight">
            <el-input v-model="editForm.goods_weight"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
// 1. 导入公共子组件
import Breadcrumb from '../subComponents/breadcrumb.vue'
import FormatDate from '../subComponents/formatDate.js'

export default {
  data() {
    // 定义邮箱的校验规则
    const checkNum = (rule, value, callback) => {
      // 设置邮箱的正则表达式
      const regEmail = /^\d$/
      if (regEmail.test(value)) {
        // 说明是合法的邮箱
        return callback()
      }
      // 失败
      callback(new Error('请输入的数字'))
    }
    return {
      // 查询参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      // 商品列表
      goodslist: [],
      // 总数据条数
      total: 0,
      // 控制修改弹框的显示和隐藏
      editDialogVisible: false,
      // 修改表单的数据对象
      editForm: {},
      // 修改表单的验证规则
      editFormRules: {
        weight: [
          { required: true, message: '请输入重量', trigger: 'blur' },
          // 调用自定义的校验规则
          { validator: checkNum, trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          { validator: checkNum, trigger: 'blur' }
        ]
      },
    }
  },
  filters: {
    formatDate(value) {
      return FormatDate.formatDate(value)
    }
  },
  components: {
    // 2. 注册到父组件上
    Breadcrumb
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    // 根据分页获取对应的商品列表
    async getGoodsList() {
      const { data: res } = await this.$http.get('goods', {
        params: this.queryInfo
      })

      if (res.meta.status !== 200) {
        return this.$message.error('获取商品列表失败！')
      }

      this.$message.success('获取商品列表成功！')
      console.log(res.data)
      this.goodslist = res.data.goods
      this.total = res.data.total
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoodsList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getGoodsList()
    },
    async removeById(id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该商品, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除！')
      }

      const { data: res } = await this.$http.delete(`goods/${id}`)

      if (res.meta.status !== 200) {
        return this.$message.error('删除失败！')
      }

      this.$message.success('删除成功！')
      this.getGoodsList()
    },
    goAddpage() {
      this.$router.push('/goods/add')
    },
    // 点击显示修改的对话框
    async showEditDialog(id) {
      // 根据id查询用户信息
      const { data: res } = await this.$http.get(`goods/${id}`)
      if (res.meta.status !== 200) return this.$message.error('查询失败')
      // 成功
      this.editForm = res.data
      // 显示弹框
      this.editDialogVisible = true
    },
    // 监听修改对话框关闭的事件
    editDialogClosed() {
      this.$refs.editRef.resetFields()
    },
    // 点击修改
    editUserInfo() {
      this.$refs.editRef.validate(async valid => {
        if (!valid) return
        // 发请求
        const { data: res } = await this.$http.put(`goods/${this.editForm.goods_id}`, {
          goods_name: this.editForm.goods_name,
          goods_number: this.editForm.goods_number,
          goods_weight: this.editForm.goods_weight,
          goods_price: this.editForm.goods_price,
          upd_time: FormatDate.formatDate(new Date())
        })

        if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
        // 成功
        // 重新获取用户列表数据
        this.getUserList()
        // 关闭对话框
        this.editDialogVisible = false
        this.$message.success('更新成功')
      })
    },
  }
}
</script>

<style lang="less" scoped>
</style>
