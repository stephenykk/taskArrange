<template>
  <div class="task-page task-create-page">
    <el-form label-width="150px" label-position="right">
      
      <el-form-item required label="任务名称:">
        <el-input v-model="current.title" />
      </el-form-item>
      
      <el-form-item required label="任务内容:">
        <el-input type="textarea" :rows="4" v-model="current.content" />
      </el-form-item>
      
      <el-form-item required label="负责人:">
        <ui-select :disabled="isEdit && !reassign" api="user/get" :value="current.reciever" @change="onSelectUser" class="d-ib"></ui-select>
        <el-checkbox v-if="isEdit" v-model="reassign">重新分派</el-checkbox> 
      </el-form-item>
      
      <el-form-item required label="任务类型:">
        <el-select v-model="current.frequency" placeholder="任务类型">
          <el-option v-for="item in taskTypes" :label="item.label" :value="item.value" :key="item.value"></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item required label="期望开始时间:">
        <el-date-picker type="datetime" v-model="current.expect_start" :picker-options="pickerOpts" ref="dt1" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      </el-form-item>
      
      <el-form-item required label="期望结束时间:">
        <el-date-picker type="datetime" v-model="current.expect_end" :picker-options="pickerOpts" ref="dt2" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker>
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

  const {taskTypes, requiredFields} = data;
  /**
   * 临时任务需设置 开始 结束时间
   * 每日任务只需 开始时间，结束时间为当天凌晨
   * 每周任务只需 开始时间， 结束时间默认为该周五凌晨 
   * ...
   * 指定了任务负责人，则 reciever, assigner, assign_time 传值
   */

  export default {
    name: 'TaskForm',
    mixins: [formMixin],
    props: {
      subject: {
        type: String,
        default() {
          return '任务';
        }
      },
      saveApi: {
        type: String,
        default: 'task/insert'
      },
      editApi: {
        type: String,
        default: 'task/update'
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
        taskTypes,
        pickerOpts: {
          shortcuts: P.pickerShortcuts
        },
        reassign: false
      };
    },
    computed: {
      ...mapState(['user'])
    },
    methods: {
      onSelectUser(id) {
        this.current.reciever = id;
      },
      preSave(data) {
        P.eachKey(requiredFields, (text, field) => {
          if (!data[field]) {
            throw new Error(`${text}不能为空..`);
          }
        });
        if (!this.isEdit) { // create 
          data.creator = this.user.userId;
          if (data.reciever) { // 选择负责人..
            data.assigner = this.user.userId;
            data.assign_time = P.formatDatetime();
            data.status = 'assigned';
          }
        } else { // edit and 勾选重新分派
          if (this.reassign) {
            data.assigner = this.user.userId;
            data.assign_time = P.formatDatetime();
          }


          ['assignerNickname', 'creatorNickname', 'recieverNickname', 'assignerName', 'creatorName', 'recieverName'].forEach(field => {
            delete data[field];
          });
        }

        // date obj -> date str
        const {expect_start, expect_end} = data;
        data.expect_start = P.formatDatetime(expect_start);
        data.expect_end = P.formatDatetime(expect_end);

        return data;
      },
      postSave() {
        P.log('save ok..');
        
      }
    },
    created() {
      if (!this.user.userId) {
        this.$message.error('请先登录..');
        return;
      }
      this.current.creator = this.user.userId;
    },
    mounted() {
      /* const id = this.$route.params.id;
      if (id) {
        // this.editApi += `/${id}`;
        this.current[this.idkey] = id;
        this.current = Object.assign({}, this.current);
      } */
    }
  };
</script>

<style scoped lang="scss">
  $size: 35px;
  h1{
    font-size: $size;
  }

  .task-create-page{
    width: 60%;
    margin: auto;
    margin-top: 50px;
  }
</style>
