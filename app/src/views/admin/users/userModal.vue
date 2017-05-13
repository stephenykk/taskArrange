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
          <el-option v-for="item in [{label:'男', value: 'male'}, {label: '女', value: 'female'}]" :label="item.label" :value="item.value"
            :key="item.value"></el-option>
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
          <img v-if="avatarUrl(current.avatar)" :src="avatarUrl(current.avatar)" class="avatar">
          <i v-else class="el-icon-plus avatar-plus-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="职称: " prop="position">
        <el-input v-model="current.position" />
      </el-form-item>

      <el-form-item label="部门: " prop="dep_id">
        <ui-select api="dep/get" :value="current.dep_id" @change="onSelectDep"></ui-select>
      </el-form-item>

      <el-form-item label="角色: " prop="role_id">
        <ui-select api="role/get" :value="current.role_id" :fields="['id', 'cname']" @change="onSelectRole"></ui-select>
      </el-form-item>

    </el-form>

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
  import formMixin from 'mixins/form';

  export default {
    name: 'UserModal',
    mixins: [modalMixin, formMixin],
    props: ['conf'], // 这里没有props的话， mixin的props合并不过来:(
    data() {
      return {
        uploadApi: P.getApi('/upload/image')
      };
    },
    methods: {
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
      avatarUrl: P.getAvatarUrl,
      onUploaded(res) {
        // P.warn(res, file);
        if (res.ok) {
          this.$set(this.current, 'avatar', res.data.url); // 设置响应式属性
        } else {
          this.$message.error(res.data.error);
        }
      },
      onSelectDep(id) {
        this.current.dep_id = id;
      },
      onSelectRole(id) {
        this.current.role_id = id;
      }
    }
  };

</script>

<style lang="scss">
  .avatar-uploader {
    $w: 120px;
    position: relative;
    width: $w;
    height: $w;
    display: inline-block;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    overflow: hidden;

    &:hover {
      border-color: #20a2ff;
    }

    .avatar-plus-icon {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 20px;
      line-height: $w;
      width: 100%;
      height: 100%;
      text-align: center;
    }

    .avatar {
      width: $w;
      height: $w;
    }
  }

</style>
