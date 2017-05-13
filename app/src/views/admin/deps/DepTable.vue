<template>

  <div class="dep-table">
  
    <el-table :data="data" stripe border class="w100p">
      <el-table-column label="序号" type="index"  width="80"></el-table-column>
      <el-table-column label="部门" prop="name" ></el-table-column>
      <el-table-column label="地址" prop="addr" ></el-table-column>
      <el-table-column label="电话" prop="tel" ></el-table-column>
      <el-table-column label="操作" width="200">
        <template scope="scope">
          <el-button type="primary" :plain="true" size="small" @click="editRow(scope.row)">编辑</el-button>
          <el-button type="danger" :plain="true" size="small" @click="delRow(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  
    <div class="paging mt10 clearfix">
      <ex-pagination :paging="paging" @paging-change="handlePagingChange"></ex-pagination>
    </div>

  </div>

</template>

<script>
  import tableMixin from 'mixins/table';

  export default {
    name: 'DepTable',
    mixins: [tableMixin]
  };
</script>