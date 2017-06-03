<template>

  <el-dialog :title="(isEdit ? '编辑' : '创建') + subject" v-model="visible">

    <user-form v-if="visible" :current="current" save-api="user/insert" :edit-api="`user/update/${current.id}`" ref="form" @save-done="$emit('save-done')" @hide-modal="hide"></user-form>

    <div class="dialog-footer" slot="footer">
      <el-button type="primary" @click="save">{{isEdit ? '修改' : '创建'}}</el-button>
      <el-button type="default" @click="hide">取消</el-button>
    </div>

  </el-dialog>

</template>

<script>

  /*
        userId userName userNickname userPwd userAvatar userSex userTel userAddr
        userMobile userPosition userDepId userRoleId

        depId depName depAddr depTel depManager roleId

        roleName roleCname roleSysAdmin roleTaskAssign roleTaskRecieve roleTaskCreate
        roleTaskRemove roleUserCreate roleUserRemove roleDutyCreate roleUserUpdate roleDataStat
  */

  import modalMixin from 'mixins/modal';
  // import formMixin from 'mixins/form';
  import UserForm from './UserForm';
  
  export default {
    name: 'UserModal',
    mixins: [modalMixin],
    props: {
      current: {
        type: Object,
        default() {
          return {
            id: '',
            sex: ''
          };  
        }
      }
    },
    computed: {
      isEdit() {
        return !!this.current.id;
      }
    },
    components: {
      UserForm
    },
    methods: {
      save() {
        this.$refs.form.save();
      }
    }
  };

</script>