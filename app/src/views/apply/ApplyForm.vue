<template>
  <div class="apply-page apply-create-page">
    <el-form label-width="150px" label-position="right">
      <el-form-item required label="部门:">
        <ui-select api="dep/get" :value="current.dep_id" @change="onSelectDep"></ui-select>
      </el-form-item>

      <el-form-item required label="故障类型:">
        <el-select v-model="current.type" placeholder="故障类型">
          <el-option v-for="item in faultTypes" :label="item.label" :value="item.value" :key="item.value"></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item required label="故障名称:">
        <el-input v-model="current.title" />
      </el-form-item>
      
      <el-form-item required label="故障描述:">
        <el-input type="textarea" :rows="4" v-model="current.content" />
      </el-form-item>

      <el-form-item required label="所在地址:">
        <el-input v-model="current.addr" />
      </el-form-item>
      
      <el-form-item required label="联系电话:">
        <el-input v-model="current.tel" />
      </el-form-item>

      <el-form-item required>
        <div class="action">
          <el-button type="primary" @click="save">{{isEdit ? '保存' : '创建'}}</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import {mapState} from 'vuex';
  import formMixin from 'mixins/form';
  import data from './data';

  const {faultTypes, requiredFields} = data;

  export default {
    name: 'ApplyForm',
    mixins: [formMixin],
    props: {
      subject: {
        type: String,
        default() {
          return '申请';
        }
      },
      saveApi: {
        type: String,
        default: 'apply/insert'
      },
      editApi: {
        type: String,
        default: 'apply/update'
      },
      current: {
        type: [Object, null],
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        faultTypes
      };
    },
    computed: {
      ...mapState(['user'])
    },
    methods: {
      onSelectDep(id) {
        this.current.dep_id = id;
        axios.post(P.getApi('dep/get'), {id})
             .then(P.resolvedCallback('获取部门', res => {
               const dep = res.data[0];
               this.current.addr = dep.addr;
               this.current.tel = dep.tel;
             }));
      },
      preSave(data) { 
      
        P.eachKey(requiredFields, (text, field) => {
          if (!data[field]) {
            throw new Error(`${text}不能为空..`);
          }
        });
        if (!this.isEdit) { // create 
          data.creator = this.user.userId;
          data.ctime = P.formatDatetime();
        }
        data.mtime = P.formatDatetime();
        return data;      
      },
      postSave() {
        P.log('save ok..');
      }
    },
    created() {
      if (!this.user.userId) {
        return;
      }
      
      this.current.creator = this.user.userId;
    }
  };
</script>

<style scoped lang="scss">
  $size: 35px;
  h1{
    font-size: $size;
  }

  .apply-create-page{
    width: 60%;
    margin: auto;
    margin-top: 50px;
  }
</style>
