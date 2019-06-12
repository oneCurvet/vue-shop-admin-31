<template>
  <el-form ref="form" :model="form" label-width="80px" class="GoodsAdd">
    <el-form-item label="所属类别">
      <el-select v-model="form.category_id" placeholder="请选择类别">
        <el-option
          v-for="(item, index) in categoryType"
          :key="index"
          :label="item.title"
          :value="item.category_id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="是否发布">
      <el-switch v-model="form.status"></el-switch>
    </el-form-item>

    <el-form-item label="是否显示">
      <el-switch v-model="form.is_show"></el-switch>
    </el-form-item>

    <el-form-item label="推荐类型">
      <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
      <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
    </el-form-item>

    <el-form-item label="内容标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>

    <el-form-item label="副标题">
      <el-input v-model="form.sub_title"></el-input>
    </el-form-item>

    <el-form-item label="封面图片">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8899/admin/article/uploadimg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" id="avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>

    <el-form-item label="商品货号">
      <el-input v-model="form.goods_no"></el-input>
    </el-form-item>

    <el-form-item label="库存数量">
      <el-input v-model="form.stock_quantity"></el-input>
    </el-form-item>

    <el-form-item label="市场价格">
      <el-input v-model="form.market_price"></el-input>
    </el-form-item>

    <el-form-item label="销售价格">
      <el-input v-model="form.sell_price"></el-input>
    </el-form-item>

    <el-form-item label="图片相册">
      <el-upload
        action="http://localhost:8899/admin/article/uploadfile"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handlePictureCardSuccess"
      >
        <i class="el-icon-plus"></i>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
      </el-upload>
    </el-form-item>

    <el-form-item label="内容摘要">
      <el-input type="textarea" v-model="form.zhaiyao"></el-input>
    </el-form-item>

    <el-form-item label="内容描述">
      <quill-editor v-model="form.content"></quill-editor>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
import { setTimeout } from "timers";
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      form: {
        category_id: "",
        is_show: true,
        status: true,
        title: "",
        sub_title: "",
        is_top: false,
        is_hot: true,
        stock_quantity: "",
        market_price: "",
        sell_price: "",
        status: true,
        is_slide: true,
        is_top: false,
        is_hot: true,
        zhaiyao: "",
        content: "",
        goods_no: "",
        imgList: [],
        fileList: []
      },
      categoryType: [],
      imageUrl: "",
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    onSubmit() {
      this.$axios({
        method: "POST",
        url: "http://localhost:8899/admin/goods/add/goods",
        data: this.form,
        withCredentials: true
      }).then(res => {
        console.log(res);
        const { message, status } = res.data;
        if (status == 0) {
          this.$message.success(message);
          setTimeout(() => {
            this.$router.back()
          }, 3000);
        } else {
          this.$message.error(message);
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      //   console.log(file);
      //   console.log(res);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlePictureCardSuccess(res, file, fileList) {
      // console.log(res);
      // console.log(fileList);
      this.form.fileList.push(res);
      // console.log(this.form.fileList);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      //   console.log(res);
      //   console.log(file);
      this.form.imgList = [res];
      //   console.log(this.form.imgList);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    }
  },
  mounted() {
    this.$axios({
      url: "http://localhost:8899/admin/category/getlist/goods"
    }).then(res => {
      //   console.log(res);
      const { message, status } = res.data;
      this.categoryType = message;
    });
  }
};
</script>

<style>
.ql-snow {
  line-height: 0;
}
.GoodsAdd {
  margin-top: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
#avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
