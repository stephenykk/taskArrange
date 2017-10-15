<template>
  <div class="task-searchbar mt20">
    <el-form inline label-width="60px" label-suffix=": ">
      <el-form-item label="关键字">
        <el-input v-model="searching.kw" placeholder="任务名 / 任务内容" @keyup.native.enter="search" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item label="负责人" v-if="userCondition">
          <el-autocomplete v-model="recieverName" placeholder="负责人用户名" :fetch-suggestions="fetchUsers" icon="circle-close" :on-icon-click="() => {recieverName = ''}" :trigger-on-focus="true" @select="onSelectReciever"></el-autocomplete>
      </el-form-item>
      <el-form-item label="创建人" v-if="userCondition">
          <el-autocomplete v-model="creatorName" placeholder="创建人用户名" :fetch-suggestions="fetchUsers" icon="circle-close" :on-icon-click="() => {creatorName = ''}" :trigger-on-focus="true" @select="onSelectCreator"></el-autocomplete>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="searching.frequency">
            <el-option label="全部" value=""></el-option>
            <el-option :key="type.value" v-for="type in taskTypes" :label="type.label" :value="type.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searching.status">
            <el-option label="全部" value=""></el-option>
            <el-option :key="status" v-for="(label, status) in statusMap" :label="label" :value="status"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
          <el-button icon="search" type="primary" @click="search">查询</el-button>
          <el-button type="primary" plain @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
	import data from './data';

	const defSearching = {
        creator: '',
        reciever: '',
		kw: '',
		frequency: '',
		status: ''        
	};

	const {statusMap, taskTypes} = data;

	export default {
		name: 'TaskSearchbar',
        props: {
            userCondition: {
                type: Boolean,
                default: true
            }
        },
		data() {
			return {
                recieverName: '',
                creatorName: '',
				searching: Object.assign({}, defSearching),
				statusMap,
				taskTypes
			};
		},
		methods: {
            onSelectReciever(user) {
                this.searching.reciever = user.id;
                this.recieverName = user.value;
            },
            onSelectCreator(user) {
                this.searching.creator = user.id;
                this.creatorName = user.value;
            },
            fetchUsers: P.fetchUsers,
			search() {
				let data = P.filterKey(this.searching, v => !!v);
				this.$emit('search', data);
			},
			reset() {
				this.searching = Object.assign({}, defSearching);
				this.$emit('reset', {});
			}
		}
	};
</script>

<style lang="scss">
	.task-searchbar {
        .el-select {
            width: 120px;
            .el-input {
                width: 100%;
            }
        }
        .el-input {
            width: 150px
        }
	}
</style>