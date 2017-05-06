<template>

  <el-dialog :title="(isEdit ? '编辑' : '创建') + title" v-model="visible">
    
    <el-form :rules="rules" :model="current" label-width="120px" label-position="right">

      <el-form-item label="用户名: " prop="name">
        <el-input v-model="current.name" :minlength="3" :maxlength="20" />
      </el-form-item>

      <el-form-item label="昵称: " prop="nick_name">
        <el-input v-model="current.nick_name" :minlength="3" :maxlength="20" />
      </el-form-item>

      <el-form-item label="密码: " prop="pwd">
        <el-input type="password" v-model="current.pwd" :minlength="3" :maxlength="20" />
      </el-form-item>

      <el-form-item label="性别: " prop="sex">
        <el-select v-model="current.sex" placeholder="请选择" clearable>
          <el-option v-for="item in [{label:'男', value: 1}, {label: '女', value: 0}]" :label="item.label" :value="item.value" :key="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="办公电话: " prop="tel">
        <el-input v-model="current.tel" />
      </el-form-item>

      <el-form-item label="手机: " prop="mobile">
        <el-input v-model="current.mobile" :maxlength="13" />
      </el-form-item>

      <el-form-item label="头像: " prop="avatar">
        <el-input v-model="current.avatar" />
      </el-form-item>

      <el-form-item label="职称: " prop="position">
        <el-input v-model="current.position" />
      </el-form-item>

      <el-form-item label="部门: " prop="dep_id">
        <el-input v-model="current.dep_id" />
      </el-form-item>

      <el-form-item label="角色: " prop="role_id">
        <el-input v-model="current.role_id" />
      </el-form-item>

    </el-form>

    <div class="dialog-footer" slot="footer">
      <el-button type="default" @click="hide">取消</el-button>
      <el-button type="primary" @click="save">{{isEdit ? '修改' : '创建'}}</el-button>
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
  import formMixin from 'mixins/form';

  export default {
    name: 'UserModal',
    mixins: [modalMixin, formMixin],
    props: ['foo', 'bar'],
    data() {
      return {
      };
    },
    methods: {
      save() {

      }
    }
  };
</script>