<template>
  <el-dialog :title="(isEdit ? '编辑' : '创建') + subject" v-model="visible">

      <el-form :rules="rules" :model="current" ref="form" label-width="120px" label-position="right">
        <el-form-item label="部门名称: " prop="name">
          <el-input v-model="current.name" />
        </el-form-item>

        <el-form-item label="地址: ">
          <el-input v-model="current.addr" />
        </el-form-item>

        <el-form-item label="电话: ">
          <el-input v-model="current.tel" />
        </el-form-item>

        <el-form-item label="负责人: ">
          <el-autocomplete v-model="managerName" placeholder="输入用户名搜索" :fetch-suggestions="fetchUsers" icon="circle-close" :on-icon-click="clearInput" :trigger-on-focus="true" @select="selectUser"></el-autocomplete>
        </el-form-item>
      </el-form>

      <div class="dialog-footer" slot="footer">
        <el-button type="primary" @click="save">{{isEdit ? '修改' : '创建'}}</el-button>
        <el-button type="default" @click="hide">取消</el-button>
      </div>

    </el-dialog>
</template>

<script>
  import modalMixin from 'mixins/modal';
  import formMixin from 'mixins/form';

  // let {fetchUsers} = P;

  export default {
    name: 'DepModal',
    mixins: [modalMixin, formMixin],
    props: ['conf'],
    data() {
      return {
        managerName: ''
      };
    },
    methods: {
      fetchUsers: P.fetchUsers,
      clearInput() {
        this.managerName = '';
      },
      selectUser(user) {
        this.current.manager = user.id;
      },
      getManager(id) {
        const data = {
          id,
          fields: ['id', 'name']
        };

        const onsuccess = (res) => {
          const name = res.data[0].name;
          this.managerName = name;
        };
        onsuccess.notips = true;
        const onerror = () => {
          this.managerName = '';
        };

        axios
          .post(P.getApi('user/get'), data)
          .then(P.resolvedCallback('', onsuccess, onerror));

      }
    },
    watch: {
      id() {
        if (this.isEdit) {
          if (!this.current.manager) {
            this.managerName = '';
          } else {
            this.getManager(this.current.manager);
          }
        } else {
          this.managerName = '';
        }
      }
    }
  };
</script>