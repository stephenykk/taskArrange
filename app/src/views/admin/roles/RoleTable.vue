<template>

  <div class="dep-table">
  
    <el-table :data="data" stripe border class="w100p">
      <el-table-column label="序号" fixed type="index"  width="80"></el-table-column>
      <el-table-column width="150" fixed label="角色" prop="cname" ></el-table-column>
      <el-table-column width="110" label="系统管理" prop="sys_admin" ></el-table-column>
      <el-table-column width="110" label="考勤补卡" prop="duty_create" ></el-table-column>
      <el-table-column width="110" label="数据统计" prop="data_stat" ></el-table-column>
      <el-table-column width="110" label="任务分派" prop="task_assign" ></el-table-column>
      <el-table-column width="110" label="任务接受" prop="task_recieve" ></el-table-column>
      <el-table-column width="110" label="任务创建" prop="task_create" ></el-table-column>
      <el-table-column width="110" label="任务删除" prop="task_remove" ></el-table-column>
      <el-table-column width="110" label="申请创建" prop="apply_create" ></el-table-column>
      <el-table-column width="110" label="申请编辑" prop="apply_update" ></el-table-column>
      <el-table-column width="110" label="申请删除" prop="apply_remove" ></el-table-column>
      <el-table-column width="110" label="用户创建" prop="user_create" ></el-table-column>
      <el-table-column width="110" label="用户删除" prop="user_remove" ></el-table-column>
      <el-table-column width="110" label="用户修改" prop="user_update" ></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
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
    name: 'RoleTable',
    mixins: [tableMixin]
  };
</script>