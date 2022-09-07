<template>
  <!-- 二维码生成 -->
  <div class="app-container">
    <!-- 二维码生成所需参数 -->
    <el-card class="filter-container" shadow="never">
      <el-form
        ref="dataForm"
        :model="qrParams"
        :inline="false"
        :rules="rules"
        label-position="right"
        label-width="220px"
      >
        <div style="margin-top: 5px;">
          <i class="el-icon-search" />
          <span>二维码基础信息录入</span>
        </div>
        <div style="margin-top: 35px;">
          <el-row>
            <el-form-item label="统一认证号" prop="userId">
              <div class="block">
                <el-input v-model="qrParams.userId" style="width: 210px" :disabled="true" />
              </div>
            </el-form-item>
            <el-form-item label="用户名" prop="userNm">
              <div class="block">
                <el-input v-model="qrParams.userNm" style="width: 210px" :disabled="true" />
              </div>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <div class="block">
                <el-input v-model="qrParams.mobile" style="width: 210px" />
              </div>
            </el-form-item>
            <el-form-item label="推广类型" prop="prodType">
              <el-select
                v-model="qrParams.prodType"
                size="small"
                clearable
                filterable
                placeholder="类型"
                class="filter-item"
                style="width: 210px"
              >
                <el-option
                  v-for="dict in optionProdType"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                >
                  <span style="float: left">{{ dict.label }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ dict.value }}</span>
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="备注(选输)" prop="remark">
              <div class="block">
                <el-input v-model="qrParams.remark" style="width: 210px" />
              </div>
            </el-form-item>
            <el-form-item label="二维码颜色(选输)" prop="qrColor">
              <div>
                <el-color-picker v-model="qrParams.qrColor" style="width: 210px" />
              </div>
            </el-form-item>
            <el-form-item label="二维码logo(选输)" prop="qrLogoFile">
              <div sytle="margin-bottom:33px;color;red; font-size: large">
                <el-upload
                  v-model="qrParams.qrLogoFile"
                  action
                  :headers="headers"
                  multiple
                  :limit="limitNum"
                  :auto-upload="false"
                  accept=".jpg,.png"
                  :before-upload="beforeUploadFile"
                  :on-exceed="exceedFile"
                  :on-change="fileChange"
                  :on-success="handleSuccess"
                  :on-error="handleError"
                  :file-list="fileList"
                  class="upload-demo"
                  list-type="picture"
                  style="width:400px"
                >
                  <el-button size="small" type="success" plain style="width: 110px">个性logo选择</el-button>
                  <div slot="tip" class="el-upload__tip">
                    只能上传后缀为.jpg格式的图片，且不能超过1M
                  </div>
                </el-upload>
              </div>
            </el-form-item>
            <!-- 操作按钮 -->
            <el-form-item>
              <el-button style="width:90px;margin:8px" @click="reset()">重置</el-button>
              <el-button
                style="width:90px;margin:8px"
                type="primary"
                icon="el-icon-share"
                :disabled="codeBtnDisabled"
                @click="creatQrCode()"
              >生成</el-button>
            </el-form-item>
          </el-row>
        </div>
      </el-form>
    </el-card>
    <!-- 二维码生成所需弹窗 -->
    <el-dialog
      :title="title"
      append-to-body
      :visible.sync="dialogVisibled"
      width="295px"
      :show-close="true"
      :close-on-click-modal="false"
    >
      <el-carousel :interval="4000" type="card" height="300px" :autoplay="true">
        <img :src="qrCodeImg" alt="暂无图片" style="cursor: pointer">
      </el-carousel>
    </el-dialog>
    <!-- 测试 -->
    <div class="login-code" style="align:left">
      <img :src="codeUrl" @click="getCode">
    </div>

  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
import { generateQrCodeDto, generateQrCodeLogo } from '@/api/fw/qrcode'
import { isvalidPhone } from '@/utils/validate'
import Cookies from 'js-cookie'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { getCodeImg } from '@/api/login'

