<template>
  <div class="deps-list-page">
    <div class="toolbar">
      <el-button type="primary" @click="add">新增部门</el-button>
    </div>
    <!-- table -->
    <el-table :data="deps" stripe border class="w100p">
      <el-table-column type="index" label="No" width="60"></el-table-column>
      <el-table-column prop="name" label="部门"></el-table-column>
      <el-table-column prop="addr" label="地址"></el-table-column>
      <el-table-column prop="tel" label="电话"></el-table-column>
      <el-table-column label="操作" width="200">
        <template scope="scope">
          <el-button type="primary" :plain="true" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" :plain="true" size="small" @click="showConfirm(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paging mt10 clearfix">
      <ex-pagination :paging="paging" @paging-change="handlePagingChange"></ex-pagination>
    </div>

    <!-- dialog -->
    <el-dialog :title="title" v-model="dialogVisible">
      <el-form :rules="rules" :model="curdep" ref="depForm" label-width="120px" label-position="right">
        <el-form-item label="部门名称: " prop="name">
          <el-input v-model="curdep.name" />
        </el-form-item>
        <el-form-item label="地址: ">
          <el-input v-model="curdep.addr" />
        </el-form-item>
        <el-form-item label="电话: ">
          <el-input v-model="curdep.tel" />
        </el-form-item>
        <el-form-item label="负责人: ">
          <el-autocomplete v-model="curdep.managerName" placeholder="输入用户名搜索" :fetch-suggestions="querySearch" icon="circle-close" :on-icon-click="clearInput" :trigger-on-focus="false" @select="setManager"></el-autocomplete>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="hideDialog">取消</el-button>
        <el-button type="primary" @click="save">{{isEdit ? '修改' : '创建'}}</el-button>
      </div>
    </el-dialog>
  </div>
</template> 

<script>
  import listViewMixin from '@/views/mixins/listView';

  export default {
    name: 'DepListPage',
    mixins: [listViewMixin],
    data() {
      return {
        rules: {
          name: [
            {required: true, message: '请输入部门', trigger: 'blur'}
          ]
        },
        users: [],
        ctrl: 'dep',
        subject: '部门',
        newRow: {
          id: '',
          name: '',
          addr: '',
          tel: '',
          manager: '',
          managerName: ''
        }
      };
    },
    methods: {
      doSearch(query, cb) {
        axios
        .post(P.getApi('user/searchByName'), {name: query.trim()})
        .then(res => {
          if (res.ok) {
            const users = P.renameField(res.data, 'name', 'value');
            cb(users);
          } else {
            cb([]);
          }
        });
      },
      querySearch(query, cb) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.doSearch(query, cb);
        }, 600);

      },
      clearInput() {
        this.curdep.manager = '';
      },
      setManager(user) {
        this.curdep.manager = user.id;
      },
      getPostData() {
        return P.filterKey(this.curdep, (val, key) => key !== 'managerName');
      },
      onEditDialog(row) {
        if (!row.managerName) {
          const data = {id: this.curdep.manager, fields: ['id', 'name']};
          const action = '根据id获取用户名';

          const onsuccess = (res) => {
            const name = res.data[0].name;
            this.curdep.managerName = name;
            row.managerName = name;
          };
          onsuccess.notips = true;

          axios
          .post(P.getApi('user/get'), data)
          .then(P.resolvedCallback(action, onsuccess));
        }
      }
    }
  };
</script>

