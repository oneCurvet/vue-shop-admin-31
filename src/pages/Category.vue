<template>
  <div class="block">
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.title }}</span>
        <span>
          <input
            sytle="magin:0 auto"
            type="number"
            :value="data.sort_id"
            @keydown.enter="handleEditCategoryId(data,$event)"
          >
        </span>
        <span>
          <el-button type="text" size="mini" @click="() => remove(node, data)">Delete</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: []
    };
  },
  mounted() {
    this.handleAxiosEditCateId();
  },
  methods: {
    handleEditCategoryId(data, event) {
      //   console.log(data);
      //   console.log(event.target.value);
      if (data.sort_id == event.target.value) return;

      this.$axios({
        method: "POST",
        url: `http://localhost:8899/admin/category/edit/${data.category_id}`,
        data: {
          ...data,
          sort_id: event.target.value
        }
        //   data:
      }).then(res => {
        //   console.log(res);
        const { status, message } = res.data;
        if (status == 0) {
          this.$message.success(message);
          this.handleAxiosEditCateId();
        } else {
          this.$message.error(message);
        }
      });
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              Append
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              Delete
            </el-button>
          </span>
        </span>
      );
    },
    handleAxiosEditCateId() {
      this.$axios({
        url: "http://localhost:8899/admin/category/getlist/goods",
        method: "get"
      }).then(res => {
        const { message, status } = res.data;
        if (status == 0) this.data = message;
      });
    }
  }
};
</script>

<style>
.block{
    margin-top: 10px;   
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  
}
.custom-tree-node input {
  width: 80px !important;
}
/* .custom-tree-node > span{
  width: 50px;
  
} */
</style>