export default {
  name: 'QrCode',
  data() {
    // 自定义验证
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入电话号码'))
      } else if (!isvalidPhone(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }

    return {
      codeUrl: '',
      headers: {
        'Authorization': getToken()
      },
      qrParams: {
        userId: Cookies.get('username'),
        userNm: Cookies.get('username'),
        mobile: '',
        remark: '',
        prodType: '',
        qrColor: '#21B497',
        qrLogoFile: '',
        uuid: '' // test测试
      },
      optionProdType: [
        { value: 'apple', label: '苹果' },
        { value: 'pear', label: '鸭梨' }
      ],
      rules: {
        mobile: [
          { required: true, trigger: 'blur', validator: validPhone }
        ],
        prodType: [
          { required: true, trigger: 'blur', message: '商品不能为空' }
        ]
      },
      title: '产品二维码', // dialog标签
      qrCodeImg: '', // 显示存放生成的二维码图片
      codeBtnDisabled: false, // 控制禁用提交生成二维码按钮
      dialogVisibled: false, // 控制dialog是否显示

      limitNum: 1, // 控制上传logo图片个数
      // qrLogoFile: '',          //暂存上传的logo图片
      fileList: [] // 存放上传logo图片的文件数组
      // loading: '' // 加载状态图片
    }
  },

  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created() {
    // 获取验证码
    this.getCode()
  },
  mounted: function() {
    // const that = this
    // window.onresize = function temp() {
    //   that.height = document.documentElement.clientHeight - 180 + 'px;'
    // }
  },
  methods: {
    // 重置
    reset() {
      this.qrParams.mobile = '16602340632'
      this.qrParams.prodType = 'test'
      this.qrParams.qrColor = '#21B497'
      this.qrParams.remark = ''
      this.qrLogoFile = ''
      this.qrCodeImg = ''
      this.fileList = []
    },
    // 获取验证图片
    getCode() {
      getCodeImg().then(res => {
        this.codeUrl = res.img
        this.qrParams.uuid = res.uuid
      })
    },

    // 创建二维码
    creatQrCode() {
      this.qrCodeImg = ''
      // 参数判空
      console.log('qrParams', this.qrParams)
      if (this.qrParams.prodType === '' || this.qrParams.mobile === '') {
        this.$message({
          message: '必要参数（手机号或推广类型）存在空值！！！',
          type: 'warning'
        })
        return
      }
      // 根据后台需求数据格式
      const formData = new FormData()
      formData.append('userId', this.qrParams.userId)
      formData.append('userNm', this.qrParams.userNm)
      formData.append('mobile', this.qrParams.mobile)
      formData.append('remark', this.qrParams.remark)
      formData.append('prodType', this.qrParams.prodType)
      formData.append('qrColor', this.qrParams.qrColor)
      console.log('formData', formData)

      // 确认弹窗提示
      this.$confirm('请确认信息是否正确,是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.openFullScreen()
        if (this.qrParams.qrLogoFile) { // 方法暂时无法实现，使用无图方式
          formData.append('qrLogoFile', this.qrParams.qrLogoFile)
          // 有logo上传,其中resp根据框架不同返回也不尽相同，具体可以将其打印出来，实际只取blob部分，大致有两类，一类直接返回blob如当前案例，另一类则在响应中封装的data中
          generateQrCodeLogo(formData).then(_resp => {
            console.log('resp:', _resp)
            const blob = new Blob([_resp], {
              type: 'application/png;charset=utf-8'
            })
            const url = window.URL.createObjectURL(blob)
            this.qrCodeImg = url
            this.dialogVisibled = true
          }).catch(error => {
            console.log('error', error)
          })
        } else { // 无logo图片上传,json方式传输参数
          generateQrCodeDto(this.qrParams).then(resp => {
          // generateQrCodeReq(this.qrParams).then(resp =>{
            console.log('resp', resp)
            const blob = new Blob([resp], {
              type: 'application/png;charset=utf-8'
            })
            const url = window.URL.createObjectURL(blob)
            console.log('url', url)
            this.qrCodeImg = url
            this.dialogVisibled = true
          }).catch(error => {
            console.log('error', error)
          })
        }
        // 调用方法
        // this.loading.close()
        this.clearFile()
      }).catch((error) => {
        console.log(error)
      })
    },

    // 全屏加载遮罩
    // openFullScreen() {
    //   this.loading = this.$loading({
    //     lock: true,
    //     text: '二维码生成中，请稍后... ...',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0,0,0,0.7)'
    //   })
    //   setTimeout(() => {
    //     loading.close()
    //   }, 5 * 60 * 1000)
    // },

    // --------↓↓↓↓↓↓↓logo图片上传处理逻辑↓↓↓↓↓↓↓------------
    // 上传文件前的钩子,参数为上传文件，若返回FALSE或者返回promise且被reject，则停止上传
    beforeUploadFile(file) {
      const extension = file.name.substring(file.name.lastIndexOf('.') + 1)
      const size = file.size / 1024 / 1024
      if (extension !== 'jpg' && extension !== 'png') {
        this.$notify.warning({
          title: '警告',
          message: `只能选择上传后缀为.jpg或.png的图片！`
        })
        this.clearFile()
      }
      if (size > 0.5) {
        this.$notify.warning({
          title: '警告',
          message: `图片大小不能超过500kb！`
        })
        this.clearFile()
      }
    },

    // 文件超出限制个数时触发
    exceedFile(files, fileList) {
      this.$notify.warning({
        title: '警告',
        message: `只能选择${this.limitNum}个文件，当前共选择了
        ${files.length + fileList.length}个`
      })
    },

    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      console.log('文件个数：', fileList.length)
      this.qrParams.qrLogoFile = file.raw
      this.beforeUploadFile(file) // 文件繁盛变化是调用触发
    },

    // 图片上传成功时触发
    handleSuccess(resp, files, fileList) {
      this.$notify.success({
        title: '成功',
        message: `图片上传成功`
      })
    },

    // 文件超出限制个数时触发
    handleError(resp, files, fileList) {
      this.$notify.error({
        title: '错误',
        message: `文件上传失败`
      })
    },

    // 清空logo图片文件存储参数
    clearFile() {
      this.fileList = []
      this.qrParams.qrLogoFile = ''
    }

    // --------↑↑↑↑↑↑↑logo图片上传处理逻辑↑↑↑↑↑↑↑------------
  }
}
</script>

<style scoped>
</style>
