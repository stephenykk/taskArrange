<template>

  <el-dialog :title="(isEdit ? '编辑' : '创建') + subject" v-model="visible">
    
    <el-form :rules="rules" :model="current" label-width="120px" label-position="right">

      <el-form-item label="用户名: " prop="name">
        <el-input v-model="current.name" :minlength="3" :maxlength="20" />
      </el-form-item>

      <el-form-item label="昵称: " prop="nick_name">
        <el-input v-model="current.nick_name" :minlength="3" :maxlength="20" />
      </el-form-item>

      <el-form-item label="密码: " prop="pwd">
        <el-input type="text" v-model="current.pwd" :minlength="3" :maxlength="20" />
      </el-form-item>

      <el-form-item label="性别: " prop="sex">
        <el-select v-model="current.sex" placeholder="请选择" clearable>
          <el-option v-for="item in [{label:'男', value: 'male'}, {label: '女', value: 'female'}]" :label="item.label" :value="item.value" :key="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="办公电话: " prop="tel">
        <el-input v-model="current.tel" />
      </el-form-item>

      <el-form-item label="手机: " prop="mobile">
        <el-input v-model="current.mobile" :maxlength="13" />
      </el-form-item>
      <el-form-item label="头像: " prop="avatar">
        <el-upload :action="uploadApi" :show-file-list="false" class="avatar-uploader" :on-success="onUploaded" :before-upload="checkUploadFile">
          <img v-if="current.avatar" src="current.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-plus-icon"></i>
        </el-upload>
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
    props: ['conf'], // 这里没有props的话， mixin的props合并不过来:(
    data() {
      return {
        uploadApi: P.getApi('/upload/img')
      };
    },
    methods: {
      save() {

        const data = P.compact(P.extend({}, this.current));

        const action = (this.isEdit ? '修改' : '新增') + this.subject;
        const api = this.isEdit ? this.editApi : this.saveApi;
        if (this.isEdit) {
          delete data.id;
        }

        axios
          .post(P.getApi(api), data)
          .then(P.resolvedCallback(action, () => {
            this.hide();
            this.$emit('save-done');
          }));
      },
      checkUploadFile(file) {
        const isImg = file.type.match(/image\/\w+/);
        const isLt2M = file.size / (1024 * 1024) < 2;
        if (!isImg) {
          this.$message.error('请选择图片..');
        }
        if (!isLt2M) {
          this.$message.error('请上传小于2M的图片');
        }
        
        return isImg && isLt2M;
      },
      onUploaded(res, file) {
        P.info(res, file);
      }
    }
  };
</script>

<style lang="scss">
  .avatar-uploader{
    position: relative;
    display: inline-block;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    overflow: hidden;

    &:hover{
      border-color: #20a2ff;
    }

    $w: 120px;
    .avatar-plus-icon{
      display: inline-block;
      font-size: 20px;
      line-height: $w;
      width: $w;
      height: $w;
      text-align: center;
    }
  }

</style>