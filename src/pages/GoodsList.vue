<template>
  <div>
    <div class="search">
      <el-row type="flex" justify="space-between">
        <div>
          <el-button plain @click="handleAddGoods">添加</el-button>
          <el-button type="danger" plain @click="handleDeleteGoods">删除</el-button>
        </div>
        <div>
          <el-input placeholder="请输入内容" class="input-with-select" v-model="searchContent">
            <el-button slot="append" icon="el-icon-search" @click="searchGoods"></el-button>
          </el-input>
        </div>
      </el-row>
    </div>

    <div class="table">
      <el-row type="flex" justify="space-around">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="120"></el-table-column>
          <el-table-column label="商品描述" width="280">
            <!-- <img :src="scope.row.message[0].imgurl" alt=""> -->
            <template slot-scope="scope">
              <el-row type="flex" align="middle">
                <div class="scope-row-imgurl">
                  <!-- <img :src="scope.row.imgurl" alt> -->
                </div>
                {{ scope.row.title }}
              </el-row>
            </template>
          </el-table-column>
          <el-table-column prop="categoryname" label="类型" width="240"></el-table-column>
          <el-table-column prop="sell_price" label="价格" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEditOne(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDeleteOne(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>

    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pageIndex: 1,
      total: 0,
      pageSize: 5,
      selectedGoodsID: "",
      searchContent: ""
    };
  },
  methods: {
    searchGoods() {
      this.hangdleAxiosGetList();
    },
    handleEncapsulationDelete(id) {
      this.$axios({
        url: `http://localhost:8899/admin/goods/del/${id}`
      }).then(res => {
        // console.log(res);
        const { status, message } = res.data;
        if (status == 0) {
          this.$message.success(message);
          this.hangdleAxiosGetList();
        } else {
          this.$message.error(message);
          this.hangdleAxiosGetList();
        }
      });
    },
    handleAddGoods() {
      //   this.$axios({
      //     method: "POST",
      //     url:"http://localhost:8899/admin/goods/add/goods"
      //   }).then(res => {
      //       console.log(res);
      //   })
    },
    handleDeleteGoods() {
      //   this.$axios({
      //     url: `http://localhost:8899/admin/goods/del/${this.selectedGoodsID}`
      //   }).then(res => {
      //     // console.log(res);
      //     const { status, message } = res.data;
      //     if (status == 0) {
      //       this.$message.success(message);
      //       this.hangdleAxiosGetList();
      //     } else {
      //       this.$message.error(message);
      //       this.hangdleAxiosGetList();
      //     }
      //   });
      this.handleEncapsulationDelete(this.selectedGoodsID);
    },
    hangdleAxiosGetList() {
      this.$axios({
        method: "get",
        url: `http://localhost:8899/admin/goods/getlist?pageIndex=${
          this.pageIndex
        }&pageSize=${this.pageSize}&searchvalue=${this.searchContent}`
        //   http://localhost:8899/admin/goods/getlist?pageIndex=页码&pageSize=每页显示条数&searchvalue=模糊匹配标题条件"
      }).then(res => {
        const { message, status } = res.data;
        // console.log(res);
        this.tableData = message;
        this.total = res.data.totalcount;
        //   console.log(res.data);
        //   console.log(this.total);
        //   console.log(this.tableData);
      });
    },
    handleSelectionChange(val) {
      //   console.log(val);
      //   console.log(123);
      const GoodsID = val.map(v => {
        return v.id;
      });
      this.selectedGoodsID = GoodsID.join(",");
      //   console.log(this.selectedGoodsID);
    },
    handleEditOne(row) {
      console.log(row);
    },
    handleDeleteOne(row) {
      //   console.log(row);
      this.handleEncapsulationDelete(row.id);
    },
    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.hangdleAxiosGetList();
    },
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.hangdleAxiosGetList();
    }
  },
  mounted() {
    this.hangdleAxiosGetList();
  }
};
</script>

<style>
.scope-row-imgurl {
  width: 60px;
  height: 60px;
  border: 1px solid #999;
  flex-shrink: 0;
}
.table {
  margin-top: 10px;
}
.search {
  padding-top: 10px;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
